package com.abbott.aem.adc.freestylelibrede.models;


import org.junit.Assert;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

class TreeTagTest {

    @Test
    void getLabel() {
        Assert.assertEquals("test", new TreeTag("test", null, null).getLabel());
    }

    @Test
    void getValue() {
        Assert.assertEquals("test", new TreeTag(null, "test", null).getValue());
    }

    @Test
    void getChildren() {
        List list = Arrays.asList("a", "b");
        Assert.assertEquals(2, new TreeTag(null, null, list).getChildren().size());
    }
}