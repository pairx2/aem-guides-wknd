package com.abbott.aem.platform.common.components.models.impl.v1;

import java.security.AccessControlException;
import java.util.*;

import lombok.EqualsAndHashCode;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import com.day.cq.tagging.InvalidTagFormatException;

import com.abbott.aem.platform.common.components.models.TabSearch;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@EqualsAndHashCode
@ExtendWith(AemContextExtension.class)
class TabSearchImplTest {

    private final AemContext ctx = new AemContext();

    TabSearchImpl tabsearchService = Mockito.spy(new TabSearchImpl());

    @ChildResource(name = "category")
    private List<Resource> category;

    @ScriptVariable
    Page currentPage;
    Resource resource;
    HierarchyNodeInheritanceValueMap map;
    Locale locale;
    Tag currentTag;

    @BeforeEach
    public void setUp() throws Exception {
        ctx.addModelsForClasses(TabSearchImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TabSearchImplTest.json", "/content");

        currentPage = Mockito.mock(Page.class);
        resource = Mockito.mock(Resource.class);
        currentTag = Mockito.mock(Tag.class);
        locale = Mockito.mock(Locale.class);
        map = Mockito.mock(HierarchyNodeInheritanceValueMap.class);
    }

    @Test
    void testGetSearchCategories() throws AccessControlException,InvalidTagFormatException {
        Iterator<Resource> resources= ctx.currentResource("/content/tabSearch/category").listChildren();
        List<Resource> categories = new ArrayList<>();
        while(resources.hasNext()){
            categories.add(resources.next());
        }
        category= categories;
        TagManager tagManager = ctx.resourceResolver().adaptTo(TagManager.class);
        Tag tempTag = tagManager.createTag("adc:freestyle/categories/libreview/freestyle-libre", "Testing", "unit testing");
        currentTag = tempTag;
        ctx.currentResource("/content/tabSearch");
        currentPage= ctx.currentPage();
        TabSearch tabSearch = ctx.request().adaptTo(TabSearch.class);
        tabSearch.getSearchCategories();
    }

    @Test
    void testPageNullGetSearchCategories() throws AccessControlException {
        ctx.currentResource("/content/tabSearch1");
        TabSearch tabSearch = ctx.request().adaptTo(TabSearch.class);
        tabSearch.getSearchCategories();
    }

    @Test
    void testTagNullSearchCategories() throws AccessControlException {
        Iterator<Resource> resources= ctx.currentResource("/content/tabSearch0/category").listChildren();
        List<Resource> categories = new ArrayList<>();
        while(resources.hasNext()){
            categories.add(resources.next());
        }
        category= categories;
        ctx.currentResource("/content/tabSearch0");
        currentPage= ctx.currentPage();
        currentTag = null;
        TabSearch tabSearch = ctx.request().adaptTo(TabSearch.class);
        tabSearch.getSearchCategories();
    }
}