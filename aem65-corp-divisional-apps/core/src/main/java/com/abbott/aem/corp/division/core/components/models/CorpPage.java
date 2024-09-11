package com.abbott.aem.corp.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.abbott.aem.platform.common.components.models.PlatformPage;

@ConsumerType
public interface CorpPage extends PlatformPage {
    /**
     * @return StructuredData value
     */
    String getStructuredData();
    
    /**
     * @return lastPublished  value
     */
    String getLastPublished();
    
    /**
     * @return lastModified  value
     */
    String getLastModified();
    
    /**
     * @return ImageUrl  value
     */
    String getImageUrl();
    
    /**
     * @return textbody  value
     */
    String getTextBody();
    
    /**
     * @return Url  value
     */
    String getUrl();
    
    /**
     * @return logourl  value
     */
    String getLogoUrl();
    
    /**
     * @return parentTitle  value
     */
    String getParentTitle();
    
    /**
     * @return PageTitle  value
     */
    String getPageTitle();
    
    /**
     * @return PageDescription  value
     */
    String getPageDescription();
    
    /**
     * @return QuestionAnswers  value
     */
    String getQuestionAnswers();
    
    

    
}
