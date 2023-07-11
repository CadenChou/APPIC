import React, { useEffect, useState, useContext, useMemo } from 'react';
import AppContext from '../../services/AppContext';


export default function HGNCTile() {
    const context = useContext(AppContext);
    


    return (
        <div style={{border: "1px solid black", paddingTop: "0%" }}>
            <div class="leftTiles">
            <p style={{fontSize:"2vh"}}>Click on a protein node</p>
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
    )
}
