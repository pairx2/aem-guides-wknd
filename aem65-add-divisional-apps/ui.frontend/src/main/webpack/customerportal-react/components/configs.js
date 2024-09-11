import {useTranslation} from "react-i18next";

export const SEARCH_TYPES = {
    VALUE_ASSIGNMENTS : "va_search",
    ASSAY_FILES : "assay_search",
    PACKAGE_INSERTS : "pi_search",
    OPERATIONS_MANUALS : "opmanual_search",
    PRODUCT_REQUIREMENTS : "prodrequire_search",
    CE_CERTIFICATES : "ce_search",
    COA_BATCH_VERIFICATIONS : "coa_search",
    ACCREDITATION_SH_FORMS : "accred_search"
}

export const searchTypesResultsOverrides = {
    va_search : {
        resultsOverrides :
        // if this field with that value is selected, display the XF below instead of doing a search
          [
              {
                  field : "title",
                  values: ["Alinity c Controls", "Alinity i Controls"],
                  contentID: "apiContent_AlinityControlsResultsOverride"
              },
              {
                  field : "title",
                  values: ["ARCHITECT iSystems Controls", "ARCHITECT cSystems Controls"],
                  contentID : "apiContent_ARCHITECTControlsResultsOverride"
              }
          ]
    },
    assay_search : {
    }
};

export const searchTypesSortOverrides = {
    ce_search : {
        sortOverrides :
        {
            "cplistnumber" : "ascending"
        }
    },
    prodrequire_search : {
        sortOverrides: {
            "cplistnumber" : "ascending"
        }
    },
    coa_search : {
        sortOverrides: {
            "cplotexpirationdate" : "descending"
        }
    },
    assay_search : {
        sortOverrides: {
            "cppostdate" : "descending"
        }
    },
    opmanual_search: {
        sortOverrides: {
            "cppostdate" : "descending"
        }
    }
};

export const facetsConfigs = {
    assay_search : [{
        "filterFacetCount": true,
        "injectionDepth": 100,
        "numberOfValues": 100,
        "sortCriteria": "alphanumeric",
        "filterByBasePath": true,
        "currentValues": [],
        "preventAutoSelect": false,
        "type": "specific",
        "facetId": "cpcondition",
        "field": "cpcondition"
        },{
        "filterFacetCount": true,
          "injectionDepth": 100,
          "numberOfValues": 100,
          "sortCriteria": "alphanumeric",
          "filterByBasePath": true,
          "currentValues": [],
          "preventAutoSelect": false,
          "type": "specific",
          "facetId": "cpmandatoryupgrade",
          "field": "cpmandatoryupgrade"
    }],
    pi_search : [{
        "filterFacetCount": true,
        "injectionDepth": 100,
        "numberOfValues": 100,
        "sortCriteria": "alphanumeric",
        "filterByBasePath": true,
        "currentValues": [],
        "preventAutoSelect": false,
        "type": "specific",
        "facetId": "cpcondition",
        "field": "cpcondition"
    }],
    opmanual_search : [{
        "filterFacetCount": true,
        "injectionDepth": 100,
        "numberOfValues": 100,
        "sortCriteria": "alphanumeric",
        "filterByBasePath": true,
        "currentValues": [],
        "preventAutoSelect": false,
        "type": "specific",
        "facetId": "cplanguage",
        "field": "cplanguage"
    }]
};

export const labCentralConfig = () => {
    // searchtypes are wrapped in a functional component to allow translation
    const {t, i18n} = useTranslation();
    const searchType= [
        {
            label : t('assay-files'),
            value:"Assay Files",
            searchtype:  SEARCH_TYPES.ASSAY_FILES
        },{
            label : t('ce-certificates'),
            value:"CE Certificates",
            searchtype:  SEARCH_TYPES.CE_CERTIFICATES,
            isOUS : true,
            isUS : false,
        },{
            label : t('coa-batch-verifications'),
            value:"COA/Batch Verifications",
            searchtype:  SEARCH_TYPES.COA_BATCH_VERIFICATIONS,
            isOUS : true,
            isUS : false
        },{
            label : t('instructions-for-use'),
            value: "Instructions for Use",
            searchtype: SEARCH_TYPES.PACKAGE_INSERTS,
        },{
            label : t('operations-manuals'),
            value:"Operations Manuals",
            searchtype:  SEARCH_TYPES.OPERATIONS_MANUALS
        },{
            label : t('product-requirements'),
            value: "Product Requirements",
            searchtype: SEARCH_TYPES.PRODUCT_REQUIREMENTS
        },{
            label : t('sh-form-43'),
            value: "SH FORM 43",
            searchtype: SEARCH_TYPES.ACCREDITATION_SH_FORMS,
            isOUS : true,
            isUS : false
        },{
            value:t('value-assignments'),
            label:"Value Assignments",
            searchtype: SEARCH_TYPES.VALUE_ASSIGNMENTS,
        },
    ];
    
    return {
        searchType
    }
}

export const OUS_Filters = {
    "assay_search": [
        {
            cpousavail: "Y",
            isOUS: true,
            isUS: false
        },
        {
            cpusavail: "Y",
            isUS: true,
            isOUS: false
        }
    ],
    "prodrequire_search": [
        {
            cpousavail: "Y",
            isOUS: true,
            isUS: false
        },
        {
            cpusavail: "Y",
            isUS: true,
            isOUS: false
        }
    ],
    "va_search": [
        {
            cpousavail: "Y",
            isOUS: true,
            isUS: false
        },
        {
            cpusavail: "Y",
            isUS: true,
            isOUS: false
        }
    ],
    "opmanual_search": [
        {
            cpousavail: "Y",
            isOUS: true,
            isUS: false
        },
        {
            cpusavail: "Y",
            isUS: true,
            isOUS: false
        }
    ],
    "pi_search": [
        {
            cpousavail: "Y",
            isOUS: true,
            isUS: false
        },
        {
            cpusavail: "Y",
            isUS: true,
            isOUS: false
        }
    ],
}

export const languagesConfig = {
    "_comment": "This system asset holds all languages in the OUS Portal. Language drop-downs across the site will show languages in the order loaded in this file. Note that some updates to IFU and PRR files will not be applied in the Portals until the next Elasticsearch reindex.",
    "_value": [
        {
            "id": "ENGLISH_US",
            "displayValue": "English",
            "locale": "EN_US",
            "countryCode": "",
            "shortCountryCode": "en",
            "profileLanguage": false,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 99,
            "prrFileLanguage": false
        },
        {
            "id": "Arabic",
            "displayValue": "Arabic",
            "locale": "AR_SA",
            "countryCode": "",
            "shortCountryCode": "",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "",
            "lblFileLanguageCode": "",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 99,
            "prrFileLanguage": false
        },
        {
            "id": "BULGARIAN",
            "displayValue": "Български",
            "locale": "BG_BG",
            "countryCode": "BUL",
            "shortCountryCode": "bg",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "bg-BG",
            "lblFileLanguageCode": "bg",
            "productRequirementsEnglishDisplayKey": "Bulgarian",
            "ifuFileLanguage": true,
            "ifuRank": 99,
            "prrFileLanguage": true
        },
        {
            "id": "CHINESE_SIMPLIFIED",
            "displayValue": "简体中文",
            "locale": "ZH_CN",
            "countryCode": "CHI",
            "shortCountryCode": "cs",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "zh-CN",
            "lblFileLanguageCode": "zh",
            "productRequirementsEnglishDisplayKey": "Chinese Simplified",
            "ifuFileLanguage": false,
            "ifuRank": 22,
            "prrFileLanguage": false
        },
        {
            "id": "CHINESE_TRADITIONAL",
            "displayValue": "繁體中文",
            "locale": "ZH_HK",
            "countryCode": "CHT",
            "shortCountryCode": "ct",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": null,
            "lblFileLanguageCode": null,
            "productRequirementsEnglishDisplayKey": "Chinese Traditional",
            "ifuFileLanguage": false,
            "ifuRank": 23,
            "prrFileLanguage": false
        },
        {
            "id": "CROATIA",
            "displayValue": "Hrvatski",
            "locale": "HR_HR",
            "countryCode": "CRO",
            "shortCountryCode": "hr",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "hr-BA",
            "lblFileLanguageCode": "hr",
            "productRequirementsEnglishDisplayKey": "Croatian",
            "ifuFileLanguage": true,
            "ifuRank": 16,
            "prrFileLanguage": true
        },
        {
            "id": "CZECH",
            "displayValue": "Čeština",
            "locale": "CS_CZ",
            "countryCode": "CZE",
            "shortCountryCode": "cs",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "cs-CZ",
            "lblFileLanguageCode": "cs",
            "productRequirementsEnglishDisplayKey": "Czech",
            "ifuFileLanguage": true,
            "ifuRank": 1,
            "prrFileLanguage": true
        },
        {
            "id": "DANISH",
            "displayValue": "Dansk",
            "locale": "DA_DK",
            "countryCode": "DAN",
            "shortCountryCode": "da",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "da-DK",
            "lblFileLanguageCode": "da",
            "productRequirementsEnglishDisplayKey": "Danish",
            "ifuFileLanguage": true,
            "ifuRank": 2,
            "prrFileLanguage": true
        },
        {
            "id": "DUTCH",
            "displayValue": "Nederlands",
            "locale": "NL_NL",
            "countryCode": "DUT",
            "shortCountryCode": "nl",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "nl-NL",
            "lblFileLanguageCode": "nl",
            "productRequirementsEnglishDisplayKey": "Dutch",
            "ifuFileLanguage": true,
            "ifuRank": 31,
            "prrFileLanguage": true
        },
        {
            "id": "ENGLISH",
            "displayValue": "English",
            "locale": "EN_GB",
            "countryCode": "ENG",
            "shortCountryCode": "en",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "English",
            "ifuFileLanguage": true,
            "ifuRank": 99,
            "prrFileLanguage": true
        },
        {
            "id": "ESTONIAN",
            "displayValue": "Eesti keel",
            "locale": "ET_EE",
            "countryCode": "EST",
            "shortCountryCode": "ee",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "et-EE",
            "lblFileLanguageCode": "et",
            "productRequirementsEnglishDisplayKey": "Estonian",
            "ifuFileLanguage": true,
            "ifuRank": 30,
            "prrFileLanguage": true
        },
        {
            "id": "FINNISH",
            "displayValue": "Finnish",
            "locale": "FI_FI",
            "countryCode": "",
            "shortCountryCode": "",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "",
            "lblFileLanguageCode": "",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 99,
            "prrFileLanguage": false
        },
        {
            "id": "FRENCH",
            "displayValue": "Français",
            "locale": "FR_FR",
            "countryCode": "FRE",
            "shortCountryCode": "fr",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "fr-FR",
            "lblFileLanguageCode": "fr",
            "productRequirementsEnglishDisplayKey": "French",
            "ifuFileLanguage": true,
            "ifuRank": 5,
            "prrFileLanguage": true
        },
        {
            "id": "GERMAN",
            "displayValue": "Deutsch",
            "locale": "DE_DE",
            "countryCode": "GER",
            "shortCountryCode": "de",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "de-DE",
            "lblFileLanguageCode": "de",
            "productRequirementsEnglishDisplayKey": "German",
            "ifuFileLanguage": true,
            "ifuRank": 3,
            "prrFileLanguage": true
        },
        {
            "id": "GREEK",
            "displayValue": "Ελληνικά",
            "locale": "EL_GR",
            "countryCode": "GRE",
            "shortCountryCode": "el",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "el-GR",
            "lblFileLanguageCode": "el",
            "productRequirementsEnglishDisplayKey": "Greek",
            "ifuFileLanguage": true,
            "ifuRank": 6,
            "prrFileLanguage": true
        },
        {
            "id": "HUNGARIAN",
            "displayValue": "Magyar",
            "locale": "HU_HU",
            "countryCode": "HUN",
            "shortCountryCode": "hu",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "hu-HU",
            "lblFileLanguageCode": "hu",
            "productRequirementsEnglishDisplayKey": "Hungarian",
            "ifuFileLanguage": true,
            "ifuRank": 8,
            "prrFileLanguage": true
        },
        {
            "id": "INDONESIAN",
            "displayValue": "Bahasa Indonesia",
            "locale": "ID_ID",
            "countryCode": "IND",
            "shortCountryCode": "id",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "id-ID",
            "lblFileLanguageCode": "id",
            "productRequirementsEnglishDisplayKey": "Indonesian",
            "ifuFileLanguage": true,
            "ifuRank": 26,
            "prrFileLanguage": false
        },
        {
            "id": "ITALIAN",
            "displayValue": "Italiano",
            "locale": "IT_IT",
            "countryCode": "ITA",
            "shortCountryCode": "it",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "it-IT",
            "lblFileLanguageCode": "it",
            "productRequirementsEnglishDisplayKey": "Italian",
            "ifuFileLanguage": true,
            "ifuRank": 7,
            "prrFileLanguage": true
        },
        {
            "id": "JAPANESE",
            "displayValue": "日本語",
            "locale": "JA_JP",
            "countryCode": "JPN",
            "shortCountryCode": "jp",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "ja-JP",
            "lblFileLanguageCode": "ja",
            "productRequirementsEnglishDisplayKey": "Japanese",
            "ifuFileLanguage": true,
            "ifuRank": 24,
            "prrFileLanguage": true
        },
        {
            "id": "KAZAKH",
            "displayValue": "Қазақша",
            "locale": "KK_KZ",
            "countryCode": "KAZ",
            "shortCountryCode": "kz",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "kk-KZ",
            "lblFileLanguageCode": "kk",
            "productRequirementsEnglishDisplayKey": "Kazakh",
            "ifuFileLanguage": true,
            "ifuRank": 99,
            "prrFileLanguage": true
        },
        {
            "id": "KOREAN",
            "displayValue": "한국어",
            "locale": "KO_KR",
            "countryCode": "KOR",
            "shortCountryCode": "ko",
            "profileLanguage": true,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "ko-KR",
            "lblFileLanguageCode": "ko",
            "productRequirementsEnglishDisplayKey": "Korean",
            "ifuFileLanguage": true,
            "ifuRank": 19,
            "prrFileLanguage": false
        },
        {
            "id": "LATVIAN",
            "displayValue": "Latviešu",
            "locale": "LV_LV",
            "countryCode": "LAV",
            "shortCountryCode": "lv",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "lv-LV",
            "lblFileLanguageCode": "lv",
            "productRequirementsEnglishDisplayKey": "Latvian",
            "ifuFileLanguage": true,
            "ifuRank": 28,
            "prrFileLanguage": true
        },
        {
            "id": "LITHUANIAN",
            "displayValue": "Lietuviškai",
            "locale": "LT_LT",
            "countryCode": "LIT",
            "shortCountryCode": "lt",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "lt-LT",
            "lblFileLanguageCode": "lt",
            "productRequirementsEnglishDisplayKey": "Lithuanian",
            "ifuFileLanguage": true,
            "ifuRank": 29,
            "prrFileLanguage": true
        },
        {
            "id": "NORWEGIAN",
            "displayValue": "Norsk",
            "locale": "NB_NO",
            "countryCode": "NOR",
            "shortCountryCode": "no",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "nb-NO",
            "lblFileLanguageCode": "nb",
            "productRequirementsEnglishDisplayKey": "Norwegian",
            "ifuFileLanguage": true,
            "ifuRank": 9,
            "prrFileLanguage": true
        },
        {
            "id": "POLISH",
            "displayValue": "Polski",
            "locale": "PL_PL",
            "countryCode": "POL",
            "shortCountryCode": "pl",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "pl-PL",
            "lblFileLanguageCode": "pl",
            "productRequirementsEnglishDisplayKey": "Polish",
            "ifuFileLanguage": true,
            "ifuRank": 10,
            "prrFileLanguage": true
        },
        {
            "id": "PORTUGUESE_BRAZIL",
            "displayValue": "Português (BR)",
            "locale": "PT_BR",
            "countryCode": "BRA",
            "shortCountryCode": "br",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "pt-BR",
            "lblFileLanguageCode": "pt",
            "productRequirementsEnglishDisplayKey": "Brazilian-Port",
            "ifuFileLanguage": true,
            "ifuRank": 20,
            "prrFileLanguage": true
        },
        {
            "id": "PORTUGUESE",
            "displayValue": "Português (PT)",
            "locale": "PT_PT",
            "countryCode": "POR",
            "shortCountryCode": "pt",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "pt-PT",
            "lblFileLanguageCode": "pt",
            "productRequirementsEnglishDisplayKey": "Portuguese",
            "ifuFileLanguage": true,
            "ifuRank": 11,
            "prrFileLanguage": true
        },
        {
            "id": "ROMANIAN",
            "displayValue": "Română",
            "locale": "RO_RO",
            "countryCode": "ROM",
            "shortCountryCode": "ro",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "ro-RO",
            "lblFileLanguageCode": "ro",
            "productRequirementsEnglishDisplayKey": "Romanian",
            "ifuFileLanguage": true,
            "ifuRank": 25,
            "prrFileLanguage": true
        },
        {
            "id": "RUSSIAN",
            "displayValue": "РУССКИЙ (РФ)",
            "locale": "RU_RU",
            "countryCode": "RUS",
            "shortCountryCode": "ru",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "ru-RU",
            "lblFileLanguageCode": "ru",
            "productRequirementsEnglishDisplayKey": "Russian",
            "ifuFileLanguage": true,
            "ifuRank": 21,
            "prrFileLanguage": true
        },
        {
            "id": "RUSSIAN_CIS",
            "displayValue": "РУССКИЙ (СНГ)",
            "locale": "CI_CI",
            "countryCode": "CIS",
            "shortCountryCode": "ci",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "ci_CI",
            "lblFileLanguageCode": "ci",
            "productRequirementsEnglishDisplayKey": "Russian (CIS)",
            "ifuFileLanguage": true,
            "ifuRank": 113,
            "prrFileLanguage": false
        },
        {
            "id": "SERBIAN",
            "displayValue": "Srpski",
            "locale": "SR_RS",
            "countryCode": "SRB",
            "shortCountryCode": "sr",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "sr-Latn-RS",
            "lblFileLanguageCode": "sr",
            "productRequirementsEnglishDisplayKey": "Serbian",
            "ifuFileLanguage": true,
            "ifuRank": 17,
            "prrFileLanguage": true
        },
        {
            "id": "SLOVAK",
            "displayValue": "Slovenčina",
            "locale": "SK_SK",
            "countryCode": "SLV",
            "shortCountryCode": "sk",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "sk-SK",
            "lblFileLanguageCode": "sk",
            "productRequirementsEnglishDisplayKey": "Slovak",
            "ifuFileLanguage": true,
            "ifuRank": 12,
            "prrFileLanguage": true
        },
        {
            "id": "SLOVENE",
            "displayValue": "Slovenščina",
            "locale": "SL_SL",
            "countryCode": "SLV",
            "shortCountryCode": "sl",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "sl-Sl",
            "lblFileLanguageCode": "sl",
            "productRequirementsEnglishDisplayKey": "Slovene",
            "ifuFileLanguage": false,
            "ifuRank": 99,
            "prrFileLanguage": false
        },
        {
            "id": "SPANISH",
            "displayValue": "Español",
            "locale": "ES_ES",
            "countryCode": "SPA",
            "shortCountryCode": "es",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "es-ES",
            "lblFileLanguageCode": "es",
            "productRequirementsEnglishDisplayKey": "Spanish",
            "ifuFileLanguage": true,
            "ifuRank": 4,
            "prrFileLanguage": true
        },
        {
            "id": "SPANISH_LA",
            "displayValue": "Español (LA)",
            "locale": "ES_MX",
            "countryCode": "",
            "shortCountryCode": "",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "",
            "lblFileLanguageCode": "",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 99,
            "prrFileLanguage": false
        },
        {
            "id": "SWEDISH",
            "displayValue": "Svenska",
            "locale": "SV_SE",
            "countryCode": "SWE",
            "shortCountryCode": "sv",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "sv-SE",
            "lblFileLanguageCode": "sv",
            "productRequirementsEnglishDisplayKey": "Swedish",
            "ifuFileLanguage": true,
            "ifuRank": 13,
            "prrFileLanguage": true
        },
        {
            "id": "THAI",
            "displayValue": "ไทย",
            "locale": "TH_TH",
            "countryCode": "THA",
            "shortCountryCode": "th",
            "profileLanguage": true,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "th-TH",
            "lblFileLanguageCode": "th",
            "productRequirementsEnglishDisplayKey": "Thai",
            "ifuFileLanguage": true,
            "ifuRank": 15,
            "prrFileLanguage": true
        },
        {
            "id": "TURKISH",
            "displayValue": "Türkçe",
            "locale": "TR_TR",
            "countryCode": "TUR",
            "shortCountryCode": "tr",
            "profileLanguage": true,
            "assayFileLanguage": true,
            "lblFileLocaleCode": "tr-TR",
            "lblFileLanguageCode": "tr",
            "productRequirementsEnglishDisplayKey": "Turkish",
            "ifuFileLanguage": true,
            "ifuRank": 14,
            "prrFileLanguage": true
        },
        {
            "id": "UKRAINIAN",
            "displayValue": "Українська",
            "locale": "UK_UK",
            "countryCode": "UKR",
            "shortCountryCode": "uk",
            "profileLanguage": true,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "uk-UA",
            "lblFileLanguageCode": "uk",
            "productRequirementsEnglishDisplayKey": "Ukrainian",
            "ifuFileLanguage": true,
            "ifuRank": 27,
            "prrFileLanguage": true
        },
        {
            "id": "VIETNAMESE",
            "displayValue": "Tiếng Việt",
            "locale": "VI_VN",
            "countryCode": "VIE",
            "shortCountryCode": "vi",
            "profileLanguage": true,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "vi-VN",
            "lblFileLanguageCode": "vi",
            "productRequirementsEnglishDisplayKey": "Vietnamese",
            "ifuFileLanguage": true,
            "ifuRank": 18,
            "prrFileLanguage": true
        },
        {
            "id": "ENGLISH_NA",
            "displayValue": "North Asia English",
            "locale": "EN_NA",
            "countryCode": "",
            "shortCountryCode": "en_na",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 101,
            "prrFileLanguage": false
        },
        {
            "id": "ENGLISH_SA",
            "displayValue": "South Asia English",
            "locale": "EN_SA",
            "countryCode": "",
            "shortCountryCode": "en_sa",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 102,
            "prrFileLanguage": false
        },
        {
            "id": "ENGLISH_KO",
            "displayValue": "English - Korea",
            "locale": "EN_KO",
            "countryCode": "",
            "shortCountryCode": "en_KO",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 103,
            "prrFileLanguage": false
        },
        {
            "id": "ENGLISH_IN",
            "displayValue": "English - India",
            "locale": "EN_IN",
            "countryCode": "",
            "shortCountryCode": "en_IN",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 104,
            "prrFileLanguage": false
        },
        {
            "id": "ENGLISH_TH",
            "displayValue": "English - Thailand",
            "locale": "EN_TH",
            "countryCode": "",
            "shortCountryCode": "en_TH",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 105,
            "prrFileLanguage": false
        },
        {
            "id": "ENGLISH_VI",
            "displayValue": "English - Vietnam",
            "locale": "EN_VI",
            "countryCode": "",
            "shortCountryCode": "en_VI",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 106,
            "prrFileLanguage": false
        },
        {
            "id": "ENGLISH_ID",
            "displayValue": "English - Indonesia",
            "locale": "EN_ID",
            "countryCode": "",
            "shortCountryCode": "en_ID",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 107,
            "prrFileLanguage": false
        },
        {
            "id": "ENGLISH_MY",
            "displayValue": "English - Malaysia",
            "locale": "EN_IN",
            "countryCode": "",
            "shortCountryCode": "en_MY",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 108,
            "prrFileLanguage": false
        },
        {
            "id": "ENGLISH_SG",
            "displayValue": "English - Singapore",
            "locale": "EN_SG",
            "countryCode": "",
            "shortCountryCode": "en_SG",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 109,
            "prrFileLanguage": false
        },
        {
            "id": "ENGLISH_HK",
            "displayValue": "English - Hong Kong",
            "locale": "EN_HK",
            "countryCode": "",
            "shortCountryCode": "en_HK",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 110,
            "prrFileLanguage": false
        },
        {
            "id": "ENGLISH_PH",
            "displayValue": "English - Philippines",
            "locale": "EN_PH",
            "countryCode": "",
            "shortCountryCode": "en_PH",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 111,
            "prrFileLanguage": false
        },
        {
            "id": "ENGLISH_TW",
            "displayValue": "English - Taiwan",
            "locale": "EN_TW",
            "countryCode": "",
            "shortCountryCode": "en_TW",
            "profileLanguage": false,
            "assayFileLanguage": false,
            "lblFileLocaleCode": "en-US",
            "lblFileLanguageCode": "en",
            "productRequirementsEnglishDisplayKey": "",
            "ifuFileLanguage": false,
            "ifuRank": 112,
            "prrFileLanguage": false
        }]
}

export const listOfCountryCodes = [
    "AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"
]

export const getLanguageListForType = (type) => {
    return languagesConfig._value.filter(lang => lang[type] === true);
}