package com.abbott.aem.an.abbottstore.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class HeaderLinkItemsBeanTest {
    HeaderLinkItemsBean headerLinkItemsBean = new HeaderLinkItemsBean();

    @BeforeEach
    void setUp() {
        headerLinkItemsBean.setLinkLabel("linkLable");
        headerLinkItemsBean.setLinkPath("linkPath");
    }

    @Test
    void getLinkLabel() {
        assertNotNull(headerLinkItemsBean.getLinkLabel());
    }

    @Test
    void getLinkPath() {
        assertNotNull(headerLinkItemsBean.getLinkPath());
    }
}