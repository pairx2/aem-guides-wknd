package com.abbott.aem.an.abbottstore.beans;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class ThumbNailConfigImplTest {

    ThumbNailConfigImpl thumbNailConfig = new ThumbNailConfigImpl(100, 100, "mobile", "50");

    @Test
    void getDeviceType() {
        assertNotNull(thumbNailConfig.getDeviceType());
    }

    @Test
    void getSizeStr() {
        assertNotNull(thumbNailConfig.getSizeStr());
    }

    @Test
    void getWidth() {
        assertNotNull(thumbNailConfig.getWidth());
    }

    @Test
    void getHeight() {
        assertNotNull(thumbNailConfig.getHeight());
    }
}