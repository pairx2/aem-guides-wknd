package com.abbott.aem.platform.common.components.models.impl.v1;

import static junit.framework.Assert.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.CustomTabs;
import com.day.cq.wcm.api.Page;

@ExtendWith(AemContextExtension.class)
public class CustomTabImplTest {

	private final AemContext ctx = new AemContext();
	Page page;

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(CustomTabsImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/CustomTabImplTest.json", "/content");

	}

	@Test
	void testTabs() {
		ctx.currentResource("/content/tabs");
		CustomTabs tabs = ctx.request().adaptTo(CustomTabs.class);
		assert tabs.getIcons().size() > 0;
		assert StringUtils.isNotBlank(tabs.toString());
		CustomTabs obj1 = new CustomTabsImpl();
		CustomTabs obj2 = new CustomTabsImpl();
		assertEquals(obj1, obj2);
	}
	
	@Test
	void testCardTabs() {
		ctx.currentResource("/content/card-tabs");
		CustomTabs tabs = ctx.request().adaptTo(CustomTabs.class);
		assert tabs.getTabImage().size() > 0;
		assert StringUtils.isNotBlank(tabs.toString());
		CustomTabs obj1 = new CustomTabsImpl();
		CustomTabs obj2 = new CustomTabsImpl();
		assertEquals(obj1, obj2);
	}

}
