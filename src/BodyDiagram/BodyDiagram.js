import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography, Modal, Menu, MenuItem, AppBar } from '@mui/material'

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

    const [items, setItems] = useState([
        {
            name: 'bladder',
            image: './images/bladder.png',
            imageWidth: '100%',
            subtypeNames: [
                "Cell2017_nonPapillary",
                "Cell2017_papillary",
                "Nature2014_papillary",
                "C35",
                "C91",
                "C145",
                "C271",
                "C369"
            ],
        },
        {
            name: 'brain',
            image: './images/brain_real.png',
            imageWidth: '100%',
            subtypeNames: [
                "gbm_subgrouping_C15",
                "gbm_subgrouping_C68",
                "gbm_subgrouping_C120"
            ],
        },
        {
            name: 'breast',
            image: './images/breast.png',
            imageWidth: '100%',
            subtypeNames: [
                "brca_mmr_deficient",
                "brca_mmr_intact",
                "brca_ductal_C106",
                "brca_ductal_C143",
                "brca_lobular_C16",
                "brca_lobular_C234",
                "brca_claudin-low_subgrouping_C15",
                "brca_claudin-low_subgrouping_C145",
                "brca_claudin-low_subgrouping_C180"
            ],
        },
        {
            name: 'colon and colorectal',
            image: './images/colon.png',
            imageWidth: '60%',
            subtypeNames: ["CRC_CIN_CIN_GS_MSI", "CRC_GS_CIN_MSI_GS", "CRC_MSI_CIN_GS_MSI", "mutatedbraf", "metastatic", "nonmetastatic"],
        },
        {
            name: 'gallbladder',
            image: './images/gallbladder.png',
            imageWidth: '100%',
            subtypeNames: ["cholangiocarcinoma"],
        },
        {
            name: 'lung',
            image: './images/lung.png',
            imageWidth: '100%',
            subtypeNames: [
                "Adenocarcinoma_acinar_VSbronchioloalverolar",
                "Adenocarcinoma_acinar_VSpapillary",
                "Squamous_basaloid",
                "Squamous_papillary",
                "luad_subgrouping_C28",
                "luad_subgrouping_C81",
                "luad_subgrouping_C151",
                "luad_subgrouping_C212",
                "luad_subgrouping_C257",
                "luad_subgrouping_C294"

            ],
        },
        {
            name: 'ovarian',
            image: './images/ovaries.png',
            imageWidth: '100%',
            subtypeNames: [
                "OCTop100C15",
                "OCTop100C145",
                "OCTop100C196",
                "OCTop100C246"

            ],
        },
        {
            name: 'pancreas',
            image: './images/pancreas.png',
            imageWidth: '100%',
            subtypeNames: ["pancreaticAdenocarcinoma"],
        },
        {
            name: 'prostate',
            image: './images/prostate.png',
            imageWidth: '100%',
            subtypeNames: ["erg", "spop"],
        },
        {
            name: 'thyroid',
            image: './images/thyroid.png',
            imageWidth: '100%',
            subtypeNames: ["follicular", "papillary"],
        }
    ]);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (subtype) => {
        navigate('/PPI-graph', { state: { organName: focusedOrgan.name, subtype: subtype } });
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(anchorEl)
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
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
                                onClick={(e) => {
                                    // handleOpen();
                                    handleMenuClick(e);
                                    setFocusedOrgan(item);
                                }} 
                                // onClick={handleMenuClick}
                                />
                        </motion.div>
                        <h4>{item.name}</h4>
                        <AppBar position="static">
                            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                {focusedOrgan.subtypeNames && focusedOrgan.subtypeNames.map((subtype) => (
                                    <MenuItem onClick={() => handleClick(subtype)}>{subtype}</MenuItem>
                                ))}
                            </Menu>
                        </AppBar>
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
