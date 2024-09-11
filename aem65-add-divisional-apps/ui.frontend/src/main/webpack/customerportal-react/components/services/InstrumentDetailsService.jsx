import React, { useState, useCallback } from "react";
import moment from 'moment'
import axios from "axios";
import { useSharedInstrumentFlags } from "../shared/InstrumentFlags";
import { ESL_EPT } from "../../../customerportal/forms/commonContants";
import {
  getPageDataAttributes,
  eslConfigDatasets,
} from "../../../customerportal/forms/common";
import { useSharedInstrumentData } from "../shared/InstrumentData";
import { saveAs } from "file-saver";
import { useSharedLabIncidentsFlags } from "../shared/LabIncidentsFlags";
import countryTimezone from "country-timezone";

export const instrumentDetailsService = () => {
  const {
    setTicketIsLoading,
    setServicePlanIsLoading,
    setInstrumentMaintenanceIsLoading,
    setUptimeIsLoading,
    setGotTickets,
    setGotServicePlanReport,
    setGotMaintenanceReport,
    setGotUptimeReport,
    setTicketError,
    setServicePlanError,
    setInstrumentMaintenanceError,
    setUptimeError,
    setGotTicketDetails,
    setTicketDetailsIsLoading,
    setServicePlanErrorCode,
    setInstrumentMaintenanceErrorCode,
    setUptimeErrorCode,
    setTicketErrorCode,
    setIsTicketDetailsError,
    setTicketDetailsErrorCode,
    setGotOpertingHours,
    setGotOpertingLoading,
    setGotOpertingFail,
    setGotProductAvailable,
    setGotIncidentBtnIsvisble
  } = useSharedInstrumentFlags();

  const {
    setTickets,
    setServicePlanReport,
    setInstrumentMaintenanceReport,
    setUptimeReport,
    setTicketDetails,
  } = useSharedInstrumentData();

  const { setDownloadError } = useSharedLabIncidentsFlags();


  // Note: the token does not seem to be reachable via the usual getCookie method, so this little work-around grabs it from document.cookie
  const getToken = () => {
    let cookies = document.cookie.split("; ");
    let myCookie = [];
    cookies.filter((cookie) => {
      if (cookie.slice(0, 8) == "jwtToken") {
        myCookie.push(cookie);
      }
    });
    let token = [];
    for (let i = 9; i < myCookie[0].length; i++) {
      token.push(myCookie[0][i]);
    }
    let myToken = token.join("");
    return myToken;
  };

  // *********** Entitlements & GSR Services ***********************************

  // Collects the serial number and the kind of report and distributes the request accordingly. The type of report will either be servicePlan, instrumentMaintenance, or uptime
  const doReport = (guid, reportType, instId, labProfile) => {
    switch (reportType) {
      case "servicePlan":
        setServicePlanIsLoading(true);
        break;
      case "instrumentMaintenance":
        setInstrumentMaintenanceIsLoading(true);
        break;
      case "uptime":
        setUptimeIsLoading(true);
        break;
    }
    doReportRequest(guid, reportType, instId, labProfile);
  };

  const onReportFailure = (error, reportType) => {
    switch (reportType) {
      case "servicePlan":
        setServicePlanError(true);
        setServicePlanIsLoading(false);
        break;
      case "instrumentMaintenance":
        setInstrumentMaintenanceError(true);
        setInstrumentMaintenanceIsLoading(false);
        break;
      case "uptime":
        setUptimeError(true);
        setUptimeIsLoading(false);
        break;
    }
  };

  const onReportSuccess = (response, reportType) => {
    // get results from response
    const data = response?.data;
    const results = data?.response;

    if (data?.errorCode == 0) {
      switch (reportType) {
        case "servicePlan":
          setServicePlanReport(results[0] ?? []);
          setGotServicePlanReport(true);
          setServicePlanIsLoading(false);
          break;
        case "instrumentMaintenance":
          setInstrumentMaintenanceReport(results ?? []);
          setGotMaintenanceReport(true);
          setInstrumentMaintenanceIsLoading(false);
          break;
        case "uptime":
          setUptimeReport(results ?? []);
          setGotUptimeReport(true);
          setUptimeIsLoading(false);
          break;
      }
    } else {
      switch (reportType) {
        case "servicePlan":
          setServicePlanErrorCode(data?.errorCode);
          setServicePlanError(true);
          setServicePlanIsLoading(false);
          break;
        case "instrumentMaintenance":
          setInstrumentMaintenanceErrorCode(data?.errorCode);
          setInstrumentMaintenanceError(true);
          setInstrumentMaintenanceIsLoading(false);
          break;
        case "uptime":
          setUptimeErrorCode(data?.errorCode);
          setUptimeError(true);
          setUptimeIsLoading(false);
          break;
      }
    }
  };

  const doReportRequest = (guid, reportType, instId, labProfile) => {
    let data = {};
    let url;
    let eslEndpoint;

    switch (reportType) {
      case "servicePlan":
        data["action"] = "getInstrumentEntitlementsReports";
        data["userInfo"] = {
          additionalProperties: {
            instrumentID: instId,
          },
        };
        eslEndpoint = eslConfigDatasets()?.eslEndpoint;
        url = eslEndpoint + ESL_EPT?.ENTITLEMENTS_SERVICEPLAN;
        break;
      case "instrumentMaintenance":
        data["serialNumber"] = guid;
        data["eventType"] = "gsrScore";
        data["action"] = "GETSCORE";
        eslEndpoint = eslConfigDatasets()?.eslEndpoint;
        url = eslEndpoint + ESL_EPT?.SCORE_GSR_INSTRUMENTMAINTENANCE;
        break;
      case "uptime":
        data["serialNumber"] = guid;
        data["eventType"] = "gsrMetrics";
        data["action"] = "GETMETRICS";

        eslEndpoint = eslConfigDatasets()?.eslEndpoint;
        url = eslEndpoint + ESL_EPT?.METRICS_GSR_UPTIME;
        break;
    }

    const headers = getPageDataAttributes();

    let myCookie = getToken();

    headers["x-id-token"] = myCookie;

    const config = {
      url: url,
      headers: headers,
    };

    axios
      .post(url, data, config)
      .then(function (response) {
        onReportSuccess(response, reportType);
      })
      .catch(function (error) {
        onReportFailure(error, reportType);
      });
  };

  // ******** Incident Services ***********************************************

  const onTicketSuccess = (response) => {
    // get results from response
    const results = response?.data?.response;
    if (response?.data.errorCode == 0 || response.data.errorCode == 200) {
      setTickets(results ?? []);
      setGotTickets(true);
    } else {
      setTicketError(true);
      setTicketErrorCode(response?.data.errorCode);
    }
    setTicketIsLoading(false);
  };

  const onTicketFailure = (error) => {
    setTicketError(true);
    setTicketIsLoading(false);
  };

  const doTicketSearch = (guid, profile) => {
    const ticketData = {
      action: "getIncidentForInstrument",
      userInfo: {
        additionalProperties: {
          customerId: profile,
          instrumentSerialNumber: guid,
        },
      },
    };
    setTicketIsLoading(true);
    doTicketRequest(ticketData, onTicketSuccess, onTicketFailure);
  };

  const doSubmitionTimeData = (data, information) => {
    setGotOpertingLoading(true);
    let myCookie = getToken();

    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    const url = eslEndpoint + ESL_EPT?.TICKET_OPERATIONHOUURS;

    const headers = getPageDataAttributes();
    headers["Content-Type"] = "application/json";

    headers["x-id-token"] = myCookie;

    const config = {
      url: url,
      headers: headers,
    };

    axios
      .post(url, data, config)
      .then(function (response) {
        setGotOpertingLoading(false);
        onSuccessSubmitionTime(response, information);
      })
      .catch(function (error) {
        setGotOpertingLoading(false);
        onFailureSubmitionTime(error);
      });
  };

  const onSuccessSubmitionTime = (response, inform) => {
    if(response.data.response.productCodes.length != 0) {
      if(response.data.response.productCodes[0].Incident_Reporting__c) {
        setGotIncidentBtnIsvisble(true);
      } else {
        setGotIncidentBtnIsvisble(false);
      }
      var timeZoneDay = response.data.response.operatingHours[0].operatingHour.OperatingHours.TimeZone;
      var currentDate = getCurrentDate(response.data.response.operatingHours, inform, timeZoneDay);

      var opertionHours = getOpertionalHours(currentDate[0]);
      setGotOpertingHours(opertionHours);
      setGotProductAvailable(true);
    } else {
      setGotProductAvailable(false);
    }
    

  };

  const getCurrentDate = (data, inform, timeZoneDay) => { 
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let d = new Date().toLocaleString('en-US', {timeZone: timeZoneDay});
    var todayNY = new Date(d);

    let day = weekday[todayNY.getDay()];
    var dayOfweek = [];
    for(let i  in data) {
        if(data[i].operatingHour.DayOfWeek === day) {
            dayOfweek.push(data[i]);
        }
    }

    var informatics = [];

    for(let i in dayOfweek) {
      var informaticAvailable = dayOfweek[i].operatingHour.OperatingHours.Lab_Central_Operating_Hours_Type__c;
      if(inform) {
        if(informaticAvailable == "Informatics Incident Reporting Hours") {
          informatics.push(dayOfweek[i]);
        } 
      } else {
        if(informaticAvailable == "Non Informatics Incident Reporting Hours") {
          informatics.push(dayOfweek[i]);
        }
      }
    }

    if(informatics.length != 0) {
      setGotProductAvailable(true);
    } else {
      setGotProductAvailable(false);
    }

    return informatics;
  }

  const getOpertionalHours = (data) => {
    var timezonesWithCode = data.operatingHour.OperatingHours.TimeZone;

    const currentTime = getLocalTime(timezonesWithCode);

    const format = 'hh:mm:ss';

    const time = moment(currentTime, format);
    const beforeTime = moment(data.operatingHour.StartTime, format);
    const afterTime = moment(data.operatingHour.EndTime, format);
    if (time.isBetween(beforeTime, afterTime)) {
      return true;
    } else {
      return false;
    }
  };

  function getLocalTime(timeZone) {
    return new Date().toLocaleTimeString("en-GB", { timeZone });
  }

  const onFailureSubmitionTime = (error) => {
    setGotOpertingFail(true);
  };

  const doTicketRequest = (data, onSuccess, onFailure) => {
    let myCookie = getToken();

    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    const url = eslEndpoint + ESL_EPT?.INSTRUMENT_TICKETS;

    const headers = getPageDataAttributes();
    headers["Content-Type"] = "application/json";

    headers["x-id-token"] = myCookie;

    const config = {
      url: url,
      headers: headers,
    };

    axios
      .post(url, data, config)
      .then(function (response) {
        onSuccess(response);
      })
      .catch(function (error) {
        onFailure(error);
      });
  };

  // ******** Incident Details Services ***************************

  const onTicketDetailsSuccess = (response) => {
    const results = response?.data?.response;
    if (response?.data?.errorCode == 0 || response?.data?.errorCode == 0) {
      setTicketDetails(results ?? []);
      setGotTicketDetails(true);
      setTicketDetailsIsLoading(false);
    } else {
      setTicketDetailsErrorCode(response.data.errorCode);
      setIsTicketDetailsError(true);
    }
  };
  const onTicketDetailsFailure = (error) => {
    setIsTicketDetailsError(true);
  };

  const doTicketDetailsSearch = (ticketNumber) => {
    const data = {
      action: "getIncidentTicket",
      TicketNumber: ticketNumber,
    };
    doTicketDetailsSearchRequest(
      data,
      onTicketDetailsSuccess,
      onTicketDetailsFailure
    );
  };

  const doTicketDetailsSearchRequest = (data, onSuccess, onFailure) => {
    let myCookie = getToken();
    let eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    let url = eslEndpoint + ESL_EPT?.TICKET_DETAILS;
    let headers = getPageDataAttributes();
    headers["Content-Type"] = "application/json";
    headers["x-id-token"] = myCookie;
    const config = {
      url: url,
      headers: headers,
    };
    axios
      .post(url, data, config)
      .then(function (response) {
        onSuccess(response);
      })
      .catch(function (error) {
        onFailure(error);
      });
  };

  // ******** FSR Download Services ********************************

  const downloadFsrReport = (ticket, incidentNumber) => {
    doDownloadFsrReportRequest(ticket, incidentNumber);
  };

  const onDownloadSuccess = async (response, ticket, incidentNumber) => {
    try {
      if (response.data.errorCode == 400) {
        window.hideLoading();
        setDownloadError(true);
      } else {
        try {
          let baseString = response?.data?.response.attachmentBytes;
          const base64 = await fetch(
            `data:application/pdf;base64,${baseString}`
          );
          let blob = await base64.blob();
          saveAs(blob, `fieldServiceReport_${incidentNumber}`);
          window.hideLoading();
        } catch (e) {
          window.hideLoading();
          setDownloadError(true);
        }
      }
    } catch (e) {
      window.hideLoading();
      setDownloadError(true);
    }
  };

  const onDownloadFailure = (error) => {
    window.hideLoading();
    setDownloadError(true);
  };

  const doDownloadFsrReportRequest = (ticket, incidentNumber) => {
    let fsrData = {
      ticketId: ticket,
      action: "getFsrReport",
    };
    let eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    let url = eslEndpoint + ESL_EPT?.FSR_DOWNLOAD;
    const headers = getPageDataAttributes();

    let myCookie = getToken();

    headers["x-id-token"] = myCookie;

    const config = {
      url: url,
      headers: headers,
    };

    axios
      .post(url, fsrData, config)
      .then(function (response) {
        onDownloadSuccess(response, ticket, incidentNumber);
      })
      .catch(function (error) {
        onDownloadFailure(error);
        setDownloadError(true);
        window.hideLoading();
      });
  };

  // ************************************************************

  return {
    doReport,
    doTicketSearch,
    doTicketDetailsSearch,
    downloadFsrReport,
    doSubmitionTimeData,
  };
};
