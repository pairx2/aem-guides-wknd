package com.abbott.aem.platform.common.components.models.impl.v1;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import static org.junit.jupiter.api.Assertions.*;
import com.abbott.aem.platform.common.components.models.PlatformLanguageNavigation;


@ExtendWith(AemContextExtension.class)
class PlatformLanguageNavigationImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(PlatformLanguageNavigationImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/PlatformLanguageNavigationImplTest.json", "/content");
	}

	@Test
	void testGetPlaceholder() {
		final String expected = "Enter Locale Name";
		ctx.currentResource("/content/languageNavigation");
		PlatformLanguageNavigation languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertEquals(expected, languageNavigation.getPlaceholder());
	}

	@Test
	void testGetSearchRequired() {
		final String expected = "true";
		ctx.currentResource("/content/languageNavigation");
		PlatformLanguageNavigation languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertEquals(expected, languageNavigation.getSearchRequired());
	}

	@Test
	void testGetHideCountry() {
		final String expected = "false";
		ctx.currentResource("/content/languageNavigation");
		PlatformLanguageNavigation languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertEquals(expected, languageNavigation.getHideCountry());
	}

	@Test
	void testGetHideLanguage() {
		ctx.currentResource("/content/languageNavigation");
		PlatformLanguageNavigation languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertFalse(false, languageNavigation.getHideLanguage());
	}
	@Test
	void testGetAscendingOrder() {
		final String expected = "true";
		ctx.currentResource("/content/languageNavigation");
		PlatformLanguageNavigation languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertEquals(expected, languageNavigation.getAscendingOrder());
	}

	@Test
	void testGetNavigatorType() {
		final String expected = "tabular";
		ctx.currentResource("/content/languageNavigation");
		PlatformLanguageNavigation languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertEquals(expected, languageNavigation.getNavigatorType());
	}

	@Test
	void testGetColumnHeaderRequired() {
		final String expected = "true";
		ctx.currentResource("/content/languageNavigation");
		PlatformLanguageNavigation languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertEquals(expected, languageNavigation.getColumnHeaderRequired());
	}

	@Test
	void testGetShowHyphen() {
		ctx.currentResource("/content/languageNavigation");
		PlatformLanguageNavigation languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertTrue(languageNavigation.getShowHyphen());

		ctx.currentResource("/content/languageNavigationHideLanguageTrue");
		languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertTrue(languageNavigation.getShowHyphen());

		ctx.currentResource("/content/languageNavigationHideCountryTrue");
		languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertTrue(languageNavigation.getShowHyphen());

		ctx.currentResource("/content/languageNavigationHideBothTrue");
		languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertTrue(languageNavigation.getShowHyphen());
	}

	@Test
	void testGetShowParenthesis() {
		ctx.currentResource("/content/languageNavigation");
		PlatformLanguageNavigation languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertTrue(languageNavigation.getShowParenthesis());

		ctx.currentResource("/content/languageNavigationHideLanguageTrue");
		languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertTrue(languageNavigation.getShowParenthesis());

		ctx.currentResource("/content/languageNavigationHideCountryTrue");
		languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertTrue(languageNavigation.getShowParenthesis());

		ctx.currentResource("/content/languageNavigationHideBothTrue");
		languageNavigation = ctx.request().adaptTo(PlatformLanguageNavigation.class);
		assertNotNull(languageNavigation);
		assertTrue(languageNavigation.getShowParenthesis());
	}
}