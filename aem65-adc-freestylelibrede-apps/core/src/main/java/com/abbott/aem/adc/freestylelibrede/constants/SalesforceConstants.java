package com.abbott.aem.adc.freestylelibrede.constants;

import java.util.HashMap;
import java.util.Map;

public class SalesforceConstants {
    public static final String LEAD_SOURCE = "LeadSource";
    public static final String CUSTOMER_TYPE = "ADC_Customer_Type__c";
    public static final String SALUTATION = "Salutation";
    public static final String COMPANY = "Company";
    public static final String FIRST_NAME = "FirstName";
    public static final String LAST_NAME = "LastName";
    public static final String EMAIL = "Email";
    public static final String STREET = "Street";
    public static final String POSTAL_CODE = "postalcode";
    public static final String COUNTRY = "country";
    public static final String PHONE = "Phone";
    public static final String CITY = "city";
    public static final String DOB = "ADC_Birth_Date__c";
    public static final String INSURED_TYPE = "ADC_Insured_Type__c";
    public static final String SICK_FUND = "ADC_sick_fund__c";
    public static final String INSURANCE_NUMBER = "ADC_Insurance_Number__c";
    public static final String MEASURE_UNIT = "ADC_Measure_Type__c";
    public static final String VOUCHER_CODE = "ADC_Voucher_Code__c";
    public static final String TERMS_CONDITION = "ADC_T_C_Confirmed__c";
    public static final String DATA_PRIVACY = "ADC_Data_Privacy_Confirmed__c";
    public static final String IK_NUMBER = "ADC_Main_IK_Number__c";
    public static final String REQ_FORM_SOURCE = "source";
    public static final String REQ_FORM_CUSTOMER_TYPE = "customerType";
    public static final String REQ_FORM_TITLE = "title";
    public static final String REQ_FORM_COMPANY = "Company";
    public static final String REQ_FORM_COUNTRY = "Country";
    public static final String REQ_FORM_FIRST_NAME = "FirstName";
    public static final String REQ_FORM_LAST_NAME = "LastName";
    public static final String REQ_FORM_EMAIL = "Email";
    public static final String REQ_FORM_STREET = "Street";
    public static final String REQ_FORM_ZIP = "zipcode";
    public static final String REQ_FORM_PHONE = "Phone";
    public static final String REQ_FORM_CITY = "city";
    public static final String REQ_FORM_DOB = "dob";
    public static final String REQ_FORM_SICK_FUND = "sickFund";
    public static final String REQ_FORM_IK_NUMBER = "ikNumber";
    public static final String REQ_FORM_INSURED_TYPE = "insuredType";
    public static final String REQ_FORM_KVNR = "kvnrNumber";
    public static final String REQ_FORM_UNIT = "measurementUnit";
    public static final String REQ_FORM_VOUCHER = "voucherCode";
    public static final String REQ_FORM_TERMS = "termsCondition";
    public static final String REQ_FORM_PRIVACY = "privacyPolicy";
    public static final int SOCKET_TIME_MILLI_SEC = 10000;
    private static final Map<String, String> SALESFORCE_FORM_FIELD_MAP = new HashMap<String, String>();

    static {
        SALESFORCE_FORM_FIELD_MAP.put(COMPANY, COMPANY);
        SALESFORCE_FORM_FIELD_MAP.put(LEAD_SOURCE, REQ_FORM_SOURCE);
        SALESFORCE_FORM_FIELD_MAP.put(SALUTATION, REQ_FORM_TITLE);
        SALESFORCE_FORM_FIELD_MAP.put(FIRST_NAME, REQ_FORM_FIRST_NAME);
        SALESFORCE_FORM_FIELD_MAP.put(LAST_NAME, REQ_FORM_LAST_NAME);
        SALESFORCE_FORM_FIELD_MAP.put(POSTAL_CODE, REQ_FORM_ZIP);
        SALESFORCE_FORM_FIELD_MAP.put(CITY, REQ_FORM_CITY);
        SALESFORCE_FORM_FIELD_MAP.put(STREET, REQ_FORM_STREET);
        SALESFORCE_FORM_FIELD_MAP.put(EMAIL, REQ_FORM_EMAIL);
        SALESFORCE_FORM_FIELD_MAP.put(COUNTRY, REQ_FORM_COUNTRY);
        SALESFORCE_FORM_FIELD_MAP.put(PHONE, REQ_FORM_PHONE);
        SALESFORCE_FORM_FIELD_MAP.put(COMPANY, REQ_FORM_COMPANY);
        SALESFORCE_FORM_FIELD_MAP.put(INSURED_TYPE, REQ_FORM_INSURED_TYPE);
        SALESFORCE_FORM_FIELD_MAP.put(SICK_FUND, REQ_FORM_SICK_FUND);
        SALESFORCE_FORM_FIELD_MAP.put(INSURANCE_NUMBER, REQ_FORM_KVNR);
        SALESFORCE_FORM_FIELD_MAP.put(DOB, REQ_FORM_DOB);
        SALESFORCE_FORM_FIELD_MAP.put(MEASURE_UNIT, REQ_FORM_UNIT);
        SALESFORCE_FORM_FIELD_MAP.put(VOUCHER_CODE, REQ_FORM_VOUCHER);
        SALESFORCE_FORM_FIELD_MAP.put(TERMS_CONDITION, REQ_FORM_TERMS);
        SALESFORCE_FORM_FIELD_MAP.put(DATA_PRIVACY, REQ_FORM_PRIVACY);
        SALESFORCE_FORM_FIELD_MAP.put(CUSTOMER_TYPE, REQ_FORM_CUSTOMER_TYPE);
        SALESFORCE_FORM_FIELD_MAP.put(IK_NUMBER, REQ_FORM_IK_NUMBER);

    }

    public static boolean hasMappingKey(String key){
        return SALESFORCE_FORM_FIELD_MAP.containsKey(key);
    }

    public static String getMappingValue(String key){
        return SALESFORCE_FORM_FIELD_MAP.get(key);
    }

    private SalesforceConstants() {
    }
}
