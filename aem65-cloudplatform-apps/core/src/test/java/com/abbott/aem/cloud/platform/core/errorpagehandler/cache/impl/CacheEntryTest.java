package com.abbott.aem.cloud.platform.core.errorpagehandler.cache.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.nio.charset.StandardCharsets;
import java.util.Calendar;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CacheEntryTest {

    private CacheEntry cacheEntry;

    @BeforeEach
    public void setUp() {
        cacheEntry = new CacheEntry();
    }

    @Test
    void testGetData() {
        assertEquals("", cacheEntry.getData());
    }

    @Test
    void testSetData() {
        cacheEntry.setData("Test Data");
        assertEquals("Test Data", cacheEntry.getData());
    }

    @Test
    void testSetData_empty() {
        cacheEntry.setData(null);
        assertEquals("", cacheEntry.getData());
    }

    @Test
    void testGetHits() {
        assertEquals(0, cacheEntry.getHits());
    }

    @Test
    void testIncrementHits() {
        cacheEntry.incrementHits();
        assertEquals(1, cacheEntry.getHits());
    }

    @Test
    void testGetMisses() {
        assertEquals(0, cacheEntry.getMisses());
    }

    @Test
    void testIncrementMisses() {
        cacheEntry.incrementMisses();
        assertEquals(1, cacheEntry.getMisses());
    }

    @Test
    void testIsExpired() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.SECOND, 10); // Expires in 10 seconds
        Date date = calendar.getTime();

        cacheEntry.setExpiresIn(5); // Expires in 5 seconds
        assertTrue(cacheEntry.isExpired(date));
    }

    @Test
    void testSetExpiresIn() {
        cacheEntry.setExpiresIn(60); // Expires in 60 seconds
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.SECOND, 120);

        assertTrue(cacheEntry.isExpired(calendar.getTime()));
    }

    @Test
    void testGetHitRate() {
        cacheEntry.incrementHits();
        cacheEntry.incrementMisses();

        assertEquals(0.5f, cacheEntry.getHitRate(), 0.001f);
    }

    @Test
    void testGetHitRate_zero() {
        assertEquals(0f, cacheEntry.getHitRate());
    }

    @Test
    void testGetMissRate() {
        cacheEntry.incrementHits();
        cacheEntry.incrementMisses();

        assertEquals(0.5f, cacheEntry.getMissRate(), 0.001f);
    }

    @Test
    void testGetMissRate_zero() {
        assertEquals(0f, cacheEntry.getMissRate());
    }

    @Test
    void testGetTotal() {
        cacheEntry.incrementHits();
        cacheEntry.incrementMisses();

        assertEquals(2, cacheEntry.getTotal());
    }

    @Test
    void testGetBytes() {
        cacheEntry.setData("Test Data");

        assertEquals("Test Data".getBytes(StandardCharsets.UTF_8).length, cacheEntry.getBytes());
    }
}
