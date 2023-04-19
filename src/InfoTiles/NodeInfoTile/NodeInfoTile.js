import React, { useEffect, useState, useContext } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useNavigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Button, Menu, MenuItem, Typography } from '@mui/material';
import AppContext from '../../services/AppContext';


export default function NodeInfoTile() {
    const context = useContext(AppContext);
    const [proteinInfo, setProteinInfo] = useState(null);
    const [ensemblGeneId, setEnsemblGeneId] = useState(null);
    // Options (if implementing with strings): GC (Gene card), HPA (Human Protein Atlas)
    const [currentAPI, setCurrentAPI] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        // async function getHGNCId(geneName) {
        //     const url = `https://cors-anywhere.herokuapp.com/https://rest.genenames.org/search/alias/${geneName}`;
        //     const response = await fetch(url, {
        //         headers: { 'Content-Type': 'application/json' },
        //     });
        //     const data = await response.json();
        //     if (data.response.numFound > 0) {
        //         const hgncId = data.response.docs[0].hgnc_id;
        //         // for debugging
        //         console.log("hgnc id: " + hgncId)
        //         return hgncId;
        //     } else {
        //         console.log('No HGNC ID found for gene: ' + geneName);
        //         return null;
        //     }
        // }
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

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (index) => {
        setCurrentAPI(index === 1);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    <script type="module" src="https://unpkg.com/x-frame-bypass"></script>
    return (
        <div className='col-md-6' style={{ width: "100%"}}>
            {/* <AppBar position="static">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick} color="inherit">
                    <Typography>Select your API here</Typography>
                </Button>
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={() => handleMenuItemClick(1)}>Human Protein Atlas</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick(0)}>HGNC</MenuItem>
                </Menu>
            </AppBar> */}
            
            <div style = {{margin: "5%", border: "1px solid black"}}>
                <div class = "leftTiles">
                    <iframe id="inlineFrameExample"
                        title="Inline Frame Example"
                        width="100%"
                        height="100%"
                        style={{ transform: 'scale(1)', height: "50vh"}}
                        src={`https://www.proteinatlas.org/${ensemblGeneId}-${context.focusedNode}`}
                    >
                    </iframe>
                </div>
            </div>

            <div style = {{margin: "5%", border: "1px solid black", paddingTop: "5%"}}>
                <div class = "leftTiles">
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