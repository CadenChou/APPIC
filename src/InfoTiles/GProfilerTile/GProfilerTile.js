import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Button, Menu, MenuItem, Typography } from '@mui/material';
import AppContext from '../../services/AppContext';
import "./GProfiler.css";
// import cbioportalImage from '../../../public/masterData/bladder/Cell2017_nonPapillary/KM_Plot__test.svg';

/**
 * NOTE: NOT CURRENTLY IN USE
 */
export default function GProfilerTile() {

    const location = useLocation();


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
        const myMapData = networkBuilder(location.state.organName, location.state.subtype.internalName)

        // Set data
        myMapData.then((data) => {
            setData(data);
            setIsLoading(false);
        });
    }, []);



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
            var checkDataReceived = gData['result'];
            if (checkDataReceived != null) {
                let myStringData = []
                for (let i = 0; i < gData['result'].length; i++) {
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

            }
            
        });
    }, [proteinList]); //rebuild HTML after the proteinList is generated and API call is ran

    //build table data
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        //build table data
        //clueData is a list, where clueData[0] = drugName and clueData[1] is the corresponding gene target
        //the list continues in an alternating fashion such that clueData[2] is the next drug name and clueData[3] is the next gene target
        if (gData != "Loading...") {
            for (var i = 0; i < gData.length; i++) {
                var currPathway = gData[i]
                var currPvalue = gData[i + 1]
    
                tableData.push({pathway: currPathway, pvalue: currPvalue});
    
                i++ //skip
            }
    
        }
        
    }, [gData])

    const generateTableRows = () => {
        return tableData.map((row) => (
            <tr>
                <td>{row.pathway}</td>
                <td>{row.pvalue}</td>
            </tr>
        ));
    };

    useEffect(() => {
        generateTableRows();
    }, [tableData])





    
    return (
        <div className='col-md-6' style={{ width: "100%" }}>

            <div style={{border: '1px solid black'}}>
                <p class='tileDescription'>
                    All proteins are inputed into <b>gProfiler</b>. Output includes involved biological pathways and associated p-values.
                </p>

                <p style={{fontSize:'2vh'}}>May take a few seconds to load</p>


                <div id="gprofTableDiv">
                    <table>
                        <thead>
                            <tr>
                                <th>Pathway</th>
                                <th>p-value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generateTableRows()}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}