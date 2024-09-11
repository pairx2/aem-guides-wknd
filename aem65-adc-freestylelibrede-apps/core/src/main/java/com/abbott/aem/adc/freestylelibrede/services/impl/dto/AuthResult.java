package com.abbott.aem.adc.freestylelibrede.services.impl.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthResult {
    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("instance_url")
    private String instanceUrl;

    public String getAccessToken(){
        return  accessToken;
    }


    public String getInstanceUrl(){
        return instanceUrl;
    }
}
