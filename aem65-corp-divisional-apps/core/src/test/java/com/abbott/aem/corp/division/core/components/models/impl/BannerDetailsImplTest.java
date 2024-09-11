package com.abbott.aem.corp.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import com.abbott.aem.corp.division.core.components.models.BannerDetails;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class BannerDetailsImplTest {
	
	private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
    private Component component;

    @BeforeEach
    public void setUp() throws Exception {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(BannerDetailsImpl.class);
        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/BannerDetailsImplTest.json", "/content");
    }

    @Test
    void testGetBannerType() {
        final String expected = "imageStory";
        ctx.currentResource("/content/bannerdetails");
        BannerDetails hb = ctx.request().adaptTo(BannerDetails.class);
        String actual = hb.getBannerType();
        assertEquals(expected, actual);
        assertEquals("/content/testlink", hb.getLink());
        assertEquals("testscript", hb.getVideoScript());
        assertEquals("Banner Text", hb.getText());
        assertEquals("youtube", hb.getVideoType());
        assertEquals("true", hb.getCerosNeeded());
        assertEquals("test script", hb.getCerosScript());
        assertEquals("true", hb.getAutoPlay());
        assertEquals("top", hb.getTextPosition());
        assertEquals("true", hb.getHubModelPopup());
        assertEquals("testplayerid", hb.getPlayerId());
        assertEquals("/content/imagepath", hb.getImagePath());
        assertEquals("test image", hb.getAltText());
        assertEquals("true", hb.getNewTab());
    }

}
