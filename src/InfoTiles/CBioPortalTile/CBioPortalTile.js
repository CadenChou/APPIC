import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Button, Menu, MenuItem, Typography } from '@mui/material';
import AppContext from '../../services/AppContext';
import "./CBioPortalTile.css";
// import cbioportalImage from '../../../public/masterData/bladder/Cell2017_nonPapillary/KM_Plot__test.svg';


export default function NodeInfoTile() {

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
        var currPatientIDArray = currFile.split("\r\n") //split by line

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



    <script type="module" src="https://unpkg.com/x-frame-bypass"></script>
    return (
        <div className='col-md-6' style={{ width: "100%" }}>
            
            
            <p class = "tileInfo">{data}</p>

        </div>
    )
}