import React, {useMemo} from 'react';
import {getLanguageListForType} from "../configs";
import {useTranslation} from "react-i18next";
import {useAnalyticsUtils} from "../shared/AnalyticsUtils";

export const SearchResultsConfig = (downloadModal) => {
  const { t, i18n } = useTranslation();
  const {analyticsUserAndLabObject,
    fireAnalyticsEvent,
    analyticsActiveDownloads,
    setAnalyticsActiveDownloads,
    formatAnalyticsFileObject} = useAnalyticsUtils();
  
  const initiateDownload = (selectedDocuments) => {
    if (!downloadModal?.current) return
    // really complicated way to format the analytics values
    /***
     "fileLanguage": ["language of file selected"], // if applicable
     "fileName": ["name of file selected","fileName"],
     "fileType": ["searchType","searchType"]
     */
    let analyticsObjects = {
      fileLanguage: [], // if applicable
      fileName: [],
      fileType: []
    }
    selectedDocuments.forEach(row => {
      const analyticsObj = formatAnalyticsFileObject(row);
      analyticsObjects.fileLanguage.push(analyticsObj.fileLanguage);
      analyticsObjects.fileName.push(analyticsObj.fileName);
      analyticsObjects.fileType.push(analyticsObj.fileType);
    });
    
    setAnalyticsActiveDownloads(analyticsObjects);
    
    const eventObj = {file:analyticsObjects, ...analyticsUserAndLabObject};
    // fire analytics event
    fireAnalyticsEvent("file_download_start", eventObj);
    downloadModal.current.initiateDownload(selectedDocuments);
  }
  
  const removeFileExtension = (fileName) => {
    const regex = new RegExp('(.+?)(\\.[^.]*$|$)'),
      matches = fileName?.match(regex);
    if (matches && matches.length > 1) {
      return matches[1]; // filename without extension
    } else {
      return fileName;
    }
  }
  
  const VADocumentListValueFromResult = (result, fieldName) => {
    const count = result?.cpfilename?.length ?? 1;
    const docs = (result[fieldName] ?? []).map(doc => JSON.parse(doc));
    const fileName = `${t('value-assignment')}.${count}` // we'll have a pill that shows the file count
    return {
      fileNames : [fileName],
      docsCollection : docs,
      result: result,
      fieldName : fieldName,
      onDownloadClick : initiateDownload
    }
  }
  
  const VAArchDocumentListValueFromResult = (result, fieldName) => {
    const docs = (result[fieldName] ?? []).map(doc => JSON.parse(doc));
    const docsCollection = docs.map(doc => {
      return {
        documentId : doc.documentId,
        searchType : doc.searchType
      }
    });
    const fileNames = docs.map(doc => doc.filename);
    return {
      fileNames : fileNames,
      docsCollection : docsCollection,
      result: result,
      fieldName : fieldName,
      onDownloadClick : initiateDownload
    }
  }
  
  const CEDocumentListValueFromResult = (result, fieldName) => {
    /****
     * value is a collection of doc items
     * [{\"filename\":\"812422472.pdf\",\"searchType\":\"CE_CERTS\"}]
     * */
    const docs = (result[fieldName] ?? []).map(doc => JSON.parse(doc));
    const fileNames = docs.map(doc => doc.filename);
    const docsCollection = docs.map(doc => {
      return {
        documentId : removeFileExtension(doc.filename),
        searchType : doc.searchType
      }
    });
    return {
      fileNames : fileNames,
      docsCollection : docsCollection,
      result: result,
      fieldName : fieldName,
      onDownloadClick : initiateDownload
    }
  }
  
  const CEISODocumentListValueFromResult = (result, fieldName) => {
    /****
     * value is a collection of doc items
     * [{\"filename\":\"812422472.pdf\",\"searchType\":\"CE_CERTS\"}]
     * */
    const docs = (result[fieldName] ?? []).map(doc => JSON.parse(doc));
    const fileNames = docs.map(doc => `${doc.filename}.pdf`);
    const docsCollection = docs.map(doc => {
      return {
        documentId : removeFileExtension(doc.documentId),
        searchType : doc.searchType
      }
    });
    return {
      fileNames : fileNames,
      docsCollection : docsCollection,
      result: result,
      fieldName : fieldName,
      onDownloadClick : initiateDownload
    }
  }
  
  const PRDocumentListValueFromResult = (result, fieldName) => {
    const docs = (result[fieldName] ?? []).map(doc => JSON.parse(doc));
    const fileNames = docs.map(doc => doc.filename);
    const docsCollection = docs.map(doc => {
      return {
        searchType : doc.searchType,
        documentId: removeFileExtension(doc.filename)
      }
    });
    return {
      fileNames : fileNames,
      docsCollection : docsCollection,
      result: result,
      fieldName : fieldName,
      onDownloadClick : initiateDownload
    }
  }
  const opmanualItemsFromResult = (result, fieldName) => {
    const docs = (result[fieldName] ?? []).map(doc => JSON.parse(doc));
    
    const docsCollection = docs.map(doc => {
      return {
        documentId : doc.documentId,
        searchType : doc.searchType,
        major: doc.major,
        minor: doc.minor
      }
    });
    return {
      fileNames : result['cpfilename'],
      result: result,
      docsCollection : docsCollection,
      fieldName : fieldName,
      onDownloadClick : initiateDownload
    }
  }
  
  const certificateItemsFromResult = (result, fieldName) => {
    const docs = (result[fieldName] ?? []).map(doc => JSON.parse(doc));
    const fileNames = docs.map(doc => doc.filename);
    
    const docsCollection = docs.map(doc => {
      return {
        documentId : removeFileExtension(doc.filename),
        searchType : doc.searchType
      }
    });
    return {
      fileNames : fileNames,
      docsCollection : docsCollection,
      result: result,
      fieldName : fieldName,
      onDownloadClick : initiateDownload
    }
  }
  const batchItemsFromResult = (result, fieldName) => {
    const docs = (result[fieldName] ?? []).map(doc => JSON.parse(doc));
    const fileNames = docs.map(doc => doc.filename);
    
    const docsCollection = docs.map(doc => {
      return {
        documentId : doc.documentId,
        searchType : doc.searchType,
        major: doc.major,
        minor: doc.minor
      }
    });
    return {
      fileNames : fileNames,
      docsCollection : docsCollection,
      result: result,
      fieldName : fieldName,
      onDownloadClick : initiateDownload
    }
  }
  
  
  const assayAlinityDocValueFromResult = (result, fieldName) => {
    let docs = (result[fieldName] ?? []).map(doc => JSON.parse(doc));
    docs = docs.filter(doc => (doc.searchType));
    const fileNames = result['cpfilename']?.map(filename => `${filename}.pdf`);
    const docsCollection = docs.map(doc => {
      return {
        gtin: doc.gtin,
        searchType: doc.searchType,
        ceMarkStatus: doc.ceMarkStatus,
        assayName: doc.assayName,
        platform: doc.platform,
        labelFile: doc.labelFile,
        designProcess: result.designprocess
      }
    });
    return {
      fileNames : fileNames,
      docsCollection : docsCollection,
      result: result,
      fieldName : fieldName,
      onDownloadClick : initiateDownload
    }
  }
  const assayAlinityPackageValueFromResult = (result, fieldName) => {
    let docs = (result["cpdownload"] ?? []).map(doc => JSON.parse(doc));
    docs = docs.filter(doc => (doc.searchType));
    const fileNames = result['cpfilename']?.map(filename => `${filename}.pdf`);
    const docsCollection = docs.map(doc => {
      return {
        gtin: doc.gtin,
        searchType: doc.searchType,
        ceMarkStatus: doc.ceMarkStatus,
        assayName: doc.assayName,
        platform: doc.platform,
        labelFile: doc.labelFile,
        assayFile: doc.assayFile,
        designProcess: result.designprocess
      }
    });
    return {
      fileNames : fileNames,
      docsCollection : docsCollection,
      result: result,
      fieldName : fieldName,
      onDownloadClick : initiateDownload
    }
  }
  
  const assayItemValueFromResult = (result, fieldName) => {
    let docs = (result[fieldName] ?? []).map(doc => JSON.parse(doc));
    docs = docs.filter(doc => (doc.filename && doc.searchType));
    const fileNames = docs.map(doc => doc.filename);
    const docsCollection = docs.map(doc => {
      return {
        searchType : doc.searchType,
        documentId: doc.filename,
        designProcess: result.designprocess
      }
    });
    return {
      fileNames : fileNames,
      docsCollection : docsCollection,
      result: result,
      fieldName : fieldName,
      onDownloadClick : initiateDownload
    }
  }
  const ifuLanguageList = useMemo(() => getLanguageListForType("ifuFileLanguage"), []);
  const ifuFormatLang = (value) => {
    const langConfig = ifuLanguageList.find(langConf => langConf.countryCode == value);
    if (langConfig) {
      return langConfig.displayValue;
    } else {
      return value;
    }
  }
  
  const ifuItemItemValueFromResult = (result, fieldName) => {
    const docs = (result[fieldName] ?? []).map(doc => JSON.parse(doc));
    const fileNames = docs.map(doc => doc.filename);
    const docsCollection = docs.map(doc => {
      return {
        searchType : doc.searchType,
        documentId: doc.documentId
      }
    });
    return {
      fileNames : fileNames,
      docsCollection : docsCollection,
      result: result,
      fieldName : fieldName,
      onDownloadClick : initiateDownload
    }
  }
  
  const accreditationValueFromResult = (result, fieldName) => {
    const docs = (result[fieldName] ?? []).map(doc => JSON.parse(doc));
    const fileNames = docs.map(doc => doc.filename);
    
    const docsCollection = docs.map(doc => {
      return {
        documentId : doc.documentId,
        searchType : doc.searchType,
        major: doc.major,
        minor: doc.minor
      }
    });
    return {
      fileNames : fileNames,
      docsCollection : docsCollection,
      result: result,
      fieldName : fieldName,
      onDownloadClick : initiateDownload
    }
  }
  
  const searchTypesDisplayConfig = {
    va_search : {
      resultsFields :[
        {
          name: t('product-name'),
          field: "cpproductname",
          sortable: false,
          component: 'PrefixedFacetText',
          mobileName: " "
        },
        {
          name: t('product-number'),
          field: "cpproductnumber",
          sortable: false,
          component: 'text',
          mobileName: t('product-num') + " : "
        },
        {
          name: t('lot-number'),
          field: "cplotnumber",
          sortable: true,
          component: 'text',
          mobileName: t('lot-num') + " : "
        },
        {
          name: t('lot-expiration-date'),
          field: "cplotexpirationdate",
          sortable: true,
          component: 'DateCell',
          props: {
            dateFormat: t('date-format')
          },
          mobileName: t('lot-expiration-date')
        },
        {
          name: t('target-system'),
          field: "cptargetsystem",
          sortable: true,
          mobileName: t('target-system')
        },
        
        {
          name: t('value-assignment'),
          field: "cpdownload",
          sortable: false,
          component: 'DocumentsList',
          valueFn: VADocumentListValueFromResult,
          mobileName:" ",
          isDownload : true
        },
        {
          name: t('value-assignment'),
          field: "cpdownloadarch",
          sortable: false,
          component: 'DocumentsList',
          valueFn: VAArchDocumentListValueFromResult,
          mobileName:" ",
          isDownload : true
        },
      ],
      instructionContent: "va-search-post-search-text",
      instructionContentOverrides : [
        {
          field: "title",
          // Values must be ALL CAPS
          values: ["ALINITY C CALIBRATORS","ARCHITECT CSYSTEMS CALIBRATORS", "ALINITY C CONTROLS", "ALINITY I CONTROLS", "ALINITY S-SERIES", "ARCHITECT ISYSTEMS CONTROLS", "ARCHITECT CSYSTEMS CONTROLS"],
          instructionContent: "value-assignments-alinity-text-post",
        },
        {
          field: "title",
          // Values must be ALL CAPS
          values: ["ALINITY H-SERIES"],
          instructionContent: "value-assignments-ALINITY_H_SERIES-text-post",
        },
        {
          field: "title",
          // Values must be ALL CAPS
          values:["CELL_DYN_18_PLUS", "CELL_DYN_22_PLUS", "CELL_DYN_26_PLUS", "CELL_DYN_29_PLUS"],
          instructionContent: "value-assignments-CELL-text-post",
        }
      ]
      /* Bulk downloads fail when too many files are requested
      bulkDownloadOverrides : [
          {
              field: "title",
              // Values must be ALL CAPS
              values: ["ARCHITECT CSYSTEMS CALIBRATORS"],
              hasBulkDownload : true
          }
      ]*/
    },
    assay_search : {
      useFacets : false,
      hasBulkDownload : true,
      resultsFields : [
        {
          name: t('assay-name'),
          field: 'cpfilename',
          sortable: true,
          component: 'textCollection',
          mobileName: " "
        },
        {
          name: t('assay-number'),
          field: 'cpassaynumber',
          sortable: true,
          component: 'text',
          mobileName: " "
        },
        {
          name: t('post-date'),
          field: 'cppostdate',
          sortable: true,
          component: 'DateCell',
          props: {
            dateFormat: t('date-format')
          },
          mobileName: t('expiration') + ": "
        },
        {
          name: t('version'),
          field: 'cpversion',
          sortable: true,
          component: 'text',
          mobileName: t('version') + ": "
        },
        {
          name: t('list-num'),
          field: 'cplistnumber',
          sortable: true,
          component: 'text',
          mobileName: t('list-num') + ": "
        },
        {
          name: t('condition'),
          field: 'cpcondition',
          sortable: true,
          component: 'text',
          mobileName: t('condition') + ": "
        },
        {
          name: t('mandatory'),
          field: 'cpmandatoryupgrade',
          sortable: true,
          component: 'ConditionPills',
          mobileName: t('mandatory') + ": "
        },
        {
          name: t('assay-file'),
          field: "cpdownload",
          sortable: false,
          component: 'DocumentsList',
          mobileName: "",
          valueFn: assayAlinityDocValueFromResult,
          isDownload : false
        },
        {
          name: t('assay-file'),
          field: "cpfilename",
          sortable: false,
          hidden: true,
          mobileName: "",
          valueFn: assayAlinityPackageValueFromResult,
          isDownload : true
        },
        {
          name: t('iso-image'),
          field: "cpdownloadiso",
          sortable: false,
          component: 'DocumentsList',
          mobileName: "",
          valueFn: assayItemValueFromResult,
          isDownload : true
        },
        {
          name: t('assay-info'),
          field: "cpdownloadspecinfo",
          sortable: false,
          component: 'DocumentsList',
          mobileName: "",
          valueFn: assayItemValueFromResult,
          isDownload : true
        },
        {
          name: t('cd-label'),
          field: "cpdownloadcdlabel",
          sortable: false,
          component: 'DocumentsList',
          mobileName: "",
          valueFn: assayItemValueFromResult,
          isDownload : true
        },
        {
          name: t('changed-assays'),
          field: "cpchangedassays",
          sortable: false,
          component: 'text',
          mobileName: "",
        },
        {
          name: t('new-assays'),
          field: "cpnewassays",
          sortable: false,
          component: 'text',
          mobileName: "",
        },
        {
          name: t('removed-assays'),
          field: "cpremovedassays",
          sortable: false,
          component: 'text',
          mobileName: "",
        },
      
      ],
      facetsOverrides : [
        {
          field: "cpproduct",
          // Values must be ALL CAPS
          values: ["ALINITY I", "ALINITY C", "ALINITY S"],
          useFacets : true
        },
      ],
      instructionContent: "apiError_opPostSearchInstructions",
      instructionContentOverrides : [
        {
          field: "cpproduct",
          // Values must be ALL CAPS
          values: ["ARCHITECT MULTIGENT SI","ARCHITECT MULTIGENT CONVENTIONAL","ARCHITECT I1000SR","ARCHITECT I2000/I2000SR","ARCHITECT C4/C8/C16 SPECIAL CHEMISTRY SI",
            "ARCHITECT C4/C8/C16 SPECIAL CHEMISTRY CONVENTIONAL","ARCHITECT C4/C8/C16 CSYSTEMS SI","ARCHITECT C4/C8/C16 CSYSTEMS CONVENTIONAL"],
          instructionContent: "apiError_opArchitectInstructions",
        },
      ]
      /***
       * sample of how to do bulk download overrides
       * ,
       bulkDownloadOverrides : [
       {
                    field: "cpproduct",
                    values: ["ALINITY I", "ALINITY C", "ALINITY S"],
                    hasBulkDownload : false
                }
       ]*/
    },
    coa_search : {
      useFacets : false,
      resultsFields : [
        {
          name: t('product-name'),
          field: 'cpproductname',
          sortable: true,
          component: 'text'
        },
        {
          name: t('list-number'),
          field: 'cplistnumber',
          sortable: true,
          component: 'text'
        },
        {
          name: t('product'),
          field: 'cpproduct',
          sortable: true,
          component: 'text'
        },
        {
          name: t('lot-number'),
          field: 'cplotnumber',
          sortable: true,
          component: 'text'
        },
        {
          name: t('lot-expiration-date'),
          field: 'cplotexpirationdate',
          sortable: true,
          component: 'DateCell',
          props: {
            dateFormat: t('date-format')
          },
        },
        {
          name: t('certificate-of-analysis-coa'),
          field: 'cpdownload',
          sortable: false,
          component: 'DocumentsList',
          mobileName: "",
          valueFn: certificateItemsFromResult,
          isDownload : true
        },
        {   /*** expecting "{\"filename\":\"6C36-43_28552FN00 Architect.pdf\",\"major\":\"1\",\"minor\":\"0\",\"searchType\":\"BATCH_VERIFICATION\",\"documentId\":\"6139aba40248d8669ed96868\"}"
           */
          name: t('batch-verification'),
          field: 'cpdownloadbatch',
          sortable: false,
          component: 'DocumentsList',
          mobileName: "",
          valueFn: batchItemsFromResult,
          isDownload : true
        },
      ],
      instructionContent: "coa_search-post-search-text",
    },
    opmanual_search : {
      useFacets : true,
      facetLayout: "top",
      resultsFields :[
        {
          name: t('product-name'),
          field: "cpproductname",
          sortable: true,
          component: 'PrefixedFacetText',
          mobileName: " "
        },
        {
          name: t('language'),
          field: "cplanguage",
          sortable: true,
          component: 'text',
        },
        {
          name: t('software-version'),
          field: "cpversion",
          sortable: true,
          component: 'text',
        },
        {
          name: t('manual-revision'),
          field: "cprevisionnumber",
          sortable: true,
          component: 'text',
        },
        {
          name: t('date-posted'),
          field: "cppostdate",
          sortable: true,
          component: 'DateCell',
          props: {
            dateFormat: t('date-format')
          },
        },
        {
          name: t('operations-manual'),
          field: "cpdownload",
          sortable: false,
          component: 'DocumentsList',
          valueFn: opmanualItemsFromResult,
          mobileName:" ",
          isDownload : true
        },
      ],
      instructionContent: "op-manual-cell-post-text",
      
      instructionContentOverrides :[
        {
          field: "cpproductname",
          values: ["ARCHITECT"],
          instructionContent: "op-manual-post-text",
        },
      ]
    },
    ce_search : {
      resultsFields :[
        {
          name: t('product-name'),
          field: "cpproductname",
          sortable: true,
          component: 'text',
          mobileName: " "
        },
        {
          name: t('product'),
          field: "title",
          sortable: true,
          component: 'text',
          mobileName: " "
        },
        {
          name: t('list-number'),
          field: "cplistnumber",
          sortable: true,
          component: 'text',
        },
        {
          name: t('product'),
          field: "cpproduct",
          sortable: true,
          component: 'text',
        },
        {
          name: t('manufacturing-site'),
          field: "cpmansite",
          sortable: true,
          component: 'PrefixedFacetText',
        },
        {
          name: t('abbr-aoc'),
          field: "cpdownloadaoc",
          sortable: false,
          component: 'DocumentsList',
          valueFn: CEDocumentListValueFromResult,
          isDownload : true
        },
        {
          name: t('abbr-doc'),
          field: "cpdownloaddoc",
          component: 'DocumentsList',
          valueFn: CEDocumentListValueFromResult,
          isDownload : true
        },
        {
          name: t('abbr-dec'),
          field: "cpdownloaddec",
          sortable: false,
          component: 'DocumentsList',
          valueFn: CEDocumentListValueFromResult,
          isDownload : true
        },
        {
          name: t('iso-certificates'),
          field: "cpdownloadiso",
          sortable: false,
          component: 'DocumentsList',
          valueFn: CEISODocumentListValueFromResult,
          mobileName:" ",
          isDownload : true
        },
      ],
      instructionContent: "apiError_cePostSearchInstructions"
    },
    prodrequire_search : {
      hasBulkDownload : true,
      resultsFields :[
        {
          name: t('product'),
          field: "title",
          
          sortable: true,
          component: 'PrefixedFacetText',
          mobileName: " "
        },
        {
          name: t('product-name'),
          field: "cpproductname",
          sortable: false,
          component: 'text',
          mobileName: " "
        },
        {
          name: t('language'),
          field: "cplanguage",
          sortable: false,
          component: 'text',
          mobileName: " "
        },
        {
          name: t('list-number'),
          field: "cplistnumber",
          sortable: true,
          component: 'text',
          mobileName: " "
        },
        {
          name: t('labeling-commodity-number'),
          field: "cpproductnumber",
          sortable: true,
          component: 'text',
          mobileName: " "
        },
        {
          name: t('revision'),
          field: "cprevisionnumber",
          sortable: true,
          component: 'text',
          mobileName: " "
        },
        {
          name: t('product-requirements'),
          field: "cpdownload",
          sortable: false,
          component: 'DocumentsList',
          valueFn: PRDocumentListValueFromResult,
          mobileName: " ",
          isDownload: true
        }
      ],
      instructionContent: "product-requirements-text-post"
    },
    pi_search : {
      useFacets : true,
      facetLayout: "top",
      hasBulkDownload: true,
      resultsFields: [
        {
          name: t('abbr-ifu'),
          field: "cpdownload",
          sortable: false,
          component: 'DocumentsList',
          valueFn: ifuItemItemValueFromResult,
          isDownload: true
        },
        {
          name: t('sop'),
          field: "cpdownloadsop",
          sortable: false,
          component: 'DocumentsList',
          valueFn: ifuItemItemValueFromResult,
          isDownload: true
        },
        {
          name: t('product-name'),
          field: "cpproductname",
          sortable: true,
          component: 'PrefixedFacetText',
          mobileName: " "
        },
        {
          name: t('product'),
          field: "cpproduct",
          sortable: true,
          component: 'text',
          mobileName: " "
        },
        {
          name: t('product-type'),
          field: "cpproducttype",
          sortable: true,
          component: 'text'
        },
        {
          name: t('solution'),
          field: "cpsolution",
          sortable: true,
          component: 'text'
        },
        {
          name: t('product-list-number'),
          field: "cplistnumber",
          sortable: true,
          component: 'text'
        },
        {
          name: t('lot-number'),
          field: "cplotnumber",
          sortable: true,
          component: 'text'
        },
        {
          name: t('lot-expiration-date'),
          field: 'cplotexpirationdate',
          sortable: true,
          component: 'DateCell',
          props: {
            dateFormat: t('date-format')
          },
        },
        {
          name: t('insert-number'),
          field: "cpinsertnumber",
          sortable: true,
          component: 'text'
        },
        {
          name: t('revision-r'),
          field: "cprevisionnumber",
          sortable: true,
          component: 'text'
        },
        {
          name: t('language'),
          field: "cplanguage",
          sortable: true,
          component: 'text',
          formatValueFn: ifuFormatLang
        }
      ],
      instructionContent: "pi-search-post-search-text",
    },
    accred_search :  {
      resultsFields :[
        {
          name: t('product'),
          field: "cpproduct",
          sortable: true,
          component: 'PrefixedFacetText',
          mobileName: " "
        },
        {
          name: t('reagent'),
          field: "cpreagent",
          sortable: true,
          component: 'text'
        },
        {
          name: t('list-number'),
          field: "cplistnumber",
          sortable: true,
          component: 'text',
        },
        {
          name: t('language'),
          field: "cplanguage",
          sortable: true,
          component: 'text'
        },
        {
          name: t('sh-form-43'),
          field: "cpdownload",
          sortable: false,
          component: 'DocumentsList',
          valueFn: accreditationValueFromResult
        }
      ],
      instructionContent: "accred_search-post-search-text",
    }
  };
  
  return {
    searchTypesDisplayConfig,
    initiateDownload
  }
}