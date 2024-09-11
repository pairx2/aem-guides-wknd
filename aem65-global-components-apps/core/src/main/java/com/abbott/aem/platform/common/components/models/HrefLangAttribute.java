package com.abbott.aem.platform.common.components.models;

import java.util.Map;

import com.adobe.cq.wcm.core.components.models.Page;

public interface HrefLangAttribute extends Page{

	default String getSitemapRootSitePath(){
        throw new UnsupportedOperationException();
    }
	default Map<String, String> getMetaHrefLangUrlsMap(){
        throw new UnsupportedOperationException();
    }
}

