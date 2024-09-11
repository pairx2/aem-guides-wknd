package com.abbott.aem.ardx.division.core.components.models;

import java.util.Set;

import org.osgi.annotation.versioning.ConsumerType;

import com.abbott.aem.platform.common.components.models.PlatformPage;

@ConsumerType
public interface ArdxPage extends PlatformPage {

    public String getApprovalID();

    public String getProductName();

    public Boolean getApocTags();

    public Set<String> getBrandTags();

    public Set<String> getAreaOfInterestTags();

    public Set<String> getGbuTags();

    public Set<String> getAllTags();

    public Set<String> getBrandTagsId();

    public Set<String> getAllTagsId();

    public Set<String> getProductNameList();

}
