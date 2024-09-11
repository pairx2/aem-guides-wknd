package com.abbott.aem.cv.division.core.components.models.impl;
import static org.junit.jupiter.api.Assertions.assertEquals;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import com.abbott.aem.cv.division.core.components.models.ImageDivisional;
import com.adobe.cq.wcm.core.components.models.Image;

@ExtendWith(AemContextExtension.class)
class ImageDivisionalImplTest {
	@InjectMocks
	private ImageDivisionalImpl model = new ImageDivisionalImpl();

	@Mock
	private Image image;
    private final AemContext ctx = new AemContext();
    private static final String PATH = "/content/Image";
    @BeforeEach
    public void setUp() {
        ctx.addModelsForClasses(ImageDivisionalImpl.class);
        ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/ImageDivisionalImplTest.json", "/content");
        MockitoAnnotations.initMocks(this);
    }
    @Test
    void testGetCaptionAlignment() {
        final String expected = "left";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getCaptionAlignment();
        assertEquals(expected, actual);
    }
    @Test
    void testGetCaptionPlacement() {
        final String expected = "align-below";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getCaptionPlacement();
        assertEquals(expected, actual);
    }
    @Test
    void testGetUrlAction() {
        final String expected = "url";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getUrlAction();
        assertEquals(expected, actual);
    }
    @Test
    void testGetUrl() {
        final String expected = "https://www.abbott.co.in/";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getUrl();
        assertEquals(expected, actual);
    }
    @Test
    void testGetAnchorName() {
        final String expected = "anchor";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getAnchorName();
        assertEquals(expected, actual);
    }
    @Test
    void testGetAssetUrl() {
        final String expected = "/content/dam/ALFA-ROMEO-4C-0.jpg";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getAssetUrl();
        assertEquals(expected, actual);
    }
    @Test
    void testGetImageAlignment() {
        final String expected = "left-aligned";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getImageAlignment();
        assertEquals(expected, actual);
    }
    @Test
    void testGetImageWidth() {
        final String expected = "true";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getImageWidth();
        assertEquals(expected, actual);
    }
    @Test
    void testGetImageHeight() {
        final String expected = "true";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getImageHeight();
        assertEquals(expected, actual);
    }
    @Test
    void testGetLimelightPlayerId() {
        final String expected = "limelight_player_1";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getLimelightPlayerId();
        assertEquals(expected, actual);
    }
    @Test
    void testGetLimelightMediaId() {
        final String expected = "96509be644984210b51b42f6fb811762";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getLimelightMediaId();
        assertEquals(expected, actual);
    }
    @Test
    void testGetOrgId() {
        final String expected = "b0029788f6f3415db64a9cf5452f5200";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getOrgId();
        assertEquals(expected, actual);
    }
    @Test
    void testGetYouTubeUrl() {
        final String expected = "aYBGV8ssve4";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getYouTubeUrl();
        assertEquals(expected, actual);
    }
    @Test
    void testGetFileReference() {
        final String expected = "file";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getFileReference();
        assertEquals(expected, actual);
    }
    
    @Test
    void testGetParallaxFileReference() {
        final String expected = "/content/dam/cv/us-en/ep-ablation-advisor-hd-grid-header-banner-1440x450.jpg";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getParallaxFileReference();
        assertEquals(expected, actual);
    }
    @Test
    void testGetCheckbox() {
        final String expected = "true";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getCheckbox();
        assertEquals(expected, actual);
    }
    @Test
    void testGetExternal() {
        final String expected = "true";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getExternal();
        assertEquals(expected, actual);
    }
    @Test
    void testGetDisplayOriginalImage() {
        final String expected = "true";
        ctx.currentResource(PATH);
        ImageDivisional img = ctx.request().adaptTo(ImageDivisional.class);
        String actual = img.getDisplayOriginalImage();
        assertEquals(expected, actual);
    }
    @Test
    void testgetSrc() {
    	model.getSrc();
    }
    @Test
    void testgetAlt() {
       model.getAlt();
    }
    @Test
    void testgetTitle() {
       model.getTitle();
    }
   
    @Test
    void testgetImageLink() {
       model.getImageLink();
    }
    @Test
    void testdisplayPopupTitle() {
        model.displayPopupTitle();
    }
    @Test
    void testgetWidths() {
        model.getWidths();
    }
    @Test
    void testgetWidth() {
       model.getWidth();
    }
    @Test
    void testgetHeight() {
       model.getHeight();
    }
    @Test
    void testgetLazyThreshold() {
        model.getLazyThreshold();
    }
    @Test
    void testisDecorative() {
        model.isDecorative();
    }
    @Test
    void testgetId() {
        model.getId();
    }
    @Test
    void testisDmImage() {
       model.isDmImage();
    }
    @Test
    void testisLazyEnabled() {
        model.isLazyEnabled();
    }
    @Test
    void testgetUuid() {
        model.getUuid();
    }
    @Test
    void testgetAppliedCssClasses() {
    	model.getAppliedCssClasses();
    }
    @Test
    void testgetData() {
    	model.getData();
    }
    @Test
    void testgetComponentData() {
    	model.getComponentData();
    }
    @Test
    void testgetSmartCropRendition() {
    	model.getSmartCropRendition();
    }
    @Test
    void testgetAreas() {
    	model.getAreas();
    }
    @Test
    void testgetSrcset() {
    	model.getSrcset();
    }
    @Test
    void testgetSrcUriTemplate() {
    	model.getSrcUriTemplate();
    }
    @SuppressWarnings("deprecation")
	@Test
    void testgetJson() {
    	model.getJson();
    }
    @SuppressWarnings("deprecation")
	@Test
    void testgetLink() {
    	model.getLink();
    }
    
    @Test
    void testgetExportedType() {
    	model.getExportedType();
    }
   
    
    
}
