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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function About() {
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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
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
                </Box>
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
    );
}