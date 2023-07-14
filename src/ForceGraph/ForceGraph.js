
import React, { useEffect, useState, useMemo, useContext } from 'react'
import { useWindowSize } from '@react-hook/window-size';
import ForceGraph2D from 'react-force-graph-2d'
import { useNavigate, useLocation } from 'react-router-dom';
import './ForceGraph.css'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Button, Menu, MenuItem, Typography, Box } from '@mui/material';
import * as d3 from 'd3';
import NodeInfoTile from '../InfoTiles/NodeInfoTile/NodeInfoTile';
import HPATile from '../InfoTiles/HPATile/HPATile';
import CBioPortalTile from '../InfoTiles/CBioPortalTile/CBioPortalTile';
import GProfilerTile from '../InfoTiles/GProfilerTile/GProfilerTile';
import HGNCTile from '../InfoTiles/HGNCTile/HGNCTile';
import AppContext from '../services/AppContext';
import { getSubtypeData } from '../subtypeData/subtypeData';

export default function ForceGraph() {

    const context = useContext(AppContext);

    const [organName, setOrganName] = useState('');
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedLink, setSelectedLink] = useState(null);
    const [subtype, setSubtype] = useState();
    const [subtypeBackend, setSubtypeBackend] = useState('');

    // So we can use react router
    const navigate = useNavigate();

    // To be used when a node is clicked
    const handleNodeClick = (node) => {
        context.setFocusedNode(node.id)
    };

    // We currently do not have any intended functionality for clicking on links
    // const handleLinkClick = (link) => {
    //     console.log("Clicked on link:", link.value);
    //     setSelectedLink(link);
    //     navigate('/protein-details', { state: { organName: organName } });
    // };

    const location = useLocation();

    // Get variable information from changing pages parameter passing
    useEffect(() => {
        if (location) {
            var temp = location.state.organName;
            var displayOrganName = temp.charAt(0).toUpperCase() + temp.slice(1);
            setOrganName(displayOrganName);

            setSubtype(location.state.subtype)
        }
    }, [location])


    console.log(location.state.subtype.internalName)


    // File Reader
    async function appicFileReader(path) {
        var fileData = "initial";

        await fetch(path)
            .then(response => response.text())
            .then(data => { fileData = data })

        return fileData
    }


    // Read data and build node networks
    async function networkBuilder(organName, subtype) {

        // Build path to files
        var pathStringGS = "masterData/" + organName + "/" + subtype + "/" + subtype + "_geneSet.txt";
        var pathStringGI = "masterData/" + organName + "/" + subtype + "/" + subtype + "_interactions.txt";

        console.log(pathStringGS)
        // Read in genetic interaction (GI) and geneset (GS) data
        var currGSFile = await appicFileReader(pathStringGS)
        var gsArray = currGSFile.split("\n")
        var currGIFile = await appicFileReader(pathStringGI)
        var giArray = currGIFile.split("\n") //split by line


        // Initiate datastructure to pass into react-force-graph
        const myMapData = new Map()

        // Parse content of text files. Build "links" for react-force-graph input
        let currLinks = [];
        for (let i = 1; i < giArray.length - 1; i++) {
            // split by source, target, STRING
            var miniGIArray = giArray[i].split("\t")

            // Build object
            let obj = { source: miniGIArray[0], target: miniGIArray[1], value: miniGIArray[2] / 10 }

            // Add object to array
            currLinks.push(obj)
        }
        // Add array to final map structure
        myMapData["links"] = currLinks;

        // Parse content of text files. Build "nodes" for react-force-graph input
        let currNodes = [];
        for (let i = 1; i < gsArray.length; i++) {
            // split by geneName, imputed/group, value
            var miniGSArray = gsArray[i].split("\t")

            // Build object
            let obj = { id: miniGSArray[0], label: miniGSArray[0], color: 'lightBlue' }

            // Add object to array
            currNodes.push(obj)
        }
        // Add array to final map structure
        myMapData["nodes"] = currNodes

        return myMapData;
    }

    // Define null variables
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect will allow the back-end method "networkBuilder" to run after HTML loads
    useEffect(() => {
        // See above for networkBuilder
        // Builds proper datastructure to pass into react-force-graph
        // myMapData is a promise. It must compute before the HTML loads
        const myMapData = networkBuilder(location.state.organName, location.state.subtype.internalName)

        // Set data
        myMapData.then((data) => {
            setData(data);
            setIsLoading(false);
        });
    }, []);


    /*
     * Clue.io API calls
     * input is gene, output are existing drugs that target the gene
     */
    // Load gene list
    const geneList = useMemo(() => {
        let myList = []
        if (data) {
            for (let i = 0; i < data.nodes.length; i++) {
                let currNode = data.nodes[i];
                let currGeneName = currNode.id;
                myList.push(currGeneName)
            }
        }

        let filter = {
            "where": {
                "gene_symbol": {
                    "ing": myList
                }
            }
        }

        const queryString = `filter=${encodeURIComponent(JSON.stringify(filter))}`;

        return queryString;
    }, [data]);

    // Create API call
    async function clueAPICall(geneList) {
        let searchURI = `https://api.clue.io/api/rep_drug_targets/?{queryString}%22%7D%7D&user_key=814d4d42c94e6545cd37185ff4bf0270`
        // Note, this is Benjamin Ahn's unique API key!
        const response = await fetch(searchURI, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const myData = response.json();

        return myData;

    }

    const [clueData, setClueData] = useState("Loading...");
    const [isClueDataLoading, setClueDataLoading] = useState(true);

    // useEffect will allow the back-end method "networkBuilder" to run after HTML loads
    useEffect(() => {
        // See above for networkBuilder
        // Builds proper datastructure to pass into react-force-graph
        // myData is a promise. It must compute before the HTML loads
        const myData = clueAPICall(geneList);

        // Set clueData
        myData.then((clueData) => {
            let myStringData = []
            for (let i = 0; i < clueData.length; i++) {
                let currResult = clueData[i]

                let tempGeneName = currResult.name
                if (geneList.includes(tempGeneName)) {
                    // pull data
                    myStringData.push(currResult.pert_iname) //drug name
                    myStringData.push(currResult.name) //gene target
                }

            }
            setClueData(myStringData);
            setClueDataLoading(true);
        });
    }, [geneList]); //rebuild HTML after the proteinList is generated and API call is ran

    const clueFinalData = useMemo(() => {
        if (clueData) {
            return {
                clueData
            };
        }
    }, [clueData]);

    // Add Clue.io to table HTML

    // Build table

    //build table data
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        //build table data
        //clueData is a list, where clueData[0] = drugName and clueData[1] is the corresponding gene target
        //the list continues in an alternating fashion such that clueData[2] is the next drug name and clueData[3] is the next gene target
        if (clueData != "Loading...") {
            for (var i = 0; i < clueData.length; i++) {
                var currDrug = clueData[i]
                var currGeneTarget = clueData[i + 1]
    
                tableData.push({drugName: currDrug, geneTarget: currGeneTarget});
    
                i++ //skip
            }
    
            setTableData(tableData);
        }
        
    }, [clueData])

    const generateTableRows = () => {
        return tableData.map((row) => (
            <tr>
                <td>{row.drugName}</td>
                <td>{row.geneTarget}</td>
            </tr>
        ));
    };

    useEffect(() => {
        generateTableRows();
    }, [tableData])


    // Adjust graphData nodes by color based on Clue.io
    const graphData = useMemo(() => {
        if (data) {
            if (clueFinalData) {
                for (let j = 1; j < clueFinalData.clueData.length; j++) {
                    var currDrugTarget = clueFinalData.clueData[j]
                    j++

                    for (let i = 0; i < data.nodes.length; i++) {
                        var currNode = data.nodes[i]
                        if (currDrugTarget == currNode.id) {
                            data.nodes[i].color = 'red'
                        }
                    }
                }

                return {
                    nodes: data.nodes,
                    links: data.links,
                };
            }
        }
    }, [clueFinalData]);

    // Handle node size
    var [nodeSizes, setNodeSizes] = useState();
    var [connections] = useState({});
    const [nodeSizeLoading, setNodeSizeLoading] = useState();
    useEffect(() => {
        if (graphData) {
            data.links.forEach((link) => {
                const { source, target } = link;
                connections[source] = (connections[source] || 0) + 1;
                connections[target] = (connections[target] || 0) + 1;
            });
            setNodeSizes(connections)
            
        }
    }, [graphData])



    //Handle colors
    const handleLinkColor = (link) => {
        const value = link.value;
        const maxVal = Math.max(...data.links.map((link) => link.value)); // get maximum value
        const minColor = '#FF8C00'; // minimum color
        const maxColor = '#FFA07A'; // maximum color
        const colorScale = d3.scaleLinear().domain([0, maxVal]).range([minColor, maxColor]); // define color scale
        return colorScale(value); // return color based on value
    };


    //Loading screens for HTML as APIs run
    const handleEngineInitialized = (engine) => {
        engine.d3Zoom.scaleTo(2); // sets initial zoom level to 2x
    };

    // For API Info Tiles
    const handleAPIButtonClick = (api) => {
        context.setCurrAPI(api)
    }

    // This allows for the graph to have a width and height that is responsive to the actual device screen size
    const [graphWidth, setGraphWidth] = useState(window.innerWidth / 2);
    const [graphHeight, setGraphHeight] = useState(window.innerHeight/ 1.1);
  
    useEffect(() => {
      const handleResize = () => {
        setGraphWidth(window.innerWidth);
        setGraphHeight(window.innerHeight);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    /////////////////////////////////////



    // Final HTML return
    return (
        <div style={{ height: "100%",  }}>
            <div id="nodeDiagram">
                <ForceGraph2D
                    graphData={graphData}
                    width={graphWidth}
                    height={graphHeight}
                    linkWidth={link => link.value / 20}
                    linkColor={handleLinkColor} // sets the color of the links based on their value
                    d3VelocityDecay={0.7} // reduces the velocity decay
                    d3AlphaDecay={0.01} // reduces the alpha decay
                    onEngineInitialized={handleEngineInitialized}
                    minZoom={2} // sets minimum zoom level
                    maxZoom={10} // sets maximum zoom level

                    // nodeAutoColorBy="group"          
                    nodeCanvasObject={(node, ctx, globalScale) => {
                        const label = node.id;
                        const fontSize = 12 / globalScale;
                        ctx.font = `${fontSize}px Sans-Serif`;

                        // node size and scaling by number of connections
                        var size = fontSize
                        if (nodeSizes) {
                            size = size + nodeSizes[node.id]
                        }
                        
                        // draw circle around text label
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
                        ctx.fillStyle = node.color;
                        ctx.fill();

                        // Node text styling
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = 'black';
                        ctx.fillText(label, node.x, node.y);

                    }}
                    // When the node is clicked
                    onNodeClick={handleNodeClick}
                    // onLinkClick={handleLinkClick}
                    nodeAutoColorBy='label'
                    enableNodeDrag={true}
                    onNodeDragEnd={(node, force) => {
                        console.log(node);
                    }}
                />
            </div>
            <div style={{width:"50%"}}>
                <div style={{width: "100%", float: "left"}}>
                    {/* <h1 style={{ marginTop: '5vh', marginBottom: '1vh', width: "100%", fontSize: '5.2vh', float: 'left' }}>{organName}: {location.state.subtype.displayName}</h1> */}
                    <h1 style={{ fontSize: '3vh', float: 'left', width: "100%" , margin: "0%", paddingTop: "5%"}}>{location.state.subtype.dataset}</h1>
                    <h1 style={{ fontSize: '3vh', float: 'left', width: "100%", margin: "0%"}}>Subtype: {location.state.subtype.fullName}</h1>
                    <h1 style={{ fontSize: '3vh', marginBottom: "5%", float: 'left', width: "100%" }}>Patients Count: {location.state.subtype.patients}</h1>

                </div>

                <div id="allTiles">
                    <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '3%'}}>
                        <Button onClick={() => handleAPIButtonClick("HPA")} variant='contained'>
                            <Typography class="buttonText">Human Protein Atlas</Typography>
                        </Button>
                        <Box sx={{ paddingRight: 3 }} />
                        <Button onClick={() => handleAPIButtonClick("HGNC")} variant='contained'>
                            <Typography class="buttonText">HGNC</Typography>
                        </Button>
                        <Box sx={{ paddingRight: 3 }} />
                        <Button onClick={() => handleAPIButtonClick("GPROFILER")} variant='contained'>
                            <Typography class="buttonText">GProfiler</Typography>
                        </Button>
                        <Box sx={{ paddingRight: 3 }} />
                        <Button onClick={() => handleAPIButtonClick("CLUE")} variant='contained'>
                            <Typography class="buttonText">CLUE</Typography>
                        </Button>
                        <Box sx={{ paddingRight: 3 }} />
                        <Button onClick={() => handleAPIButtonClick("CBIOPORTAL")} variant='contained'>
                            <Typography class="buttonText">CBioPortal</Typography>
                        </Button>
                    </Box>

                    {/* Ternary operator (like if statement) so only one info tile is rendered at a time */}
                    {context.currAPI === "HPA" ?
                        <HPATile/>
                        : context.currAPI === "HGNC" ?
                            <HGNCTile/>

                            : context.currAPI === "GPROFILER" ?
                                <GProfilerTile />
                                : context.currAPI === "CLUE" ?
                                    <div style={{ border: '1px solid black', maxHeight: (context.currAPI === "CLUE") ? '100%' : '10%' }}>
                                        <p style={{fontSize: "2vh"}}>
                                            Proteins in network are inputed into <b>Clue.io</b>. Proteins with existing drugs are displayed and highlighted in red in the network diagram.
                                        </p>
                                        <div id="clueioTableDiv">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Drug Name</th>
                                                        <th>Gene Target</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {generateTableRows()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : context.currAPI === "CBIOPORTAL" ?

                                        <CBioPortalTile />
                                        :
                                        <div />

                    }

                </div>
            </div>
        </div>

    )
}
