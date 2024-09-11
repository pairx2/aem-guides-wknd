package com.abbott.aem.epd.acare.core.models.components;

import org.osgi.annotation.versioning.ConsumerType;
/**
 *
 * Model for Email Info component
 */
 
@ConsumerType
public interface EmailInfo {
    public String getEmailFrom();
    public void setEmailFrom(String emailFrom);
    public String getEmailSubject();
    public void setEmailSubject(String emailSubject);
    public String getEmailTo();
    public void setEmailTo(String emailTo);
    public String getEmailCC();
    public void setEmailCC(String emailCC);
    public String getEmailBCC();
    public void setEmailBCC(String emailBCC);

}