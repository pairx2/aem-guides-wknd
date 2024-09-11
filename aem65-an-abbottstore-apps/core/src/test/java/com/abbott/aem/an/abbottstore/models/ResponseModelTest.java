package com.abbott.aem.an.abbottstore.models;

import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
public class ResponseModelTest {
    Map<String, Object> properties;
    private ResponseModel responseModel;
    String status = "1";
    String responseText = "success";

    @BeforeEach
    public void setup(AemContext context)  {
        Page page = context.create().page("/content/abbott/en/test");
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/responseModel");
        properties.put("status", status);
        properties.put("responseText", responseText);
        Resource resource = context.create().resource(page, "test", properties);
        responseModel = resource.adaptTo(ResponseModel.class);
    }

    @Test
    public void testGetStatus() {
        assertEquals(status, responseModel.getStatus());
    }

    @Test
    public void testGetResponseText() {
        assertEquals(responseText, responseModel.getResponseText());
    }
}
