package com.abbott.aem.cv.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.abbott.aem.cv.division.core.components.models.GatewayBanneritem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.cv.division.core.components.models.GatewayBanner;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

@ExtendWith(AemContextExtension.class)
public class GatewayBannerImplTest {

    private final AemContext ctx = new AemContext();
	private static final String PATH = "/content/gatewayBanner";

	@Mock
	private List<GatewayBanneritem> mockgatewayBannerPanel;


	@BeforeEach
	public void setUp() {
		ctx.addModelsForClasses(GatewayBanner.class );
		ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/GatewayBannerImplTest.json", "/content");
	}

	@Test
	void testGetTitle() {
		final String expected = "title";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getTitle();
		assertEquals(expected, actual);
	}

    @Test
	void testGetHeadingTag() {
		final String expected = "h2";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getHeadingTag();
		assertEquals(expected, actual);
	}

    @Test
	void testGetHeadingStyle() {
		final String expected = "true";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getHeadingStyle();
		assertEquals(expected, actual);
	}

	@Test
	void testGetTitleColor() {
		final String expected = "darkBlue";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getTitleColor();
		assertEquals(expected, actual);
	}

	@Test
	void testGetSubTitle() {
		final String expected = "sub title";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getSubTitle();
		assertEquals(expected, actual);
	}

	@Test
	void testGetSubTitleHeadingTags() {
		final String expected = "p";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getSubTitleHeadingTags();
		assertEquals(expected, actual);
	}

	@Test
	void testGetSubtitleHeadingStyle() {
		final String expected = "true";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getSubtitleHeadingStyle();
		assertEquals(expected, actual);
	}

	@Test
	void testGetDescriptionColors() {
		final String expected = "lightblue";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getDescriptionColors();
		assertEquals(expected, actual);
	}

	@Test
	void testGetBgColor() {
		final String expected = "gold";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getBgColor();
		assertEquals(expected, actual);
	}

	@Test
	void testGetBgType() {
		final String expected = "background Color";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getBgType();
		assertEquals(expected, actual);
	}

	@Test
	void testGetHeightControl() {
		final String expected = "true";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getHeightControl();
		assertEquals(expected, actual);
	}

	@Test
	void testGetBannerImagePath() {
		final String expected = "image";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getBannerImagePath();
		assertEquals(expected, actual);
	}

	@Test
	void testGetDecorative() {
		final String expected = "true";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getDecorative();
		assertEquals(expected, actual);
	}

	@Test
	void testGetBannerImageAlttext() {
		final String expected = "Image";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getBannerImageAlttext();
		assertEquals(expected, actual);
	}

	@Test
	void testGetMobileImage() {
		final String expected = "showImage";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getMobileImage();
		assertEquals(expected, actual);
	}

	@Test
	void testGetRemoveMarginTop() {
		final String expected = "true";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getRemoveMarginTop();
		assertEquals(expected, actual);
	}

	@Test
	void testGetRemoveMarginBottom() {
		final String expected = "true";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getRemoveMarginBottom();
		assertEquals(expected, actual);
	}

	@Test
	void testGetPanelColor() {
		final String expected = "primaryBlue";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getPanelColor();
		assertEquals(expected, actual);
	}

	@Test
	void testGetLayout() {
		final String expected = "twoColumn";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getLayout();
		assertEquals(expected, actual);
	}

	@Test
	void testGetPanelTitleHeadingTag() {
		final String expected = "h3";
		ctx.currentResource(PATH);
		GatewayBanner gatewayBanner = ctx.request().adaptTo(GatewayBanner.class);
		String actual = gatewayBanner.getPanelTitleHeadingTag();
		assertEquals(expected, actual);
	}

	@Test
	void testgetGatewayBannerPanel() {
		MockitoAnnotations.initMocks(this);
		GatewayBannerImpl gatewayBannerImpl = new GatewayBannerImpl();
		gatewayBannerImpl.gatewayBannerPanel = mockgatewayBannerPanel;
		List<GatewayBanneritem> actualGatewayBannerPanel = gatewayBannerImpl.getGatewayBannerPanel();
		assertEquals(mockgatewayBannerPanel, actualGatewayBannerPanel);
	}
}
