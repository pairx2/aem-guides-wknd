package com.abbott.aem.platform.common.components.models.impl.v2;

import com.abbott.aem.platform.common.components.models.SearchFacet;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class SearchFacetItemImplV2Test {

    private final AemContext ctx = new AemContext();

    @InjectMocks
    private Component component;

    private TagManager tagManager;
    private Page currentPage;

    @BeforeEach
    public void setUp() throws Exception {
        tagManager = Mockito.mock(TagManager.class);
        Tag tag = Mockito.mock(Tag.class);
        Mockito.when(tagManager.resolve(Mockito.anyString())).thenReturn(tag);
        Mockito.when(tag.listChildren()).thenReturn(List.of(tag).iterator());

        currentPage = Mockito.mock(Page.class);
        Resource contentResource = Mockito.mock(Resource.class);
        Mockito.when(currentPage.getContentResource()).thenReturn(contentResource);

        ctx.registerAdapter(ResourceResolver.class, TagManager.class, tagManager);
        ctx.addModelsForClasses(SearchFacetItem.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v2/SearchResultItemImplTest.json", "/content");
    }

    @Test
    void testGetSearchFacetProperties() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertEquals(1, searchFacet.getSearchFacetProperties().size());
        assertEquals("title", searchFacet.getSearchFacetProperties().get(0).getTitle());
        assertEquals("fieldName", searchFacet.getSearchFacetProperties().get(0).getFieldName());
        assertEquals("show", searchFacet.getSearchFacetProperties().get(0).getShowText());
        assertEquals("hide", searchFacet.getSearchFacetProperties().get(0).getHideText());
        assertEquals(3, searchFacet.getSearchFacetProperties().get(0).getNumberOfItemsVisible());
        assertEquals("primary", searchFacet.getSearchFacetProperties().get(0).getIsPrimary());
        assertEquals("secondary", searchFacet.getSearchFacetProperties().get(0).getIsSecondary());
        assertEquals("tag1", searchFacet.getSearchFacetProperties().get(0).getFacetTagID());
    }


    @Test
    void testSetFieldName() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        searchFacet.getSearchFacetProperties().get(0).setFieldName("fieldName");
        assertEquals("fieldName", searchFacet.getSearchFacetProperties().get(0).getFieldName());
    }

    @Test
    void testSetShowText() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        searchFacet.getSearchFacetProperties().get(0).setShowText("show");
        assertEquals("show", searchFacet.getSearchFacetProperties().get(0).getShowText());
    }

    @Test
    void testSetNumberOfItemsVisible() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        searchFacet.getSearchFacetProperties().get(0).setNumberOfItemsVisible(3);
        assertEquals(3, searchFacet.getSearchFacetProperties().get(0).getNumberOfItemsVisible());
    }

    @Test
    void testSetTitle() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        searchFacet.getSearchFacetProperties().get(0).setTitle("title");
        assertEquals("title", searchFacet.getSearchFacetProperties().get(0).getTitle());
    }

    @Test
    void testSetHideText() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        searchFacet.getSearchFacetProperties().get(0).setHideText("hide");
        assertEquals("hide", searchFacet.getSearchFacetProperties().get(0).getHideText());
    }

    @Test
    void testSetIsMultiple() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        searchFacet.getSearchFacetProperties().get(0).setIsMultiple("true");
        assertEquals("true", searchFacet.getSearchFacetProperties().get(0).getIsMultiple());
    }

    @Test
    void testSetIsTruncationEnable() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        searchFacet.getSearchFacetProperties().get(0).setIsTruncationEnable("true");
        assertEquals("true", searchFacet.getSearchFacetProperties().get(0).getIsTruncationEnable());
    }

    @Test
    void testGetIsPrimary() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        searchFacet.getSearchFacetProperties().get(0).setIsPrimary("primary");
        assertEquals("primary", searchFacet.getSearchFacetProperties().get(0).getIsPrimary());
    }

    @Test
    void testGetIsSecondary() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        searchFacet.getSearchFacetProperties().get(0).setIsSecondary("secondary");
        assertEquals("secondary", searchFacet.getSearchFacetProperties().get(0).getIsSecondary());
    }

    @Test
    void testGetFacetTagID() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        assertEquals("tag1", searchFacet.getSearchFacetProperties().get(0).getFacetTagID());
    }

    @Test
    void testGetDefaultSortingOrder() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        searchFacet.getSearchFacetProperties().get(0).setDefaultSortingOrder("secondary");
        assertEquals("secondary", searchFacet.getSearchFacetProperties().get(0).getDefaultSortingOrder());
    }

    @Test
    void testGetIsSortingEnable() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        searchFacet.getSearchFacetProperties().get(0).setIsSortingEnable("secondary");
        assertEquals("secondary", searchFacet.getSearchFacetProperties().get(0).getIsSortingEnable());
    }

    @Test
    void TestGetIsCheckboxEnable() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        searchFacet.getSearchFacetProperties().get(0).setIsCheckboxEnable("true");
        assertEquals("true", searchFacet.getSearchFacetProperties().get(0).getIsCheckboxEnable());
    }

    @Test
    void TestGetIsTagChildrenFacets() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertNotNull(searchFacet.getSearchFacetProperties());
        assertNotEquals("null", searchFacet.getSearchFacetProperties().get(0).getIsTagChildrenFacets());
    }


    @Test
    void testCompareTo() {
        SearchFacetItem item1 = new SearchFacetItem();
        item1.setTagFacetTitle("A");

        SearchFacetItem item2 = new SearchFacetItem();
        item2.setTagFacetTitle("B");

        assertTrue(item1.compareTo(item2) < 0);
    }

    @Test
    void testEqualsAndHashCode() {
        SearchFacetItem item1 = new SearchFacetItem();
        item1.setTagFacetTitle("title");
        assertEquals(item1, item1);
        assertNotEquals (null,item1);
        assertNotEquals(item1, new Object());

        SearchFacetItem item2 = new SearchFacetItem();
        item2.setTagFacetTitle("title");
        assertEquals(item1, item2);
        assertEquals(item1.hashCode(), item2.hashCode());

        SearchFacetItem item3 = new SearchFacetItem();
        item3.setTagFacetTitle("differentTitle");
        assertNotEquals(item1, item3);
        assertNotEquals(item1.hashCode(), item3.hashCode());

        SearchFacetItem itemWithNullTitle = new SearchFacetItem();
        SearchFacetItem anotherItemWithNullTitle = new SearchFacetItem();

        assertTrue(itemWithNullTitle.getTagFacetTitle() == null && anotherItemWithNullTitle.getTagFacetTitle() == null);
        assertEquals(itemWithNullTitle.hashCode(), anotherItemWithNullTitle.hashCode());
    }
}