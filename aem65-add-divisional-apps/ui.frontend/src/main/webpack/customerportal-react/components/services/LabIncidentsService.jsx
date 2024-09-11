import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { ESL_EPT } from "../../../customerportal/forms/commonContants";
import { getPageDataAttributes, eslConfigDatasets } from "../../../customerportal/forms/common";
import { useSharedLabIncidentsData } from '../shared/LabIncidentsData';
import { useSharedLabIncidentsFlags } from '../shared/LabIncidentsFlags';


export const labIncidentsService = () => {

    const { labIncidents, setLabIncidents } = useSharedLabIncidentsData()
    const { gotLabIncidents, setGotLabIncidents, labIncidentsError, setLabIncidentsError, setNoLabIncidentsResults, setLabIncidentsIsLoading, setLabIncidentsErrorCode, downloadError, setDownloadError } = useSharedLabIncidentsFlags()

    const getToken = () => {
        let cookies = document.cookie.split('; ')
        let myCookie = []
        cookies.filter(cookie => {
            if (cookie.slice(0, 8) == 'jwtToken') {
                myCookie.push(cookie)
            }
        })
        let token = []
        for (let i = 9; i < myCookie[0].length; i++) {
            token.push(myCookie[0][i])
        }
        let myToken = token.join('')
        return myToken
    }

    const onLabIncidentsSuccess = (response) => {
        const results = response?.data?.response
        if (response?.data?.errorCode == 0) {
            setLabIncidents((results) ?? [])
            setGotLabIncidents(true)
        } else {
            setLabIncidentsErrorCode(response?.data?.errorCode)
            if (response?.data?.errorCode == 400) {
                setGotLabIncidents(false)
                setNoLabIncidentsResults(true)
                setLabIncidentsError(true)
            } else {
                setLabIncidentsError(true)
            }
        }
        setLabIncidentsIsLoading(false)
    }

    const getLabIncidents = (labId, start, end) => {
        const labIncidentData = {
            "action": "getIncidentsForALab",
            "userInfo": {
                "additionalProperties": {
                    "customerId": labId,
                    "startDate": start,
                    "endDate": end
                }
            }
        }
        setLabIncidentsIsLoading(true)
        setNoLabIncidentsResults(false)
        setLabIncidentsError(false)
        doGetLabIncidentsRequest(labIncidentData)
    }


    const doGetLabIncidentsRequest = (data) => {

        const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
        const url = eslEndpoint + ESL_EPT?.LAB_INCIDENTS;

        const headers = getPageDataAttributes();

        headers['Content-Type'] = 'application/json'

        const token = getToken()
        headers["x-id-token"] = token;

        const config = {
            url: url,
            headers: headers,
        };

        axios.post(url, data, config)
            .then(function (response) {
                onLabIncidentsSuccess(response);
            })
            .catch(function (error) {
                setLabIncidentsIsLoading(false)
                setLabIncidentsError(true)
            });
    }


    return {
        getLabIncidents
    }

};


