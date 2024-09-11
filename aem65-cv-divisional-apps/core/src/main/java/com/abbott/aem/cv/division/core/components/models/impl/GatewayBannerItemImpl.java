package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.GatewayBanneritem;

import com.abbott.aem.cv.division.core.components.utils.CvUtils;

import lombok.*;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


import javax.annotation.PostConstruct;

/**
 * Model used by GatewayBanner to create a list of Panels
 */

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class},
        adapters = { GatewayBanneritem.class },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class GatewayBannerItemImpl implements GatewayBanneritem{



    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String panelEyeBrow;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String panelTitle;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String panelDescription;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String displayPanelDescriptionOnMobile;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String cta;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String urlLink;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String targetNewWindow;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String anchorID;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String playerId;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String mediaId;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String videoId;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String phoneNumber;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String assetURL;

    @PostConstruct
    protected void init() {
        if(urlLink !=null){
            urlLink = CvUtils.ensureProperLink(urlLink);
            }
        }
    }

