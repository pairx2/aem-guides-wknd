package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.Container;

/**
 * The type Container impl test.
 */
@ExtendWith(AemContextExtension.class)
public class ContainerImplTest {

	private final AemContext ctx = new AemContext();

	/**
	 * Sets up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(ContainerImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ContainerImplTest.json", "/content");

	}

	/**
	 * Test get start color.
	 */
	@Test
	void testGetStartColor() {
		final String expected = "rgba(127,239,127,0.55)";
		ctx.currentResource("/content/container");
		Container container = ctx.request().adaptTo(Container.class);
		String actual = container.getStartColor();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get end color.
	 */
	@Test
	void testGetEndColor() {
		final String expected = "rgba(127,239,127,0.55)";
		ctx.currentResource("/content/container");
		Container container = ctx.request().adaptTo(Container.class);
		String actual = container.getEndColor();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get start color position.
	 */
	@Test
	void testGetStartColorPosition() {
		final String expected = "0";
		ctx.currentResource("/content/container");
		Container container = ctx.request().adaptTo(Container.class);
		String actual = container.getStartColorPosition();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get start color position.
	 */
	@Test
	void testGetEndColorPosition() {
		final String expected = "100";
		ctx.currentResource("/content/container");
		Container container = ctx.request().adaptTo(Container.class);
		String actual = container.getEndColorPosition();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get background image reference
	 */
	@Test
	void testGetBackgroundImageReference() {
		final String expected = "/content/dam/bts/global-reference/sahand-hoseini-jVojxJGIyFE-unsplash-small.jpg";
		ctx.currentResource("/content/container");
		Container container = ctx.request().adaptTo(Container.class);
		String actual = container.getBackgroundImageReference();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get alt.
	 */
	@Test
	void testGetAlt() {
		final String expected = "This is alt text";
		ctx.currentResource("/content/container");
		Container container = ctx.request().adaptTo(Container.class);
		String actual = container.getAlt();
		assertEquals(expected, actual);
		
	}
	
	@Test
	void testIsDecorative() {
		final boolean expected = false;
		ctx.currentResource("/content/container");
		Container container = ctx.request().adaptTo(Container.class);
		boolean actual = container.isDecorative();
		assertEquals(expected, actual);
		
	}
	
	@Test
	void testIsHideImgOnMobile() {
		final boolean expected = true;
		ctx.currentResource("/content/container");
		Container container = ctx.request().adaptTo(Container.class);
		boolean actual = container.isHideImgOnMobile();
		assertEquals(expected, actual);
		
	}
	
}