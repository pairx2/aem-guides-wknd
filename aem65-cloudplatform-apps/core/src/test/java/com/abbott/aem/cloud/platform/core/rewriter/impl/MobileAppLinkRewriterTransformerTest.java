package com.abbott.aem.cloud.platform.core.rewriter.impl;

import junitx.util.PrivateAccessor;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.rewriter.ProcessingComponentConfiguration;
import org.apache.sling.rewriter.ProcessingContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.xml.sax.Attributes;
import org.xml.sax.ContentHandler;
import org.xml.sax.Locator;
import org.xml.sax.helpers.AttributesImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
class MobileAppLinkRewriterTransformerTest {

	@InjectMocks
	MobileAppLinkRewriterTransformer mobileAppLinkRewriterTransformer;

	@Mock
	ProcessingComponentConfiguration processingComponentConfiguration;

	@Mock
	ProcessingContext processingContext;

	@Mock
	RequestPathInfo requestPathInfo;

	@Mock
	SlingHttpServletRequest request;

	@Mock
	ContentHandler contentHandler;

	@Mock
	AttributesImpl attributesImpl;

	@Mock
	Locator locator;

	@BeforeEach
	public void setUp() throws Exception {
		lenient().when(processingContext.getRequest()).thenReturn(request);
		lenient().when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
		lenient().when(requestPathInfo.getSelectors()).thenReturn(new String[] { "app" });
		attributesImpl = Mockito.spy(AttributesImpl.class);
		attributesImpl.addAttribute("uri", "a", "href", "type", "/local/path.html");
	}

	@Test
	void testInit() throws NoSuchFieldException {
		mobileAppLinkRewriterTransformer.init(processingContext, processingComponentConfiguration);
		assertTrue(Boolean.parseBoolean(
				PrivateAccessor.getField(mobileAppLinkRewriterTransformer, "appWebViewEnabled").toString()));
	}

	@Test
	void testValidateUrl() throws Throwable {
		final String expected = "/local/path.app.html";
		mobileAppLinkRewriterTransformer.init(processingContext, processingComponentConfiguration);
		AttributesImpl actualAttributes = (AttributesImpl) PrivateAccessor.invoke(mobileAppLinkRewriterTransformer,
				"rewriteUrl", new Class[] { Attributes.class }, new Object[] { attributesImpl });
		String actual = actualAttributes.getValue("href");
		assertEquals(expected, actual);
	}

	@Test
	void testMethodsForCoverage() throws Exception {
		mobileAppLinkRewriterTransformer.init(processingContext, processingComponentConfiguration);
		mobileAppLinkRewriterTransformer.setContentHandler(contentHandler);
		mobileAppLinkRewriterTransformer.endDocument();
		mobileAppLinkRewriterTransformer.endElement("uri", "a", "a");
		mobileAppLinkRewriterTransformer.endPrefixMapping("");
		mobileAppLinkRewriterTransformer.ignorableWhitespace(null, 0, 0);
		mobileAppLinkRewriterTransformer.processingInstruction("", "");
		mobileAppLinkRewriterTransformer.setDocumentLocator(locator);
		mobileAppLinkRewriterTransformer.characters(null, 0, 0);
		mobileAppLinkRewriterTransformer.skippedEntity("");
		mobileAppLinkRewriterTransformer.startDocument();
		mobileAppLinkRewriterTransformer.startPrefixMapping("", "");
		mobileAppLinkRewriterTransformer.startElement("uri", "link", "link", attributesImpl);
		mobileAppLinkRewriterTransformer.startElement("uri", "a", "href", attributesImpl);
		mobileAppLinkRewriterTransformer.dispose();
		assertNotNull(PrivateAccessor.getField(mobileAppLinkRewriterTransformer, "contentHandler"));
	}
}
