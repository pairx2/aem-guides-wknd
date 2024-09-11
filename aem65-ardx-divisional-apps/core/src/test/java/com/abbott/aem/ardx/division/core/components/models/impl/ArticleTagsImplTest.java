package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.ArticleTags;
import com.abbott.aem.ardx.division.core.components.pojo.ArticleTagItem;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.TagManager;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith(AemContextExtension.class)
class ArticleTagsImplTest {

    private static final String RESOURCE_1 = "/content/parentpage/currentpage/jcr:content/articletags";
    private static final String RESOURCE_2 = "/content/parentpage/currentpage/jcr:content/articletags1";
    private static final String RESOURCE_3 = "/content/parentpage1/currentpage/jcr:content/articletags";
    private static final String RESOURCE_4= "/content/parentpage1/currentpage/jcr:content/articletags1";
    
    private final AemContext ctx = new AemContext();

    ArticleTags articleTags;

    @BeforeEach
    public void setUp() {
        ctx.addModelsForClasses(ArticleTags.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ArticleTagsImplTest.json", "/content");
    }

    @Test
    void testGetIcon() {
        ctx.currentResource(RESOURCE_2);
        articleTags = ctx.request().adaptTo(ArticleTags.class);
        final String expected = "true";
        String actual = articleTags.getIcon();
        assertEquals(expected, actual);
    }

    @Test
    void testGetTagsList() throws InvalidTagFormatException {
        ctx.currentResource(RESOURCE_1);
        TagManager tagManager = ctx.resourceResolver().adaptTo(TagManager.class);
        articleTags = ctx.request().adaptTo(ArticleTags.class);
        tagManager.createTag("/content/cq:tags/ardx/toxicology/viewpoints/hair-drug-testing", "Tag1 Title", "Tag1 Description");
        tagManager.createTag("/content/cq:tags/ardx/toxicology", "Testing", "unit testing");
        List<ArticleTagItem> tagList = articleTags.getTagsList();
        assertNotNull(tagList);
    }
    
    @Test
    void testGetTagsListNoTag() throws InvalidTagFormatException {
        ctx.currentResource(RESOURCE_2);
        articleTags = ctx.request().adaptTo(ArticleTags.class);
        List<ArticleTagItem> tagList = articleTags.getTagsList();
        assertNotNull(tagList);
    }

    @Test
    void testGetTagsListCategoryTagsBlank() throws InvalidTagFormatException {
        ctx.currentResource(RESOURCE_2);
        TagManager tagManager = ctx.resourceResolver().adaptTo(TagManager.class);
        articleTags = ctx.request().adaptTo(ArticleTags.class);
        tagManager.createTag("/content/cq:tags/ardx/toxicology/viewpoints/hair-drug-testing", "Tag1 Title", "Tag1 Description");
        tagManager.createTag("/content/cq:tags/ardx/toxicology", "Testing", "unit testing");
        List<ArticleTagItem> tagList = articleTags.getTagsList();
        assertNotNull(tagList);

    }
    
    @Test
    void testGetTagsListCategoryTagsNotPresent() throws InvalidTagFormatException {
        ctx.currentResource(RESOURCE_3);
        TagManager tagManager = ctx.resourceResolver().adaptTo(TagManager.class);
        articleTags = ctx.request().adaptTo(ArticleTags.class);
        tagManager.createTag("/content/cq:tags/ardx/toxicology/viewpoints/topics/article/impact", "Tag1 Title", "Tag1 Description");
        tagManager.createTag("/content/cq:tags/ardx/toxicology", "Testing", "unit testing");
        List<ArticleTagItem> tagList = articleTags.getTagsList();
        assertNotNull(tagList);
    }
    @Test
    void testGetTagsListCategoryTagsPresent() throws InvalidTagFormatException {
        ctx.currentResource(RESOURCE_4);
        TagManager tagManager = ctx.resourceResolver().adaptTo(TagManager.class);
        articleTags = ctx.request().adaptTo(ArticleTags.class);
        tagManager.createTag("/content/cq:tags/ardx/toxicology/viewpoints/topics/article/impact", "Tag1 Title", "Tag1 Description");
        tagManager.createTag("/content/cq:tags/ardx/toxicology", "Testing", "unit testing");
        List<ArticleTagItem> tagList = articleTags.getTagsList();
        assertNotNull(tagList);
    }
    
}
