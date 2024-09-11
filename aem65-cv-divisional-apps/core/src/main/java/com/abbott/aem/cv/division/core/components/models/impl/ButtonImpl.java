package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.Button;

import com.abbott.aem.cv.division.core.components.utils.CvUtils;

import lombok.Getter;
import lombok.AccessLevel;
import lombok.Setter;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;



import org.apache.sling.api.resource.Resource;



@Model(adaptables = {Resource.class}, adapters = {Button.class},
resourceType = { ButtonImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ButtonImpl implements Button {


    public static final String RESOURCE_TYPE = "cv/division/components/content/button";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String buttonType;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String buttonText;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String buttonColor;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String urlLink;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String targetNewWindow;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String anchorName;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String playerId;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String mediaId;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String videoId;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String phoneNumber;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String assetLink;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String accountID;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String brightVideoID;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String brightPlayerID;
   
    @Override
    public String getUrlLink(){
        return CvUtils.ensureProperLink(urlLink);
    }
    
}