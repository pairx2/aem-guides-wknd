package com.abbott.magento.identity.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class MagentoErrorResponseTest {

    MagentoErrorResponse magentoErrorResponse;

    MagentoErrorResponse.Error.Parameter parameter;

    MagentoErrorResponse.Error error;

    MagentoErrorResponse.Parameter param;

    @BeforeEach
    @Test
    void setUp() {
        parameter = new MagentoErrorResponse.Error.Parameter("res", "field", "val");
        param = new MagentoErrorResponse.Parameter("resource", "fieldName", "fieldVal");
        MagentoErrorResponse.Error.Parameter[] parameters = {parameter};
        MagentoErrorResponse.Parameter[] parameters1 = {param};
        error = new MagentoErrorResponse.Error("msg", parameters);
        MagentoErrorResponse.Error[] errors = {error};
        magentoErrorResponse = new MagentoErrorResponse("message", errors, 1L, parameters1, "trace");
    }
}