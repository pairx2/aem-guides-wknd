package com.abbott.aem.an.similac.core.commons;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

import java.util.Collection;
import java.util.LinkedList;

import javax.script.Bindings;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.scripting.SlingScriptHelper;
import org.apache.sling.xss.XSSAPI;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.ui.clientlibs.ClientLibrary;
import com.adobe.granite.ui.clientlibs.HtmlLibraryManager;
import com.adobe.granite.ui.clientlibs.LibraryType;

@ExtendWith(MockitoExtension.class)
class TestClientLibUseObject {

	@InjectMocks
	ClientLibUseObject clientObject;

	@Mock
	Bindings bindings;

	@Mock
	SlingHttpServletRequest request;

	@Mock
	SlingScriptHelper helper;

	@Mock
	HtmlLibraryManager htmlLibManager;

	@Mock
	XSSAPI xsAPI;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	void testInclude_CategoryArrayString() {
		Collection<ClientLibrary> clientLibCollection = new LinkedList<ClientLibrary>();
		ClientLibrary clientLib = mock(ClientLibrary.class);
		when(clientLib.allowProxy()).thenReturn(true);
		when(clientLib.getIncludePath(LibraryType.JS, true)).thenReturn("/libs");
		clientLibCollection.add(clientLib);
		when(bindings.get("loading")).thenReturn("loading");
		when(bindings.get("onload")).thenReturn("onload");
		when(bindings.get("crossorigin")).thenReturn("crossorigin");
		when(bindings.get("log")).thenReturn(LoggerFactory.getLogger(ClientLibUseObject.class));
		when(bindings.get("categories")).thenReturn(getCategories(false));
		when(bindings.get("mode")).thenReturn("js");
		when(bindings.get("request")).thenReturn(request);
		when(bindings.get("sling")).thenReturn(helper);
		when(helper.getService(HtmlLibraryManager.class)).thenReturn(htmlLibManager);
		when(helper.getService(XSSAPI.class)).thenReturn(xsAPI);
		clientObject.init(bindings);
		when(htmlLibManager.getLibraries((String[]) getCategories(false), LibraryType.JS, false, false))
				.thenReturn(clientLibCollection);
		when(htmlLibManager.isMinifyEnabled()).thenReturn(true);
		clientObject.include();

		Mockito.verify(bindings, times(1)).get("loading");
		Mockito.verify(bindings, times(1)).get("onload");
		Mockito.verify(bindings, times(1)).get("crossorigin");
		Mockito.verify(bindings, times(1)).get("log");
		Mockito.verify(bindings, times(1)).get("categories");
		Mockito.verify(bindings, times(1)).get("mode");
		Mockito.verify(bindings, times(1)).get("request");
		Mockito.verify(bindings, times(1)).get("sling");
		Mockito.verify(helper, times(1)).getService(HtmlLibraryManager.class);
		Mockito.verify(helper, times(1)).getService(XSSAPI.class);
		Mockito.verify(helper, times(1)).getService(HtmlLibraryManager.class);
		Mockito.verify(helper, times(1)).getService(XSSAPI.class);
		Mockito.verify(htmlLibManager, times(1)).getLibraries((String[]) getCategories(false), LibraryType.JS, false,
				false);
		Mockito.verify(htmlLibManager, times(1)).isMinifyEnabled();
		Mockito.verify(clientLib, times(1)).allowProxy();
		Mockito.verify(clientLib, times(1)).getIncludePath(LibraryType.JS, true);
	}

	@Test
	void testInclude_CategoryString() {
		when(bindings.get("loading")).thenReturn("loading");
		when(bindings.get("onload")).thenReturn("onload");
		when(bindings.get("crossorigin")).thenReturn("crossorigin");
		when(bindings.get("log")).thenReturn(LoggerFactory.getLogger(ClientLibUseObject.class));
		when(bindings.get("categories")).thenReturn(getCategories(true));
		when(bindings.get("mode")).thenReturn("html");
		when(bindings.get("request")).thenReturn(request);
		when(bindings.get("sling")).thenReturn(helper);
		when(helper.getService(HtmlLibraryManager.class)).thenReturn(htmlLibManager);
		when(helper.getService(XSSAPI.class)).thenReturn(xsAPI);
		clientObject.init(bindings);
		clientObject.include();

		Mockito.verify(bindings, times(1)).get("loading");
		Mockito.verify(bindings, times(1)).get("onload");
		Mockito.verify(bindings, times(1)).get("crossorigin");
		Mockito.verify(bindings, times(1)).get("log");
		Mockito.verify(bindings, times(1)).get("categories");
		Mockito.verify(bindings, times(1)).get("mode");
		Mockito.verify(bindings, times(1)).get("request");
		Mockito.verify(bindings, times(1)).get("sling");
		Mockito.verify(helper, times(1)).getService(HtmlLibraryManager.class);
		Mockito.verify(helper, times(1)).getService(XSSAPI.class);
	}

	@Test
	void testInclude_CSSMode() {
		when(bindings.get("loading")).thenReturn("loading");
		when(bindings.get("onload")).thenReturn("onload");
		when(bindings.get("crossorigin")).thenReturn("crossorigin");
		when(bindings.get("log")).thenReturn(LoggerFactory.getLogger(ClientLibUseObject.class));
		when(bindings.get("categories")).thenReturn(getCategories(true));
		when(bindings.get("mode")).thenReturn("css");
		when(bindings.get("request")).thenReturn(request);
		when(bindings.get("sling")).thenReturn(helper);
		when(helper.getService(HtmlLibraryManager.class)).thenReturn(htmlLibManager);
		when(helper.getService(XSSAPI.class)).thenReturn(xsAPI);
		clientObject.init(bindings);
		clientObject.include();

		Mockito.verify(bindings, times(1)).get("loading");
		Mockito.verify(bindings, times(1)).get("onload");
		Mockito.verify(bindings, times(1)).get("crossorigin");
		Mockito.verify(bindings, times(1)).get("log");
		Mockito.verify(bindings, times(1)).get("categories");
		Mockito.verify(bindings, times(1)).get("mode");
		Mockito.verify(bindings, times(1)).get("request");
		Mockito.verify(bindings, times(1)).get("sling");
		Mockito.verify(helper, times(1)).getService(HtmlLibraryManager.class);
		Mockito.verify(helper, times(1)).getService(XSSAPI.class);
	}

	@Test
	void testInclude_EmptyCategory() {
		String[] categories = {};
		Logger log = LoggerFactory.getLogger(ClientLibUseObject.class);
		when(bindings.get("loading")).thenReturn("loading");
		when(bindings.get("onload")).thenReturn("onload");
		when(bindings.get("crossorigin")).thenReturn("crossorigin");
		when(bindings.get("log")).thenReturn(log);
		when(bindings.get("categories")).thenReturn(categories);
		clientObject.init(bindings);
		clientObject.include();

		Mockito.verify(bindings, times(1)).get("loading");
		Mockito.verify(bindings, times(1)).get("onload");
		Mockito.verify(bindings, times(1)).get("crossorigin");
		Mockito.verify(bindings, times(1)).get("log");
		Mockito.verify(bindings, times(1)).get("categories");
	}

	private Object getCategories(boolean isStr) {
		String[] categories = { "category1", "category2" };
		String categoriesString = "category1, category2";
		if (!isStr)
			return categories;
		return categoriesString;
	}
}
