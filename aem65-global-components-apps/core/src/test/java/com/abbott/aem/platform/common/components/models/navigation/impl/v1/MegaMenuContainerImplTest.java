package com.abbott.aem.platform.common.components.models.navigation.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.navigation.MegaMenuContainer;

@ExtendWith(AemContextExtension.class)
class MegaMenuContainerImplTest {
	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(MegaMenuContainerImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/MegaMenuContainerImplTest.json", "/content");
	}

	@Test
	void testContainer() {
		final String expected = "AccessibilityLabel";
		ctx.currentResource("/content/megamenucontainer");
		MegaMenuContainer megaMenuContainer = ctx.request().adaptTo(MegaMenuContainer.class);
		String actual = megaMenuContainer.getAccessibilityLabel();
		assertEquals(expected, actual);
		assert StringUtils.isNotBlank(megaMenuContainer.getId());
		assert StringUtils.isNotBlank(megaMenuContainer.toString());
		MegaMenuContainer obj1 = new MegaMenuContainerImpl();
		MegaMenuContainer obj2 = new MegaMenuContainerImpl();
		assert obj1.equals(obj2);

	}

}
