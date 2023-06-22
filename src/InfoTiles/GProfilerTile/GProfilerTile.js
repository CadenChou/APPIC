import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Button, Menu, MenuItem, Typography } from '@mui/material';
import AppContext from '../../services/AppContext';
import "./GProfiler.css";
// import cbioportalImage from '../../../public/masterData/bladder/Cell2017_nonPapillary/KM_Plot__test.svg';


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


    
    return (
        <div className='col-md-6' style={{ width: "100%" }}>

            <div style={{ border: '1px solid black', margin: "5%" }}>
                <p>Relevant Pathways</p>
                <p class='tileDescription'>
                    All genes inputed into <b>gProfiler</b>. Output include involved biological pathways and associated p-values.
                </p>
                <div id="gprofTableDiv"></div>
            </div>

        </div>
    )
}