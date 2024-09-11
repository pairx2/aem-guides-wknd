package com.abbott.aem.cloud.platform.core.rewriter.impl;

import com.abbott.aem.cloud.platform.core.rewriter.TransformerConstants;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.rewriter.ProcessingComponentConfiguration;
import org.apache.sling.rewriter.ProcessingContext;
import org.apache.sling.rewriter.Transformer;
import org.xml.sax.Attributes;
import org.xml.sax.ContentHandler;
import org.xml.sax.Locator;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.AttributesImpl;

import java.util.Arrays;
import java.util.List;

import javax.print.attribute.standard.ReferenceUriSchemesSupported;

@Slf4j
public class MobileAppLinkRewriterTransformer implements Transformer {
	private ContentHandler contentHandler;
	private boolean appWebViewEnabled;

	@Override
	public void init(ProcessingContext processingContext,
			ProcessingComponentConfiguration processingComponentConfiguration) {
		List<String> selectors = Arrays.asList(processingContext.getRequest().getRequestPathInfo().getSelectors());
		appWebViewEnabled = (!selectors.isEmpty() && selectors.contains(TransformerConstants.APP_SELECTOR));
	}

	@Override
	public void setContentHandler(ContentHandler contentHandler) {
		this.contentHandler = contentHandler;
	}

	@Override
	public void dispose() {
		log.info("Entry into dispose method of MobileAppLinkRewriterTransformer.");
	}

	@Override
	public void setDocumentLocator(Locator locator) {
		this.contentHandler.setDocumentLocator(locator);
	}

	@Override
	public void startDocument() throws SAXException {
		this.contentHandler.startDocument();
	}

	@Override
	public void endDocument() throws SAXException {
		this.contentHandler.endDocument();
	}

	@Override
	public void startPrefixMapping(String prefix, String uri) throws SAXException {
		this.contentHandler.startPrefixMapping(prefix, uri);
	}

	@Override
	public void endPrefixMapping(String prefix) throws SAXException {
		this.contentHandler.endPrefixMapping(prefix);
	}

	@Override
	public void startElement(String uri, String localName, String qName, Attributes attrs) throws SAXException {
		if (appWebViewEnabled) {
			if (javax.swing.text.html.HTML.Tag.A.toString().equalsIgnoreCase(localName)) {
				this.contentHandler.startElement(uri, localName, qName, rewriteUrl(attrs));
			} else {
				this.contentHandler.startElement(uri, localName, qName, attrs);
			}
		}
	}

	@Override
	public void endElement(String uri, String localName, String qName) throws SAXException {
		this.contentHandler.endElement(uri, localName, qName);
	}

	@Override
	public void characters(char[] ch, int start, int length) throws SAXException {
		this.contentHandler.characters(ch, start, length);
	}

	@Override
	public void ignorableWhitespace(char[] ch, int start, int length) throws SAXException {
		this.contentHandler.ignorableWhitespace(ch, start, length);
	}

	@Override
	public void processingInstruction(String target, String data) throws SAXException {
		this.contentHandler.processingInstruction(target, data);
	}

	@Override
	public void skippedEntity(String name) throws SAXException {
		this.contentHandler.skippedEntity(name);
	}

	private Attributes rewriteUrl(final Attributes attributes) {
		AttributesImpl attributesImpl = new AttributesImpl(attributes);
		final String href = attributesImpl.getValue("href");
		if (StringUtils.isNotBlank(href) && isNotExternalLink(href) && isPageLink(href)) {
			int hrefIndex = attributesImpl.getIndex("href");
			String newPath = href.replace(TransformerConstants.HTML_EXTENSION, TransformerConstants.WEBAPP_EXTENSION);
			attributesImpl.setValue(hrefIndex, newPath);
			log.debug("New path: {}", newPath);
		}
		return attributesImpl;
	}

	private boolean isNotExternalLink(String href) {
		boolean notExternal = true;

		// Ensure path is not fully qualified which would be an external path
		if (StringUtils.startsWith(href, "//") || StringUtils.startsWith(href, ReferenceUriSchemesSupported.HTTP.toString())
				|| StringUtils.startsWith(href, TransformerConstants.WWW)) {
			notExternal = false;
		}

		return notExternal;
	}

	private boolean isPageLink(String href) {
		boolean pageLink = true;

		// ensure path is .html and not linked to the dam
		if (!StringUtils.endsWith(href, TransformerConstants.HTML_EXTENSION)
				|| StringUtils.startsWith(href, TransformerConstants.DAM_PATH)) {
			pageLink = false;
		}

		// check links with query strings
		if (StringUtils.contains("?", href)) {
			String path = StringUtils.substringBefore(href, "?");
			if (!StringUtils.endsWith(path, TransformerConstants.HTML_EXTENSION)) {
				pageLink = false;
			}
		}
		return pageLink;
	}
}
