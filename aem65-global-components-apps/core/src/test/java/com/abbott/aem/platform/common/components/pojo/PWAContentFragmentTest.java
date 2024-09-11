package com.abbott.aem.platform.common.components.pojo;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

public class PWAContentFragmentTest {

    @Test
    public void testGetSetCachingStrategy() {
        PWAContentFragment fragment = new PWAContentFragment();
        String strategy = "CacheFirst";
        fragment.setCachingStrategy(strategy);
        assertEquals(strategy, fragment.getCachingStrategy());
    }

    @Test
    public void testGetSetCacheName() {
        PWAContentFragment fragment = new PWAContentFragment();
        String cacheName = "myCache";
        fragment.setCacheName(cacheName);
        assertEquals(cacheName, fragment.getCacheName());
    }

    @Test
    public void testGetSetPrecachedUrl() {
        PWAContentFragment fragment = new PWAContentFragment();
        List<String> urls = Arrays.asList("url1", "url2", "url3");
        fragment.setPrecachedUrl(urls);
        assertEquals(urls, fragment.getPrecachedUrl());
    }

    @Test
    public void testGetSetOfflinePage() {
        PWAContentFragment fragment = new PWAContentFragment();
        String offlinePage = "offline.html";
        fragment.setOfflinePage(offlinePage);
        assertEquals(offlinePage, fragment.getOfflinePage());
    }

    @Test
    public void testGetSetDomainWhiteList() {
        PWAContentFragment fragment = new PWAContentFragment();
        String whiteList = "example.com";
        fragment.setDomainWhiteList(whiteList);
        assertEquals(whiteList, fragment.getDomainWhiteList());
    }

    @Test
    public void testGetSetCacheableUrls() {
        PWAContentFragment fragment = new PWAContentFragment();
        List<String> urls = Arrays.asList("url1", "url2", "url3");
        fragment.setCacheableUrls(urls);
        assertEquals(urls, fragment.getCacheableUrls());
    }

    @Test
    public void testGetSetExcludedUrls() {
        PWAContentFragment fragment = new PWAContentFragment();
        String excludedUrls = "excluded.html";
        fragment.setExcludedUrls(excludedUrls);
        assertEquals(excludedUrls, fragment.getExcludedUrls());
    }

    @Test
    public void testGetSetHandlerExpirationLimit() {
        PWAContentFragment fragment = new PWAContentFragment();
        String limit = "3600";
        fragment.setHandlerExpirationLimit(limit);
        assertEquals(limit, fragment.getHandlerExpirationLimit());
    }

    @Test
    public void testGetSetMasterCacheUrlList() {
        PWAContentFragment fragment = new PWAContentFragment();
        List<String> urls = Arrays.asList("url1", "url2", "url3");
        fragment.setMasterCacheUrlList(urls);
        assertEquals(urls, fragment.getMasterCacheUrlList());
    }

    @Test
    public void testGetSetLocalHostUrl() {
        PWAContentFragment fragment = new PWAContentFragment();
        String localHostUrl = "localhost";
        fragment.setLocalHostUrl(localHostUrl);
        assertEquals(localHostUrl, fragment.getLocalHostUrl());
    }

    @Test
    public void testGetSetContentBasePath() {
        PWAContentFragment fragment = new PWAContentFragment();
        String basePath = "/content";
        fragment.setContentBasePath(basePath);
        assertEquals(basePath, fragment.getContentBasePath());
    }
}