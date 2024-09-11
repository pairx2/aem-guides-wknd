package com.abbott.aem.adc.freestylelibrede.services.impl;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.Set;

import com.abbott.aem.adc.freestylelibrede.services.IdentifyRunModesService;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.day.cq.commons.Externalizer;

@Component(immediate = true, service = ExternalizerService.class)
public class ExternalizerServiceImpl implements ExternalizerService {
	private static final Logger logger = LoggerFactory.getLogger(ExternalizerServiceImpl.class);

	private static final String HTML_EXTENSION = ".html";

	private static final String AUTHOR_RUNMODE = "author";
	private static final String DEV_RUNMODE = "dev";
	private static final String QA_RUNMODE = "qa";
	private static final String DEV2_RUNMODE = "dev2";
	private static final String QA2_RUNMODE = "qa2";
	private static final String STAGE_RUNMODE = "staging";
	private static final String PROD_RUNMODE = "prod";
	public static final String EXTERTNALIZER_DOMAIN_KEY = "adc_freestylelibre_de";

	@Reference
	private IdentifyRunModesService identifyRunModesService;

	private static final Set<String> appendExtensionRunModes = new HashSet<>();

	static {
		appendExtensionRunModes.add(DEV_RUNMODE);
		appendExtensionRunModes.add(QA_RUNMODE);
		appendExtensionRunModes.add(STAGE_RUNMODE);
		appendExtensionRunModes.add(PROD_RUNMODE);
		appendExtensionRunModes.add(DEV2_RUNMODE);
		appendExtensionRunModes.add(QA2_RUNMODE);
	}

	@Override
	public String externalizeIfNecessary(String path, ResourceResolver resolver) {
		path = getPath(path, resolver, false);
		return path;
	}

	private String getPath(String path, ResourceResolver resolver, boolean isRelativePath) {
		if (StringUtils.startsWith(path, "/") && !(path.equalsIgnoreCase("/"))) {
			String urlParams = "";
			if (path.contains("?")) {
				String[] urlString = path.split("\\?");
				path = urlString[0];
				urlParams = "?" + urlString[1];
			}
			Externalizer externalizer = resolver.adaptTo(Externalizer.class);
			if (externalizer != null) {
				path = getUrl(path, resolver, urlParams, externalizer, isRelativePath);
			}
		}
		return path;
	}

	private String getUrl(String path, ResourceResolver resolver, String urlParams, Externalizer externalizer,
			boolean isRelativePath) {
		boolean addHtml = CollectionUtils.containsAny(identifyRunModesService.getAllRunModes(), appendExtensionRunModes);

		if (isRelativePath) {
			try {
				URI uri = null;
				String relativeUrl = "";
				if (identifyRunModesService.getAllRunModes().contains(AUTHOR_RUNMODE)) {
					relativeUrl = path.concat(HTML_EXTENSION);
					uri = new URI(relativeUrl);
					return uri.getPath() + urlParams;
				}
				relativeUrl = externalizer.externalLink(resolver, EXTERTNALIZER_DOMAIN_KEY, path).concat(addHtml ? HTML_EXTENSION : "");
				uri = new URI(relativeUrl);
				return uri.getPath() + urlParams;
			} catch (URISyntaxException e) {
				logger.error("URISyntaxException",e);
			}
		}
		if (identifyRunModesService.getAllRunModes().contains(AUTHOR_RUNMODE)) {
			return path.concat(HTML_EXTENSION) + urlParams;
		}
		return externalizer.externalLink(resolver, EXTERTNALIZER_DOMAIN_KEY, path).concat(addHtml ? HTML_EXTENSION : "") + urlParams;
	}

	@Override
	public String externalizeIfNecessaryRelativeUrl(String path, ResourceResolver resolver) {
		path = getPath(path, resolver, true);
		return path;
	}

}
