package com.abbott.aem.platform.common.components.models.navigation.impl.v1;

import java.util.ArrayList;
import java.util.List;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Delegate;
import lombok.extern.slf4j.Slf4j;

import com.abbott.aem.platform.common.components.models.navigation.PlatformNavigation;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Navigation;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

@EqualsAndHashCode
@ToString
@Slf4j
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { PlatformNavigation.class, ComponentExporter.class },
	   resourceType = DynamicNavigationImpl.RESOURCE_TYPE,
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class DynamicNavigationImpl implements PlatformNavigation {

	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/megamenu/v1/megamenuversions/navigation";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(excludes = DynamicNavigationDelegationExclusion.class)
	@Setter
	private Navigation wcmNavigation;

	@ScriptVariable
	private Page currentPage;

	@Getter
	@ValueMapValue
	private String megaMenuStyle;

	private List<NavigationItem> items;

	@Override
	public List<NavigationItem> getItems() {
		log.debug("Calling Dynamic Navigation getItems");

		if (items == null) {
			items = new ArrayList<>();
			PageManager pageManager = currentPage.getPageManager();
			for (com.adobe.cq.wcm.core.components.models.NavigationItem wcmItem : wcmNavigation.getItems()) {
				NavigationUtil.addPageItems(pageManager, null, wcmItem, this.items);
			}
		}
		return List.copyOf(items);
	}

	private interface DynamicNavigationDelegationExclusion {
		List<NavigationItem> getItems();
	}
}
