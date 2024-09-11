package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.utils.ArticleConstants;
import com.abbott.aem.platform.common.util.PageUtil;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.Locale;

@Slf4j
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(
        name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ArticleCategory {

    /**
     * The Constant PRIMARY_ARTICLE_NODE
     */
    public static final String PRIMARY_NODE = "primary";

    /**
     * The Constant TAG_NODE
     */
    public static final String TAG_NODE = "tag";

    /**
     * The Constant PATH
     */
    public static final String PATH = "path";
    
    private final ObjectMapper mapper = new ObjectMapper();

    @Self
    private Resource resource;
    
    @SlingObject
    private ResourceResolver resourceResolver;

    @ValueMapValue
    private String categoryTag;
    
    @ValueMapValue
    private String primaryArticle;


    @Getter
    private ObjectNode objectNode;
    
    @Self
    @Via("resourceResolver")
    private TagManager tagManager;
    
    @PostConstruct
    private void init() {
        if (categoryTag != null) {
            PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
            if (pageManager != null) {
                Tag tag = tagManager.resolve(categoryTag);
                setObjectNode(pageManager, tag);
            }
        }
    }

    private void setObjectNode(PageManager pageManager, Tag tag) {
        objectNode = mapper.createObjectNode();
        Locale locale =null;
        Page currentPage = pageManager.getContainingPage(resource.getPath());
        if(null != currentPage) {
            locale = currentPage.getLanguage();
        }
        this.objectNode.set(PRIMARY_NODE,getPrimaryNode(pageManager.getPage(primaryArticle), tag, locale));
        this.objectNode.set(TAG_NODE,getTagNode(tag, locale));
    }


    private String setupPrimaryArticle() {
        return PageUtil.getInternalAemUrlOrGetExternalUrl(
                primaryArticle,
                resourceResolver);
    }

    private JsonNode getTagNode(Tag tag, Locale locale) {
        ObjectNode tagNode = mapper.createObjectNode();
        if (tag != null) {
            tagNode.put(ArticleConstants.TAG_TITLE, tag.getTitle());
            tagNode.put(ArticleConstants.TAG_LOCALIZED_TITLE, locale != null ? tag.getLocalizedTitle(locale): null);
            tagNode.put(ArticleConstants.TAG_ID, tag.getTagID());
        }
        return tagNode;
    }
    private ObjectNode getPrimaryNode(Page primaryArticlePage, Tag tag, Locale locale) {
        ObjectNode primaryNode = mapper.createObjectNode();
        if (primaryArticlePage != null) {
            if(tag !=null){
                primaryNode.put(ArticleConstants.TAG_TITLE, tag.getTitle());
                primaryNode.put(ArticleConstants.TAG_LOCALIZED_TITLE, locale != null ? tag.getLocalizedTitle(locale): null);
            }
            primaryNode.put(PATH, setupPrimaryArticle());
            ValueMap valueMap = primaryArticlePage.getProperties();
            primaryNode.put(ArticleConstants.TITLE, getFieldValue(valueMap, ArticleConstants.OG_TITLE, NameConstants.PN_TITLE));
            primaryNode.put(ArticleConstants.DESCRIPTION, getFieldValue(valueMap, ArticleConstants.OG_DESCRIPTION, NameConstants.PN_DESCRIPTION));
            primaryNode.put(ArticleConstants.IMAGE, valueMap.get(ArticleConstants.OG_IMAGE, StringUtils.EMPTY));
        }
        return primaryNode;
    }
    private String getFieldValue(ValueMap valueMap, String field, String secondaryField){
        String value = valueMap.get(field, StringUtils.EMPTY);
        if(StringUtils.isBlank(value)){
            value = valueMap.get(secondaryField,StringUtils.EMPTY);
        }
        return value;
    }
}
