package com.abbott.aem.epd.acare.core.models.components.impl;


import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.abbott.aem.epd.acare.core.models.ExternalUrlModel;
import com.abbott.aem.epd.acare.core.models.components.BannerWithTextAndTag;
import com.abbott.aem.epd.acare.core.models.components.EmailInfo;
import com.abbott.aem.epd.acare.core.models.components.EmailTag;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.sightly.SightlyWCMMode;
import com.adobe.cq.wcm.core.components.models.Teaser;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;


import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import lombok.experimental.Delegate;

/**
 * The Class BannerWithTextButtonImpl.
 */

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = {SlingHttpServletRequest.class}, adapters = {BannerWithTextAndTag.class,
        Teaser.class}, resourceType = {BannerWithTextAndTagImpl.RESOURCE_TYPE}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class BannerWithTextAndTagImpl implements BannerWithTextAndTag {

    /**
     * The Constant RESOURCE_TYPE.
     */
    public static final String RESOURCE_TYPE = "epd/acare/components/email/banner-with-text-tag";

    @Self
    @Via
    @Delegate(types = EmailTag.class)
    public EmailTag tag;

    @Self
    @Via
    @Delegate(types = EmailInfo.class)
    public EmailInfo emailInfo;

    @Self
    @Via(type = ResourceSuperType.class)
    @Delegate(types = Teaser.class)
    public Teaser teaser;

    @ScriptVariable
    public Page currentPage;

    @Inject
    public Resource resource;

    @ScriptVariable
    public SightlyWCMMode wcmmode;

    @Inject
    @Self
    public ExternalUrlModel externalizerModel;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String fileReference;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String linkURL;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public boolean descriptionFromPage;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String padding;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String bannerAlignment;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String bannerAltText;

    private String assetDomain;

    /**
     * This method returns the externalized Link associated to banner of this component
     *
     * @return String link
     */
    @Override
    public String getBannerLink() {
        String link = this.linkURL;
        return externalizerModel.getExternalizedUrl(link);

    }

    /**
     * This method returns the asset prefixed image link associated to banner of this component
     *
     * @return String bannerImage
     */
    @Override
    public String getBannerImage() {
        String bannerImage;
        InheritanceValueMap ivm = new HierarchyNodeInheritanceValueMap(currentPage.getContentResource());
        assetDomain = ivm.getInherited("assetDomain", String.class);

        if (null != assetDomain && !assetDomain.isEmpty() && null != this.fileReference && wcmmode.isDisabled()) {
            bannerImage = assetDomain + fileReference;
        } else {
            bannerImage = fileReference;
        }
        return bannerImage;

    }
    @Override
    public void setWcmmode(SightlyWCMMode wcmmode){
        this.wcmmode=wcmmode;
    }

    @Override
    public void setResource(Resource resource){this.resource=resource;}

    /**
     * This method returns the description authored on this component
     *
     * @return String description
     */
    @Override
    public String getDescription() {
        String description;
        if (descriptionFromPage) {
            description = currentPage.getDescription();

        } else {
            description = this.resource.getValueMap().get(JcrConstants.JCR_DESCRIPTION, String.class);
        }

        return externalizerModel.getReformedText(description);
    }
    @Override
    public void setLinkURL(String linkURL){ this.linkURL=linkURL;}

    @Override
    public String getFileReference() {return fileReference;}

    @Override
    public void setFileReference(String fileReference){ this.fileReference=fileReference;}

    @Override
    public boolean getDescriptionFromPage() {return descriptionFromPage;}

    @Override
    public void setDescriptionFromPage(boolean descriptionFromPage){ this.descriptionFromPage=descriptionFromPage;}

    @Override
    public String getPadding()

    {
        return padding;
    }

    @Override
    public void setPadding(String padding){ this.padding=padding;}

    @Override
    public String getBannerAlignment()

    {
        return bannerAlignment;
    }

    @Override
    public void setBannerAlignment(String bannerAlignment){ this.bannerAlignment=bannerAlignment;}

    @Override
    public String getBannerAltText()

    {
        return bannerAltText;
    }

    @Override
    public void setBannerAltText(String bannerAltText){ this.bannerAltText=bannerAltText;}

}