import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { ESL_EPT } from "../../../customerportal/forms/commonContants";
import { getPageDataAttributes, eslConfigDatasets } from "../../../customerportal/forms/common";
import { useSharedInstrumentFlags } from '../shared/InstrumentFlags';



export const commentService = () => {
    const { setIsCommentError, commentErrorCode, setCommentErrorCode, setCommentMessage, setCommentIsLoading, isCommentError } = useSharedInstrumentFlags()

    const onCommentSuccess = (response) => {
        const results = response?.data?.response
        if (results?.errorCode == 0 || results?.errorCode == 200) {
            setCommentErrorCode(results.errorCode)
            setCommentMessage(true)
            setCommentIsLoading(false)
            window.hideLoading()
        } else {
            setCommentErrorCode(response.data.errorCode)
            setCommentMessage(true)
            setIsCommentError(true)
            setCommentIsLoading(false)
            window.hideLoading()
        }
    }

    const addComment = (ticketNumber, comment) => {
        const commentData = {
            "action": "addComment",
            "comment": comment,
            "ticketNumber": ticketNumber
        }
        doAddCommentRequest(commentData)
    }


    const doAddCommentRequest = (data) => {
        
        const eslEndpoint = eslConfigDatasets()?.eslEndpoint;
        const url = eslEndpoint + ESL_EPT?.TICKET_COMMENTS;

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
                onCommentSuccess(response);
                setCommentIsLoading(false)
            })
            .catch(function (error) {
                window.hideLoading()
                setIsCommentError(true)
                setCommentMessage(true)
                setCommentIsLoading(false)
            });
    }


    return {
        addComment
    }

};


