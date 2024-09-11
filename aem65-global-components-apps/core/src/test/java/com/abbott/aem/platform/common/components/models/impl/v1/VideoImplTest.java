package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.Video;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.dam.api.Asset;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class VideoImplTest {
	private final AemContext ctx = new AemContext();
	private Video video;

	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	void setUp() throws Exception {
		component = Mockito.mock(Component.class);
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);

		ctx.addModelsForClasses(VideoImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/VideoImplTest.json", "/content");
		ctx.currentResource("/content/video");
		video = ctx.request().adaptTo(Video.class);

		Asset asset = ctx.create().asset("/content/dam/bts/global-reference/Video.mp4", 1, 1, "video/mp4");
		ctx.create().assetRendition(asset, "rendition-3gpp", 1, 1, "video/3gpp");

		assertTrue(video instanceof VideoImpl);
		((VideoImpl) video).init();
	}

	@Test
	final void testGetVideoType() {
		assertEquals("dam", video.getVideoType());
	}

	@Test
	final void testGetAccountID() {
		assertEquals("1336131408001", video.getAccountID());
	}

	@Test
	final void testgetVideoID() {
		assertEquals("6109511061001", video.getVideoID());
	}

	@Test
	final void testGetExportedType() {
		assertEquals(VideoImpl.RESOURCE_TYPE, video.getExportedType());
	}

	@Test
	final void testGetPlayerID() {
		assertEquals("TNkY27yeX", video.getPlayerID());
	}

	@Test
	final void testGetDamVideo() {
		assertEquals("/content/dam/bts/global-reference/Video.mp4", video.getDamVideo());
	}

	@Test
	final void testGetOrgID() {
		assertEquals("b0029788f6f3415db64a9cf5452f5200", video.getOrgID());
	}

	@Test
	final void testGetMediaID() {
		assertEquals("6d3d54e7af6d4271a84af1a27e91cde1", video.getMediaID());
	}

	@Test
	final void testGetLimelightPlayerID() {
		assertEquals("654805", video.getLimelightPlayerID());
	}

	@Test
	final void testGetAutoPlay() {
		assertEquals(true, video.getAutoPlay());
	}

	@Test
	final void testGetVideoCaption() {
		assertEquals("Dam Video", video.getVideoCaption());
	}

	@Test
	final void testGetVideoSize() {
		assertEquals("m-video--small", video.getVideoSize());
	}

	@Test
	final void testGetVideoTranScriptText() {
		assertEquals("Video Transcript Text", video.getVideoTranScriptText());
	}
	
	@Test
	final void testGetWistiaVideoID() {
		assertEquals("r0fuk3gx26", video.getWistiaVideoID());
	}
	
	@Test
	final void testGetVideoDocumentNumber() {
		assertEquals("1283489", video.getVideoDocumentNumber());
	}
	
	@Test
	final void testGetImagePath() {
		assertEquals("/content/dam/Product-Demo-Video-Digival-1350.jpg", video.getImagePath());
	}
	
	@Test
	final void testGetImageAltText() {
		assertEquals("Alt text", video.getImageAltText());
	}
	
	@Test
	final void testGetEmbedOption() {
		assertEquals("true", video.getEmbedOption());
	}
	
	

	@Test
	final void testGetPlayerType() {
		assertEquals("embed", video.getPlayerType());
	}
	
	@Test
	final void testGetVideoControlOn() {
		assertEquals("true", video.getVideoControlOn());
	}
	
	@Test
	final void testGetAudioControlOn() {
		assertEquals("true", video.getAudioControlOn());
	}
	
	@Test
	final void testGetLoopOn() {
		assertEquals(true, video.getLoopOn());
	}
	
	@Test
	final void testGetAutoplayMobileView() {
		assertEquals(true, video.getAutoplayMobileView());
	}
	
	@Test
	final void testGetFileReference() {
		assertEquals("/content/dam/epd/medicine/poc/08 Hipertensión y Colesterol.jpeg", video.getFileReference());
	}

	@Test
	final void testGetLimeLightFallBackImage() {
		assertEquals("/content/dam/adc/freestyle/countries/us-en/images/callout-images/2-1-bottom_callout-image.jpg", video.getLimeLightFallBackImage());
	}

	@Test
	final void testGetDamFallBackImage() {
		assertEquals("/content/dam/adc/freestyle/countries/us-en/images/cost-and-coverage/3.2_Hero Image.jpg", video.getDamFallBackImage());
	}

	@Test
	final void testGetWistiaFallBackImage() {
		assertEquals("/content/dam/adc/freestyle/countries/us-en/images/dlp-consumer/1.Comfortable.png", video.getWistiaFallBackImage());
	}
	
	@Test
	final void testGetAlt() {
		assertEquals("Basic-RGB", video.getAlt());
	}
	
	@Test
	final void testGetVideoAlignment() {
		assertEquals("m-video--center", video.getVideoAlignment());
	}
	
	@Test
	final void testGetCaptionPlacement() {
		assertEquals("top", video.getCaptionPlacement());
	}
	
	@Test
	final void testGetVideoURL() {
		assertEquals("https://www.youtube.com/embed/opwYQCypELg", video.getVideoURL());
	}
	
	@Test
	final void testGetUrlIndex() {
		assertEquals("opwYQCypELg", video.getUrlIndex());
	}	

	@Test
	final void testGetFallBackImage() {
		assertEquals("/content/dam/bts/global-reference/surfer-wave-02.jpg", video.getFallBackImage());
	}	
	
	@Test
	final void testCommon() {

		assertEquals("videoIframeTitle", video.getVideoIframeTitle());
		assertEquals("videoIframeLang", video.getVideoIframeLang());
		assert video.getSources().size() > 0;
		assert StringUtils.isNotBlank(video.getVideoType());
		Video obj1 = new VideoImpl();
		Video obj2 = new VideoImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}
}