package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.ChipsList;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.ChipsList;

@ExtendWith(AemContextExtension.class)
class ChipsListImplTest {

	private static final String PATH = "/content/chipslist";
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

		ctx.addModelsForClasses(ChipsListImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ChipsListImplTest.json", "/content");
	}

	@Test
	void testGetChipsCount() {
		ctx.currentResource(ChipsListImplTest.PATH);
		ChipsList chipslist = ctx.request().adaptTo(ChipsList.class);
		assertEquals(2, chipslist.getChipsCount());

		ChipsList obj1 = new ChipsListImpl();
		ChipsList obj2 = new ChipsListImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testGetListOfChips() {
		ctx.currentResource(ChipsListImplTest.PATH);
		ChipsList chipslist = ctx.request().adaptTo(ChipsList.class);
		List<String> chipsList = new ArrayList<>();
		chipsList.add("chip-0");
		chipsList.add("chip-1");
		assertEquals(chipsList, chipslist.getListOfChips());
	}

}
