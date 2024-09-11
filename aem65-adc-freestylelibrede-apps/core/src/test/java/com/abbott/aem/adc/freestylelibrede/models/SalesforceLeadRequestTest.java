package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;
import org.apache.sling.models.spi.Injector;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.adc.freestylelibrede.constants.SalesforceConstants;
import com.abbott.aem.adc.freestylelibrede.models.injector.RequestParameterInjector;

import java.util.HashMap;
import java.util.Map;

@ExtendWith(AemContextExtension.class)
class SalesforceLeadRequestTest {

    public final AemContext context = new AemContext();

    private SalesforceLeadRequest model;

    private RequestParameterInjector injector = new RequestParameterInjector();

    @BeforeEach
    void setup(){
        context.registerService( Injector.class,injector);
        context.addModelsForClasses(SalesforceLeadRequest.class);
        MockSlingHttpServletRequest request = context.request();

        Map<String, Object> map = new HashMap<>();
        map.put(SalesforceConstants.REQ_FORM_SOURCE,"source value");
        map.put(SalesforceConstants.REQ_FORM_CUSTOMER_TYPE,"customer type value");
        map.put(SalesforceConstants.REQ_FORM_SICK_FUND,"sickfundname");
        map.put(SalesforceConstants.REQ_FORM_IK_NUMBER ,"ik-number");
        map.put(SalesforceConstants.REQ_FORM_KVNR,"my-kvnr-nbr");
        map.put(SalesforceConstants.REQ_FORM_UNIT,"mg/dl");
        map.put(SalesforceConstants.REQ_FORM_VOUCHER,"abc-1234");
        map.put(SalesforceConstants.REQ_FORM_TERMS,"accepted");
        map.put(SalesforceConstants.REQ_FORM_PRIVACY,"denied");
        map.put(SalesforceConstants.REQ_FORM_DOB,"01-02-1977");

        request.setParameterMap(map);


        model = request.adaptTo(SalesforceLeadRequest.class);

    }

    @Test
    void getSource() {
        Assert.assertEquals("source value", model.getSource());
    }

    @Test
    void getCustomerType(){
        Assert.assertEquals("customer type value", model.getCustomerType());
    }

    @Test
    void getDob(){
        Assert.assertEquals("01-02-1977", model.getDob());
    }

    @Test
    void getSickFund(){
        Assert.assertEquals("sickfundname",model.getSickFund());
    }

    @Test
    void getIkNuber(){
        Assert.assertEquals("ik-number",model.getIkNumber());
    }

    @Test
    void getKvnrNumber(){
        Assert.assertEquals("my-kvnr-nbr",model.getKvnrNumber());
    }

    @Test
    void getMeasurementUnit(){
        Assert.assertEquals("mg/dl",model.getMeasurementUnit());
    }

    @Test
    void getVoucherCode(){
        Assert.assertEquals("abc-1234",model.getVoucherCode());
    }

    @Test
    void getTermsCondition(){
        Assert.assertEquals("accepted",model.getTermsCondition());
    }
    @Test
    void getPrivacyPolicy(){
        Assert.assertEquals("denied",model.getPrivacyPolicy());
    }

}