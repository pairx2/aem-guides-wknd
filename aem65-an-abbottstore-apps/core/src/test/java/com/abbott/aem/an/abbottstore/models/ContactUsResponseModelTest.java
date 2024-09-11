package com.abbott.aem.an.abbottstore.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.testing.mock.sling.servlet.MockRequestPathInfo;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
public class ContactUsResponseModelTest {
    ContactUsResponseModel contactUsResponseModel;
    private MockSlingHttpServletRequest request;

    @BeforeEach
    public void setup(AemContext context)  {
        request = new MockSlingHttpServletRequest(context.resourceResolver(), context.bundleContext());
    }

    @Test
    public void testGetRequestStatusWithNoData() {
        contactUsResponseModel = request.adaptTo(ContactUsResponseModel.class);
        assert contactUsResponseModel != null;
        assertEquals("invalid", contactUsResponseModel.getRequestStatus());
    }

    @Test
    public void testGetRequestStatus() {
        MockRequestPathInfo requestPathInfo = (MockRequestPathInfo)request.getRequestPathInfo();
        requestPathInfo.setSelectorString("selector");
        contactUsResponseModel = request.adaptTo(ContactUsResponseModel.class);
        assert contactUsResponseModel != null;
        assertEquals("selector", contactUsResponseModel.getRequestStatus());
    }

}
