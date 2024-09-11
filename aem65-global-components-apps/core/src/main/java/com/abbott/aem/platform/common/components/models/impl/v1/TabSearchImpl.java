package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.TabSearch;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;
import com.abbott.aem.platform.common.components.pojo.TitleTagBean;
import com.abbott.aem.platform.common.constants.CommonConstants;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

/**
 * The Class TabSearchImpl.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { TabSearch.class }, resourceType = {
        CommonConstants.RESOURCE_TYPE_TAB_SEARCH }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TabSearchImpl implements TabSearch {

    /**
     * The field name.
     */
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String fieldName;

    /**
     * The category.
     */
    @ChildResource(name = "category")
    @Setter(AccessLevel.NONE)
    private List<Resource> category;

    /**
     * The resource resolver.
     */
    @SlingObject
    private ResourceResolver resourceResolver;

    /**
     * Gets the search categories.
     *
     * @return the search categories
     */

    /**
     * The current page.
     */
    @ScriptVariable
    Page currentPage;

    /**
     * The current tag.
     */
    private Tag currentTag;

    /**
     * The field name.
     */
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String errorMessage;

    @Override
    public List<TitleTagBean> getSearchCategories() {
        List<TitleTagBean> searchCategoriesList = new ArrayList<>();

        TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
        if (null != category) {
            for (Resource childRes : category) {
                ValueMap resMap = childRes.getValueMap();
                TitleTagBean titleTagBean = new TitleTagBean();
                titleTagBean.setTitle(PlatformUtil.getPropertyValue(resMap, CommonConstants.TAG_TITLE));
                titleTagBean.setSearchType(PlatformUtil.getPropertyValue(resMap, CommonConstants.SEARCH_TYPE));
                if(currentPage!=null) {
                    Locale pageLocale = currentPage.getLanguage(false);
                    String propertyValue = PlatformUtil.getPropertyValue(resMap, CommonConstants.TAG);
                    currentTag = tagManager.resolve(propertyValue);
                    if(isCurrentTag(pageLocale)) {
                        String localTitle = currentTag.getLocalizedTitle(pageLocale);
                        titleTagBean.setTagTitle(localTitle);
                        titleTagBean.setPlaceHolderErrorMessage(false);
                    }
                    if(StringUtils.isNotEmpty(propertyValue)) {
                        titleTagBean.setTagTitle(tagManager.resolve(propertyValue).getTitle());
                        titleTagBean.setPlaceHolderErrorMessage(true);
                    } else {
                        titleTagBean.setTagTitle(StringUtils.EMPTY);
                        titleTagBean.setPlaceHolderErrorMessage(true);
                    }
                    searchCategoriesList.add(titleTagBean);
                }
            }
        }
        return searchCategoriesList;
    }

    public boolean isCurrentTag(Locale pageLocale){
        return currentTag!= null && currentTag.getLocalizedTitle(pageLocale) != null;
    }

}