package com.abbott.aem.adc.freestylelibrede.services;

import org.apache.sling.api.SlingHttpServletRequest;

import java.io.IOException;
import java.util.Locale;
public interface DictionaryJsonExporter {
	byte[] createJson(SlingHttpServletRequest slingHttpServletRequest, Locale locale)throws IOException;
}
