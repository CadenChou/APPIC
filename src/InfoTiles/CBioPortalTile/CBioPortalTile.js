import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Button, Menu, MenuItem, Typography } from '@mui/material';
import AppContext from '../../services/AppContext';
import "./CBioPortalTile.css";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
            display: true,
            text: "Percent Survival"
        }
      },
      x: {
        beginAtZero: true,
        title: {
            display: true,
            text: "Months"
        }
      },
    },
};



export default function CBioPortalTile() {

    // Define organ, subtype variables
    const location = useLocation();

 

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
        setPathToPtIDs(pathStringPatientIDs);


        var currFile = await genericFileReader(pathStringPatientIDs)
        var currPatientIDArray = currFile.split("\r") 

        // verify if additional formatting is needed
        for (var i = 1; i < currPatientIDArray.length; i++) {
            var currID = currPatientIDArray[i];
            var newID = currID.substr(1, currID.length);
            currPatientIDArray[i] = newID;
        }
        
        return currPatientIDArray;
    }

    // Define null variables
    const [ptIDs, setPtIDs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pathToPtIDs, setPathToPtIDs] = useState(null);

    // useEffect will allow the back-end method "networkBuilder" to run after HTML loads
    useEffect(() => {
        // See above for networkBuilder
        // Builds proper datastructure to pass into react-force-graph
        // myMapData is a promise. It must compute before the HTML loads
        const myPatientIDs = patientIDScanner(location.state.organName, location.state.subtype.internalName)

        // Set data
        myPatientIDs.then((data) => {
            setPtIDs(data);
            setIsLoading(false);
        });
    }, []);

    //Add patient IDs to table html
    useMemo(() => {
        if (ptIDs != null) {
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


            for (let i = 0; i < ptIDs.length; i++) {
                //Drug name, col1
                var row1 = document.createElement('tr');
                var cell1a = document.createElement('td');
                cell1a.textContent = ptIDs[i];

                //Append
                row1.appendChild(cell1a);
                table.appendChild(row1);
            }

            var parent = document.getElementById('cbioPortalTableDiv');
            parent.insertBefore(table, parent.firstChild);

        }
    }, [ptIDs]);


    // READ IN PT DATA FROM CBIOPORTAL

    // Define null variables
    const [clinicalData, setClinicalData] = useState(null);
    const [pathToStringClinicalData, setPathToStringClinicalData] = useState(null);


    async function clinicalDataScanner(organName, subtype) {
        // Build path to file
        var pathToStringClinicalData = "masterData/" + organName + "/" + subtype + "/" + subtype  + "_clinical_data.tsv"
        setPathToStringClinicalData(pathToStringClinicalData);
        var currFile = await genericFileReader(pathToStringClinicalData)

        const rows = currFile.split("\n"); // Split the data into rows
        const headers = rows[0].split("\t"); // Split the first row to get the headers

        const result = rows.slice(1).map(row => {
        const values = row.split("\t"); // Split each row to get the values

        // Create an object with header-value pairs
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
        });

        return result;
    

    }

    // Create datastructures for plotting
    var monthsSurvivedArray = []

    // plotting data
    var monthsSurvivedPlotting = [
        // x = months, y = percent of patients still alive
        { x: 0, y: 1}

    ]


    const [plottingPoints, setPlottingPoints] = useState([])


    // parse through clinical data
    useEffect(() => {
        var myClinicalData = clinicalDataScanner(location.state.organName, location.state.subtype.internalName)
        // Set data
        myClinicalData.then((data) => {
            setClinicalData(data);
        });

    }, [clinicalData]);

    useMemo(() => {
        if (clinicalData !== null) {
            for (var i = 0; i < clinicalData.length; i++) {
                var currPt = clinicalData[i]
                var currPtID = currPt['Patient ID']
                console.log(currPtID)

                // sift for cancer subtype pts
                if (ptIDs.includes(currPtID)) {
                    
                    // Overall Survival
                    var monthsSurvived = currPt['Months of disease-specific survival']

                    // Overall Survival for breast cancer exceptions
                    if (monthsSurvived === undefined) {
                        monthsSurvived = currPt['Overall Survival (Months)']

                    }
                    monthsSurvivedArray.push(monthsSurvived)
                } 
            }
        }

        monthsSurvivedArray = monthsSurvivedArray.map(element => parseFloat(element));
        monthsSurvivedArray.sort((a, b) => a - b)

        const totalNumPts = monthsSurvivedArray.length
        for (var i = 0; i < monthsSurvivedArray.length; i++) {
            // y value
            var remaindingPercentOfPts = (totalNumPts - i - 1) / totalNumPts

            // x value
            var currMonth = monthsSurvivedArray[i]

            // add to plotting array
            monthsSurvivedPlotting.push({x: currMonth, y: remaindingPercentOfPts})
        }

        setPlottingPoints(monthsSurvivedPlotting)
    }, [clinicalData])

    const data = {
        datasets: [
            {
                label: "Overall Survival",
                data: plottingPoints,
                backgroundColor: 'black',
            }
        ]
    }
    
    


    return (

            <div class = "cbioPortalLeftTile" style={{ margin: "5%", border: "1px solid black", paddingTop: "5%", overflow: "hidden" }}>
                <div>
                    <div id="cbioPortalTableDiv" style={{margin: "3%"}}></div>

                    <div id = "cbioPortalPlots" style={{marginLeft: "5%", marginRight: "5%"}}>
                        <p>Subtype specific Survival Plot</p>
                        <Scatter options={options} data = {data} />
                    </div>
                </div>
                <div>
                    <a href={pathToPtIDs} target="blank" style={{float:"left", width:"100%", margin: "1%"}}>
                        <button>Download PatientIDs</button>
                    </a>
                    <a href={pathToStringClinicalData} style={{float:"left", width: "100%", margin: "1%"}}>
                        <button>Download cBioPortal ClinicalData</button>
                    </a>
                </div>
                  
            </div>

    )
}