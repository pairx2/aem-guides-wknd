package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.platform.common.components.models.Hidden;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class HiddenImplTest {

	private final AemContext ctx = new AemContext();

	/**
	 * Sets up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(HiddenImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/HiddenImplTest.json", "/content");
	}

	@Test
	void testGetValue() {
		ctx.currentResource("/content/hidden_1");
		MockSlingHttpServletRequest request = ctx.request();
		Hidden hidden = request.adaptTo(Hidden.class);

		final String expected = "";
		String actual = hidden.getValue();

		assertEquals(expected, actual);
	}

	@Test
	void testGetKey() {
		ctx.currentResource("/content/hidden_4");
		MockSlingHttpServletRequest request = ctx.request();
		Hidden hidden = request.adaptTo(Hidden.class);

		final String expected = "";
		String actual = hidden.getKey();

		assertEquals(expected, actual);
	}

	@Test
	void testGetKeepInSession_1() {
		ctx.currentResource("/content/hidden_3");
		MockSlingHttpServletRequest request = ctx.request();
		Hidden hidden = request.adaptTo(Hidden.class);

		final String expected = "true";
		String actual = hidden.getKeepInSession();

		assertEquals(expected, actual);
	}

	@Test
	void testGetKeepInSession_2() {
		ctx.currentResource("/content/hidden_4");
		MockSlingHttpServletRequest request = ctx.request();
		Hidden hidden = request.adaptTo(Hidden.class);

		final String expected = null;
		String actual = hidden.getKeepInSession();

		assertEquals(expected, actual);
	}
}
