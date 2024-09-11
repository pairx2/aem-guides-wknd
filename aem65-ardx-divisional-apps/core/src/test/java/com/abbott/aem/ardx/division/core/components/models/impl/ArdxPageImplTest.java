package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.ArdxPage;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import java.util.TreeSet;

import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith(AemContextExtension.class)
class ArdxPageImplTest {

    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
    private Component component;
    private TagManager tagManager;
    private ArdxPage page;


    @BeforeEach
    void setUp() throws Exception {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(ArdxPageImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ArdxPageImplTest.json", "/content");

        tagManager = ctx.resourceResolver().adaptTo(TagManager.class);
        tagManager.createTag("/content/cq:tags/ardx/poc/brands/actim", "Actim", "Actim Tag");
        tagManager.createTag("/content/cq:tags/ardx/poc/brands/actim/actim-partus", "Actim Partus", "Actim Partus Tag");
        tagManager.createTag("/content/cq:tags/ardx/poc/area-of-interest/alere-home-test/home-test", "Home Test", "Home Test Tag");
        tagManager.createTag("/content/cq:tags/ardx/poc/cardiovascular", "Cardiovasculair", "Cardiovasculair");
        tagManager.createTag("/content/cq:tags/ardx/poc/brands/actim/tag-local-id-test", "Tag Local ID", "Tag Local ID");
    }

    @Test
    void testGetApprovalID() {
        final String expected = "approvalid";
        ctx.currentResource("/content/currentpage/jcr:content");
        page = ctx.request().adaptTo(ArdxPage.class);
        String actual = page.getApprovalID();
        assertEquals(expected, actual);
    }

    @Test
    void testGetProductName() {
        final String expected = "Panbio COVID-19. IgG/IgM & Rapid Test Device";
        ctx.currentResource("/content/currentpage/jcr:content");
        page = ctx.request().adaptTo(ArdxPage.class);
        String actual = page.getProductName();
        assertEquals(expected, actual);
    }

    @Test
    void testGetGbuTags() throws InvalidTagFormatException {
        String expected = "Actim";
        ctx.currentResource("/content/currentpage");
        page = ctx.request().adaptTo(ArdxPage.class);
        TreeSet<String> gbuTagSet = (TreeSet) page.getGbuTags();
        assertEquals(true, gbuTagSet.contains(expected));
    }

    @Test
    void testGetAreaOfInterestTags() throws InvalidTagFormatException {
        String expected = "Home Test";
        ctx.currentResource("/content/currentpage");
        page = ctx.request().adaptTo(ArdxPage.class);
        TreeSet<String> areaOfInterest = (TreeSet) page.getAreaOfInterestTags();
        assertEquals(true, areaOfInterest.contains(expected));
    }

    @Test
    void testGetBrandTags() throws InvalidTagFormatException {
        String expected = "Actim Partus";
        ctx.currentResource("/content/currentpage");
        page = ctx.request().adaptTo(ArdxPage.class);
        TreeSet<String> brand = (TreeSet) page.getBrandTags();
        assertEquals(true, brand.contains(expected));
    }

    @Test
    void testGetBrandTagsId() throws InvalidTagFormatException {
        String expected = "poc/brands/actim/actim-partus";
        ctx.currentResource("/content/currentpage");
        page = ctx.request().adaptTo(ArdxPage.class);
        TreeSet<String> brand = (TreeSet) page.getBrandTagsId();
        assertEquals(true, brand.contains(expected));
    }

    @Test
    void testGetAllTags() throws InvalidTagFormatException {
        String expected = "Actim Partus";
        ctx.currentResource("/content/currentpage");
        page = ctx.request().adaptTo(ArdxPage.class);
        TreeSet<String> allTags = (TreeSet) page.getAllTags();
        assertEquals(true, allTags.contains(expected));
    }

    @Test
    void testGetAllTagsId() throws InvalidTagFormatException {
        String expected = "poc/brands/actim/tag-local-id-test";
        ctx.currentResource("/content/currentpage");
        page = ctx.request().adaptTo(ArdxPage.class);
        TreeSet<String> allTags = (TreeSet) page.getAllTagsId();
        assertEquals(true, allTags.contains(expected));
    }

    @Test
    void testGetTagsByLocaleTitle() throws InvalidTagFormatException {
        String expected = "Cardiovasculair";
        ctx.currentResource("/content/localized-tags-page");
        page = ctx.request().adaptTo(ArdxPage.class);
        TreeSet<String> allTags = (TreeSet) page.getAllTags();
        assertEquals(true, allTags.contains(expected));
    }
}
