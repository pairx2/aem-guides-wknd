package com.abbott.aem.platform.common.components.services;
public enum ProxyPaths {

	linkProxy("abbott-platform/components/content/atoms/link/v1/link"),
	downloadProxy("abbott-platform/components/content/atoms/download/v1/download"),
	nonClickableLinkProxy("abbott-platform/components/content/atoms/nonclickablelink/v1/nonclickablelink"),
	chipProxy("abbott-platform/components/content/atoms/chip/v1/chip"),
	titleProxy("abbott-platform/components/content/atoms/title/v1/title"),
	textProxy("abbott-platform/components/content/atoms/text/v1/text"),
	buttonProxy("abbott-platform/components/content/atoms/button/v1/button"),
	tileProxy("abbott-platform/components/content/atoms/tile/v1/tile"),
	logoProxy("abbott-platform/components/content/atoms/logo/v1/logo"),
	headersearchProxy("abbott-platform/components/content/molecules/headersearch/v1/headersearch"),
	badgeProxy("abbott-platform/components/content/atoms/badge/v1/badge"),
	imageProxy("abbott-platform/components/content/atoms/image/v1/image"),
	customtextlistProxy("abbott-platform/components/content/molecules/customtextlist/v1/customtextlist"),
	videoProxy("abbott-platform/components/content/molecules/video/v1/video"),
	searchbarProxy("abbott-platform/components/content/molecules/searchbar/v1/searchbar"),
	chipslistProxy("abbott-platform/components/content/molecules/chipslist/v1/chipslist"),
	tabsearchProxy("abbott-platform/components/content/molecules/tabsearch/v1/tabsearch"),
	searchfacetProxy("abbott-platform/components/content/molecules/searchfacet/v1/searchfacet"),
	cardcarouselProxy("abbott-platform/components/content/organism/cardcarousel/v1/cardcarousel"),
	tilelistProxy("abbott-platform/components/content/molecules/tilelist/v1/tilelist"),
	termssectionProxy("abbott-platform/components/content/organism/termssection/v1/termssection"),
	socialmediaProxy("abbott-platform/components/content/molecules/socialmedia/v1/socialmedia"),
	linkstackProxy("abbott-platform/components/content/molecules/linkstack/v1/linkstack"),
	megamenuProxy("abbott-platform/components/content/molecules/megamenu/v1/megamenu"),
	languageNavigationProxy("abbott-platform/components/content/molecules/languagenavigation/v1/languagenavigation"),
	poilocatorsearchbarProxy("abbott-platform/components/content/molecules/poilocatorsearchbar/v1/poilocatorsearchbar"),
	poilocatorresultProxy("abbott-platform/components/content/molecules/poilocatorresult/v1/poilocatorresult"),
	piniconpopupProxy("abbott-platform/components/content/atoms/piniconpopup/v1/piniconpopup"),
	contentFragmentListProxy("abbott-platform/components/content/atoms/contentfragmentlist/v1/contentfragmentlist"),
	tooltipsProxy("abbott-platform/components/content/atoms/tooltips/v1/tooltips"),
	containerProxy("abbott-platform/components/content/atoms/container/v1/container"),
	mediaCarouselProxy("abbott-platform/components/content/organism/mediacarousel/v1/mediacarousel"),
	optionProxy("abbott-platform/components/form/options/v1/options"),
	headerV2SectionProxy("abbott-platform/components/content/organism/header/v2/section"),
	iconctaProxy("abbott-platform/components/content/molecules/iconcta"),
	tableCellProxy("abbott-platform/components/content/atoms/tablecell/v1/tablecell"),
	stickyMenuProxy("abbott-platform/components/content/molecules/stickymenu/v1/stickymenu");

	String path;

	ProxyPaths(String proxyPath) {
		path = proxyPath;
	}

	public String getPath() {
		return path;
	}

}
