package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.impl.UrlConfigServiceImpl;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.designer.Style;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class FooterLinkListModelTest {

    FooterLinkListModel footerLinkListModel;
    AemContext context = new AemContext();
    Page page;
    Style currentStyle;

    @Mock
    ValueMap properties;
    String Resource_type = "/content/abbott/en/footer";

    private static final String FOOTER_JSON_FILE =  "/footer-link-list.json";
    private static final String CLASS_TYPE_PROPERTIES = "properties";

    @BeforeEach
    public void setUp() {
        context.registerInjectActivateService(new UrlConfigServiceImpl());
        context.load().json(FOOTER_JSON_FILE, Resource_type);
        MockSlingHttpServletRequest request = context.request();
        Resource resource = context.resourceResolver().getResource(Resource_type);
        assert resource != null;
        page = resource.adaptTo(Page.class);
        context.currentPage(page);
        context.request().setResource(resource);
        properties = resource.adaptTo(ValueMap.class);
        context.request().setAttribute(CLASS_TYPE_PROPERTIES, properties);
        footerLinkListModel = request.adaptTo(FooterLinkListModel.class);
    }

    @Test
    void getItemsWithChildren() {
        AemContext getItemsWithChildrenContext = new AemContext();
        getItemsWithChildrenContext.load().json(FOOTER_JSON_FILE, Resource_type);
        MockSlingHttpServletRequest getItemsWithChildrenRequest = getItemsWithChildrenContext.request();
        Resource getItemsWithChildrenResource = getItemsWithChildrenContext.resourceResolver().getResource(Resource_type + "/withChildren");
        page = getItemsWithChildrenResource.adaptTo(Page.class);
        getItemsWithChildrenContext.currentPage(page);
        getItemsWithChildrenContext.request().setResource(getItemsWithChildrenResource);
        properties = getItemsWithChildrenResource.adaptTo(ValueMap.class);
        getItemsWithChildrenContext.request().setAttribute(CLASS_TYPE_PROPERTIES, properties);
        FooterLinkListModel footerLinkListModel_children = getItemsWithChildrenRequest.adaptTo(FooterLinkListModel.class);
        assertEquals(1, footerLinkListModel_children.getItems().size());
    }

    @Test
    void getItemsWithTags() {
        AemContext getItemsWithTagsContext = new AemContext();
        getItemsWithTagsContext.load().json(FOOTER_JSON_FILE, Resource_type);
        MockSlingHttpServletRequest getItemsWithTagsResourceRequest = getItemsWithTagsContext.request();
        Resource getItemsWithTagsResource = getItemsWithTagsContext.resourceResolver().getResource(Resource_type + "/withTag");
        assert getItemsWithTagsResource != null;
        page = getItemsWithTagsResource.adaptTo(Page.class);
        getItemsWithTagsContext.currentPage(page);
        getItemsWithTagsContext.request().setResource(getItemsWithTagsResource);
        properties = getItemsWithTagsResource.adaptTo(ValueMap.class);
        getItemsWithTagsContext.request().setAttribute(CLASS_TYPE_PROPERTIES, properties);
        FooterLinkListModel tagsFooterLinkListModel = getItemsWithTagsResourceRequest.adaptTo(FooterLinkListModel.class);
        assertEquals(0, tagsFooterLinkListModel.getItems().size());
    }

    @Test
    void getItems() {
        assertEquals(1, footerLinkListModel.getItems().size());
    }

    @Test
    void linkItems() {
        assertEquals(false, footerLinkListModel.linkItems());
    }

    @Test
    void showDescription() {
        assertEquals(false, footerLinkListModel.showDescription());
    }

    @Test
    void showModificationDate() {
        assertEquals(false, footerLinkListModel.showModificationDate());
    }

    @Test
    void getDateFormatString() {
        assertEquals("yyyy-MM-dd", footerLinkListModel.getDateFormatString());
    }

    @Test
    void getHeading() {
        assertEquals("footer", footerLinkListModel.getHeading());
    }

    @Test
    void getExportedType() {
        assertEquals("abbott/components/content/list", footerLinkListModel.getExportedType());
    }

    @Test
    void getListType() {
        assertEquals("STATIC", footerLinkListModel.getListType().toString());
    }

    @Test
    void getParentLink() {
        assertEquals("/content/abbott/en.html", footerLinkListModel.getParentLink());
    }

    @Test
    void getListFromValue() {
        assertNull(footerLinkListModel.getListFromValue());
    }
}