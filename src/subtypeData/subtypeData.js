import React from 'react'

// "dataset" and "patients" fields are used for the popup to represent Dataset (as it appears in cBioPortal) and Number of Patients in Cluster used to build network
const subtypes = [
        {
            name: 'bladder',
            image: './images/bladder.png',
            imageWidth: '100%',
            subtypeData: [
                {
                    displayName: 'MSI High BLCA',
                    internalName: 'blca_MSI-high',
                    dataset: 'Bladder Urothelial Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "34 MSI high BLCA patients"
                },
                {
                    displayName: 'MSI Low BLCA',
                    internalName: 'blca_MSI-low',
                    dataset: 'Bladder Urothelial Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "10 MSI low BLCA patients"
                },
                {
                    displayName: 'Non-Papillary BLCA',
                    internalName: 'nonpapillary cell2017',
                    dataset: 'Bladder Urothelial Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "269 non-papillary BLCA patients"
                },
                {
                    displayName: 'Papillary BLCA',
                    internalName: 'papillary cell2017',
                    dataset: 'Bladder Urothelial Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "124 papillary BLCA patients"
                },
                /* New/Display names */
                // MSI High BLCA
                // MSI Low BLCA
                // Non-Papillary BLCA
                // Papillary BLCA

                /* Legacy/Internal Querying Naming */
                // "blca_MSI-high",
                // "blca_MSI-low",
                // "nonpapillary cell2017",
                // "papillary cell2017",

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
            subtypeData: [
                {
                    displayName: 'Coming Soon',
                    internalName: 'Coming Soon',
                    dataset: '',
                    patients: "0"
                },
                /* New/Display Names */

                // 'Coming Soon'

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
            subtypeData: [
                {
                    displayName: 'Ductal BRCA(1)',
                    internalName: 'ductal C106',
                    dataset: 'Breast Cancer (METABRIC, Nature 2012 & Nat Commun 2016)',
                    patients: "28 ductal BRCA patients"
                },
                {
                    displayName: 'Ductal BRCA(2)',
                    internalName: 'ductal C143',
                    dataset: 'Breast Cancer (METABRIC, Nature 2012 & Nat Commun 2016)',
                    patients: "74 ductal BRCA patients"
                },
                {
                    displayName: 'Lobular BRCA(1)',
                    internalName: 'lobular C16',
                    dataset: 'Breast Cancer (METABRIC, Nature 2012 & Nat Commun 2016)',
                    patients: "77 lobular BRCA patients"
                },
                {
                    displayName: 'Lobular BRCA(2)',
                    internalName: 'lobular C234',
                    dataset: 'Breast Cancer (METABRIC, Nature 2012 & Nat Commun 2016)',
                    patients: "24 lobular BRCA patients"
                },
                {
                    displayName: 'MMR Intact BRCA',
                    internalName: 'mmr intact',
                    dataset: 'Breast Invasive Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "51 MMR intact BRCA patients"
                },
                {
                    displayName: 'MMR Deficient BRCA',
                    internalName: 'mmr deficient',
                    dataset: 'Breast Invasive Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "52 MMR deficient BRCA patients"
                },
                /* New/Display Names */
                // Ductal BRCA(1)
                // Ductal BRCA(2)
                // Lobular BRCA(1)
                // Lobular BRCA(2)
                // MMR Intact BRCA
                // MMR Deficient BRCA

                /* Legacy/Internal Querying Naming */
                // "ductal C106",
                // "ductal C143",
                // "lobular C16",
                // "lobular C234",
                // "mmr intact",
                // "mmr deficient",

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
            subtypeData: [
                {
                    displayName: 'BRAF-mutated CRC',
                    internalName: 'mutated braf',
                    dataset: 'Colorectal Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "17 BRAF-mutated CRC patients"
                },
                {
                    displayName: 'CIN CRC',
                    internalName: 'chromosomal instability',
                    dataset: 'Colorectal Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "18 CIN CRC patients"
                },
                {
                    displayName: 'GS CRC',
                    internalName: 'genome stable',
                    dataset: 'Colorectal Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "5 GS CRC patients"
                },
                {
                    displayName: 'MSI CRC',
                    internalName: 'microsatellite instability',
                    dataset: 'Colorectal Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "13 MSI CRC patients"
                },
                {
                    displayName: 'Metastatic CRC',
                    internalName: 'metastatic',
                    dataset: 'Colorectal Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "51 metastatic CRC patients"
                },
                {
                    displayName: 'Non-Metastatic CRC',
                    internalName: 'nonmetastatic',
                    dataset: 'Colorectal Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "26 non-metastatic CRC patients"
                },
                /* New/Display Names */
                // BRAF-mutated CRC
                // CIN CRC
                // GS CRC
                // MSI CRC
                // Metastatic CRC
                // Non-Metastatic CRC

                /* Legacy/Internal Querying Naming */
                // "mutated braf",
                // "chromosomal instability",
                // "genome stable",
                // "microsatellite instability",
                // "metastatic",
                // "nonmetastatic"
            ],
        },
        {
            name: 'gallbladder',
            image: './images/gallbladder.png',
            imageWidth: '100%',
            subtypeData: [
                {
                    displayName: 'CHOL',
                    internalName: 'cholangiocarcinoma',
                    dataset: 'Cholangiocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "35 CHOL patients"
                },
                /* New/Display Names */
                // CHOL

                /* Legacy/Internal Querying Naming */
                // "cholangiocarcinoma"
            ],
        },
        {
            name: 'lung',
            image: './images/lung.png',
            imageWidth: '100%',
            subtypeData: [
                {
                    displayName: 'Acinar LUAD (1)',
                    internalName: 'LUAD bronchioloalverolar',
                    dataset: 'Lung Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "49 acinar LUAD patients"
                },
                {
                    displayName: 'Acinar LUAD (2)',
                    internalName: 'LUAD acinar papillary',
                    dataset: 'Lung Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "52 acinar LUAD patients"
                },
                {
                    displayName: 'Basaloid LUSC',
                    internalName: 'LUSC basaloid',
                    dataset: 'Lung Squamous Cell Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "13 basaloid LUSC patients"
                },
                {
                    displayName: 'Papillary LUSC',
                    internalName: 'LUSC papillary',
                    dataset: 'Lung Squamous Cell Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "3 papillary LUSC patients"
                },
                /* New/Display Names */
                // Acinar LUAD (1)
                // Acinar LUAD (2)
                // Basaloid LUSC
                // Papillary LUSC

                /* Legacy/Internal Querying Naming */
                // "LUAD bronchioloalverolar",
                // "LUAD acinar papillary",
                // "LUSC basaloid",
                // "LUSC papillary",

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
            subtypeData: [
                {
                    displayName: 'Coming Soon',
                    internalName: 'Coming Soon',
                    dataset: '',
                    patients: "0"
                },
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
            subTypeData: [
                {
                    displayName: 'PAAD',
                    internalName: 'adenocarcinoma',
                    dataset: 'Pancreatic Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "69 PAAD patients"
                },
                /* New/Display Names */
                // PAAD

                /* Legacy/Internal Querying Naming */
                // "adenocarcinoma"
            ],
        },
        {
            name: 'prostate',
            image: './images/prostate.png',
            imageWidth: '100%',
            subtypeData: [
                {
                    displayName: 'ERG-mutated PRAD',
                    internalName: 'erg',
                    dataset: 'Prostate Adenocarcinoma (TCGA, Firehose Legacy)',
                    patients: "28 ERG-mutated PRAD patients"
                },
                {
                    displayName: 'SPOP-mutated PRAD',
                    internalName: 'spop',
                    dataset: 'Prostate Adenocarcinoma (TCGA, Firehose Legacy)',
                    patients: "22 SPOP-mutated PRAD patients"
                },
                /* New/Display Names */
                // ERG-mutated PRAD
                // SPOP-mutated PRAD

                /* Legacy/Internal Querying Naming */
                // "erg",
                // "spop"
            ],
        },
        {
            name: 'thyroid',
            image: './images/thyroid.png',
            imageWidth: '100%',
            subtypeData: [
                {
                    displayName: 'Follicular THCA',
                    internalName: 'follicular',
                    dataset: 'Thyroid Carcinoma (TCGA, Firehose Legacy)',
                    patients: "37 follicular THCA patients"
                },
                {
                    displayName: 'Papillary THCA',
                    internalName: 'papillary',
                    dataset: 'Thyroid Carcinoma (TCGA, Firehose Legacy)',
                    patients: "38 papillary THCA patients"
                },
                /* New/Display Names */
                // Follicular THCA
                // Papillary THCA

                /* Legacy/Internal Querying Naming */
                // "follicular",
                // "papillary"
            ],
        }
    ];

export function getSubtypeData() {
    return subtypes
}
