import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
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


const theme = createTheme();

export default function About() {

    // particle background
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        console.log(container);
    }, []);


    // for "API" and "Libraries" Modal
    const [openModalAPI, setOpenModalAPI] = useState(false);
    const handleOpenAPI = () => setOpenModalAPI(true);
    const handleCloseAPI = () => setOpenModalAPI(false);
    // for "Citations" Modal
    const [openModalCit, setOpenModalCit] = useState(false);
    const handleOpenCit = () => setOpenModalCit(true);
    const handleCloseCit = () => setOpenModalCit(false);
    const [currCitation, setCurrCitation] = useState('');


    const reactImg = require('./logo192.png')

    const linkCitationData = [
        {
            text: 'Proteinarium',
            url: 'https://github.com/alperuzun/Proteinarium/',
            citationText: 'Armanious D, Schuster J, Tollefson GA, Agudelo A, DeWan AT, Istrail S, Padbury J, Uzun A. Proteinarium: Multi-sample protein-protein interaction analysis and visualization tool. Genomics. 2020 Nov;112(6):4288-4296. doi: 10.1016/j.ygeno.2020.07.028. Epub 2020 Jul 20. PMID: 32702417; PMCID: PMC7749048.',
            picUrl: 'https://pbs.twimg.com/media/Ek78dtAWAAERbwX.jpg',
        },
        {
            text: 'Human Protein Atlas',
            url: 'https://www.proteinatlas.org/',
            citationText: 'Uhlén M et al., Tissue-based map of the human proteome. Science (2015) PubMed: 25613900 DOI: 10.1126/science.1260419',
            picUrl: 'https://www.science.org/do/10.1126/organization.2482216/linkedlogo/hpa_logo.jpg',
        },
        {
            text: 'HGNC',
            url: 'https://www.genenames.org/',
            citationText: 'HGNC, HUGO Gene Nomenclature Committee. (2023, April). HGNC Database [Online]. European Molecular Biology Laboratory, European Bioinformatics Institute (EMBL-EBI), Wellcome Genome Campus, Hinxton, Cambridge CB10 1SD, United Kingdom. Retrieved from www.genenames.org',
            picUrl: 'https://www.haem.cam.ac.uk/files/2021/11/HGNC.jpg',
        },
        {
            text: 'g:Profiler',
            url: 'https://biit.cs.ut.ee/gprofiler/',
            citationText: 'Uku Raudvere, Liis Kolberg, Ivan Kuzmin, Tambet Arak, Priit Adler, Hedi Peterson, Jaak Vilo: g:Profiler: a web server for functional enrichment analysis and conversions of gene lists (2019 update) Nucleic Acids Research 2019; doi:10.1093/nar/gkz369 [PDF].',
            picUrl: 'https://galaxyproject.org/assets/media/2019-11-20-gProfiler.png',
        },
        {
            text: 'CLUE',
            url: 'https://clue.io/',
            citationText: 'Subramanian A, et al. A Next Generation Connectivity Map: L1000 Platform And The First 1,000,000 Profiles. Cell. 2017/12/1. 171(6):1437–1452',
            picUrl: 'https://pbs.twimg.com/profile_images/697448119869575168/fdS991Oi_400x400.png',
        }
    ];

    const modalBoxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "65%",
        bgcolor: 'background.paper',
        border: '1px solid #808080',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className = 'parent'>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#FFFFFF",
                        },
                    },
                    fullScreen: {
                        // enable: true,
                        zIndex: -1
                    },
                    fpsLimit: 120,
                    interactivity: {

                    },
                    particles: {
                        color: {
                            value: "#89CFF0",
                        },
                        links: {
                            color: "#808080",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: false,
                        },
                        move: {
                            directions: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 3,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 5, max: 10 },
                        },
                    },
                    detectRetina: true,
                }}
            />
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                    <Container maxWidth="md">
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            About APPIC
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Atlas for Protein Protein Interactions in Cancer
                        </Typography>
                        <Typography variant = "h8" align="left" color="text.secondary" paragraph>
                            <div class='aboutContent' style={{margin:"5%"}}>
                                <b>Problem:</b> cancer is a complex disease in which protein-protein interactions likely play a role in driving the disease phenotype. 
                                Cancer types are different depending on the tissue they affect, but a cancer type within one tissue type can likely be further characterized into subtypes. 
                                Understanding more about the protein-protein interactions of cancer subtypes can lead to more targeted therapeutic and mechanistic research.  
                            </div>
                            <div class='aboutContent' style={{margin:"5%"}}>    
                                <b>Purpose:</b> APPIC is a tool that aims to characterize the protein-protein interactions of several cancer subtypes across multiple tissues. 
                                Publicly available patient genomic data from cBioPortal serves as the input to define these cancer subtypes using the tool, Proteinarium.
                                The protein-protein interactions of cancer subtypes are then visualized here on APPIC and connected to several databases to provide relevant clinical and biological context to aid in research efforts. 
                            </div>    
                        
                            <div class='aboutContent' style={{margin:"5%"}}>
                                <b>Features: </b>
                                <br></br>
                                1. Visualization - protein-protein interactions of cancer subtypes are displayed as network diagrams
                                <br></br>
                                2. Databases - APPIC interfaces with several databases. 
                                    <ul>
                                        <li>Human Protein Atlas - after clicking on a protein in the network diagram, it provides biological context</li>
                                        <li>HGNC - after clicking on a protein in the network diagram, it provides biological context</li>
                                        <li>gProfiler - uses the list of proteins in the network diagram and provides relevant biological pathways</li>
                                        <li>Clue.io - uses the list of proteins in the network diagram and provides existing therapeutic drugs and their targets</li>
                                        <li>cBioPortal - uses the patient IDs of the cancer subtype and provides survival rates</li>
                                    </ul>
                            </div>
                            <div class='aboutContent' style={{margin:"5%"}}>
                                <b>Data:</b> patient RNAseq data is from publically available studies from cBioPortal. 
                                The tool, Proteinarium, takes the transcriptomic data of patients for one cancer type and defines multiple subtypes and the protein-protein interactions of those subtypes. 
                                Additionally, Proteinarium provides the patient IDs of each subtype. 
                                The protein-protein interaction data is used to build the network diagrams and serve as inputs to the various databases (Human Protein Atlas, HGNC, gProfiler, Clue.io).
                                The patient IDs are used to pull the specific clinical data from cBioPortal. 
                            </div>
                            <div class='aboutContent' style={{margin:"5%"}}>
                                <b>Instructions:</b> click <a href="userGuide.pdf" target="blank">here</a> for a downloadable guide.
                            </div>
                            
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={handleOpenAPI}>Web Development Notes</Button>
                            <Modal
                                open={openModalAPI}
                                onClose={handleCloseAPI}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={modalBoxStyle}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                APIs Implemented
                                            </Typography>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '1vh' }}>
                                                <img
                                                    src='https://www.science.org/do/10.1126/organization.2482216/linkedlogo/hpa_logo.jpg'
                                                    style={{ width: '30%' }}
                                                />
                                                <div style={{ padding: '1vw' }}></div>
                                                <img
                                                    src='https://www.haem.cam.ac.uk/files/2021/11/HGNC.jpg'
                                                    style={{ width: '30%' }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '1vh' }}>
                                                <img
                                                    src='https://galaxyproject.org/assets/media/2019-11-20-gProfiler.png'
                                                    style={{ width: '30%' }}
                                                />
                                                <div style={{ padding: '1vw' }}></div>
                                                <img
                                                    src='https://pbs.twimg.com/profile_images/697448119869575168/fdS991Oi_400x400.png'
                                                    style={{ width: '30%' }}
                                                />
                                            </div>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                APPIC implements the following APIs:
                                                Human Protein Atlas, Hugo Gene Nomenclature Committee, g:Profiler, CLUE
                                            </Typography>

                                        </div>
                                        <div style={{ padding: '2vw' }}></div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Libraries Utilized
                                            </Typography>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '1vh' }}>
                                                <img
                                                    src={reactImg}
                                                    style={{ width: '35%' }}
                                                />
                                                <div style={{ padding: '1vw' }}></div>
                                                <img
                                                    src={'https://pbs.twimg.com/media/Ek78dtAWAAERbwX.jpg'}
                                                    style={{ width: '35%' }}
                                                />
                                            </div>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                Libraries used for front-end development:
                                                ReactJS, Material UI, React Force Graph, and tsParticles.
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                The technologies used for generating protein-protein interaction data:
                                                Proteinarium
                                            </Typography>
                                        </div>
                                    </div>
                                </Box>

                            </Modal>
                        </Stack>
                    </Container>
                <div style={{padding: '2.5vh'}}></div>
                <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '5vh', justifyContent: 'center' }}>
                    {/* <div>
                        <Typography
                            variant="h4"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Links to Resources
                        </Typography>
                        <div>
                            {linkCitationData.map((link, index) => (
                                <Typography
                                    key={index}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.text}
                                    </a>
                                </Typography>
                            ))}
                        </div>
                    </div>
                    <div style={{ padding: '5vw' }} /> */}
                    <div>
                        <Typography
                            variant="h4"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Citations and Links to Resources
                        </Typography>
                        <div>
                            {linkCitationData.map((link, index) => (
                                <Typography
                                    key={index}
                                    onClick={() => {
                                        handleOpenCit()
                                        // For use in the modal for citations
                                        setCurrCitation(link)
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                                        {link.text}
                                    </div>
                                </Typography>
                            ))}
                        </div>
                        <Modal
                            open={openModalCit}
                            onClose={handleCloseCit}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalBoxStyle}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        maxWidth: '90vw', // Limit width to 90% of the viewport width
                                        maxHeight: '90vh', // Limit height to 90% of the viewport height
                                        overflow: 'auto', // Add scrollbars if content overflows
                                    }}
                                >
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Citation for {currCitation.text}
                                    </Typography>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            padding: '1vh',
                                        }}
                                    >
                                        <img src={currCitation.picUrl} style={{ width: '30%' }} />
                                    </div>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        {currCitation.citationText}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <a href={currCitation.url} target="_blank" rel="noopener noreferrer">
                                            Link to {currCitation.text}
                                        </a>
                                    </Typography>
                                    <div
                                        style={{
                                            maxWidth: '90%',
                                            overflow: 'auto',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Image URL: {currCitation.picUrl}
                                        </Typography>

                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </main>
        </ThemeProvider>
        </div>
    );
}