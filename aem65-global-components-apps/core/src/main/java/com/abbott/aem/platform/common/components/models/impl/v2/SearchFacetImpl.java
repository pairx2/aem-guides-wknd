package com.abbott.aem.platform.common.components.models.impl.v2;

import com.abbott.aem.platform.common.components.models.SearchFacet;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import org.apache.commons.collections4.IteratorUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.*;
import java.util.stream.Collectors;

/**
 * The Class SearchFacetImpl.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = {SlingHttpServletRequest.class}, adapters = {SearchFacet.class}, resourceType = {
        SearchFacetImpl.RESOURCE_TYPE}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class SearchFacetImpl implements SearchFacet {

    /**
     * The Constant RESOURCE_TYPE.
     */
    protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/searchfacet/v2/searchfacet";
    private static final String STR_TRUE = "true";
    private static final String PROP_LOCALIZE_TAGS_TITLE = "localizeTagsTitle";
    @SlingObject
    ResourceResolver resourceResolver;
    @Inject
    private Page currentPage;
    /**
     * The category.
     */
    @ChildResource(name = "categoryFacets")
    @Setter(AccessLevel.NONE)
    private List<Resource> categoryFacets;
    /**
     * The is search bar enable.
     */
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String isSearchBarEnable;
    /**
     * The is auto hiding enable.
     */
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String isAutoHidingEnable;
    /**
     * The search heading.
     */
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String searchHeading;
    /**
     * The search placeholder.
     */
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String searchPlaceholder;
    /**
     * The search icon.
     */
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String icon;
    /**
     * The is Tag Facet.
     */
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String isTagFacet;
    /**
     * retain filter
     */
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String retainFilters;

    private Locale locale = null;

    @PostConstruct
    protected void init() {
        InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(currentPage.getContentResource());
        String localizeTagsTitleProp = inheritedProperties.getInherited(PROP_LOCALIZE_TAGS_TITLE, StringUtils.EMPTY);
        if (localizeTagsTitleProp.equals(STR_TRUE)) {
            //when localizeTagsTitle is set to true for a site, get locale based on site language.
            String siteLanguage = inheritedProperties.getInherited(JcrConstants.JCR_LANGUAGE, StringUtils.EMPTY);
            locale = StringUtils.isNotBlank(siteLanguage) ? new Locale(siteLanguage) : null;
        }
    }

    /**
     * Gets the search facet properties.
     *
     * @return the search facet properties
     */
    @Override
    public List<SearchFacetItem> getSearchFacetProperties() {
        List<SearchFacetItem> searchFacetList = new ArrayList<>();
        if (null != categoryFacets) {
            if (StringUtils.isNotBlank(isTagFacet) && isTagFacet.equalsIgnoreCase(STR_TRUE)) {
                searchFacetList = getSearchFacetsBasedOnTags();
            } else {
                for (Resource childRes : categoryFacets) {
                    SearchFacetItem searchFacetBean = childRes.adaptTo(SearchFacetItem.class);
                    searchFacetList.add(searchFacetBean);
                }
            }
        }
        return searchFacetList;
    }

    List<SearchFacetItem> getSearchFacetsBasedOnTags() {
        List<SearchFacetItem> searchFacetsList = new ArrayList<>();
        for (Resource childRes : categoryFacets) {
            SearchFacetItem searchFacetBean = childRes.adaptTo(SearchFacetItem.class);
            List<Tag> searchFacetTags = getTagListForSearchFacet(searchFacetBean);
            Iterator<Tag> facetTagsItr = searchFacetTags.iterator();
            while (facetTagsItr.hasNext()) {
                Tag facetTag = facetTagsItr.next();
                SearchFacetItem childTagFacetBean = getSearchFacetTagItem(searchFacetBean, facetTag);
                searchFacetsList.add(childTagFacetBean);
            }
        }
        return searchFacetsList;
    }

    SearchFacetItem getSearchFacetTagItem(SearchFacetItem mainSearchFacetItem, Tag facetTag) {
        SearchFacetItem childTagFacetBean = new SearchFacetItem();
        childTagFacetBean.setTitle(mainSearchFacetItem.getTitle());
        childTagFacetBean.setFieldName(mainSearchFacetItem.getFieldName());
        childTagFacetBean.setIsMultiple(mainSearchFacetItem.getIsMultiple());
        childTagFacetBean.setDefaultSortingOrder(mainSearchFacetItem.getDefaultSortingOrder());
        childTagFacetBean.setIsCheckboxEnable(mainSearchFacetItem.getIsCheckboxEnable());
        childTagFacetBean.setIsSortingEnable(mainSearchFacetItem.getIsSortingEnable());
        childTagFacetBean.setIsTruncationEnable(mainSearchFacetItem.getIsTruncationEnable());
        childTagFacetBean.setIsPrimary(mainSearchFacetItem.getIsPrimary());
        childTagFacetBean.setIsSecondary(mainSearchFacetItem.getIsSecondary());
        String facetTagTitle = facetTag.getTitle(locale).trim();
        List<Tag> facetFilterTags = IteratorUtils.toList(facetTag.listChildren());
        Map<String, List<String>> facetTagsMap = new HashMap<>();
        childTagFacetBean.setTagFacetTitle(facetTagTitle);
        facetTagsMap.put(facetTagTitle, facetFilterTags.stream().map(facetFilterTag -> facetFilterTag.getTitle(locale).trim()).collect(Collectors.toList()));
        childTagFacetBean.setAllTagFacets(new Gson().toJson(facetTagsMap));
        return childTagFacetBean;
    }

    List<Tag> getTagListForSearchFacet(SearchFacetItem facetItem) {
        List<Tag> tagFacetsList = new ArrayList<>();
        String facetTagID = facetItem.getFacetTagID();
        if (StringUtils.isNotBlank(facetTagID)) {
            TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
            Tag facetTag = tagManager.resolve(facetTagID);
            boolean isTagChildAsFacets = facetItem.isTagChildrenAsfacets();
            if (isTagChildAsFacets) {
                tagFacetsList.addAll(IteratorUtils.toList(facetTag.listChildren()));
            } else {
                tagFacetsList.add(facetTag);
            }
        }
        return tagFacetsList;
    }
}
