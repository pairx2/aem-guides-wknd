package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.adobe.cq.wcm.core.components.models.Title;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.PlatformTitle;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

@ExtendWith(AemContextExtension.class)
class PlatformTitleImplTest {

	private final AemContext ctx = new AemContext();

	private PlatformTitle platformTitle;

	private Title mockTitleDelegate;
	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	public void setUp() throws Exception {
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(PlatformTitleImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/PlatformTitle.json", "/content");
		ctx.currentResource("/content/title");
		platformTitle = ctx.request().adaptTo(PlatformTitle.class);
		mockTitleDelegate = Mockito.mock((Title.class));
		setPrivateField(platformTitle, "delegate", mockTitleDelegate);
	}

	@Test
	void testGetLink() {

		final String expected = "title";
		assertEquals(expected, platformTitle.getText());
		assertEquals(false, platformTitle.isUseDefaultImplementation());
		//assert StringUtils.isNotBlank(platformTitle.getId());

		PlatformTitle obj1 = new PlatformTitleImpl();
		PlatformTitle obj2 = new PlatformTitleImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testGetTextWhenUseDefaultImplementationIsTrue() {
		// Set useDefaultImplementation to true
		setPrivateField(platformTitle, "useDefaultImplementation", true);

		// Mock behavior of the delegate
		String expectedDelegateText = "Delegate Text";
		when(mockTitleDelegate.getText()).thenReturn(expectedDelegateText);

		// Verify that getText from delegate is used
		String actualText = platformTitle.getText();
		assertEquals(expectedDelegateText, actualText);
	}

	@Test
	void testGetTextWhenUseDefaultImplementationIsFalse() {
		// Set useDefaultImplementation to false
		setPrivateField(platformTitle, "useDefaultImplementation", false);

		// Set the title value
		String expectedTitle = "Title";
		setPrivateField(platformTitle, "title", expectedTitle);

		// Verify that the title is returned
		String actualText = platformTitle.getText();
		assertEquals(expectedTitle, actualText);
	}

	// Utility method to set private fields via reflection
	private void setPrivateField(Object target, String fieldName, Object value) {
		try {
			java.lang.reflect.Field field = target.getClass().getDeclaredField(fieldName);
			field.setAccessible(true);
			field.set(target, value);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			throw new RuntimeException(e);
		}
	}
}
