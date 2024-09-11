package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.abbott.aem.platform.common.components.models.VideoPlayListItem;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.platform.common.components.models.VideoPlayList;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.List;

@ExtendWith(AemContextExtension.class)

class VideoPlayListImplTest {

	private final AemContext ctx = new AemContext();
	private ProxyComponentService proxyComponentService;
	private Component component;

	@Mock
	private List<VideoPlayListItem> mocksectionItems;

	@BeforeEach
	public void setUp() throws Exception {
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(VideoPlayListImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/VideoPlayListImplTest.json", "/content");
	}


	@Test
	void testGetPlayListType() {
		final String expected = "icon";
		ctx.currentResource("/content/videoPlayList");
		VideoPlayList videoPlayList = ctx.request().adaptTo(VideoPlayList.class);
		String actual = videoPlayList.getPlayListType();
		assertEquals(expected, actual);
	}

	@Test
	void testGetAdditionalHeading() {
		final String expected = "text";
		ctx.currentResource("/content/videoPlayList");
		VideoPlayList videoPlayList = ctx.request().adaptTo(VideoPlayList.class);
		String actual = videoPlayList.getAdditionalHeading();
		assertEquals(expected, actual);
	}

	@Test
	void testGetHideDescInPlayListPanel() {
		final String expected = "true";
		ctx.currentResource("/content/videoPlayList");
		VideoPlayList videoPlayList = ctx.request().adaptTo(VideoPlayList.class);
		String actual = videoPlayList.getHideDescInPlayListPanel();
		assertEquals(expected, actual);
	}

	@Test
	void testgetSectionItems() {
		MockitoAnnotations.initMocks(this);
		VideoPlayListImpl videoPlayListImpl = new VideoPlayListImpl();
		videoPlayListImpl.sectionItems = mocksectionItems;
		List<VideoPlayListItem> actualSectionItems = videoPlayListImpl.getSectionItems();
		assertEquals(mocksectionItems, actualSectionItems);
	}

}
