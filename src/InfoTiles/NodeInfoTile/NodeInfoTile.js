import React, { useEffect, useState, useMemo, useContext } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useNavigate, useLocation } from 'react-router-dom';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from '@mui/material';
import AppContext from '../../services/AppContext';

export default function NodeInfoTile() {
    const context = useContext(AppContext);
    const [proteinInfo, setProteinInfo] = useState(null);
    const [ensemblGeneId, setEnsemblGeneId] = useState(null);
    // Options (if implementing with strings): GC (Gene card), HPA (Human Protein Atlas)
    const [currentAPI, setCurrentAPI] = useState(false);

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


    return (
        <div className='col-md-6'>
            <Button
                variant='contained'
                onClick={() => {
                    setCurrentAPI(!currentAPI);
                }}>
                Click to switch APIs
            </Button>
            {currentAPI ?
                <div style={{ height: "70%" }}>
                    <iframe id="inlineFrameExample"
                        title="Inline Frame Example"
                        width="105%"
                        height="110%"
                        style={{ transform: 'scale(0.9)', alignSelf: "left" }}
                        src={`https://www.proteinatlas.org/${ensemblGeneId}-${context.focusedNode}`}
                    >
                    </iframe>
                </div>
                :
                <div style={{ height: "70%" }}>
                    <iframe id="inlineFrameExample"
                        title="Inline Frame Example"
                        width="100%"
                        height="100%"
                        style={{ transform: 'scale(0.9)' }}
                        src={`https://www.genecards.org/cgi-bin/carddisp.pl?gene=${context.focusedNode}`}
                    >
                    </iframe>
                </div>
            }
        </div>
    )
}


