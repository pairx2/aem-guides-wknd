package com.abbott.aem.epd.acare.core.models.components.impl;

import com.adobe.cq.sightly.SightlyWCMMode;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import org.apache.sling.api.resource.Resource;
import junitx.util.PrivateAccessor;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import com.abbott.aem.epd.acare.core.models.components.BannerWithTextAndTag;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith({AemContextExtension.class,MockitoExtension.class})
public class BannerWithTextAndTagImplTest {
    
	@InjectMocks
    BannerWithTextAndTagImpl bannerWithTextAndTagImpl;

	private final AemContext ctx = new AemContext();
	
	@Mock
	ProxyComponentService proxyComponentService;
    
	@Mock
    Component component;
    
    @Mock
    PageManager pageManager;
    
    @Mock
    Page currentPage;
    @Mock
    public SightlyWCMMode wcmmode;
    @Mock
    Resource resource;

    @Mock
    ValueMap map;

    @InjectMocks
    InheritanceValueMap ivm=new HierarchyNodeInheritanceValueMap(resource);
    @BeforeEach
    public void setUp() throws Exception {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(BannerWithTextAndTagImpl.class);
        ctx.load().json("/com/abbott/aem/epd/acare/core/models/components/impl/BannerWithTextAndTagImplTest.json", "/content");
        pageManager = Mockito.mock(PageManager.class);
        currentPage = Mockito.mock(Page.class);
        ctx.currentPage(currentPage);
        wcmmode = mock(SightlyWCMMode.class);
        resource=mock(Resource.class);
        ivm=mock(InheritanceValueMap.class);
        map=mock(ValueMap.class);

        }
    
    @Test
    void testGetlinkurl() {
        final String expected = "https://example.com";
        ctx.currentResource("/content/banner");
        BannerWithTextAndTag hb = ctx.request().adaptTo(BannerWithTextAndTag.class);
        hb.setLinkURL("https://example.com");
        String actual = hb.getBannerLink();
        assertEquals(expected, actual);
    }

    @Test
    void testGetFileReference() {
        final String expected = "SmapleFileReferenceText";
        ctx.currentResource("/content/banner");
        BannerWithTextAndTag hb = ctx.request().adaptTo(BannerWithTextAndTag.class);
        hb.setFileReference(expected);
        String actual = hb.getFileReference();
        assertEquals(expected, actual);
    }
    @Test
    void testGetDescriptionFromPage() {
        final boolean expected = true;
        ctx.currentResource("/content/banner");
        BannerWithTextAndTag hb = ctx.request().adaptTo(BannerWithTextAndTag.class);
        hb.setDescriptionFromPage(expected);
        boolean actual = hb.getDescriptionFromPage();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPadding() {
        final String expected = "SampleTextPadding";
        ctx.currentResource("/content/banner");
        BannerWithTextAndTag hb = ctx.request().adaptTo(BannerWithTextAndTag.class);
        hb.setPadding(expected);
        String actual = hb.getPadding();
        assertEquals(expected, actual);
    }

    @Test
    void testGetBannerAlignment() {
        final String expected = "center";
        ctx.currentResource("/content/banner");
        BannerWithTextAndTag hb = ctx.request().adaptTo(BannerWithTextAndTag.class);
        hb.setBannerAlignment(expected);
        String actual = hb.getBannerAlignment();
        assertEquals(expected, actual);
    }
    @Test
    void testGetBannerAltText() {
        final String expected = "SampleBannerAltText";
        ctx.currentResource("/content/banner");
        BannerWithTextAndTag hb = ctx.request().adaptTo(BannerWithTextAndTag.class);
        hb.setBannerAltText(expected);
        String actual = hb.getBannerAltText();
        assertEquals(expected, actual);
    }
    

    @Test
    void testGetdescription() {
        String description="sampledescription";
        boolean expected=true;
        ctx.currentResource("/content/banner");
        BannerWithTextAndTag hb = ctx.request().adaptTo(BannerWithTextAndTag.class);
        hb.setDescriptionFromPage(expected);
        boolean actual1= hb.getDescriptionFromPage();
        Mockito.lenient().when(currentPage.getDescription()).thenReturn(description);
        String actual = hb.getDescription();
        assertEquals(description,actual);
    }
    @Test
    void testGetdescriptionElse()  {
        String description="sampledescription";
        String JCR_DESCRIPTION=JcrConstants.JCR_DESCRIPTION;
        boolean expected=false;
        //Resource resource= ctx.currentResource("/content/banner");
        ctx.currentResource("/content/banner");
        BannerWithTextAndTag hb = ctx.request().adaptTo(BannerWithTextAndTag.class);
        hb.setDescriptionFromPage(expected);
        hb.setResource(resource);
        boolean actual1= hb.getDescriptionFromPage();
        lenient().when(resource.getValueMap()).thenReturn(map);
        lenient().when(resource.getValueMap().get(JCR_DESCRIPTION, String.class)).thenReturn(description);
        String actual = hb.getDescription();
        assertEquals(description,actual);
    }
    
    @Test
    void testGetbannerImageElse() {
        String bannerImage="abbottlogo";
        BannerWithTextAndTag hb = ctx.request().adaptTo(BannerWithTextAndTag.class);
        hb.setFileReference(bannerImage);
        Mockito.lenient().when(currentPage.getDescription()).thenReturn(bannerImage);
        String actual= hb.getBannerImage();
        assertEquals(bannerImage,actual);
       
    }
    @Test
    void testGetbannerImageIf() throws Exception {
        String bannerImage="abbottlogo";
        String expected="assetDomainabbottlogo";
        Resource resource= ctx.currentResource("/content/banner");
        lenient().when(currentPage.getContentResource()).thenReturn(resource);
        BannerWithTextAndTag hb = ctx.request().adaptTo(BannerWithTextAndTag.class);
        hb.setResource(resource);
        hb.setFileReference(bannerImage);
        InheritanceValueMap ivm=new HierarchyNodeInheritanceValueMap(resource);
        PrivateAccessor.setField(hb,"assetDomain","assetDomain");
        lenient().when(wcmmode.isDisabled()).thenReturn(true);
        hb.setWcmmode(wcmmode);
        String actual= hb.getBannerImage();
        assertEquals(expected,actual);

    }

}
