import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { ESL_EPT } from "../../../customerportal/forms/commonContants";
import { getPageDataAttributes, eslConfigDatasets } from "../../../customerportal/forms/common";
import { useSharedInstrumentFlags } from '../shared/InstrumentFlags';

export const pinService = () => {

  const { setPinError } = useSharedInstrumentFlags()

  const pinSwitch = (labId, serialNo) => {
    const pinData = {
      "action": "instrumentPref",
      "userInfo": {
        "additionalProperties": {
          "customerId": labId,
          "instrumentSerialNumber": serialNo,
        }
      }

    }
    doPinSwitchRequest(pinData)
  }


  const doPinSwitchRequest = (data) => {
    const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
    const url = eslEndpoint + ESL_EPT?.PINNING;
    
    const headers = getPageDataAttributes();

    headers['Content-Type'] = 'application/json'

    const token = window.getCookie("jwtToken");
    headers["x-id-token"] = token;

    const config = {
      url: url,
      headers: headers,
    };

    axios.post(url, data, config)
      .then(function (response) {
        window.hideLoading()
        if (response?.data?.errorCode != 0 && response?.data?.errorCode != 200) {
          setPinError(true)
        }
      })
      .catch(function (error) {
        setPinError(true)
        window.hideLoading()
        
      });
  }


  return {
    pinSwitch,
  }

};


