package com.abbott.aem.cloud.platform.core.errorpagehandler.cache.impl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.management.openmbean.TabularData;
import javax.servlet.RequestDispatcher;
import java.lang.reflect.Field;
import java.util.Date;
import java.util.concurrent.ConcurrentMap;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ErrorPageCacheImplTest {

    private SlingHttpServletRequest request;

    private SlingHttpServletResponse response;

    private AemContext context = new AemContext();

    private ErrorPageCacheImpl pageCache;

    private ConcurrentMap<String, CacheEntry> cache;

    private String path = "/content/dam/abbott/";

    @BeforeEach
    void setUp() throws Exception {
        request = mock(SlingHttpServletRequest.class);
        response = mock(SlingHttpServletResponse.class);
        context.registerService(ErrorPageCacheImpl.class, new ErrorPageCacheImpl(60, false));
        pageCache = context.getService(ErrorPageCacheImpl.class);

        // cache entries
        Field field = pageCache.getClass().getDeclaredField("cache");
        field.setAccessible(true);

        CacheEntry cacheEntry = new CacheEntry();
        cacheEntry.setData("Cached Data");
        cacheEntry.setExpiresIn(60);

        cache = (ConcurrentMap<String, CacheEntry>) field.get(pageCache);
        cache.put(path, cacheEntry);
    }

    @Test
    void testCacheHitForAuthenticatedUser() {
        when(request.getAuthType()).thenReturn("login");
        when(request.getRemoteUser()).thenReturn("admin");
        when(request.getRequestDispatcher(path)).thenReturn(mock(RequestDispatcher.class));

        // Testing for authenticated requests, not to return from cache
        assertNull(pageCache.get(path, request, response));
    }

    @Test
    void testCacheHitForAnonymousUser() {
        // Testing for anonymous user, should be a cache hit
        pageCache.get(path, request, response);

        assertEquals(1, pageCache.getTotalHits());
        assertEquals(0, pageCache.getTotalMisses());
    }

    @Test
    void testCacheMiss() {
        when(request.getRequestDispatcher(path)).thenReturn(mock(RequestDispatcher.class));
        cache.clear();

        // Testing for anonymous requests, should be cache miss
        pageCache.get(path, request, response);
        assertEquals("", cache.get(path).getData());
        assertEquals(1, pageCache.getTotalMisses());
        assertEquals(0, pageCache.getTotalHits());
    }

    @Test
    void testCacheMissWithNullData() {
        cache.remove(path);

        // Testing for anonymous user, expecting exception
        assertThrows(NullPointerException.class, () -> {
            pageCache.get(path, request, response);
        });
    }

    @Test
    void testIncreaseExpiredCacheTTL() {
        CacheEntry cacheEntry = new CacheEntry();
        cacheEntry.setExpiresIn(0);

        when(request.getRequestDispatcher(path)).thenReturn(mock(RequestDispatcher.class));

        cache.put(path, cacheEntry);

        // Testing for anonymous user, increasing ttl for expired cache
        pageCache.get(path, request, response);
        assertFalse(cache.get(path).isExpired(new Date()));
    }

    @Test
    void testGetTtlInSeconds() {
        assertEquals(60, pageCache.getTtlInSeconds());
    }

    @Test
    void testGetCacheEntriesCount() {
        cache.put("/", new CacheEntry());

        assertEquals(2, pageCache.getCacheEntriesCount());
    }

    @Test
    void testGetTotalCacheRequests() {
        when(request.getRequestDispatcher(path)).thenReturn(mock(RequestDispatcher.class));
        cache.clear();

        // Testing for anonymous requests
        pageCache.get(path, request, response); //cache miss
        pageCache.get(path, request, response); //cache hit
        pageCache.get(path, request, response); //cache hit

        assertEquals(3, pageCache.getTotalCacheRequests());
    }

    @Test
    void testGetCacheSizeInKB() {
        when(request.getRequestDispatcher(path)).thenReturn(mock(RequestDispatcher.class));
        cache.clear();

        // Testing for anonymous requests
        pageCache.get(path, request, response); //cache miss
        pageCache.get(path, request, response); //cache hit
        pageCache.get(path, request, response); //cache hit

        assertEquals(0, pageCache.getCacheSizeInKB());
    }

    @Test
    void testGetCacheEntries() throws Exception {
        // cache entries
        when(request.getRequestDispatcher(path)).thenReturn(mock(RequestDispatcher.class));
        cache.clear();

        // Testing for anonymous requests
        pageCache.get(path, request, response); //cache miss
        pageCache.get(path, request, response); //cache hit
        pageCache.get(path, request, response); //cache hit

        CacheEntry cacheEntry = cache.get(path);

        TabularData tabularData = pageCache.getCacheEntries();

        assertEquals(1, tabularData.size());
        assertEquals(path, tabularData.get(new Object[]{path}).get("errorPage"));
        assertEquals(2, tabularData.get(new Object[]{path}).get("hit"));
        assertEquals(1, tabularData.get(new Object[]{path}).get("miss"));
        assertEquals(cacheEntry.getHitRate(), tabularData.get(new Object[]{path}).get("hitRate"));
        assertEquals(cacheEntry.getMissRate(), tabularData.get(new Object[]{path}).get("missRate"));
        assertEquals(0, tabularData.get(new Object[]{path}).get("sizeInKB"));
    }

    @Test
    void testClearCache() {
        pageCache.clearCache();

        assertTrue(cache.isEmpty());
    }

    @Test
    void testGetCacheData() {
        assertEquals("Cached Data", pageCache.getCacheData(path));
        assertEquals("", pageCache.getCacheData("invalidPagePath"));
    }
}

