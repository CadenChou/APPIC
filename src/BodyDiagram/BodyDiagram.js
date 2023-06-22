import React, { useEffect, useState, useContext } from 'react';
//import { motion } from 'framer-motion';
import {AnimatePresence, motion} from "framer-motion/dist/framer-motion";
import { useNavigate } from 'react-router-dom';
import AppContext from '../services/AppContext';
import { makeStyles } from '@mui/material/styles';
import { getSubtypeData } from '../subtypeData/subtypeData';

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

    // Gets the subtype data from the subtypeData file
    const subtypes = getSubtypeData();

    const [focusedSubtype, setFocusedSubtype] = useState();
    const [focusedOrgan, setFocusedOrgan] = useState(
        {
            name: '',
            image: '',
            imageWidth: '',
            subtypeData: [],
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
        setFocusedSubtype(subtype)
        // We don't want to navigate to a force graph for organs for which we have no data
        if (subtype.internalName !== "Coming Soon") {
            navigate('/PPI-graph', { state: { organName: focusedOrgan.name, subtype: subtype } });
        }
    };

    // For hover-over-subtype popover
    const [anchorElPopover, setAnchorElPopover] = useState(null);

    const handlePopoverHover = (event, subtype) => {
        // Update the context with organ name and subtype (see app.js)
        setFocusedSubtype(subtype)
        // We don't want to activate the pop-up for organs for which we have no data
        if (subtype.internalName !== "Coming Soon") {
            setAnchorElPopover(event.currentTarget);
        }
    };

    const handlePopoverClose = () => {
        setAnchorElPopover(null);
    };

    const PopoverOpen = Boolean(anchorElPopover);



    return (
        <div>
            <h1 style={{ marginTop: '2vh' }}>Cancer Types</h1>
            <h4 style={{ marginBottom: '4vh', }}>(Datasets extracted from CBioPortal)</h4>
            <Grid container rowSpacing={{ xs: 6, sm: 12, md: 18 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {subtypes.map((item) => (
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
                                {focusedOrgan.subtypeData && focusedOrgan.subtypeData.map((subtype) => (
                                    <div>
                                        <div onMouseEnter={(e) => handlePopoverHover(e, subtype)} onMouseLeave={handlePopoverClose}>
                                            <MenuItem onClick={() => handleSubtypeClick(subtype)}>
                                                {subtype.displayName}
                                            </MenuItem>
                                        </div>
                                        <Popover
                                            id="mouse-over-popover"
                                            sx={{
                                                pointerEvents: 'none',
                                            }}
                                            open={PopoverOpen && focusedSubtype.internalName === subtype.internalName}
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
                                                            {subtype.displayName}
                                                        </Typography>
                                                        <div style={{ padding: '1vh' }} />
                                                        <Grid container spacing={2} >
                                                            <Box style={{ paddingLeft: '1.5vw' }}>
                                                                <Box textAlign="left">
                                                                    {/* <Typography gutterBottom fontSize='115%' component="div">
                                                                        Dataset (as it appears in cBioPortal)
                                                                    </Typography> */}
                                                                    <Typography fontSize='102%' fontWeight='bold'>
                                                                        {subtype.dataset}
                                                                    </Typography>
                                                                </Box>
                                                                <div style={{ padding: '1.5vh' }} />
                                                                <Box textAlign="left">
                                                                    <Typography gutterBottom fontSize='115%' component="div">
                                                                        Number of patients in cluster
                                                                    </Typography>
                                                                    <Typography fontSize='102%' fontWeight='bold'>
                                                                        {subtype.patients}
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