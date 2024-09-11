package com.abbott.aem.cv.division.core.components.models.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.cv.division.core.components.models.SideNavigation;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

@Model(adaptables = { Resource.class }, adapters = { SideNavigation.class,
		ComponentExporter.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SideNavigationImpl implements SideNavigation {

	public static final Logger log = LoggerFactory.getLogger(SideNavigationImpl.class);

	@Self
	Resource resource;

	@SlingObject
	public ResourceResolver resourceResolver;

	@Getter
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String rootvalue;

	@Getter
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String topmargin;

	@Getter
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public  String bottommargin;

	@Getter
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public  String displayrootpage;

	@Getter
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public  String integraterootpage;

	@ScriptVariable
	public PageManager pageManager;

	@Getter
	@Setter(AccessLevel.NONE)
	public Page requestedPage;

	@Getter
	@Setter(AccessLevel.NONE)
	public List<Page> siblingItems = new ArrayList<>();

	@PostConstruct
	protected void init() {
		pageManager = resourceResolver.adaptTo(PageManager.class);
		if (null != rootvalue && null != pageManager) {
			requestedPage = pageManager.getPage(rootvalue);
			if (null != requestedPage) {
				Iterator<Page> siblingPages = requestedPage.listChildren();
				while (siblingPages.hasNext()) {
					Page siblingPage = siblingPages.next();
					if (siblingPage.getProperties().get("hideInNav") == null)
						siblingItems.add(siblingPage);
				}
			}
		}
		else{
			log.error("rootvalue was null in sidenavigation ");
		}
	}

}