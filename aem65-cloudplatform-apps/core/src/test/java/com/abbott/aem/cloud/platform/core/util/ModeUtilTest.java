package com.abbott.aem.cloud.platform.core.util;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.apache.sling.api.SlingHttpServletRequest;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import com.day.cq.wcm.api.AuthoringUIMode;
import com.day.cq.wcm.api.WCMMode;

class ModeUtilTest {

	@Mock
	SlingHttpServletRequest slingHttpServletRequest;

	@Test
	void test() {
		slingHttpServletRequest = mock(SlingHttpServletRequest.class);
		when(slingHttpServletRequest.getAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME)).thenReturn("DISABLED");
		boolean mode = ModeUtil.isDesign(slingHttpServletRequest);
		boolean isDisabled = ModeUtil.isDisabled(slingHttpServletRequest);
		assertFalse(mode);
		assertTrue(isDisabled);
		assertFalse(ModeUtil.isPreview(slingHttpServletRequest));
		assertFalse(ModeUtil.isEdit(slingHttpServletRequest));
	}

	@Test
	void test1() {
		slingHttpServletRequest = mock(SlingHttpServletRequest.class);
		when(slingHttpServletRequest.getAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME)).thenReturn(WCMMode.EDIT);
		boolean mode = ModeUtil.isDesign(slingHttpServletRequest);
		boolean isDisabled = ModeUtil.isDisabled(slingHttpServletRequest);
		assertFalse(isDisabled);
		assertFalse(mode);
		assertFalse(ModeUtil.isPreview(slingHttpServletRequest));
		assertTrue(ModeUtil.isEdit(slingHttpServletRequest));
	}

	@Test
	void test2() {
		slingHttpServletRequest = mock(SlingHttpServletRequest.class);
		when(slingHttpServletRequest.getAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME)).thenReturn(WCMMode.PREVIEW);
		boolean mode = ModeUtil.isDesign(slingHttpServletRequest);
		boolean isDisabled = ModeUtil.isDisabled(slingHttpServletRequest);
		assertFalse(mode);
		assertTrue(ModeUtil.isPreview(slingHttpServletRequest));
		assertFalse(ModeUtil.isEdit(slingHttpServletRequest));
		assertFalse(isDisabled);
	}

	@Test
	void test3() {
		slingHttpServletRequest = mock(SlingHttpServletRequest.class);
		when(slingHttpServletRequest.getAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME)).thenReturn(WCMMode.DESIGN);
		boolean mode = ModeUtil.isDesign(slingHttpServletRequest);
		boolean isDisabled = ModeUtil.isDisabled(slingHttpServletRequest);
		assertTrue(mode);
		assertFalse(isDisabled);
		assertFalse(ModeUtil.isPreview(slingHttpServletRequest));
		assertFalse(ModeUtil.isEdit(slingHttpServletRequest));
		assertFalse(ModeUtil.isReadOnly(slingHttpServletRequest));
		assertFalse(ModeUtil.isAnalytics(slingHttpServletRequest));

	}

	@Test
	void test4() {
		slingHttpServletRequest = mock(SlingHttpServletRequest.class);
		when(slingHttpServletRequest.getAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME)).thenReturn(WCMMode.READ_ONLY);
		assertTrue(ModeUtil.isReadOnly(slingHttpServletRequest));

	}

	@Test
	void test5() {
		slingHttpServletRequest = mock(SlingHttpServletRequest.class);
		when(slingHttpServletRequest.getAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME)).thenReturn(null);
		WCMMode mode = ModeUtil.getMode(slingHttpServletRequest);
		assertNotNull(mode);
	}

	@Test
	void test6() {
		slingHttpServletRequest = mock(SlingHttpServletRequest.class);
		when(slingHttpServletRequest.getAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME)).thenReturn(WCMMode.ANALYTICS);
		WCMMode mode = ModeUtil.getMode(slingHttpServletRequest);
		assertTrue(ModeUtil.isAnalytics(slingHttpServletRequest));
		assertFalse(new ModeUtil().isAuthor());
		assertFalse(new ModeUtil().isPublish());
		assertFalse(new ModeUtil().isRunmode(""));
		assertFalse(new ModeUtil().isTouch(slingHttpServletRequest));
		assertFalse(new ModeUtil().isClassic(slingHttpServletRequest));

	}

	@Test
	void test7() {
		slingHttpServletRequest = mock(SlingHttpServletRequest.class);
		when(slingHttpServletRequest.getAttribute(AuthoringUIMode.class.getName())).thenReturn(AuthoringUIMode.TOUCH);
		assertTrue(new ModeUtil().isTouch(slingHttpServletRequest));
	}

	@Test
	void test8() {
		slingHttpServletRequest = mock(SlingHttpServletRequest.class);
		when(slingHttpServletRequest.getAttribute(AuthoringUIMode.class.getName())).thenReturn(AuthoringUIMode.CLASSIC);
		assertTrue(new ModeUtil().isClassic(slingHttpServletRequest));
	}

	@Test
	void test9() {
		slingHttpServletRequest = mock(SlingHttpServletRequest.class);
		when(slingHttpServletRequest.getAttribute(WCMMode.REQUEST_ATTRIBUTE_NAME)).thenReturn("abcd");
		WCMMode mode = ModeUtil.getMode(slingHttpServletRequest);
		assertNotNull(mode);
	}

}
