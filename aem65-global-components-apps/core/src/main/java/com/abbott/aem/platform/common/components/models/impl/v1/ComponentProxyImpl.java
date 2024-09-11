package com.abbott.aem.platform.common.components.models.impl.v1;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import com.abbott.aem.platform.common.components.models.ComponentProxy;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@Model(adaptables = { SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ComponentProxyImpl implements ComponentProxy{

	@ScriptVariable
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@Setter(AccessLevel.NONE)
	private String linkProxyPath;

	@Setter(AccessLevel.NONE)
	private String linkstackProxyPath;

	@Setter(AccessLevel.NONE)
	private String logoProxyPath;

	@Setter(AccessLevel.NONE)
	private String socialmediaProxyPath;

	@Setter(AccessLevel.NONE)
	private String downloadProxyPath;

	@Setter(AccessLevel.NONE)
	private String nonClickableLinkProxyPath;

	@Setter(AccessLevel.NONE)
	private String chipProxyPath;

	@Setter(AccessLevel.NONE)
	private String titleProxyPath;

	@Setter(AccessLevel.NONE)
	private String textProxyPath;

	@Setter(AccessLevel.NONE)
	private String buttonProxyPath;

	@Setter(AccessLevel.NONE)
	private String tileProxyPath;

	@Setter(AccessLevel.NONE)
	private String headersearchProxyPath;

	@Setter(AccessLevel.NONE)
	private String badgeProxyPath;

	@Setter(AccessLevel.NONE)
	private String imageProxyPath;

	@Setter(AccessLevel.NONE)
	private String customtextlistProxyPath;

	@Setter(AccessLevel.NONE)
	private String videoProxyPath;

	@Setter(AccessLevel.NONE)
	private String searchbarProxyPath;

	@Setter(AccessLevel.NONE)
	private String chipslistProxyPath;

	@Setter(AccessLevel.NONE)
	private String tabsearchProxyPath;

	@Setter(AccessLevel.NONE)
	private String searchfacetProxyPath;

	@Setter(AccessLevel.NONE)
	private String cardcarouselProxyPath;

	@Setter(AccessLevel.NONE)
	private String tilelistProxyPath;

	@Setter(AccessLevel.NONE)
	private String termssectionProxyPath;

	@Setter(AccessLevel.NONE)
	private String languageNavigationProxyPath;
	
	@Setter(AccessLevel.NONE)
	private String megamenuProxyPath;
	
	@Setter(AccessLevel.NONE)
	private String poiLocatorSearchBarProxyPath;
	
	@Setter(AccessLevel.NONE)
	private String poiLocatorResultProxyPath;
	
	@Setter(AccessLevel.NONE)
	private String pinIconPopUpProxyPath;

	@Setter(AccessLevel.NONE)
	private String contentFragmentListProxyPath;
	
	@Setter(AccessLevel.NONE)
	private String optionProxyPath;

	@Setter(AccessLevel.NONE)
	private String tooltipsProxyPath;

	@Setter(AccessLevel.NONE)
	private String containerProxyPath;

	@Setter(AccessLevel.NONE)
	private String headerV2SectionProxyPath;
	
	@Setter(AccessLevel.NONE)
	private String tableCellProxyPath;

	@Setter(AccessLevel.NONE)
	private String stickyMenuProxyPath;

	@OSGiService
	private ProxyComponentService proxyComponentService;

	@PostConstruct
	private void initModel() {
		linkProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.linkProxy);
		linkstackProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.linkstackProxy);
		logoProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.logoProxy);
		socialmediaProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.socialmediaProxy);
		termssectionProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.termssectionProxy);
		downloadProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.downloadProxy);
		nonClickableLinkProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.nonClickableLinkProxy);
		chipProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.chipProxy);
		titleProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.titleProxy);
		textProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.textProxy);
		buttonProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.buttonProxy);
		tileProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.tileProxy);
		headersearchProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.headersearchProxy);
		badgeProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.badgeProxy);
		imageProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.imageProxy);
		customtextlistProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.customtextlistProxy);
		videoProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.videoProxy);
		searchbarProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.searchbarProxy);
		chipslistProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.chipslistProxy);
		tabsearchProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.tabsearchProxy);
		searchfacetProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.searchfacetProxy);
		cardcarouselProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.cardcarouselProxy);
		tilelistProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.tilelistProxy);
		termssectionProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.termssectionProxy);
		languageNavigationProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.languageNavigationProxy);
		megamenuProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.megamenuProxy);
		poiLocatorSearchBarProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.poilocatorsearchbarProxy);
		poiLocatorResultProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.poilocatorresultProxy);
		pinIconPopUpProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.piniconpopupProxy);
		optionProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.optionProxy);
		contentFragmentListProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.contentFragmentListProxy);
		tooltipsProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.tooltipsProxy);
		containerProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.containerProxy);
		headerV2SectionProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.headerV2SectionProxy);
		tableCellProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.tableCellProxy);
		stickyMenuProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.stickyMenuProxy);
	}

}