import React, { useEffect, useState, useContext, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useNavigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Button, Menu, MenuItem, Typography, Box } from '@mui/material';
import AppContext from '../../services/AppContext';


export default function NodeInfoTile() {
    const context = useContext(AppContext);
    const [proteinInfo, setProteinInfo] = useState(null);
    const [ensemblGeneId, setEnsemblGeneId] = useState(null);
    // Options (if implementing with strings): GC (Gene card), HPA (Human Protein Atlas)
    const [currentAPI, setCurrentAPI] = useState("HPA");
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        async function getEnsemblGeneId(geneName) {
            const url = `https://rest.ensembl.org/lookup/symbol/homo_sapiens/${geneName}?expand=1`;
            const response = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();
            setEnsemblGeneId(data.id);
            return data.id;
        }
        getEnsemblGeneId(context.focusedNode);
        console.log(context.focusedNode)
        console.log(ensemblGeneId)
    }, [context.focusedNode]);

    // const handleMenuClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleMenuItemClick = (api) => {
    //     context.setCurrAPI(api)
    //     setCurrentAPI(api);
    //     setAnchorEl(null);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const handleAPIButtonClick = (api) => {
        context.setCurrAPI(api)
        setCurrentAPI(api);
    }


    return (
        <div>
            {/* Alternative approach to info tile navigation (dropdown menu) */}

            {/* <AppBar position="static">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick} color="inherit">
                    <Typography>Select your API here</Typography>
                </Button>
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={() => handleMenuItemClick("HPA")}>Human Protein Atlas</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("HGNC")}>HGNC</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("NONE")}>None</MenuItem>
                </Menu>
            </AppBar> */}
            <Box sx={{ display: 'flex', flexDirection: 'row',}}>
                <Button onClick={() => handleAPIButtonClick("HPA")} variant='contained'>
                    <Typography>Human Protein Atlas</Typography>
                </Button>
                <Box sx={{paddingRight: 3}} />
                <Button onClick={() => handleAPIButtonClick("HGNC")} variant='contained'>
                    <Typography>HGNC</Typography>
                </Button>
                <Box sx={{paddingRight: 3}} />
                <Button onClick={() => handleAPIButtonClick("NONE")} variant='contained'>
                    <Typography>None</Typography>
                </Button>
            </Box>
            {currentAPI === "HPA" ?
                <div style={{ margin: "5%", border: "1px solid black", resize: 'both' }}>
                    <div class="leftTiles">
                        <iframe id="inlineFrameExample"
                            title="Inline Frame Example"
                            width="100%"
                            height="100%"
                            style={{ transform: 'scale(1)', height: "50vh" }}
                            src={`https://www.proteinatlas.org/${ensemblGeneId}-${context.focusedNode}`}
                        >
                        </iframe>
                    </div>
                </div>
                : currentAPI === "HGNC" ?
                    <div style={{ margin: "5%", border: "1px solid black", paddingTop: "5%" }}>
                        <div class="leftTiles">
                            <iframe
                                is="x-frame-bypass"
                                id="inlineFrameExample"
                                title="Inline Frame Example"
                                width="105%"
                                height="100%"
                                style={{ transform: 'scale(0.9)', height: "50vh" }}
                                src={`https://www.genenames.org/tools/search/#!/?query=${context.focusedNode}`}
                            >
                            </iframe>
                        </div>
                    </div>
                    :
                    <div />
            }
            {/* 
            <div style = {{margin: "5%", border: "1px solid black", paddingTop: "5%"}}>
                <div class = "leftTiles">
                    <iframe
                        src="iframe_cbioportal.php" 
                    >
                    </iframe>
                </div>
            </div> */}

        </div>
    )
}