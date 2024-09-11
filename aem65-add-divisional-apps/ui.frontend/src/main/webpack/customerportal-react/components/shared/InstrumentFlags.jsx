import React, { useState, useCallback, useEffect } from 'react';
import { useBetween } from 'use-between';
import { useSharedSort } from "./Sort";


const instFlags = () => {

  // Data Received Flags *****************************

  const [gotInstruments, setGot] = useState(false)
  const [gotTickets, setGotTheTickets] = useState(false)
  const [gotOpertingHours, setGotTheOpertingHours] = useState(false)
  const [gotProductAvailable, setGotTheProductAvailable] = useState(false)
  const [gotIncidentBtnIsvisble, setGotTheIncidentBtnIsvisble] = useState(false)
  const [gotOpertingLoading, setGotTheOpertingLoading] = useState(false)
  const [gotOpertingFail, setGotTheOpertingFail] = useState(false)
  const [gotServicePlanReport, setGotServicePlan] = useState(false)
  const [gotMaintenanceReport, setGotMaintenance] = useState(false)
  const [gotUptimeReport, setGotUptime] = useState(false)
  const [gotTicketDetails, setGotTheTicketDetails] = useState(false)
  const [commentMessage, setTheCommentMessage] = useState(false)

  const setGotInstruments = useCallback((f) => {
    setGot(f);
  }, []);

  const setGotTickets = useCallback((f) => {
    setGotTheTickets(f);
  }, []);

  const setGotOpertingHours = useCallback((f) => {
    setGotTheOpertingHours(f);
  }, []);

  const setGotProductAvailable = useCallback((f) => {
    setGotTheProductAvailable(f);
  }, []);

  const setGotIncidentBtnIsvisble = useCallback((f) => {
    setGotTheIncidentBtnIsvisble(f);
  }, []);

  const setGotOpertingLoading = useCallback((f) => {
    setGotTheOpertingLoading(f);
  }, []);

  const setGotOpertingFail = useCallback((f) => {
    setGotTheOpertingFail(f);
  }, []);

  const setGotServicePlanReport = useCallback((f) => {
    setGotServicePlan(f)
  }, [])

  const setGotMaintenanceReport = useCallback((f) => {
    setGotMaintenance(f)
  }, [])

  const setGotUptimeReport = useCallback((f) => {
    setGotUptime(f)
  }, [])

  const setGotTicketDetails = useCallback((f) => {
    setGotTheTicketDetails(f)
  }, [])

  const setCommentMessage = useCallback((f) => {
    setTheCommentMessage(f)
  }, [])

  // Error Flags ****************************

  const [isError, setError] = useState(false);
  const [isTicketError, setTheTicketError] = useState(false)
  const [isServicePlanError, setEntitlementGsrError] = useState(false)
  const [isInstrumentMaintenanceError, setScoreGsrError] = useState(false)
  const [isUptimeError, setMetricGsrError] = useState(false)
  const [servicePlanErrorCode, setEntitlementGsrErrorCode] = useState(null)
  const [instrumentMaintenanceErrorCode, setScoreGsrErrorCode] = useState(null)
  const [uptimeErrorCode, setMetricGsrErrorCode] = useState(null)
  const [instrumentErrorCode, setTheInstrumentErrorCode] = useState(null)
  const [isCommentError, setIsACommentError] = useState(false)
  const [commentErrorCode, setTheCommentErrorCode] = useState(null)
  const [ticketErrorCode, setTheTicketErrorCode] = useState(null)
  const [isTicketDetailsError, setTheTicketDetailsError] = useState(false)
  const [ticketDetailsErrorCode, setTheTicketDetailsErrorCode] = useState(null)

  const setTicketError = useCallback((f) => {
    setTheTicketError(f);
  }, []);

  const setServicePlanError = useCallback((f) => {
    setEntitlementGsrError(f);
  }, []);

  const setInstrumentMaintenanceError = useCallback((f) => {
    setScoreGsrError(f);
  }, []);

  const setUptimeError = useCallback((f) => {
    setMetricGsrError(f);
  }, []);

  const setServicePlanErrorCode = useCallback((f) => {
    setEntitlementGsrErrorCode(f);
  }, []);

  const setInstrumentMaintenanceErrorCode = useCallback((f) => {
    setScoreGsrErrorCode(f);
  }, []);

  const setUptimeErrorCode = useCallback((f) => {
    setMetricGsrErrorCode(f);
  }, []);

  const setInstrumentErrorCode = useCallback((f) => {
    setTheInstrumentErrorCode(f);
  }, []);

  const setIsCommentError = useCallback((f) => {
    setIsACommentError(f);
  }, []);

  const setCommentErrorCode = useCallback((f) => {
    setTheCommentErrorCode(f);
  }, [])

  const setTicketErrorCode = useCallback((f) => {
    setTheTicketErrorCode(f);
  }, [])

  const setIsTicketDetailsError = useCallback((f) => {
    setTheTicketDetailsError(f);
  }, [])

  const setTicketDetailsErrorCode = useCallback((f) => {
    setTheTicketDetailsErrorCode(f);
  }, [])

  // Loading Flags *****************************

  const [isLoading, setLoading] = useState(false);
  const [ticketIsLoading, setTicketLoading] = useState(false)
  const [servicePlanIsLoading, setEntitlementGsrLoading] = useState(false)
  const [instrumentMaintenanceIsLoading, setScoreGsrLoading] = useState(false)
  const [uptimeIsLoading, setMetricGsrLoading] = useState(false)
  const [ticketDetailsIsLoading, setTicketDetailsLoading] = useState(false)
  const [commentIsLoading, setCommentLoading] = useState(false)

  const setIsLoading = useCallback((f) => {
    setLoading(f);
  }, []);

  const setTicketIsLoading = useCallback((f) => {
    setTicketLoading(f);
  }, []);

  const setServicePlanIsLoading = useCallback((f) => {
    setEntitlementGsrLoading(f);
  }, []);

  const setInstrumentMaintenanceIsLoading = useCallback((f) => {
    setScoreGsrLoading(f);
  }, []);

  const setUptimeIsLoading = useCallback((f) => {
    setMetricGsrLoading(f);
  }, []);

  const setTicketDetailsIsLoading = useCallback((f) => {
    setTicketDetailsLoading(f)
  }, []);

  const setCommentIsLoading = useCallback((f) => {
    setCommentLoading(f)
  }, [])

  // No Data Returned Flags ***********************
  
  const [noServicePlanResults, setNoEntitlementGsr] = useState(false)
  const [noInstrumentMaintentanceResults, setNoScoreGsr] = useState(false)
  const [noUptimeResults, setNoMetricGsr] = useState(false)
  const [noTicketDetails, setAreNoTicketDetails] = useState(false)

  const setNoServicePlanResults = useCallback((f) => {
    setNoEntitlementGsr(f);
  }, []);

  const setNoInstrumentMaintenanceResults = useCallback((f) => {
    setNoScoreGsr(f);
  }, []);

  const setNoUptimeResults = useCallback((f) => {
    setNoMetricGsr(f);
  }, []);

  const setNoTicketDetails = useCallback((f) => {
    setAreNoTicketDetails(f);
  }, []);

  // *******************************

  const [results, setResults] = useState([]);
  const [currentFields, setCurrentFields] = useState([]);
  const { setSearchSort, sort } = useSharedSort();

  // Pinning & Nickname Flags ***********************************
  const [pinnedFirst, setIsPinnedFirst] = useState('default') 
  const [pinError, setThePinError] = useState(false)
  const [nicknameError, setTheNicknameError] = useState(false)

  const setPinnedFirst = useCallback((f) => {
    setIsPinnedFirst(f);
  }, []);

  const setPinError = useCallback((f) => {
    setThePinError(f);
  }, []);

  const setNicknameError = useCallback((f) => {
    setTheNicknameError(f);
  }, []);

  // Search/Filter/Sort Related Flags ********************

  const [hasSearched, setHasSearched] = useState(false);
  const [hasSearchedProdType, setSearchedProdType] = useState(false)
  const [hasSearchedProdName, setSearchedProdName] = useState(false)
  const [instType, setType] = useState([{}])
  const [instName, setName] = useState([{}])
  const [isDisabled, setDisabled] = useState(false);
  const [dropdownDisabled, setTheDropdownDisabled] = useState(true)

  const setHasSearchedProdType = useCallback((f) => {
    setSearchedProdType(f)
  }, [])

  const setHasSearchedProdName = useCallback((f) => {
    setSearchedProdName(f)
  }, [])

  const setInstType = useCallback((f) => {
    setType(f)
  }, [])

  const setInstName = useCallback((f) => {
    setName(f)
  }, [])

  const setDropdownDisabled = useCallback((f) => {
    setTheDropdownDisabled(f)
  }, [])

  const setIsDisabled = useCallback((f) => {
    setDisabled(f);
  }, []);

  const setSearchError = useCallback((f) => {
    setError(f);
  }, []);

  // listen to changes to the sort's state
  useEffect(() => {
    const newSort = { fields: {}, isSearching: false }
    // clean up sort by removing any sort objects for fields that aren't in the current results set
    Object.keys(sort.fields).map((key) => {
      if (currentFields.some((field) => {
        return field == key;
      })) {
        // if the current results set contains the current sort's field, add it back in
        newSort.fields[key] = sort.fields[key];
      }
    });

    setSearchSort(newSort);
  }, [currentFields]);

  return {
    results,
    currentFields,
    isLoading,
    setIsLoading,
    ticketIsLoading,
    setTicketIsLoading,
    servicePlanIsLoading,
    setServicePlanIsLoading,
    instrumentMaintenanceIsLoading,
    setInstrumentMaintenanceIsLoading,
    uptimeIsLoading,
    setUptimeIsLoading,
    isDisabled,
    setIsDisabled,
    hasSearched,
    setHasSearched,
    gotInstruments,
    setGotInstruments,
    gotTickets,
    setGotTickets,
    gotServicePlanReport,
    setGotServicePlanReport,
    gotMaintenanceReport,
    setGotMaintenanceReport,
    gotUptimeReport,
    setGotUptimeReport,
    hasSearchedProdType,
    setHasSearchedProdType,
    hasSearchedProdName,
    setHasSearchedProdName,
    instType,
    setInstType,
    instName,
    setInstName,
    dropdownDisabled,
    setDropdownDisabled,
    isError,
    setSearchError,
    isTicketError,
    setTicketError,
    isServicePlanError,
    setServicePlanError,
    isInstrumentMaintenanceError,
    setInstrumentMaintenanceError,
    isUptimeError,
    setUptimeError,
    noServicePlanResults,
    setNoServicePlanResults,
    noInstrumentMaintentanceResults,
    setNoInstrumentMaintenanceResults,
    noUptimeResults,
    setNoUptimeResults,
    pinnedFirst,
    setPinnedFirst,
    pinError,
    setPinError,
    nicknameError,
    setNicknameError,
    gotTicketDetails,
    setGotTicketDetails,
    noTicketDetails,
    setNoTicketDetails,
    ticketDetailsIsLoading,
    setTicketDetailsIsLoading,
    servicePlanErrorCode,
    setServicePlanErrorCode,
    instrumentMaintenanceErrorCode,
    setInstrumentMaintenanceErrorCode,
    uptimeErrorCode,
    setUptimeErrorCode,
    instrumentErrorCode,
    setInstrumentErrorCode,
    commentMessage,
    setCommentMessage,
    isCommentError,
    setIsCommentError,
    commentErrorCode,
    setCommentErrorCode,
    commentIsLoading,
    setCommentIsLoading,
    ticketErrorCode,
    setTicketErrorCode,
    isTicketDetailsError,
    setIsTicketDetailsError,
    ticketDetailsErrorCode,
    setTicketDetailsErrorCode,
    gotOpertingHours,
    setGotOpertingHours,
    gotOpertingFail,
    setGotOpertingFail,
    gotOpertingLoading,
    setGotOpertingLoading,
    gotProductAvailable,
    setGotProductAvailable,
    gotIncidentBtnIsvisble,
    setGotIncidentBtnIsvisble
  };
}

export const useSharedInstrumentFlags = () => useBetween(instFlags);