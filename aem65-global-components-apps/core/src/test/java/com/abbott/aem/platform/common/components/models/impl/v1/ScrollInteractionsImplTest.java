package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.Layer;
import com.abbott.aem.platform.common.components.models.ScrollInteractions;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import java.awt.*;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith(AemContextExtension.class)
class ScrollInteractionsImplTest {

    private static final String PATH = "/content/scrollinteractions";
    private final AemContext ctx = new AemContext();

    private ScrollInteractions scrollInteractions;
    private ProxyComponentService proxyComponentService;
    private Resource resource;

    private Component component;

    @BeforeEach
    void setUp() {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        Mockito.lenient().when(proxyComponentService.getProxyPath(Mockito.any(), Mockito.any())).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);

        ctx.create().page("/content");

        resource = ctx.create().resource(PATH,
                "layout", "mediaLeft",
                "useContainer", false,
                "startColor", "#000000",
                "endColor", "#FFFFFF",
                "gradientType", "radial",
                "radialGradientAlignment", "center",
                "radialGradientSize", "650",
                "advancedGradientAlignment", "25",
                "startColorPosition", "0",
                "endColorPosition", "100"
        );

        ctx.create().resource(PATH + "/layers/layer1", "fileReference", "/content/dam/adc/navecomm/global/blog-view/BlogImage1.png");
        ctx.create().resource(PATH + "/layers/layer2", "fileReference", "/content/dam/adc/navecomm/global/blog-view/BlogImage3.png");
        ctx.create().resource(PATH + "/layers/layer3", "fileReference", "/content/dam/adc/navecomm/global/blog-view/blog-carousel-1-min.png");

        SlingHttpServletRequest request = ctx.request();

        ctx.addModelsForClasses(ScrollInteractionsImpl.class, LayerImpl.class);
        ctx.currentResource(PATH);
        scrollInteractions = request.adaptTo(ScrollInteractions.class);

        ctx.registerService(SlingHttpServletRequest.class, request);
        ctx.registerService(Resource.class, resource);

    }

    @Test
    void testGetLayout() {
        assertEquals("mediaLeft", scrollInteractions.getLayout());
    }

    @Test
    void testIsUseContainer() {
        assertEquals(false, scrollInteractions.isUseContainer());
    }

    @Test
    void testGetLayers() {
        LayerImpl layer1 = new LayerImpl();
        layer1.setFileReference("/content/dam/adc/navecomm/global/blog-view/BlogImage1.png");
        LayerImpl layer2 = new LayerImpl();
        layer2.setFileReference("/content/dam/adc/navecomm/global/blog-view/BlogImage3.png");
        LayerImpl layer3 = new LayerImpl();
        layer3.setFileReference("/content/dam/adc/navecomm/global/blog-view/blog-carousel-1-min.png");
        List<Layer> expectedLayers = Arrays.asList(layer1, layer2, layer3);

        List<Layer> actualLayers = scrollInteractions.getLayers();
        assertEquals(expectedLayers.size(), actualLayers.size());
        for (int i = 0; i < expectedLayers.size(); i++) {
            assertEquals(expectedLayers.get(i).getFileReference(), actualLayers.get(i).getFileReference());
        }
    }

    @Test
    void testGetBackgroundColorStyleRadial() {
        String expected = "radial-gradient(circle at center center, #000000 0%, #FFFFFF 100%)";
        assertEquals(expected, scrollInteractions.getBackgroundColorStyle(false));
    }

    @Test
    void testGetGradientType() {
        assertEquals("radial", scrollInteractions.getGradientType());
    }

    @Test
    void testGetBackgroundColorStyleLinear() {
        resource.adaptTo(ModifiableValueMap.class).put("gradientType", "linear");
        String expected = "radial-gradient(circle at center center, #000000 0%, #FFFFFF 100%)";
        assertEquals(expected, scrollInteractions.getBackgroundColorStyle(false));
    }

    @Test
    void testGetBackgroundColorStyleNone() {
        resource.adaptTo(ModifiableValueMap.class).put("gradientType", "none");
        String expected = "radial-gradient(circle at center center, #000000 0%, #FFFFFF 100%)";
        assertEquals(expected, scrollInteractions.getBackgroundColorStyle(true));
    }

    @Test
    void testGetId() {
        String id = scrollInteractions.getId();
        assertEquals("-c5d23df32d", id);
    }

    @Test
    void testGetRadialGradient() {
        resource.adaptTo(ModifiableValueMap.class).put("radialGradientAlignment", "advanced");
        String expected = "radial-gradient(circle at center center, #000000 0%, #FFFFFF 100%)";
        assertEquals(expected, scrollInteractions.getRadialGradient());
    }

    @Test
    void testBackgroundColor() {
        assertEquals(null, scrollInteractions.getBackgroundColor());
    }

    @Test
    void testRadialGradientAlignment() {
        assertEquals("center", scrollInteractions.getRadialGradientAlignment());
    }

    @Test
    void testRadialGradientSize() {
        assertEquals("650", scrollInteractions.getRadialGradientSize());
    }

    @Test
    void testStartColor() {
        assertEquals("#000000", scrollInteractions.getStartColor());
    }

    @Test
    void testEndColor() {
        assertEquals("#FFFFFF", scrollInteractions.getEndColor());
    }

    @Test
    void testStartColorPosition() {
        assertEquals("0", scrollInteractions.getStartColorPosition());
    }

    @Test
    void testEndColorPosition() {
        assertEquals("100", scrollInteractions.getEndColorPosition());
    }

    @Test
    void testAdvancedGradientAlignmen() {
        assertEquals("25", scrollInteractions.getAdvancedGradientAlignment());
    }
}