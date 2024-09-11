package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.Stepper;

@ExtendWith(AemContextExtension.class)
class StepperImplTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(StepperImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/StepperImplTest.json", "/content");
	}

	@Test
	void testGetMinVal() {
		final int expected = 2;
		ctx.currentResource("/content/stepper");
		Stepper stepper = ctx.request().adaptTo(Stepper.class);
		int actual = stepper.getMinVal();
		assertEquals(expected, actual);
	}

	@Test
	void testGetMaxVal() {
		final int expected = 8;
		ctx.currentResource("/content/stepper");
		Stepper stepper = ctx.request().adaptTo(Stepper.class);
		int actual = stepper.getMaxVal();
		assertEquals(expected, actual);
	}

	@Test
	void testGetDefVal() {
		final int expected = 4;
		ctx.currentResource("/content/stepper");
		Stepper stepper = ctx.request().adaptTo(Stepper.class);
		int actual = stepper.getDefVal();
		assertEquals(expected, actual);
	}

	@Test
	void testGetMinErrorMessage() {
		final String expected = "Sorry the minimum value was reached";
		ctx.currentResource("/content/stepper");
		Stepper stepper = ctx.request().adaptTo(Stepper.class);
		String actual = stepper.getMinErrorMessage();
		assertEquals(expected, actual);
	}

	@Test
	void testGetMaxErrorMessage() {
		final String expected = "Sorry the maximum value was reached";
		ctx.currentResource("/content/stepper");
		Stepper stepper = ctx.request().adaptTo(Stepper.class);
		String actual = stepper.getMaxErrorMessage();
		assertEquals(expected, actual);
	}
}
