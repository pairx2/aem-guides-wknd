package com.abbott.aem.adc.freestylelibrede.services.impl.dto;

public class PayonResponseCode {
    private String code;
    private String description;

    public PayonResponseCode() {
    }

    public PayonResponseCode(String code, String description) {
        this.code = code;
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
