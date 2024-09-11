package com.abbott.aem.platform.common.components.models.impl.v2;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.abbott.aem.platform.common.components.models.SearchFacet;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.lang.reflect.Field;
import com.day.cq.commons.inherit.InheritanceValueMap;
import java.util.*;

@ExtendWith(AemContextExtension.class)
class SearchFacetImplTest {

    private final AemContext ctx = new AemContext();

    @InjectMocks
    private SearchFacetImpl searchFacet;

    @Mock
    private ResourceResolver resourceResolver;

    @Mock
    private Page currentPage;

    @Mock
    private Resource categoryFacetResource;

    @Mock
    private Resource contentResource;

    @Mock
    private TagManager tagManager;

    @Mock
    private Tag facetTag;

    @Mock
    private InheritanceValueMap inheritanceValueMap;

    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        ctx.addModelsForClasses(SearchFacetImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v2/SearchFacetImplTest.json",
                "/content");
        ctx.registerService(ResourceResolver.class, resourceResolver);

        // Setting up mocks
        when(currentPage.getContentResource()).thenReturn(contentResource);
        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(tagManager.resolve(anyString())).thenReturn(facetTag);

        // Setting fields using reflection
        setPrivateField(searchFacet, "resourceResolver", resourceResolver);
        setPrivateField(searchFacet, "currentPage", currentPage);
    }

    private void setPrivateField(Object target, String fieldName, Object value) throws Exception {
        Field field = target.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(target, value);
    }

    @Test
    void testGetIsSearchBarEnable() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertThrows(UnsupportedOperationException.class, searchFacet::getIsSearchBarEnable);
    }

    @Test
    void testGetIsAutoHidingEnable() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertThrows(UnsupportedOperationException.class, searchFacet::getIsAutoHidingEnable);
    }

    @Test
    void testGetSearchHeading() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertThrows(UnsupportedOperationException.class, searchFacet::getSearchHeading);
    }

    @Test
    void testGetSearchPlaceholder() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertThrows(UnsupportedOperationException.class, searchFacet::getSearchPlaceholder);
    }

    @Test
    void testGetIcon() {
        ctx.currentResource("/content/searchfacet");
        SearchFacet searchFacet = ctx.request().adaptTo(SearchFacet.class);
        assertThrows(UnsupportedOperationException.class, searchFacet::getIcon);
    }

    @Test
    void testGetSearchFacetProperties() throws Exception {
        List<Resource> categoryFacets = new ArrayList<>();
        categoryFacets.add(categoryFacetResource);
        setPrivateField(searchFacet, "categoryFacets", categoryFacets);
        when(categoryFacetResource.adaptTo(SearchFacetItem.class)).thenReturn(new SearchFacetItem());
        List<SearchFacetItem> facetItems = searchFacet.getSearchFacetProperties();
        assertNotNull(facetItems);
        assertFalse(facetItems.isEmpty());
    }

    @Test
    void testGetSearchFacetsBasedOnTags() throws Exception {
        SearchFacetItem searchFacetItem = new SearchFacetItem();
        when(categoryFacetResource.adaptTo(SearchFacetItem.class)).thenReturn(searchFacetItem);
        when(facetTag.listChildren()).thenReturn(Collections.emptyIterator());
        when(tagManager.resolve(anyString())).thenReturn(facetTag);
        List<Resource> categoryFacets = Collections.singletonList(categoryFacetResource);
        setPrivateField(searchFacet, "categoryFacets", categoryFacets);
        List<SearchFacetItem> facetItems = searchFacet.getSearchFacetsBasedOnTags();
        assertNotNull(facetItems, "Facet items should not be null");
    }

    @Test
    void testGetSearchFacetTagItem() throws Exception {
        SearchFacetItem mainItem = new SearchFacetItem();
        mainItem.setTitle("Main Title");
        Tag facetTag = mock(Tag.class);
        when(facetTag.getTitle(any(Locale.class))).thenReturn("Facet Tag");
        when(facetTag.listChildren()).thenReturn(Collections.emptyIterator());
        SearchFacetImpl searchFacet = new SearchFacetImpl();
        setPrivateField(searchFacet, "locale", Locale.ENGLISH);
        SearchFacetItem item = searchFacet.getSearchFacetTagItem(mainItem, facetTag);
        assertNotNull(item);
        assertEquals("Main Title", item.getTitle());
        assertEquals("Facet Tag", item.getTagFacetTitle());
    }

    @Test
    void testGetTagListForSearchFacet() throws Exception {
        SearchFacetItem facetItem = new SearchFacetItem();
        when(tagManager.resolve(anyString())).thenReturn(facetTag);
        when(facetTag.listChildren()).thenReturn(Collections.emptyIterator());
        setPrivateField(searchFacet, "resourceResolver", resourceResolver);
        List<Tag> tagList = searchFacet.getTagListForSearchFacet(facetItem);
        assertNotNull(tagList, "Tag list should not be null");
        assertTrue(tagList.isEmpty(), "Tag list should be empty based on the provided mocks");
    }

    @Test
    void testEmptyCategoryFacets() throws Exception {
        setPrivateField(searchFacet, "categoryFacets", new ArrayList<>());
        assertTrue(searchFacet.getSearchFacetProperties().isEmpty());
    }

    @Test
    void testGetSearchPlaceholderDirectly() throws Exception {
        setPrivateField(searchFacet, "searchPlaceholder", "Directly Set Placeholder");
        String placeholder = searchFacet.getSearchPlaceholder();
        assertNotNull(placeholder, "Placeholder should not be null");
        assertEquals("Directly Set Placeholder", placeholder, "Placeholder value does not match the expected value");
    }

    @Test
    void testGetIsSearchBarEnableDirectly() throws Exception {
        setPrivateField(searchFacet, "isSearchBarEnable", "Directly Set IsSearchBarEnable");
        String isSearchBarEnable = searchFacet.getIsSearchBarEnable();
        assertNotNull(isSearchBarEnable, "IsSearchBarEnable should not be null");
        assertEquals("Directly Set IsSearchBarEnable", isSearchBarEnable, "IsSearchBarEnable value does not match the expected value");
    }

    @Test
    void testGetSearchHeadingDirectly() throws Exception {
        setPrivateField(searchFacet, "searchHeading", "Directly Set SearchHeading");
        String searchHeading = searchFacet.getSearchHeading();
        assertNotNull(searchHeading, "SearchHeading should not be null");
        assertEquals("Directly Set SearchHeading", searchHeading, "SearchHeading value does not match the expected value");
    }

    @Test
    void testGetIsAutoHidingEnableDirectly() throws Exception {
        setPrivateField(searchFacet, "isAutoHidingEnable", "Directly Set IsAutoHidingEnable");
        String value = searchFacet.getIsAutoHidingEnable();
        assertNotNull(value, "IsAutoHidingEnable should not be null");
        assertEquals("Directly Set IsAutoHidingEnable", value, "IsAutoHidingEnable value does not match the expected value");
    }

    @Test
    void testGetIconDirectly() throws Exception {
        setPrivateField(searchFacet, "icon", "Directly Set Icon");
        String icon = searchFacet.getIcon();
        assertNotNull(icon, "Icon should not be null");
        assertEquals("Directly Set Icon", icon, "Icon value does not match the expected value");
    }
    @Test
    void testGetIsTagFacetDirectly() throws Exception {
        setPrivateField(searchFacet, "isTagFacet", "Directly Set IsTagFacet");
        String isTagFacet = searchFacet.getIsTagFacet();
        assertNotNull(isTagFacet, "IsTagFacet should not be null");
        assertEquals("Directly Set IsTagFacet", isTagFacet, "IsTagFacet value does not match the expected value");
    }
    @Test
    void testGetRetainFiltersDirectly() throws Exception {
        setPrivateField(searchFacet, "retainFilters", "Directly Set RetainFilters");
        String retainFilters = searchFacet.getRetainFilters();
        assertNotNull(retainFilters, "RetainFilters should not be null");
        assertEquals("Directly Set RetainFilters", retainFilters, "RetainFilters value does not match the expected value");
    }

}