import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Button, Menu, MenuItem, Typography } from '@mui/material';
import AppContext from '../../services/AppContext';
import "./CBioPortalTile.css";


export default function CBioPortalTile() {

    // Define organ, subtype variables
    const [organName, setOrganName] = useState('');
    const [subtype, setSubtype] = useState('');
    const [subtypeBackend, setSubtypeBackend] = useState('');
    const context = useContext(AppContext);
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
    async function genericFileReader(path) {
        var fileData = "initial";

        await fetch(path)
            .then(response => response.text())
            .then(data => { fileData = data })

        return fileData
    }

    // Read data and build node networks
    async function patientIDScanner(organName, subtype) {

        // Build path to files
        var pathStringPatientIDs = "masterData/" + organName + "/" + subtype + "/" + subtype + "_patientIDs.txt";
        
        console.log(pathStringPatientIDs)


        // Read in genetic interaction (GI) and geneset (GS) data
        var currFile = await genericFileReader(pathStringPatientIDs)
        var currPatientIDArray = currFile.split("\r") //split by line
        //var currPatientIDArray = currPatientIDArray.split("\r") //split by line

        console.log(currPatientIDArray)


        return currPatientIDArray;
    }

    // Define null variables
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect will allow the back-end method "networkBuilder" to run after HTML loads
    useEffect(() => {
        // See above for networkBuilder
        // Builds proper datastructure to pass into react-force-graph
        // myMapData is a promise. It must compute before the HTML loads
        const myPatientIDs = patientIDScanner(location.state.organName, location.state.subtype)

        // Set data
        myPatientIDs.then((data) => {
            setData(data);
            setIsLoading(false);
        });
    }, []);

    //Add patient IDs to table html
    useMemo(() => {
        if (data != null) {
            //Build initial table
            const currTable = document.getElementById("cbioPortalTable");
            if (currTable) {
                currTable.parentNode.removeChild(currTable);
            }
            var table = document.createElement('table');
            table.id = 'cbioPortalTable';
            var headerRow = document.createElement('tr');
            var headerCell1 = document.createElement('th');
            headerCell1.textContent = 'Patient ID';
            headerRow.appendChild(headerCell1);
            table.appendChild(headerRow);


            for (let i = 0; i < data.length; i++) {
                //Drug name, col1
                var row1 = document.createElement('tr');
                var cell1a = document.createElement('td');
                cell1a.textContent = data[i];

                i++;

                //Append
                row1.appendChild(cell1a);
                table.appendChild(row1);
            }

            var parent = document.getElementById('cbioPortalTableDiv');
            parent.insertBefore(table, parent.firstChild);

        }
    }, [data]);

    // Access API

    const [clinicalData, setClinicalData] = useState("Loading...");
    const [isClinicalDataLoading, setClinicalDataLoading] = useState(true);

    // Create API call
    async function cbioPortalAPI(data) {
        let searchURI = `https://cbioportal.org/api/studies/thca_tcga`
        const response = await fetch(searchURI, {
            method: 'POST',
            headers: {
                        'Access-Control-Allow-Headers': "Content-Type",
                        'Access-Control-Allow-Origin':"https://localhost:3000",
                        'Content-Type':'application/json',
                        'AccessControl-Allow-Methods':'OPTIONS, POST, GET, PATCH'
                     },
            // body: JSON.stringify({
            //     "name": "TCGA"
            // })
        });
        // const myData = response.json();

        const string = await response;
        console.log(string)
        const json = string === "" ? {} : JSON.parse(string);
        return json;
    

    }
    console.log(data)

    useEffect(() => {
        var subgroupData = cbioPortalAPI(data)

        // Set gData
        subgroupData.then((clinicalData) => {
            console.log(clinicalData)
            setClinicalData(clinicalData);
            setClinicalDataLoading(false);
        });
    }, [data]); 

    


    return (

            <div class = "cbioPortalLeftTile" style={{ margin: "5%", border: "1px solid black", paddingTop: "5%", overflow: "hidden" }}>
                <div id="cbioPortalTableDiv"></div>

                <div id = "cbioPortalPlots">
                    <p>CBioPortal - KM Survival Plot</p>
                    <img style = {{width : "50%"}} src="./images/KM_Plot__Overall__months_.jpg"></img>
                </div>
                  
            </div>

    )
}