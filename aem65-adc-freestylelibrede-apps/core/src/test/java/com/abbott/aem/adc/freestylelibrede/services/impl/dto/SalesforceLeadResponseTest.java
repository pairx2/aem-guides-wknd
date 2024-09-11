package com.abbott.aem.adc.freestylelibrede.services.impl.dto;

import com.fasterxml.jackson.databind.ObjectMapper;


import junitx.framework.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class SalesforceLeadResponseTest {


    SalesforceLeadResponse[] response;
    private final String jsonString = " [ { \"message\" : \"The voucher code is expired.\", \"errorCode\" : \"FIELD_CUSTOM_VALIDATION_EXCEPTION\",\"fields\" : [ \"voucherCode\" ]}]";

    @BeforeEach
    void setup() throws IOException {
        response = new ObjectMapper().readValue(jsonString,SalesforceLeadResponse[].class);

    }
    @Test
    void getMessage() {
        Assert.assertEquals("The voucher code is expired.",response[0].getMessage());
    }

    @Test
    void getErrorCode() {
        Assert.assertEquals("FIELD_CUSTOM_VALIDATION_EXCEPTION",response[0].getErrorCode());
    }

    @Test
    void getFields() {
        Assert.assertTrue(Arrays.equals(new String[]{"voucherCode"},response[0].getFields()));
    }
}