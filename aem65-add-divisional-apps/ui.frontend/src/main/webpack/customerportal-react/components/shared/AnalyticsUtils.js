import React, {useState, useCallback, useMemo } from 'react';
import {useBetween} from 'use-between';
import {useSharedLabProfiles} from "./LabProfiles";
import {useSharedFilters} from "./Filters";
import {useSharedResults} from "./Results";

const analyticsUtils = () => {
  const { selectedLabProfile, userRole} = useSharedLabProfiles();
  const { filters, filterSearchType} = useSharedFilters();
  const {resultDocumentLanguage, resultsSearchType} = useSharedResults();
  
  const [analyticsActiveDownloads, setAnalyticsActiveDownloadsState] = useState({
    fileLanguage: [], // if applicable
    fileName: [],
    fileType: []}
  );
  
  const analyticsUserAndLabObject = useMemo(() => {
    return {
      "lab" : {
        "labId" : selectedLabProfile?.labProfileId,
        "labType" : (selectedLabProfile?.primary == "true" ? "primary" : "not_primary")
      },
      "user" : {
        "userRole" : (userRole == "employee" ? "employee" : "customer"),
        "userLoginStatus" : "authenticated"
      }
    }
  }, [userRole, selectedLabProfile]);
  
  const setAnalyticsActiveDownloads = useCallback((f) => {
    setAnalyticsActiveDownloadsState(f);
  }, []);
  
  
  const formatAnalyticsFileObject = useCallback((downloadRow) => {
    const formatFn = analyticsFormatters[downloadRow.searchType];
    if (formatFn && typeof formatFn == "function") {
      return formatFn(downloadRow);
    } else {
      return defaultFileObj(downloadRow);
    }
  });
  
  const defaultFileObj = (downloadRow) => {
    const language = filters.currentFilters[0]["cplanguage"] ?? "N/A";
    return {
      fileLanguage: language, // if applicable
      fileName: downloadRow.documentId,
      fileType: downloadRow.searchType
    }
  }
  
  /***
   * Sample Payload:
   * '[{"documentRequest":{"document":[{"gtin":"00380740162931","searchType":"ASSAY_FILE_ALINITY_ASSAY","ceMarkStatus":"Y","assayName":"HBsAg_Conf","platform":"Alinity s",
   * "labelFile":"170_2_06P03-5A_3.lbl",
   * "assayFile":"170_002_s.ap"}]}}]'
   */
  const assayAlinityFileObj = (downloadRow) => {
    const language = resultDocumentLanguage?.value ?? "N/A";
    return {
      fileLanguage: language,
      fileName: downloadRow.assayFile,
      fileType: downloadRow.searchType
    }
  }
  
  const analyticsFormatters = {
    ASSAY_FILE_ALINITY_ASSAY : assayAlinityFileObj
  }
  
  const formatAnalyticsSearchObject = useCallback(() => {
    /***
     * sample object:
     * ["cpproduct=Alinity+i","cplanguage=en","cpusavail=en"]
     */
  
    try {
      const searchObj = {
        searchType: filterSearchType,
        searchFilters: []
      };
      const currentFilters = filters.currentFilters[0];
      Object.keys(currentFilters).forEach(key => {
        let value = currentFilters[key];
        value = encodeURI(value).replace(/%20/g, "+");
        searchObj.searchFilters.push(`${key}=${value}`);
      });
      return searchObj;
    }
    catch (err) {
      console.error("error building analytics search object");
      console.error(err);
      return {};
    }
  }, [filters, resultsSearchType])
  
  const fireAnalyticsEvent = useCallback( (eventName, eventObj) => {
    window.addAnalytics.fireAnalyticsEvent(eventName, eventObj);
  }, []);
  
  return {
    analyticsUserAndLabObject,
    fireAnalyticsEvent,
    analyticsActiveDownloads,
    setAnalyticsActiveDownloads,
    formatAnalyticsFileObject,
    formatAnalyticsSearchObject
  };
}

export const useAnalyticsUtils = () => useBetween(analyticsUtils);






