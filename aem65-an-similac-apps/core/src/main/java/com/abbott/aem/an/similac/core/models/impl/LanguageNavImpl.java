package com.abbott.aem.an.similac.core.models.impl;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.an.similac.core.models.LanguageNav;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.LanguageNavigation;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Pawan.Namagiri
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { LanguageNav.class, ComponentExporter.class },
	   resourceType = { LanguageNavImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LanguageNavImpl implements LanguageNav {

	public static final String RESOURCE_TYPE = "an/similac/components/content/languagenavigation";
	
	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(excludes = LanguageNavDelegationExclusion.class)
	@Setter
	private LanguageNavigation languageNavigation;
	
	private List<NavigationItem> items;
	
	@ScriptVariable
	private Page currentPage;
	
	@Override
	public List<NavigationItem> getItems() {
		if (items == null) {
			items = new ArrayList<>();
			PageManager pageManager = currentPage.getPageManager();
			for (com.adobe.cq.wcm.core.components.models.NavigationItem wcmItem : languageNavigation.getItems()) {
				if(pageManager.getPage(wcmItem.getPath())!=null){
				boolean depthCompare=currentPage.getDepth() == pageManager.getPage(wcmItem.getPath()).getDepth();
					if(depthCompare && !currentPage.getPath().equalsIgnoreCase(wcmItem.getPath())&&currentPage.getName().equalsIgnoreCase(wcmItem.getName())) {
						items.add(wcmItem);
					}
				}
			}
		}
        return Collections.unmodifiableList(items);
    
	}
		
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String placeholder;

	private interface LanguageNavDelegationExclusion {
		List<NavigationItem> getItems();
	}
	
	
	
}
