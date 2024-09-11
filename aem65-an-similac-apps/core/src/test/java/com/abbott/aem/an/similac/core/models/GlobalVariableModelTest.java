package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.an.similac.core.beans.ErrorBean;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class GlobalVariableModelTest {

	private static final String ERROR_PATH = "errorPath";

	private AemContext ctx;

	private GlobalVariableModel globalVarModel;

	private String expectedJson = "{\"errorPageURL\":\"/error-page.html\",\"errorCodeInfo\":["
			+ "{\"errorCode\":\"404\",\"errorMessage\":\"Page Not Found\"},"
			+ "{\"errorCode\":\"500\",\"errorMessage\":\"Server has encountered an error\"}]}";

	@BeforeEach
	void setUp() {
		ctx = new AemContext();
		ctx.load().json("/com/abbott/aem/an/similac/core/models/globalVariableModel.json", "/content");
		ctx.addModelsForClasses(GlobalVariableModel.class);
	}

	@Test
	void testNullResource() {
		ctx.currentPage("/content/utility-pages/error-dictionary");
		ctx.request().setAttribute(ERROR_PATH, ctx.currentPage().getPath() + "/jcr:content/global_variable_2");
		globalVarModel = ctx.request().adaptTo(GlobalVariableModel.class);
		assertNull(globalVarModel.getErrorCodeData());
	}

	@Test
	void testDisplayTable() {
		ctx.currentResource("/content/utility-pages/error-dictionary/jcr:content/global_variable");
		ctx.request().setAttribute(ERROR_PATH, ctx.currentResource().getPath());
		globalVarModel = ctx.request().adaptTo(GlobalVariableModel.class);
		boolean actual = globalVarModel.isDisplayTable();
		assertTrue(actual);
	}

	@Test
	void testErrorCodeList() {
		ctx.currentResource("/content/global-variable/jcr:content/global_variable");
		ctx.request().setAttribute(ERROR_PATH, ctx.currentResource().getPath());
		globalVarModel = ctx.request().adaptTo(GlobalVariableModel.class);
		List<ErrorBean> actualList = globalVarModel.getErrorCodeData();

		ErrorBean error1 = new ErrorBean();
		error1.setErrorCode("404");
		error1.setErrorMessage("Page Not Found");

		ErrorBean error2 = new ErrorBean();
		error2.setErrorCode("500");
		error2.setErrorMessage("Server has encountered an error");

		List<ErrorBean> expected = new ArrayList<>();
		expected.add(error1);
		expected.add(error2);

		assertIterableEquals(expected, actualList);
	}

	@Test
	void testErrorCodeJson() {
		ctx.currentResource("/content/global-variable/jcr:content/global_variable");
		ctx.request().setAttribute(ERROR_PATH, ctx.currentResource().getPath());
		globalVarModel = ctx.request().adaptTo(GlobalVariableModel.class);

		String actual = globalVarModel.getErrorCodeJson();

		assertEquals(expectedJson, actual);
	}
}
