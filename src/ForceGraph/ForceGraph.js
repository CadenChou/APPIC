
import React, { useEffect, useState, useMemo, useContext } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { useNavigate, useLocation } from 'react-router-dom';
import './ForceGraph.css'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from '@mui/material';
import * as d3 from 'd3';
import NodeInfoTile from '../InfoTiles/NodeInfoTile/NodeInfoTile';
import AppContext from '../services/AppContext';


export default function ForceGraph() {

    const context = useContext(AppContext);

    const [organName, setOrganName] = useState('');
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedLink, setSelectedLink] = useState(null);
    const [subtype, setSubtype] = useState('');
    const [subtypeBackend, setSubtypeBackend] = useState('');
    const [nodeFocused, setNodeFocused] = useState(false);

    // So we can use react router
    const navigate = useNavigate();

    // To be used when a node is clicked
    const handleNodeClick = (node) => {
        setNodeFocused(true);
        console.log('Node has been clicked');
        console.log(node)
        context.setFocusedNode(node.id)
        console.log(context.focusedNode);
        // navigate('/protein-details', { state: { organName: organName } });
    };

    const handleLinkClick = (link) => {
        console.log("Clicked on link:", link.value);
        setSelectedLink(link);
        navigate('/protein-details', { state: { organName: organName } });
    };

    const location = useLocation();

    useEffect(() => {
        if (location) {
            console.log(location.state.organName);
            var temp = location.state.organName;
            var displayOrganName = temp.charAt(0).toUpperCase() + temp.slice(1);
            setOrganName(displayOrganName);

            var temp = location.state.subtype;
            var temp = temp.split("_");
            var displaySubtypeName = temp[1] + ", " + temp[0];
            setSubtype(displaySubtypeName)
        }
    }, [location])




    /*
     * File Reader
     * This function is a text parser, importing cancer subtype genetic data 
     */
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

        console.log(pathStringGI)
        

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
            console.log(miniGIArray);

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

        console.log(myMapData)


        return myMapData;
    }



    // Execute functions in the proper order
    // First define null variables such that the page can still load while back-end methods are running
    // Then call back-end methods, and hand off to front end for display


    // Define null variables
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect will allow the back-end method "networkBuilder" to run after HTML loads
    useEffect(() => {
        // See above for networkBuilder
        // Builds proper datastructure to pass into react-force-graph
        // myMapData is a promise. It must compute before the HTML loads
        const myMapData = networkBuilder(location.state.organName, location.state.subtype)

        // Set data
        myMapData.then((data) => {
            setData(data);
            setIsLoading(false);
        });
    }, []);

    // Create GET API calls
    // const userActionGet = async () => {
    //     const response = await fetch('http://example.com/movies.json');
    //     const myJson = await response.json(); //extract JSON from the http response
    //     // do something with myJson
    // }



    // Load protein list
    const proteinList = useMemo(() => {
        let myList = []
        if (data) {
            for (let i = 0; i < data.nodes.length; i++) {
                let currNode = data.nodes[i];
                let currGeneName = currNode.id;
                myList.push(currGeneName)
            }
        }
        return myList;
    }, [data]);

    // Create POST API calls
    async function gProfilerAPICall(proteinList) {
        console.log('running');
        console.log(proteinList);
        const response = await fetch('https://biit.cs.ut.ee/gprofiler/api/gost/profile/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'organism': 'hsapiens',
                'query': proteinList
            }),
        });
        const myData = response.json();
        console.log(myData);
        console.log("received");

        return myData;

    }

    const [gData, setGData] = useState("Loading...");
    const [isGDataLoading, setGDataLoading] = useState(true);

    // useEffect will allow the back-end method "networkBuilder" to run after HTML loads
    useEffect(() => {
        // See above for networkBuilder
        // Builds proper datastructure to pass into react-force-graph
        // myData is a promise. It must compute before the HTML loads
        const myData = gProfilerAPICall(proteinList);

        // Set gData
        myData.then((gData) => {
            let myStringData = []
            for (let i = 0; i < gData.result.length; i++) {
                let currResult = gData.result[i]

                // pull data
                myStringData.push(currResult.description)
                // var roundedNum = currResult.p_value.toPrecision(3);
                var pvalue = currResult.p_value;
                const roundedNum = pvalue.toExponential(3);
                myStringData.push(roundedNum);

            }
            setGData(myStringData);
            setGDataLoading(false);
        });
    }, [proteinList]); //rebuild HTML after the proteinList is generated and API call is ran

    //Add gProf to table html
    useMemo(() => {
        if (gData == "Loading...") {
            console.log("here")
            var parent = document.getElementById('gprofTableDiv');
            
        }
        if (gData != "Loading...") {
            //Build initial table
            var currTable = document.getElementById('gprofTable');
            
            if (currTable) {
                currTable.parentNode.removeChild(currTable);
            }

            var table = document.createElement('table');
            table.id = 'gprofTable';
            var headerRow = document.createElement('tr');
            var headerCell1 = document.createElement('th');
            headerCell1.textContent = 'Pathway';
            var headerCell2 = document.createElement('th');
            headerCell2.textContent = 'p-value';
            headerRow.appendChild(headerCell1);
            headerRow.appendChild(headerCell2);
            table.appendChild(headerRow);

            for (let i = 0; i < gData.length; i++) {
                //Drug name, col1
                var row1 = document.createElement('tr');
                var cell1a = document.createElement('td');
                cell1a.textContent = gData[i];

                i++;

                //Gene target, col2
                var cell1b = document.createElement('td');
                cell1b.textContent = gData[i];

                //Append
                row1.appendChild(cell1a);
                row1.appendChild(cell1b);
                table.appendChild(row1);
            }

            var parent = document.getElementById('gprofTableDiv');
            parent.insertBefore(table, parent.firstChild);

        }
    }, [gData]);


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


    //Handle colors
    const handleLinkColor = (link) => {
        const value = link.value;
        const maxVal = Math.max(...data.links.map((link) => link.value)); // get maximum value
        const minColor = '#FF8C00'; // minimum color
        const maxColor = '#FFA07A'; // maximum color
        const colorScale = d3.scaleLinear().domain([0, maxVal]).range([minColor, maxColor]); // define color scale
        return colorScale(value); // return color based on value
    };

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

    //Add Clue.io to table html

    useMemo(() => {
        if (clueFinalData.clueData != "Loading...") {
            //Build initial table
            const currTable = document.getElementById("clueioTable");
            if (currTable) {
                currTable.parentNode.removeChild(currTable);
            }
            var table = document.createElement('table');
            table.id = 'clueioTable';
            var headerRow = document.createElement('tr');
            var headerCell1 = document.createElement('th');
            headerCell1.textContent = 'Drug Name';
            var headerCell2 = document.createElement('th');
            headerCell2.textContent = 'Gene Target';
            headerRow.appendChild(headerCell1);
            headerRow.appendChild(headerCell2);
            table.appendChild(headerRow);


            for (let i = 0; i < clueFinalData.clueData.length; i++) {
                //Drug name, col1
                var row1 = document.createElement('tr');
                var cell1a = document.createElement('td');
                cell1a.textContent = clueFinalData.clueData[i];

                i++;

                //Gene target, col2
                var cell1b = document.createElement('td');
                cell1b.textContent = clueFinalData.clueData[i];

                //Append
                row1.appendChild(cell1a);
                row1.appendChild(cell1b);
                table.appendChild(row1);
            }

            var parent = document.getElementById('clueioTableDiv');
            parent.insertBefore(table, parent.firstChild);

        }
    }, [clueFinalData]);

    //Loading screens for HTML as APIs run

    // If node data is not present, show a loading screen
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleEngineInitialized = (engine) => {
        engine.d3Zoom.scaleTo(2); // sets initial zoom level to 2x
    };



    // Final HTML return
    return (
        <div style = {{height : "100%"}}>
            <div style={{}}>
                <h1 style={{ marginTop: '5vh', marginBottom: '1vh', width: "100%", fontSize: '5vh', float:'left' }}>{organName}</h1>
                <h1 style = {{fontSize: '3vh', marginBottom: "5vh", float:'left', width: "100%"}}>Subtype: {subtype}</h1>
            </div>

            <div id = "nodeDiagram">
                <h1 style={{fontSize:'3vh'}}>Protein-Protein Network</h1>
                <ForceGraph2D
                    graphData={graphData}
                    width={700}
                    height={400}
                    linkWidth={link => link.value / 15}
                    linkColor={handleLinkColor} // sets the color of the links based on their value
                    nodeSpacing={100}
                    damping={0.9}
                    d3VelocityDecay={0.9} // reduces the velocity decay
                    d3AlphaDecay={0.1} // reduces the alpha decay
                    onEngineInitialized={handleEngineInitialized}
                    minZoom={2.5} // sets minimum zoom level
                    maxZoom={10} // sets maximum zoom level
                    // nodeAutoColorBy="group"                 

                    nodeCanvasObject={(node, ctx, globalScale) => {
                        const label = node.id;
                        const fontSize = 12 / globalScale;
                        ctx.font = `${fontSize}px Sans-Serif`;
                        const textWidth = ctx.measureText(label).width;
                        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                        // draw circle around text label
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, bckgDimensions[0] / 2, 0, 2 * Math.PI);
                        ctx.fillStyle = node.color;
                        ctx.fill();

                        // Node text styling
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = 'black';
                        ctx.fillText(label, node.x, node.y);

                        node.__bckgDimensions = bckgDimensions;
                        // Not too sure about this stuff
                        node.pointerArea = {
                            left: node.x - bckgDimensions[0] / 2,
                            right: node.x + bckgDimensions[0] / 2,
                            top: node.y - bckgDimensions[1] / 2,
                            bottom: node.y + bckgDimensions[1] / 2,
                        };

                    }}
                    // When the node is clicked
                    onNodeClick={handleNodeClick}
                    onLinkClick={handleLinkClick}
                    nodeAutoColorBy='label'
                    nodeVal={node => 10}
                    enableNodeDrag={true}
                    onNodeDragEnd={(node, force) => {
                        console.log(node);
                    }}
                />
            </div>
            <h1 style = {{fontSize:"3vh"}}>Info</h1>
            <div id = "allTiles">
                <NodeInfoTile />

                    <div  style={{ border: '1px solid black', margin : "5%"}}>
                        <p style={{fonSize: "2vh"}}>Drug Repurposing Results</p>
                        <p class='tileDescription'>
                            All genes inputed into <b>CLUE</b>. Genes with existing drugs are displayed and highlighted in red in the diagram.
                        </p>
                        <div id="clueioTableDiv"></div>
                    </div>
                    <div  style={{ border: '1px solid black', margin: "5%"}}>
                        <p>Relevant Pathways</p>
                        <p class='tileDescription'>
                            All genes inputed into <b>gProfiler</b>. Output include involved biological pathways and associated p-values.
                        </p>
                        <div id="gprofTableDiv"></div>
                    </div>

            </div>
            

        </div>

    )
}
