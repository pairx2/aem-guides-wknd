import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useSharedInstrumentFlags } from "../shared/InstrumentFlags";
import { ESL_EPT } from "../../../customerportal/forms/commonContants";
import { getPageDataAttributes, eslConfigDatasets } from "../../../customerportal/forms/common";
import { useSharedInstrumentData } from '../shared/InstrumentData'
import { useSharedLabProfiles } from '../shared/LabProfiles'


export const instrumentService = () => {
  const {

    setIsLoading,
    setSearchError,
    setInstrumentErrorCode
  } = useSharedInstrumentFlags()


  const { setMyInstruments, setPageCount } = useSharedInstrumentData()
  const { selectedLabProfile } = useSharedLabProfiles()
  const onSearchSuccess = (response) => {
    // get results from response
    const results = response?.data?.response
    if (response?.data?.errorCode == 0) {
      setMyInstruments((results) ?? []);
      if (results) {
        // Below sets how many pages of results there will be with 12 instruments on each page.
          setPageCount((Math.floor(results.myInstruments.length/12)) + (results.myInstruments.length % 12 == 0? 0 : 1))
      }
      // **********************
    } else {
      setInstrumentErrorCode(response?.data?.errorCode)
      setSearchError(true)
    }
    setIsLoading(false);
  };

  const onSearchFailure = (error) => {
    setIsLoading(false);
  };

  const doFullInstrumentSearch = () => {

    const instSearchData = {
      "action": "getAllInstruments",
      "userInfo": {
        "additionalProperties": {
          "customerId": selectedLabProfile.labProfileId
        }
      }
    }
    setIsLoading(true)
    doFullInstrumentSearchRequest(instSearchData, onSearchSuccess, onSearchFailure)
  }

  const doFullInstrumentSearchRequest = (data, onSuccess, onFailure) => {
    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    const url = eslEndpoint + ESL_EPT?.MY_INSTRUMENTS;

    const headers = getPageDataAttributes();

    headers['Content-Type'] = 'application/json'
    if (selectedLabProfile) {
      const token = window.getCookie("jwtToken");
      headers["x-id-token"] = token;
    }

    const config = {
      url: url,
      headers: headers,
    };

    axios.post(url, data, config)
      .then(function (response) {
        onSuccess(response);
      })
      .catch(function (error) {
        onFailure(error);
        setSearchError(true)
      });

  };

  return {
    doFullInstrumentSearch,
  }
}
