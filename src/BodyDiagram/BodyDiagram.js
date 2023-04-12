import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import pancreas_img from '../images/pancreas.png'
import gallbladder_img from '../images/gallbladder.png'
import bladder_img from '../images/bladder.png'
import breast_img from '../images/breast.png'
import colon_img from '../images/colon.png'
import lung_img from '../images/lung.png'
import prostate_img from '../images/prostate_real.png'
import brain_img from '../images/brain_real.png'
import ovaries_img from '../images/ovaries.png'
import thyroid_img from '../images/thyroid.png'


export default function BodyDiagram() {
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const [focusedOrgan, setFocusedOrgan] = useState(
        {
            name: '',
            image: '',
            imageWidth: '',
        });
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    // TODO: CHANGE TO THESE TYPES OF CANCER: 
    // thyroid carcinoma, lung squamous cell carcinoma, cholangiocarcinoma (gallbladder), colorectal adenocarcinoma, breast cancer, prostate adenocarcinoma, bladder cancer, pancreatic adenocarcinoma
    // const pancreas = require(pancreas_img)
    // const gall = require(gallbladder_img)
    // const breast = require('../images/breast.png')
    // const bladder = require('..images/bladder.png')
    // const thyroidURL = require('..images/thyroid.png')
    // const prostate = require('..images/prostate_real.png')
    // const lung = require('..images/lung.png')
    // const Ovaries = require('..images/ovaries.png')
    // const brain = require('..images/brain_real.png')
    // const colon = require('..images/colon.png')

    const [items, setItems] = useState([
        {
            name: 'thyroid',
            image: thyroid_img,
            imageWidth: '130%',
            subtypeNames: ["follicular", "papillary"],
        },
        {
            name: 'Prostate',
            image: prostate_img,
            imageWidth: '100%',
            subtypeNames: ["ERG", "SPOP"],
        },
        {
            name: 'Pancreas',
            image: pancreas_img,
            imageWidth: '100%',
            subtypeNames: ["Adenocarcinoma", "Cholangiocarcinoma"],
        },

        {
            name: 'Lung',
            image: lung_img,
            imageWidth: '100%',
            subtypeNames: ["Acinar", "Bronchioalveolar", "Papillary"],
        },
        {
            name: 'Gallbladder',
            image: gallbladder_img,
            imageWidth: '100%',
            subtypeNames: ["mutatedbraf", "metastatic", "nonmetastatic"],
        },
        {
            name: 'Brain',
            image: brain_img,
            imageWidth: '100%',
            subtypeNames: ["CIN", "GS", "MSI"],
        },
        {
            name: 'breast',
            image: breast_img,
            imageWidth: '100%',
            subtypeNames: ["brca_mmr_deficient", "brca_mmr_intact"],
        },
        {
            name: 'Bladder',
            image: bladder_img,
            imageWidth: '100%',
            subtypeNames: ["Papillary", "Non-Papillary"],
        },
        {
            name: 'Ovaries',
            image: ovaries_img,
            imageWidth: '100%',
            subtypeNames: ["Basaloid", "Papillary"],
        },
        {
            name: 'Colon',
            image: colon_img,
            imageWidth: '80%',
            subtypeNames: ["Basaloid", "Papillary"],
        },
    ]);

    const handleClick = (subtype) => {
        navigate('/PPI-graph', { state: { organName: focusedOrgan.name, subtype: subtype} });
    };


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "40%",
        bgcolor: 'background.paper',
        border: '1px solid #808080',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <h1 style={{ marginBottom: '9vh', marginTop: '2vh' }}>Cancer Types</h1>
            <Grid container rowSpacing={{ xs: 6, sm: 12, md: 18 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {items.map((item) => (
                    // Change the number foo in xs={foo} so that 12 / foo is the number of rows you want
                    <Grid item xs={2.4} key={item.name}>
                        <motion.div whileHover={{ scale: 1.08 }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: item.imageWidth }}
                                onClick={() => {
                                    // handleClick(item.name);
                                    handleOpen();
                                    setFocusedOrgan(item);
                                }} />
                        </motion.div>
                        <h4>{item.name}</h4>
                    </Grid>
                ))}
            </Grid>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ paddingBottom: '0.8vh' }}>
                            Choose a {focusedOrgan.name} Cancer Subtype
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1em' }}>
                        <img
                            src={focusedOrgan.image}
                            alt={focusedOrgan.name}
                            style={{ width: focusedOrgan.imageWidth }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '2em' }}>
                        {focusedOrgan.subtypeNames && focusedOrgan.subtypeNames.map((subtype) => (
                            <Button
                                type="submit"
                                variant='contained'
                                size='large'
                                style={{ fontSize: '1vw', marginLeft: '1.2em', marginRight: '1.2em' }}
                                color="primary"
                                onClick={() => handleClick(subtype)}
                            >
                                {subtype}
                            </Button>
                        ))}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
