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
                    fullName: 'High Microsatellite Instability',
                    dataset: 'Bladder Urothelial Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "34"
                },
                {
                    displayName: 'MSI Low BLCA',
                    internalName: 'blca_MSI-low',
                    fullName: 'Low Microsatellite Instability',
                    dataset: 'Bladder Urothelial Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "10"
                },
                {
                    displayName: 'Non-Papillary BLCA',
                    internalName: 'nonpapillary cell2017',
                    fullName: 'Non-Papillary',
                    dataset: 'Bladder Urothelial Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "269"
                },
                {
                    displayName: 'Papillary BLCA',
                    internalName: 'papillarycell2017',
                    fullName: 'Papillary',
                    dataset: 'Bladder Urothelial Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "124"
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
                    fullName: 'Ductal',
                    dataset: 'Breast Cancer (METABRIC, Nature 2012 & Nat Commun 2016)',
                    patients: "28"
                },
                {
                    displayName: 'Ductal BRCA(2)',
                    internalName: 'ductal C143',
                    fullName: 'Ductal',
                    dataset: 'Breast Cancer (METABRIC, Nature 2012 & Nat Commun 2016)',
                    patients: "74"
                },
                {
                    displayName: 'Lobular BRCA(1)',
                    internalName: 'lobular C16',
                    fullName: 'Lobular',
                    dataset: 'Breast Cancer (METABRIC, Nature 2012 & Nat Commun 2016)',
                    patients: "77"
                },
                {
                    displayName: 'Lobular BRCA(2)',
                    internalName: 'lobular C234',
                    fullName: 'Lobular',
                    dataset: 'Breast Cancer (METABRIC, Nature 2012 & Nat Commun 2016)',
                    patients: "24"
                },
                {
                    displayName: 'MMR Intact BRCA',
                    internalName: 'mmr intact',
                    fullName: 'Mismatch repair intact',
                    dataset: 'Breast Invasive Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "51"
                },
                {
                    displayName: 'MMR Deficient BRCA',
                    internalName: 'mmr deficient',
                    fullName: 'Mismatch repair deficient',
                    dataset: 'Breast Invasive Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "52"
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
                    fullName: 'Mutated BRAF',
                    dataset: 'Colorectal Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "17"
                },
                {
                    displayName: 'CIN CRC',
                    internalName: 'chromosomal instability',
                    fullName: 'Chromosomal Instability',
                    dataset: 'Colorectal Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "18"
                },
                {
                    displayName: 'GS CRC',
                    internalName: 'genome stable',
                    fullName: 'Genome Stable',
                    dataset: 'Colorectal Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "5"
                },
                {
                    displayName: 'MSI CRC',
                    internalName: 'microsatellite instability',
                    fullName: 'Microsatellite Instability',
                    dataset: 'Colorectal Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "13"
                },
                {
                    displayName: 'Metastatic CRC',
                    internalName: 'metastatic',
                    fullName: 'Metastatic',
                    dataset: 'Colorectal Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "51"
                },
                {
                    displayName: 'Non-Metastatic CRC',
                    internalName: 'nonmetastatic',
                    fullName: 'Non-metastatic',
                    dataset: 'Colorectal Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "26"
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
                    fullName: 'Cholangiocarcinoma',
                    dataset: 'Cholangiocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "35"
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
                    internalName: 'LUAD bronchioloalveolar',
                    fullName: 'Bronchioloalveolar',
                    dataset: 'Lung Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "49"
                },
                {
                    displayName: 'Acinar LUAD (2)',
                    internalName: 'LUAD acinar papillary',
                    fullName: 'Acinar Papillary',
                    dataset: 'Lung Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "52"
                },
                {
                    displayName: 'Basaloid LUSC',
                    internalName: 'LUSC basaloid',
                    fullName: 'Basaloid',
                    dataset: 'Lung Squamous Cell Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "13"
                },
                {
                    displayName: 'Papillary LUSC',
                    internalName: 'LUSC papillary',
                    fullName: 'Papillary',
                    dataset: 'Lung Squamous Cell Carcinoma (TCGA, PanCancer Atlas)',
                    patients: "3"
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
            subtypeData: [
                {
                    displayName: 'PAAD',
                    internalName: 'adenocarcinoma',
                    fullName: 'Adenocarcinoma',
                    dataset: 'Pancreatic Adenocarcinoma (TCGA, PanCancer Atlas)',
                    patients: "69"
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
                    fullName: 'ERG',
                    dataset: 'Prostate Adenocarcinoma (TCGA, Firehose Legacy)',
                    patients: "28"
                },
                {
                    displayName: 'SPOP-mutated PRAD',
                    internalName: 'spop',
                    fullName: 'SPOP',
                    dataset: 'Prostate Adenocarcinoma (TCGA, Firehose Legacy)',
                    patients: "22"
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
                    fullName: 'Follicular',
                    dataset: 'Thyroid Carcinoma (TCGA, Firehose Legacy)',
                    patients: "37"
                },
                {
                    displayName: 'Papillary THCA',
                    internalName: 'papillary',
                    fullName: 'Papillary',
                    dataset: 'Thyroid Carcinoma (TCGA, Firehose Legacy)',
                    patients: "38"
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
