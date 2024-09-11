package com.abbott.aem.platform.common.components.models.impl.v1;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.components.Component;
import com.abbott.aem.platform.common.components.models.DynamicCardList;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import lombok.SneakyThrows;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(AemContextExtension.class)
class DynamicCardListImplTest {
    private static final String PATH = "/content/dynamiccardlist";
    private final AemContext ctx = new AemContext();

    private Component component;
    private Page page1;
    private Page page2;
    private ResourceResolver resourceResolver;
    private Resource resource;
    private Page currentPage;
    private TagManager tagManager;
    private Tag tag1;
    private Tag tag2;
    private DynamicCardList dynamicCardlist;

    @BeforeEach
    void setUp() throws Exception {
        component = Mockito.mock(Component.class);
        resourceResolver = Mockito.mock(ResourceResolver.class);
        resource = Mockito.mock(Resource.class);
        currentPage = Mockito.mock(Page.class);
        tagManager = Mockito.mock(TagManager.class);
        tag1 = Mockito.mock(Tag.class);
        tag2 = Mockito.mock(Tag.class);

        ctx.addModelsForClasses(DynamicCardListImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/DynamicCardListImplTest.json", "/content");

        ctx.registerService(ResourceResolver.class,resourceResolver);
        ctx.request().setAttribute("resourceResolver",resourceResolver);
        page1 = Mockito.mock(Page.class);
        page2 = Mockito.mock(Page.class);

        ctx.registerService(ResourceResolver.class, resourceResolver);

        // Set attributes for current request
        ctx.request().setAttribute("resourceResolver", resourceResolver);
        ctx.request().setAttribute("currentPage", currentPage);

        // Mock behaviors
        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(currentPage.getTags()).thenReturn(new Tag[]{tag1});
        when(tagManager.resolve(tag1.getTagID())).thenReturn(tag1);
        when(tag1.getTagID()).thenReturn("tag1");

        when(resourceResolver.getResource("/content/uk/en/home/adult/products")).thenReturn(resource);
        Page filePathPage = mock(Page.class);
        when(resource.adaptTo(Page.class)).thenReturn(filePathPage);
        when(filePathPage.listChildren()).thenReturn(Collections.singleton(page2).iterator());

        when(page2.getTags()).thenReturn(new Tag[]{tag2});
        when(tagManager.resolve(tag2.getTagID())).thenReturn(tag2);
        when(tag2.getTagID()).thenReturn("tag2");

        // Adapt the request to DynamicCardList
        ctx.currentResource(PATH);
        dynamicCardlist = ctx.request().adaptTo(DynamicCardList.class);

        // Manually inject the resource resolver
        ((DynamicCardListImpl) dynamicCardlist).setResolver(resourceResolver);
    }

    @Test
    void testGetFilePath() {
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardlist = ctx.request().adaptTo(DynamicCardList.class);
        assertEquals("/content/uk/en/home/adult/products", dynamicCardlist.getFilePath());
    }

    @Test
    void testGetListOfCards() throws RepositoryException, ParserConfigurationException {
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardlist = ctx.request().adaptTo(DynamicCardList.class);

        List<Page> list = dynamicCardlist.getListOfCards();
        assertEquals(0, list.size());
    }

    @SneakyThrows
    @Test
    void testGetListOfCardsEmpty() {
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardlist = ctx.request().adaptTo(DynamicCardList.class);

        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(currentPage.getTags()).thenReturn(new Tag[]{tag1});
        when(tagManager.resolve(tag1.getTagID())).thenReturn(tag1);
        when(tag1.getTagID()).thenReturn("tag1");

        when(resourceResolver.getResource("/content/uk/en/home/adult/products")).thenReturn(resource);
        when(resource.adaptTo(Page.class)).thenReturn(page1);
        when(page1.listChildren()).thenReturn(new ArrayList<Page>().iterator());

        List<Page> list = dynamicCardlist.getListOfCards();
        assertEquals(0, list.size());
    }

    @SneakyThrows
    @Test
    void testGetListOfCardsNonMatchingTags() {
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardlist = ctx.request().adaptTo(DynamicCardList.class);

        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(currentPage.getTags()).thenReturn(new Tag[]{tag1});
        when(tagManager.resolve(tag1.getTagID())).thenReturn(tag1);
        when(tag1.getTagID()).thenReturn("tag1");

        when(resourceResolver.getResource("/content/uk/en/home/adult/products")).thenReturn(resource);
        when(resource.adaptTo(Page.class)).thenReturn(page1);
        when(page1.listChildren()).thenReturn(List.of(page2).iterator());

        when(page2.getTags()).thenReturn(new Tag[]{tag2});
        when(tagManager.resolve(tag2.getTagID())).thenReturn(tag2);
        when(tag2.getTagID()).thenReturn("tag2");

        when(tag1.getTagID()).thenReturn("differentTag");

        List<Page> list = dynamicCardlist.getListOfCards();
        assertEquals(0, list.size());
    }

    @Test
    void testGetRes() {
        when(resourceResolver.getResource("/content/uk/en/home/adult/products")).thenReturn(resource);

        Resource res = dynamicCardlist.getRes();
        assertEquals(resource, res);
    }

    @SneakyThrows
    @Test
    void testGetListOfCardsCurrentPageNull() {
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardlist = ctx.request().adaptTo(DynamicCardList.class);

        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(resourceResolver.getResource("/content/uk/en/home/adult/products")).thenReturn(resource);
        when(resource.adaptTo(Page.class)).thenReturn(page1);
        when(page1.listChildren()).thenReturn(List.of(page2).iterator());

        List<Page> list = dynamicCardlist.getListOfCards();
        assertEquals(0, list.size());
    }

    @SneakyThrows
    @Test
    void testGetListOfCardsFilePathResourceNull() {
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardlist = ctx.request().adaptTo(DynamicCardList.class);

        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(currentPage.getTags()).thenReturn(new Tag[]{tag1});
        when(tagManager.resolve(tag1.getTagID())).thenReturn(tag1);
        when(tag1.getTagID()).thenReturn("tag1");

        List<Page> list = dynamicCardlist.getListOfCards();
        assertEquals(0, list.size());
    }

    @SneakyThrows
    @Test
    void testGetListOfCardsRemoveCurrentPage() {
        ctx.currentResource(DynamicCardListImplTest.PATH);
        DynamicCardList dynamicCardlist = ctx.request().adaptTo(DynamicCardList.class);

        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(currentPage.getTags()).thenReturn(new Tag[]{tag1});
        when(tagManager.resolve(tag1.getTagID())).thenReturn(tag1);
        when(tag1.getTagID()).thenReturn("tag1");

        when(resourceResolver.getResource("/content/uk/en/home/adult/products")).thenReturn(resource);
        when(resource.adaptTo(Page.class)).thenReturn(page1);
        when(page1.listChildren()).thenReturn(List.of(currentPage).iterator());

        when(currentPage.getTags()).thenReturn(new Tag[]{tag1});

        List<Page> list = dynamicCardlist.getListOfCards();
        assertEquals(0, list.size());
    }

    @SneakyThrows
    @Test
    void testGetListOfCardsTagCurrentResourceNull() {
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardlist = ctx.request().adaptTo(DynamicCardList.class);

        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);

        when(resourceResolver.getResource("/content/uk/en/home/adult/products")).thenReturn(resource);
        when(resource.adaptTo(Page.class)).thenReturn(page1);
        when(page1.listChildren()).thenReturn(List.of(page2).iterator());

        when(page2.getTags()).thenReturn(new Tag[]{tag2});
        when(tagManager.resolve(tag2.getTagID())).thenReturn(tag2);
        when(tag2.getTagID()).thenReturn("tag2");

        List<Page> list = dynamicCardlist.getListOfCards();
        assertEquals(0, list.size());
    }

    @Test
    void testGetNoOfResults() {
        final String expected = "noOfResults";
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardList = ctx.request().adaptTo(DynamicCardList.class);
        String actual = dynamicCardList.getNoOfResults();
        assertEquals(expected, actual);
    }

    @Test
    void testGetImageDefault() {
        final String expected = "/content/dam/EnsurePlusAdvance-banana-block.jpg";
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardList = ctx.request().adaptTo(DynamicCardList.class);
        String actual = dynamicCardList.getImageDefault();
        assertEquals(expected, actual);
    }

    @Test
    void testGetLogoImage() {
        final String expected = "logoImage";
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardList = ctx.request().adaptTo(DynamicCardList.class);
        String actual = dynamicCardList.getLogoImage();
        assertEquals(expected, actual);
    }

    @Test
    void testGetCenterMode() {
        final String expected = "center";
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardList = ctx.request().adaptTo(DynamicCardList.class);
        String actual = dynamicCardList.getCenterMode();
        assertEquals(expected, actual);
    }

    @Test
    void testGetVariableWidth() {
        final String expected = "true";
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardList = ctx.request().adaptTo(DynamicCardList.class);
        String actual = dynamicCardList.getVariableWidth();
        assertEquals(expected, actual);
    }

    @Test
    void testGetArrows() {
        final String expected = "false";
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardList = ctx.request().adaptTo(DynamicCardList.class);
        String actual = dynamicCardList.getArrows();
        assertEquals(expected, actual);
    }

    @Test
    void testGetDateFormat() {
        final String expected = "dateFormat";
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardList = ctx.request().adaptTo(DynamicCardList.class);
        String actual = dynamicCardList.getDateFormat();
        assertEquals(expected, actual);
    }

    @Test
    void testGetTitle() {
        final String expected = "title";
        ctx.currentResource(PATH);
        DynamicCardList dynamicCardList = ctx.request().adaptTo(DynamicCardList.class);
        String actual = dynamicCardList.getTitle();
        assertEquals(expected, actual);
    }


}