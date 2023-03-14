import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'
import { useCallback } from "react";


export default function LandingPage() {
    const navigate = useNavigate();


    return (
        <div className='parent'>

            <div className='layout'>
                <h1>APPIC</h1>
                <p>Protein to Protein Interactions, Visualized</p>
                <Button
                    variant='contained'
                    onClick={() => {
                        navigate('/body-diagram');
                    }}
                >Start</Button>
            </div>
        </div>
    )
}
