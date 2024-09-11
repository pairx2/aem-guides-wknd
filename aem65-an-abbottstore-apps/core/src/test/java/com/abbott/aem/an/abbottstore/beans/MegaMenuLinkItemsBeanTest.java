package com.abbott.aem.an.abbottstore.beans;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class MegaMenuLinkItemsBeanTest {

    MegaMenuLinkItemsBean megaMenuLinkItemsBean = new MegaMenuLinkItemsBean();

    @BeforeEach
    void setUp() {
        megaMenuLinkItemsBean.setMegaMenuLabel("menuLabel");
        megaMenuLinkItemsBean.setFragmentPath("path");
    }

    @Test
    void getFragmentPath() {
        assertNotNull(megaMenuLinkItemsBean.getFragmentPath());
    }

    @Test
    void getMegaMenuLabel() {
        assertNotNull(megaMenuLinkItemsBean.getMegaMenuLabel());
    }
}