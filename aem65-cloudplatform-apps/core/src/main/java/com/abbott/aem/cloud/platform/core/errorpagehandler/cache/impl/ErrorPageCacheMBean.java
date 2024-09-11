/*
* Copyright (c) Abbott
*/
package com.abbott.aem.cloud.platform.core.errorpagehandler.cache.impl;

import com.adobe.granite.jmx.annotation.Description;

import javax.management.openmbean.OpenDataException;
import javax.management.openmbean.TabularData;

@Description("Abbott - Error Page Handler Cache")
public interface ErrorPageCacheMBean {
    @Description("Cache TTL in Seconds")
    int getTtlInSeconds();

    @Description("Total number of requests to the cache")
    int getTotalCacheRequests();

    @Description("Total cache misses")
    int getTotalMisses();

    @Description("Total cache hits")
    int getTotalHits();

    @Description("Total cache misses")
    int getCacheEntriesCount();

    @Description("Total cache size in KB")
    @SuppressWarnings("checkstyle:abbreviationaswordinname")
    long getCacheSizeInKB();

    @Description("Details for each cache entry")
    TabularData getCacheEntries() throws OpenDataException;

    /* Operations */
    @Description("Clear entire cache")
    void clearCache();

    @Description("Get the cached data for a specific Error Page. (Ex. getCacheData('/content/site/error/404.html'))")
    String getCacheData(String errorPage);
}