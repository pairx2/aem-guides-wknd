package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.TileList;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.TileList;

@ExtendWith(AemContextExtension.class)
class TileListImplTest {

	private static final String PATH = "/content/tilelist";
	private final AemContext ctx = new AemContext();

	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	void setUp() throws Exception {
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);

		ctx.addModelsForClasses(TileListImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TileListImplTest.json", "/content");
	}

	@Test
	void testGetTilesCount() {
		ctx.currentResource(TileListImplTest.PATH);
		TileList tilelist = ctx.request().adaptTo(TileList.class);
		assertEquals(4, tilelist.getTilesCount());
	}

	@Test
	void testGetListOfTiles() {
		final List<String> expected = new ArrayList<String>();
		expected.add("tile-0");
		expected.add("tile-1");
		expected.add("tile-2");
		expected.add("tile-3");
		ctx.currentResource(TileListImplTest.PATH);
		TileList tilelist = ctx.request().adaptTo(TileList.class);
		List<String> actual = tilelist.getListOfTiles();
		assertEquals(expected, actual);

		TileList obj1 = new TileListImpl();
		TileList obj2 = new TileListImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}
}
