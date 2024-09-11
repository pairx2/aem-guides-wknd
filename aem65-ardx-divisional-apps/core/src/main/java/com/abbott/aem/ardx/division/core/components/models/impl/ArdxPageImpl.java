package com.abbott.aem.ardx.division.core.components.models.impl;

import java.util.*;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.abbott.aem.ardx.division.core.components.models.ArdxPage;
import com.abbott.aem.platform.common.components.models.PlatformPage;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.api.Page;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

@Data
@EqualsAndHashCode
@Model(adaptables = SlingHttpServletRequest.class, adapters = { ArdxPage.class,
        ComponentExporter.class }, resourceType = ArdxPageImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class ArdxPageImpl implements ArdxPage {

    protected static final String RESOURCE_TYPE = "ardx/division/components/structure/genericpage";

    private static final String AREA_OF_INTEREST = "area-of-interest";

    private static final String BRANDS = "brands";
		
	private static final String REGEX_NON_ALPHANUMERIC = "[^a-zA-Z0-9 -./]+";

    private static final String STR_TRUE = "true";

    private static final String PROP_LOCALIZE_TAGS_TITLE = "localizeTagsTitle";

    @Self
    @Via(type = ResourceSuperType.class)
    @Delegate(types = PlatformPage.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private PlatformPage platformPage;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Default(values = "N/A")
    public String approvalID;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String productName;

    @ChildResource
    @Setter(AccessLevel.NONE)
    private List<Resource> productLists;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public Boolean apocTags;

    @Inject
    private Page currentPage;

    Set<String> gbuTags = new TreeSet<>();

    Set<String> brandTagsList = new TreeSet<>();

    Set<String> areaOfInterestTagsList = new TreeSet<>();

    Set<String> brandTagsIdList = new TreeSet<>();

    Set<String> allTagsIdList = new TreeSet<>();

    String grandParentName = StringUtils.EMPTY;

    String parentTagName = StringUtils.EMPTY;

    Set<String> allTags = new TreeSet<>();
    Set<String> productNameList = new TreeSet<>();
    private static final String PRODUCT_NAME = "productName";

    private Locale locale = null;

    @PostConstruct
    protected void init() {
        if(null != productLists) { // productNames from the new multi-field UI dialog
            getProductNamesList();
        } else if (StringUtils.isBlank(productName)) { // if the new productName multi-field or old productName single field are not available, then pick the page title
            productName = StringUtils.defaultIfBlank(currentPage.getPageTitle(), currentPage.getTitle());
            //remove non-alphanumeric from productName for helpful-documents search.
            productName = StringUtils.isNotBlank(productName) ? productName.replaceAll(REGEX_NON_ALPHANUMERIC, StringUtils.EMPTY).trim() : StringUtils.EMPTY;
        } else if(StringUtils.isNotBlank(productName)) { //  if the productName multi-field dialog is not configured, fallback to the previous old productName textfield
            //remove non-alphanumeric from productName for helpful-documents search.
            productName = StringUtils.isNotBlank(productName) ? productName.replaceAll(REGEX_NON_ALPHANUMERIC, StringUtils.EMPTY).trim() : StringUtils.EMPTY;
        }

		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(currentPage.getContentResource());
        String localizeTagsTitleProp = inheritedProperties.getInherited(PROP_LOCALIZE_TAGS_TITLE, StringUtils.EMPTY);
        if (localizeTagsTitleProp.equals(STR_TRUE)) {
            //when localizeTagsTitle is set to true for a site, get locale based on site language.
            String siteLanguage = inheritedProperties.getInherited(JcrConstants.JCR_LANGUAGE, StringUtils.EMPTY);
            locale = StringUtils.isNotBlank(siteLanguage) ? new Locale(siteLanguage) : null;
        }
        extractPageTags();
    }

    /**
     * Update  the product name list from the new multi-field
     */
    private void getProductNamesList() {
        for (Resource res : productLists) {
            ValueMap properties = res.adaptTo(ValueMap.class);
            String productNameMultiField = PlatformUtil.getPropertyValue(properties, PRODUCT_NAME);
            productNameMultiField =StringUtils.isNotBlank(productNameMultiField) ? productNameMultiField.replaceAll(REGEX_NON_ALPHANUMERIC, StringUtils.EMPTY).trim() : StringUtils.EMPTY;
            if(StringUtils.isNotBlank(productNameMultiField)) {
                productNameList.add(productNameMultiField);
            }
        }
        productName = StringUtils.join(productNameList, ",");
    }

    private void extractPageTags() {
        Tag[] currentPageTags = currentPage.getTags();
        for (Tag tag : currentPageTags) {
            String localTagId = tag.getLocalTagID();
            Tag parentTag = tag.getParent();            
            allTags.add(tag.getTitle(locale));
            allTagsIdList.add(localTagId);
            if (Objects.nonNull(parentTag)) {
                parentTagName = parentTag.getName();
            }
            Tag grandParent = Optional.ofNullable(parentTag).map(Tag::getParent).orElse(null);
            if (Objects.nonNull(grandParent)) {
                grandParentName = grandParent.getName();
            }
            Tag greatGrandParent = Optional.ofNullable(grandParent).map(Tag::getParent).orElse(null);
            Tag greatGreatGrandParent = Optional.ofNullable(greatGrandParent).map(Tag::getParent).orElse(null);
            String gbuTagTitle = Optional.ofNullable(greatGreatGrandParent)
                    .filter(Tag::isNamespace)
                    .map(namespaceTag -> parentTag.getTitle(locale)).orElse(null);
            if (StringUtils.isNotBlank(gbuTagTitle)) {
                gbuTags.add(gbuTagTitle);
            }
            if (BRANDS.equalsIgnoreCase(parentTagName) || BRANDS.equalsIgnoreCase(grandParentName)) {
                brandTagsList.add(tag.getTitle(locale));
                brandTagsIdList.add(localTagId);
            }
            if (AREA_OF_INTEREST.equalsIgnoreCase(parentTagName)
                    || AREA_OF_INTEREST.equalsIgnoreCase(grandParentName)) {
                areaOfInterestTagsList.add(tag.getTitle(locale));
            }
        }
    }

    @Override
    public Set<String> getGbuTags() {
        return gbuTags;
    }

    @Override
    public Set<String> getBrandTags() {
        return brandTagsList;
    }

    @Override
    public Set<String> getAreaOfInterestTags() {
        return areaOfInterestTagsList;
    }

    @Override
    public Set<String> getAllTags() {
        return allTags;
    }

    @Override
    public Set<String> getBrandTagsId() {
        return brandTagsIdList;
    }

    @Override
    public Set<String> getAllTagsId() {
        return allTagsIdList;
    }

    @Override
    public Set<String> getProductNameList() { return productNameList; }
}