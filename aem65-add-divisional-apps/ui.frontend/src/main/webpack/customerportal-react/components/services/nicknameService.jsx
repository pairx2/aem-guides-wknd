import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { ESL_EPT } from "../../../customerportal/forms/commonContants";
import { getPageDataAttributes, eslConfigDatasets } from "../../../customerportal/forms/common";
import { useSharedInstrumentFlags } from '../shared/InstrumentFlags';


export const nicknameService = () => {

    const { setNicknameError } = useSharedInstrumentFlags()

    const changeNickname = (instId, serialNo, nn, systemId, labId) => {
        const nicknameData = {
            "action": "updateNicknameForInstrument",
            "userInfo": {
                "additionalProperties": {
                    "cmsNextInstrumentId": instId,
                    "instrumentSerialNumber": serialNo,
                    "nickname": nn,
                    "systemId": systemId,
                    "customerId": labId
                }
            }
        }
        doNicknameChangeRequest(nicknameData)
    }


    const doNicknameChangeRequest = (data) => {

        const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
        const url = eslEndpoint + ESL_EPT?.NICKNAMES;
        
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
                    setNicknameError(true)
                }
            })
            .catch(function (error) {
                setNicknameError(true)
                window.hideLoading()
            });
    }


    return {
        changeNickname
    }

};


