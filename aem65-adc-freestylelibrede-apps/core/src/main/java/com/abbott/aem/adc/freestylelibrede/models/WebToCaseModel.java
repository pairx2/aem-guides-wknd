package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.abbott.aem.adc.freestylelibrede.services.TreeTagService;
import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

/**
 * Model class for web-to-case Component
 *
 * @author nitishsaxena
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/web-to-case")
public class WebToCaseModel extends CsrConfigModel {

    private static final Logger LOGGER = LoggerFactory.getLogger(WebToCaseModel.class);

    @Self
    private Resource resource;

    @Inject
    private ResourceResolver resolver;

    @Inject
    private String heading;

    @Externalize
    private String privacyPolicy;

    @Inject
    private String salutationID;

    @Inject
    private String firstNameID;

    @Inject
    private String lastNameID;

    @Inject
    private String emailID;

    @Inject
    private String kvnrID;

    @Inject
    private String customerID;

    @Inject
    private String zipcodeID;

    @Inject
    private String streetID;

    @Inject
    private String cityID;

    @Inject
    private String productCategoryID;

    @Inject
    private String contactCategoryID;

    @Inject
    private String contactReasonID;

    @Inject
    private String callBackCaseID;

    @Externalize
    private String retURL;

    @Inject
    private String rootTag;

    @Getter
    private List<TreeTag> productCategoryTags;

    @Inject
    private TreeTagService treeTagService;


    @PostConstruct
    public void initModel() {
        LOGGER.debug("rootTag={}", rootTag);
        if (rootTag != null) {
            productCategoryTags = treeTagService.resolveTreeTags(resolver, resource, rootTag, 3, true);
        }
    }

    public String getHeading() {
        return heading;
    }

    public String getPrivacyPolicy() {
        return privacyPolicy;
    }

    public String getSalutationID() {
        return salutationID;
    }

    public String getFirstNameID() {
        return firstNameID;
    }

    public String getLastNameID() {
        return lastNameID;
    }

    public String getEmailID() {
        return emailID;
    }

    public String getKvnrID() {
        return kvnrID;
    }

    public String getCustomerID() {
        return customerID;
    }

    public String getZipcodeID() {
        return zipcodeID;
    }

    public String getStreetID() {
        return streetID;
    }

    public String getCityID() {
        return cityID;
    }

    public String getProductCategoryID() {
        return productCategoryID;
    }

    public String getContactCategoryID() {
        return contactCategoryID;
    }

    public String getContactReasonID() {
        return contactReasonID;
    }

    public String getCallBackCaseID() {
        return callBackCaseID;
    }

    public String getRetURL() {
        return retURL;
    }

    public String getRootTag() {
        return rootTag;
    }

    public String getPath() {
        return resource.getPath();
    }
}
