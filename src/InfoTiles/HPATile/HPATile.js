import React, { useEffect, useState, useContext, useMemo } from 'react';
import AppContext from '../../services/AppContext';


export default function HPATile() {
    const context = useContext(AppContext);
    const [ensemblGeneId, setEnsemblGeneId] = useState(null);

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
    )
}
