package com.abbott.aem.adc.freestylelibrede.models;

import static com.day.cq.commons.jcr.JcrConstants.NT_UNSTRUCTURED;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.abbott.aem.adc.freestylelibrede.utils.ResourceTypes;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.sling.models.annotations.Default;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/header-login")
public class HeaderLoginModel extends BaseComponentPropertiesImpl {

    private static final Logger LOGGER = LoggerFactory.getLogger(HeaderLoginModel.class);
    private static final String RESOURCE_TYPE = "adc/freestylelibrede/components/content/account/account-overview";
    private static final String TECH_TRAINING_RESOURCE_TYPE = "adc/freestylelibrede/components/content/account/confirm-technical-training";
    
    @Inject
    @Default(values = "v1-rendition")
    private String rendition;

    @Self
    private Resource resource;

    @Inject
    private String icon;

    @Inject
    private String offlineIcon;

    @Inject
    private String label;

    @Externalize
    private String loginPagePath;

    @Externalize
    private String logoutPageRedirect;

    @Inject
    private String logoutIcon;

    @Inject
    private String logoutLabel;

    @Inject
    private String pagePath;

    private String modelJsonString;

    @Inject
    private String labelLogin;

    @Inject
    private ExternalizerService externalizerService;
    @Getter
    private List<AccountOverviewModel> accountOverviewList = new ArrayList<>();

    @Getter
    public String technicalTrainingTabMapping = "";
    @Getter
    public String messageMorning = "";
    @Getter
    public String messageAfternoon = "";
    @Getter
    public String messageEvening  = "";

    @Inject
    private String nonLoggedInUserEvent;

    @Inject
    private String loggedInUserEvent;

	public String getRendition() {
        return rendition;
    }

    @Inject
    private boolean enableAutoExtendSessionEsl;



    public boolean isEnableAutoExtendSessionEsl() {
		return enableAutoExtendSessionEsl;
	}


    public String getLabelLogin() {
        return labelLogin;
    }

    public String getOfflineIcon() {
        return offlineIcon;
    }

    public String getLogoutPageRedirect() {
        return logoutPageRedirect;
    }


    public String getLoginPagePath() {
        return loginPagePath;
    }

    public String getPagePath() {
        return externalizerService.externalizeIfNecessary(pagePath, resource.getResourceResolver());
    }

    public String getModelJsonString() {
        return modelJsonString;
    }

    public String getIcon() {
        return icon;
    }

    public String getLabel() {
        return label;
    }

    public String getLogoutIcon() {
        return logoutIcon;
    }

    public String getLogoutLabel() {
        return logoutLabel;
    }

    public String getNonLoggedInUserEvent() {
        return nonLoggedInUserEvent;
    }

    public String getLoggedInUserEvent() {
        return loggedInUserEvent;
    }

    @PostConstruct
    public void initModel() {
        LOGGER.debug("Entered InitModel Method");
        ResourceResolver resourceResolver = resource.getResourceResolver();
        Resource pageresource = resourceResolver.getResource(pagePath);
        if (pageresource != null && ResourceTypes.getChildByResourceType(pageresource, RESOURCE_TYPE) != null) {
            Resource returnResponse = ResourceTypes.getChildByResourceType(pageresource, RESOURCE_TYPE);
            ValueMap propertiesMap =  returnResponse.getValueMap();
            messageMorning = propertiesMap.get("messageMorning", "");
            messageAfternoon =  propertiesMap.get("messageAfternoon", "");
            messageEvening = propertiesMap.get("messageEvening", "");
            
            Iterable<Resource> itrbRes = returnResponse.getChildren();
            for (Resource resObj : itrbRes) {
                if (resObj != null && !NT_UNSTRUCTURED.equals(resObj.getResourceType())) {
                    AccountOverviewModel accOverview = resObj.adaptTo(AccountOverviewModel.class);
                    accountOverviewList.add(accOverview);
                }
            }

            Resource techTrainingResource = ResourceTypes.getChildByResourceType(pageresource, TECH_TRAINING_RESOURCE_TYPE);
            if (techTrainingResource != null && techTrainingResource.getValueMap().containsKey("technicalTrainingTabMapping")) {
                technicalTrainingTabMapping = techTrainingResource.getValueMap().get("technicalTrainingTabMapping", String.class);   
            }
        }

        ObjectMapper mapper = new ObjectMapper();
        try {
            modelJsonString = mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            LOGGER.warn("JsonProcessingException InitModel Method", e);
        }

        LOGGER.debug("Exit InitModel Method");
    }
}