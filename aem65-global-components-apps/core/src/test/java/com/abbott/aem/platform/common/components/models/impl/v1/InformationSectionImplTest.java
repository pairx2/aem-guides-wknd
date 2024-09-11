package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;
import com.abbott.aem.platform.common.components.models.InformationSectionPanel;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class InformationSectionImplTest {

	private final AemContext ctx = new AemContext();

	Page page;

	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	public void setUp() throws Exception {
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(InformationSectionPanelImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/InformationSectionTest.json", "/content");

	}

	@Test
	void testInformationSectionTitle() {
		ctx.currentResource("/content/informationSection");
		InformationSectionPanel informationSectionPanel = ctx.request().adaptTo(InformationSectionPanel.class);
		assert informationSectionPanel.isCtaLinkRequired() == true;
		assert informationSectionPanel.isSectionTitleRequired() == true;
		assert informationSectionPanel.getShowHideMobileImage() == true;
		assert informationSectionPanel.getLeftContentText().equals("leftcontent");
		assert informationSectionPanel.getRightContentText().equals("rightcontent");
		assert StringUtils.isNotBlank(informationSectionPanel.toString());
		assert StringUtils.isNotBlank(informationSectionPanel.getId());

		InformationSectionPanel obj1 = new InformationSectionPanelImpl();
		InformationSectionPanel obj2 = new InformationSectionPanelImpl();
		assertEquals(obj1, obj2);
	}

}
