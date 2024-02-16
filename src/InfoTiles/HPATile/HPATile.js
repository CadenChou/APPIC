import React, { useEffect, useState, useContext, useMemo } from 'react';
import AppContext from '../../services/AppContext';


export default function HPATile() {
    const context = useContext(AppContext);
    const [ensemblGeneId, setEnsemblGeneId] = useState(null);

    useEffect(() => {
        async function getEnsemblGeneId(geneName) {
            try {
                const url = `https://rest.ensembl.org/lookup/symbol/homo_sapiens/${geneName}?expand=1`;
                const response = await fetch(url, {method: 'GET', headers: { 'Content-Type': 'application/json' } });
                const data = await response.json();
                setEnsemblGeneId(data.id);
                return data.id;
            } catch (error) {
                console.log("Error fetching Ensemble ID: " + error)
            }
        }
        getEnsemblGeneId(context.focusedNode);
        console.log(context.focusedNode)
        console.log(ensemblGeneId)
    }, [context.focusedNode]);

    
    return (
        <div style={{border: "1px solid black", resize: 'both' }}>
            <div class="leftTiles">
                <p style={{fontSize:"2vh"}}>Click on a protein node. Please wait for the iFrame to load</p>
                <iframe id="inlineFrameExample"
                    title="Inline Frame Example"
                    width="100%"
                    height="100%"
                    style={{ transform: 'scale(1)', height: "72vh" }}
                    src={`https://www.proteinatlas.org/${ensemblGeneId}-${context.focusedNode}`}
                >
                </iframe>
            </div>
        </div>
    )
}
