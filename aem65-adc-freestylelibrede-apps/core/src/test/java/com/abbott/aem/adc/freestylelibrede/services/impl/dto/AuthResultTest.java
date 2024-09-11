package com.abbott.aem.adc.freestylelibrede.services.impl.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import junit.framework.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

class AuthResultTest {

    private AuthResult authResult;

    @BeforeEach
    void setup() throws IOException {
        String jsonString = "{ \"access_token\":\"mytoken\",\"instance_url\":\"https://myinstance.com\"}";

        authResult = new ObjectMapper().readValue(jsonString,AuthResult.class);
    }

    @Test
    void getAccessToken() {
        Assert.assertEquals("mytoken",authResult.getAccessToken());
    }

    @Test
    void getInstanceUrl() {
        Assert.assertEquals("https://myinstance.com",authResult.getInstanceUrl());
    }
}