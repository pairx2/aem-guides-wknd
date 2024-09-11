package com.abbott.aem.adc.freestylelibrede.services;

import com.abbott.aem.adc.freestylelibrede.models.SalesforceLeadRequest;

public interface SalesforceLeadService {
    String createLead(SalesforceLeadRequest request);
}
