import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AppContext from '../services/AppContext';
import { makeStyles } from '@material-ui/core/styles';

import {
    Grid,
    Box,
    Button,
    Typography,
    Modal, Menu,
    MenuItem,
    AppBar,
    Popover,
    Card,
    CardMedia,
    CardContent,
    CardActions,

} from '@mui/material'



export default function BodyDiagram() {
    const navigate = useNavigate();
    const context = useContext(AppContext)

    const [focusedOrgan, setFocusedOrgan] = useState(
        {
            name: '',
            image: '',
            imageWidth: '',
            subtypeNames: [],
        });

    // For subtype menu
    const [anchorElMenu, setAnchorElMenu] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorElMenu(null);
    };

    const handleSubtypeClick = (subtype) => {
        // Update the context with organ name and subtype (see app.js)
        context.setOrganName(focusedOrgan.name)
        context.setSubtype(subtype)
        // We don't want to navigate to a force graph for organs for which we have no data
        if (subtype !== "Coming Soon") {
            navigate('/PPI-graph', { state: { organName: focusedOrgan.name, subtype: subtype } });
        }
    };

    // For hover-over-subtype popover
    const [anchorElPopover, setAnchorElPopover] = useState(null);

    const handlePopoverHover = (event, subtype) => {
        // Update the context with organ name and subtype (see app.js)
        context.setOrganName(focusedOrgan.name)
        context.setSubtype(subtype)
        // We don't want to activate the pop-up for organs for which we have no data
        if (subtype !== "Coming Soon") {
            setAnchorElPopover(event.currentTarget);
        }
    };

    const handlePopoverClose = () => {
        setAnchorElPopover(null);
    };

    const PopoverOpen = Boolean(anchorElPopover);

    const [items, setItems] = useState([
        {
            name: 'bladder',
            image: './images/bladder.png',
            imageWidth: '100%',
            subtypeNames: [
                /* New/Display names */
                // MSI High BLCA
                // MSI Low BLCA
                // Non-Papillary BLCA
                // Papillary BLCA

                /* Legacy/Internal Querying Naming */
                "blca_MSI-high",
                "blca_MSI-low",
                "nonpapillary cell2017",
                "papillary cell2017",

                // "papillary nature2014",

                /* Backend Naming */
                // "C35",
                // "C91",
                // "C145",
                // "C271",
                // "C369"
            ],
        },
        {
            name: 'brain',
            image: './images/brain_real.png',
            imageWidth: '100%',
            subtypeNames: [
                /* New/Display Names */

                'Coming Soon'

                /* Backend Naming */
                // "gbm_subgrouping_C15",
                // "gbm_subgrouping_C68",
                // "gbm_subgrouping_C120"
                
            ],
        },
        {
            name: 'breast',
            image: './images/breast.png',
            imageWidth: '100%',
            subtypeNames: [
                /* New/Display Names */
                // Ductal BRCA(1)
                // Ductal BRCA(2)
                // Lobular BRCA(1)
                // Lobular BRCA(2)
                // MMR Intact BRCA
                // MMR Deficient BRCA

                /* Legacy/Internal Querying Naming */
                "ductal C106",
                "ductal C143",
                "lobular C16",
                "lobular C234",
                "mmr intact",
                "mmr deficient",

                /* Backend Naming */
                // "brca_claudin-low_subgrouping_C15",
                // "brca_claudin-low_subgrouping_C145",
                // "brca_claudin-low_subgrouping_C180"
            ],
        },
        {
            name: 'colon and colorectal',
            image: './images/colon.png',
            imageWidth: '60%',
            subtypeNames: [
                /* New/Display Names */
                // BRAF-mutated CRC
                // CIN CRC
                // GS CRC
                // MSI CRC
                // Metastatic CRC
                // Non-Metastatic CRC

                /* Legacy/Internal Querying Naming */
                "mutated braf",
                "chromosomal instability",
                "genome stable",
                "microsatellite instability",
                "metastatic",
                "nonmetastatic"
            ],
        },
        {
            name: 'gallbladder',
            image: './images/gallbladder.png',
            imageWidth: '100%',
            subtypeNames: [
                /* New/Display Names */
                // CHOL

                /* Legacy/Internal Querying Naming */
                "cholangiocarcinoma"
            ],
        },
        {
            name: 'lung',
            image: './images/lung.png',
            imageWidth: '100%',
            subtypeNames: [
                /* New/Display Names */
                // Acinar LUAD (1)
                // Acinar LUAD (2)
                // Basaloid LUSC
                // Papillary LUSC

                /* Legacy/Internal Querying Naming */
                "LUAD bronchioloalverolar",
                "LUAD acinar papillary",
                "LUSC basaloid",
                "LUSC papillary",

                /* Backend Naming */
                // "luad_subgrouping_C28",
                // "luad_subgrouping_C81",
                // "luad_subgrouping_C151",
                // "luad_subgrouping_C212",
                // "luad_subgrouping_C257",
                // "luad_subgrouping_C294"

            ],
        },
        {
            name: 'ovarian',
            image: './images/ovaries.png',
            imageWidth: '100%',
            subtypeNames: [
                /* New/Display Names */

                
                'Coming Soon'

                /* Backend Naming */
                // "OCTop100C15",
                // "OCTop100C145",
                // "OCTop100C196",
                // "OCTop100C246"

            ],
        },
        {
            name: 'pancreas',
            image: './images/pancreas.png',
            imageWidth: '100%',
            subtypeNames: [
                /* New/Display Names */
                // PAAD

                /* Legacy/Internal Querying Naming */
                "adenocarcinoma"
            ],
        },
        {
            name: 'prostate',
            image: './images/prostate.png',
            imageWidth: '100%',
            subtypeNames: [
                /* New/Display Names */
                // ERG-mutated PRAD
                // SPOP-mutated PRAD

                /* Legacy/Internal Querying Naming */
                "erg",
                "spop"
            ],
        },
        {
            name: 'thyroid',
            image: './images/thyroid.png',
            imageWidth: '100%',
            subtypeNames: [
                /* New/Display Names */
                // Follicular THCA
                // Papillary THCA

                /* Legacy/Internal Querying Naming */
                "follicular",
                "papillary"
            ],
        }
    ]);


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
                                    handleMenuClick(e);
                                    setFocusedOrgan(item);
                                }}
                            />
                        </motion.div>
                        <h4>{item.name}</h4>
                        <AppBar position="static">
                            <Menu id="simple-menu" anchorEl={anchorElMenu} keepMounted open={Boolean(anchorElMenu)} onClose={handleMenuClose}>
                                {focusedOrgan.subtypeNames && focusedOrgan.subtypeNames.map((subtype) => (
                                    <div>
                                        <div onMouseEnter={(e) => handlePopoverHover(e, subtype)} onMouseLeave={handlePopoverClose}>
                                            <MenuItem onClick={() => handleSubtypeClick(subtype)}>
                                                {subtype}
                                            </MenuItem>
                                        </div>
                                        <Popover
                                            id="mouse-over-popover"
                                            sx={{
                                                pointerEvents: 'none',
                                            }}
                                            open={PopoverOpen}
                                            anchorEl={anchorElPopover}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            onClose={handlePopoverClose}
                                            disableRestoreFocus
                                        >
                                            <Card sx={{ maxWidth: 345 }}>
                                                <CardContent>
                                                    <Box style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <Typography gutterBottom variant='h5' component="div">
                                                            {context.subtype}
                                                        </Typography>
                                                        <div style={{ padding: '1vh' }} />
                                                        <Grid container spacing={2} >
                                                            <Box style={{ paddingLeft: '1.5vw' }}>
                                                                <Box textAlign="left">
                                                                    <Typography gutterBottom fontSize='100%' component="div">
                                                                        Dataset (as it appears in cBioPortal)
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        Lorem Ipsum
                                                                    </Typography>
                                                                </Box>
                                                                <div style={{ padding: '1.5vw' }} />
                                                                <Box textAlign="left">
                                                                    <Typography gutterBottom fontSize='100%' component="div">
                                                                        Number of patients in cluster
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        Lorem Ipsum
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Popover>
                                    </div>
                                ))}
                            </Menu>
                        </AppBar>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}