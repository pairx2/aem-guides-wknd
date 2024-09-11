package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.constants.SalesforceConstants;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.RequestParameter;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;


@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface SalesforceLeadRequest {

    @RequestParameter
    @JsonProperty(SalesforceConstants.LEAD_SOURCE)
    String getSource();

    @RequestParameter
    @JsonProperty(SalesforceConstants.CUSTOMER_TYPE)
    String getCustomerType();

    @RequestParameter
    @JsonProperty(SalesforceConstants.SALUTATION)
    String getTitle();

    @RequestParameter
    @JsonProperty(SalesforceConstants.FIRST_NAME)
    String getFirstname();

    @RequestParameter
    @JsonProperty(SalesforceConstants.LAST_NAME)
    String getLastname();

    @RequestParameter
    @JsonProperty(SalesforceConstants.EMAIL)
    String getEmail();

    @RequestParameter
    @JsonProperty(SalesforceConstants.STREET)
    String getStreet();

    @RequestParameter
    @JsonProperty(SalesforceConstants.POSTAL_CODE)
    String getZipcode();

    @RequestParameter
    @JsonProperty(SalesforceConstants.COUNTRY)
    String getCountry();

    @RequestParameter
    @JsonProperty(SalesforceConstants.PHONE)
    String getPhone();

    @RequestParameter
    @JsonProperty(SalesforceConstants.CITY)
    String getCity();

    @RequestParameter
    @JsonProperty(SalesforceConstants.DOB)
    String getDob();

    @RequestParameter
    @JsonProperty(SalesforceConstants.SICK_FUND)
    String getSickFund();

    @RequestParameter
    @JsonProperty(SalesforceConstants.IK_NUMBER)
    String getIkNumber();

    @RequestParameter
    @JsonProperty(SalesforceConstants.INSURED_TYPE)
    String getInsuredType();

    @RequestParameter
    @JsonProperty(SalesforceConstants.INSURANCE_NUMBER)
    String getKvnrNumber();

    @RequestParameter
    @JsonProperty(SalesforceConstants.MEASURE_UNIT)
    String getMeasurementUnit();

    @RequestParameter
    @JsonProperty(SalesforceConstants.VOUCHER_CODE)
    String getVoucherCode();

    @RequestParameter
    @JsonProperty(SalesforceConstants.TERMS_CONDITION)
    String getTermsCondition();

    @RequestParameter
    @JsonProperty(SalesforceConstants.DATA_PRIVACY)
    String getPrivacyPolicy();
}
