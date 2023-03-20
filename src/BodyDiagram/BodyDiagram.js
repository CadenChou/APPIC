import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
            name: 'thyroid',
            image: 'https://cdn4.iconfinder.com/data/icons/64px-organs/64/097_thyroid-gland-human-organ-endocrine-system-512.png',
            imageWidth: '35%',
            subtypeNames: ["follicular", "papillary"],
        },
        {
            name: 'prostate',
            image: 'https://cdn-icons-png.flaticon.com/512/4073/4073836.png',
            imageWidth: '35%',
            subtypeNames: ["erg", "spop"],
        },
        {
            name: 'pancreas',
            image: 'https://cdn-icons-png.flaticon.com/512/3032/3032762.png',
            imageWidth: '35%',
            subtypeNames: ["pancreaticAdenocarcinoma", "cholangiocarcinoma"],
        },

        {
            name: 'lung',
            image: 'https://img.freepik.com/premium-vector/outline-lungs-with-bronchi-isolated-white-icon-design-element_337410-2304.jpg?w=2000',
            imageWidth: '40%',
            subtypeNames: [
                "Adenocarcinoma_acinar_VSbronchioloalverolar", 
                "Adenocarcinoma_acinar_VSpapillary", 
                "Squamous_basaloid", 
                "Squamous_papillary", 
                "Papillary",
                "luad_subgrouping_C28",
                "luad_subgrouping_C81",
                "luad_subgrouping_C151",
                "luad_subgrouping_C212",
                "luad_subgrouping_C257",
                "luad_subgrouping_C294"

            ],
        },

        {
            name: 'colon and colorectal',
            image: 'https://media.istockphoto.com/id/1291717088/vector/human-intestinal-illustration.jpg?s=612x612&w=0&k=20&c=tHDohjHAi8afeiH_Tf9OeQjxyM0EjTtfSg40r7j8Y_M=',
            imageWidth: '45%',
            subtypeNames: ["CRC_CIN_CIN_GS_MSI", "CRC_GS_CIN_MSI_GS", "CRC_MSI_CIN_GS_MSI", "mutatedbraf", "metastatic", "nonmetastatic"],
        },
        {
            name: 'breast',
            image: 'https://www.researchgate.net/profile/Vasileios-Vavourakis/publication/289525402/figure/fig1/AS:319193506435072@1453113070447/Adult-female-breast-anatomy-illustration.png',
            imageWidth: '40%',
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
            name: 'bladder',
            image: 'https://cdn3.iconfinder.com/data/icons/internal-organs-linear-outline/300/01416995Untitled-3-512.png',
            imageWidth: '40%',
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
            name: 'glioblastoma',
            image: '',
            imageWidth: '40%',
            subtypeNames: [
                "gbm_subgrouping_C15",
                "gbm_subgrouping_C68",
                "gbm_subgrouping_C120"
            ],
        }
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
