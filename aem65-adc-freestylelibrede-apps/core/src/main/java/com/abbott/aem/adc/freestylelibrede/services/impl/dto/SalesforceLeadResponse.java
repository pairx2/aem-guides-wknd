package com.abbott.aem.adc.freestylelibrede.services.impl.dto;

import lombok.Getter;

public class SalesforceLeadResponse {

    private String message;
    private String errorCode;

    @Getter
    private String[] fields;

    public String getMessage() {
        return message;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
