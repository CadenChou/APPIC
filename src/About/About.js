import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Modal, Menu, MenuItem } from '@mui/material'
import { useState } from 'react';
import './logo192.png'
import { useCallback } from "react";
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function About() {
    // For "Tech" Modal
    const [openModal1, setOpenModal1] = useState(false);
    const handleOpen1 = () => setOpenModal1(true);
    const handleClose1 = () => setOpenModal1(false);
    // for "API" Modal
    const [openModal2, setOpenModal2] = useState(false);
    const handleOpen2 = () => setOpenModal2(true);
    const handleClose2 = () => setOpenModal2(false);

    const reactImg = require('./logo192.png')
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    const modalBoxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "35%",
        bgcolor: 'background.paper',
        border: '1px solid #808080',
        boxShadow: 24,
        p: 4,
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="md">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            About APPIC
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            APPIC is a web application, designed to function like an atlas for cancers and their subtypes. Users can select a
                            tissue of interest (ie. “Thyroid”), then select an available cancer subtype (ie. “Follicular” or “Papillary”). APPIC
                            then generates a network diagram of the protein-protein interactions as well as displays aggregated results from
                            external databases.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={handleOpen1}>More: Technologies utilized</Button>
                            <Modal
                                open={openModal1}
                                onClose={handleClose1}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={modalBoxStyle}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Technologies Utilized
                                        </Typography>
                                        <img
                                            src={reactImg}
                                            style={{ width: '30%' }}
                                        />
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            The technologies used for front-end development:
                                            ReactJS, Material UI, and React Force Graph.
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            The technologies used for generating protein-protein interaction data:
                                            INSERT INSERT
                                        </Typography>
                                    </div>
                                </Box>
                            </Modal>
                            <Button variant="contained" onClick={handleOpen2}>More: APIs Implemented</Button>
                            <Modal
                                open={openModal2}
                                onClose={handleClose2}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={modalBoxStyle}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            APIs Implemented
                                        </Typography>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding:'1vh' }}>
                                            <img
                                                src='https://www.science.org/do/10.1126/organization.2482216/linkedlogo/hpa_logo.jpg'
                                                style={{ width: '30%' }}
                                            />
                                            <div style={{padding: '1vw'}}></div>
                                            <img
                                                src='https://www.haem.cam.ac.uk/files/2021/11/HGNC.jpg'
                                                style={{ width: '30%' }}
                                            />
                                        </div>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            APPIC implements the following APIs:
                                            Human Protein Atlas, Hugo Gene Nomenclature Committee, g:Profiler, CLUE
                                        </Typography>
                                    </div>
                                </Box>
                            </Modal>
                        </Stack>
                    </Container>
                </Box>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}