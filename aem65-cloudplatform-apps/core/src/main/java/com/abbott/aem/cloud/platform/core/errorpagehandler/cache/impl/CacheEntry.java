/*
* Copyright (c) Abbott
*/
package com.abbott.aem.cloud.platform.core.errorpagehandler.cache.impl;

import java.nio.charset.StandardCharsets;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;

class CacheEntry {
    private String data;

    private final AtomicInteger hits;

    private final AtomicInteger misses;

    private Date expiresAt;

    public CacheEntry() {
        this.hits = new AtomicInteger();
        this.misses = new AtomicInteger();
        this.data = "";
        this.expiresAt = new Date(0);
    }

    public final String getData() {
        if (data == null) {
            return "";
        } else {
            return data;
        }
    }

    public final void setData(final String data) {
        if (data == null) {
            this.data = "";
        } else {
            this.data = data;
        }
    }

    public final int getHits() {
        return hits.get();
    }

    public final void incrementHits() {
        this.hits.incrementAndGet();
    }

    public final int getMisses() {
        return misses.get();
    }

    public final void incrementMisses() {
        this.misses.incrementAndGet();
    }

    public final boolean isExpired(final Date date) {
        return expiresAt.before(date);
    }

    public final void setExpiresIn(final int expiresInSeconds) {
        final Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.SECOND, expiresInSeconds);
        this.expiresAt = calendar.getTime();
    }

    public final float getHitRate() {
        final int total = this.getTotal();
        if (total == 0) {
            return 0;
        }

        return this.getHits() / (float) total;
    }

    public final float getMissRate() {
        final int total = this.getTotal();
        if (total == 0) {
            return 0;
        }

        return this.getMisses() / (float) total;
    }

    final int getTotal() {
        return this.hits.get() + this.misses.get();
    }

    final int getBytes() {
        return getData().getBytes(StandardCharsets.UTF_8).length;
    }
}