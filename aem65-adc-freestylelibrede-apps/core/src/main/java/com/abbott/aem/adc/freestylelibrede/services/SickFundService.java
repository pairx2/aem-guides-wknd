package com.abbott.aem.adc.freestylelibrede.services;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

import java.util.List;
import java.util.Map;

public interface SickFundService {

    List<SickFundDocument> listSickFundDocuments(Resource resource);

    List<SickFund> listSickFunds(ResourceResolver resolver, String sickFundPdfPath);

    Map<String, String> getContentFragmentRootPath(ResourceResolver resolver, String fragmentPath); 
    
    interface SickFund {
        String getName();

        List<SickFundDocument> getDocuments();
    }

    interface SickFundDocument {
        String getLanguage();

        String getPath();
    }
}
