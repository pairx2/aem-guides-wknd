package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.ArticleTags;
import com.abbott.aem.ardx.division.core.components.pojo.ArticleTagItem;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

@Data
@Model(adaptables = {SlingHttpServletRequest.class}, adapters = {ArticleTags.class,
        ComponentExporter.class}, resourceType = ArticleTagsImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ArticleTagsImpl implements ArticleTags {

    protected static final String RESOURCE_TYPE = "ardx/division/components/content/articletags";
    private static final String HTML_EXTN = ".html";
    private static final String HASH = "#";
    private static final String STR_TRUE = "true";
    private static final String PROP_LOCALIZE_TAGS_TITLE = "localizeTagsTitle";
    private static final String VIEWPOINTS_TOPICS_TAG_STR = "/viewpoints/topics/";

    @Setter(AccessLevel.NONE)
    @ValueMapValue
    public String icon;

    @Setter(AccessLevel.NONE)
    @ValueMapValue
    public String[] categoryTag;

    @ScriptVariable
    protected Page currentPage;

    @SlingObject
    protected ResourceResolver resourceResolver;

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

    @Override
    public List<ArticleTagItem> getTagsList() {
        List<ArticleTagItem> tagsList = new LinkedList<>();
        Tag[] pageTags = currentPage.getTags();
        if (pageTags.length == 0) {
            return tagsList;
        }
        List<String> categoryTagList = new LinkedList<>();
        if (Objects.nonNull(categoryTag) && categoryTag.length > 0) {
            TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
            for (String catTag : categoryTag) {
                Tag catTagVal = tagManager.resolve(catTag);
                categoryTagList.add(catTagVal.getPath());
            }
        }
        extractTagsToRender(tagsList, pageTags, categoryTagList);
        return tagsList;
    }

    private void extractTagsToRender(List<ArticleTagItem> tagsList, Tag[] pageTags, List<String> categoryTagList) {
        if (categoryTagList.isEmpty()) {
            for (Tag tag : pageTags) {
                if (isViewpointsTopicTag(tag)) {
                    //when Tag is a "View points Topics" tag, do not add to the list for rendering on the page.
                    continue;
                }
                ArticleTagItem tagItem = getTagItem(tag);
                tagsList.add(tagItem);
            }
        } else {
            extractCategoryTags(tagsList, pageTags, categoryTagList);
        }
    }

    private void extractCategoryTags(List<ArticleTagItem> tagsList, Tag[] pageTags, List<String> categoryTagList) {
        for (Tag tag : pageTags) {
            if (isViewpointsTopicTag(tag)) {
                //when Tag is a "View points Topics" tag, do not add to the list for rendering on the page.
                continue;
            }
            ArticleTagItem tagItem = getTagItem(tag);
            if (StringUtils.isNotEmpty(tag.getTitle()) && categoryTagList.stream().anyMatch(categoryTagPath -> tag.getPath().startsWith(categoryTagPath))) {
                tagsList.add(tagItem);
            }
        }
    }

    private boolean isViewpointsTopicTag(Tag tag) {
        boolean isTopicsTag = false;
        if (tag.getLocalTagID().indexOf(VIEWPOINTS_TOPICS_TAG_STR) > 0) {
            isTopicsTag = true;
        }
        return isTopicsTag;
    }

    private ArticleTagItem getTagItem(Tag tag) {
        ArticleTagItem tagItem = new ArticleTagItem();
        tagItem.setTitle(tag.getTitle(locale));
        tagItem.setName(tag.getName());
        tagItem.setPath(currentPage.getParent().getPath() + HTML_EXTN + HASH + tag.getName());
        return tagItem;
    }
}