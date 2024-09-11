package com.abbott.aem.adc.freestylelibrede.services.impl.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({ "buildNumber", "timestamp", "ndc" })
public class PayonResponse {
    private PayonResponseCode result;
    private String id;

    public PayonResponse() {
    }

    public PayonResponse(PayonResponseCode result, String id) {
        this.result = result;
        this.id = id;
    }

    public PayonResponseCode getResult() {
        return result;
    }

    public void setResult(PayonResponseCode result) {
        this.result = result;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}