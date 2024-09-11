/*
* Copyright (c) Abbott
*/
package com.abbott.aem.cloud.platform.core.wcm;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNotSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(AemContextExtension.class)
class ComponentEditTypeTest {

    public AemContext context = new AemContext();

    @Test
    void testTypeConstructorWithDefaultCssClass() {
        ComponentEditType.Type type = new ComponentEditType.Type("CHART");
        assertEquals("CHART", type.getName());
        assertEquals("cq-chart-placeholder", type.getCssClass());
    }

    @Test
    void testTypeConstructorWithCustomCssClass() {
        ComponentEditType.Type type = new ComponentEditType.Type("IMAGE", "custom-css-class");
        assertEquals("IMAGE", type.getName());
        assertEquals("custom-css-class", type.getCssClass());
    }

    @Test
    void testTypeEqualsWithNull() {
        ComponentEditType.Type type = new ComponentEditType.Type("VIDEO");
        assertNotEquals(type, Optional.ofNullable(null));
    }

    @Test
    void testTypeEqualsWithType() {
        ComponentEditType.Type type1 = new ComponentEditType.Type("TEXT");
        ComponentEditType.Type type2 = new ComponentEditType.Type("TEXT");
        assertTrue(type1.equals(type2));
    }

    @Test
    void testTypeEqualsWithDifferentName() {
        ComponentEditType.Type type1 = new ComponentEditType.Type("TITLE");
        ComponentEditType.Type type2 = new ComponentEditType.Type("TEXT");
        assertFalse(type1.equals(type2));
    }

    @Test
    void testTypeEqualsWithString() {
        ComponentEditType.Type type = new ComponentEditType.Type("CAROUSEL");
        assertTrue(type.equals("CAROUSEL"));
    }

    @Test
    void testTypeEqualsWithDifferentString() {
        ComponentEditType.Type type = new ComponentEditType.Type("CAROUSEL");
        assertFalse(type.equals("TEXT"));
    }
    @Test
    void testTypeEqualsWithNullType() {
        ComponentEditType.Type type = new ComponentEditType.Type("NOICON");
        assertFalse(type.equals((ComponentEditType.Type) null));
    }

    @Test
    void testTypeEqualsWithDifferentType() {
        ComponentEditType.Type type1 = new ComponentEditType.Type("DROPTARGETS");
        ComponentEditType.Type type2 = new ComponentEditType.Type("NONE");
        assertFalse(type1.equals(type2));
    }

    @Test
    void testComponentEditTypeInitialization() {
        assertNotNull(ComponentEditType.CHART);
        assertNotNull(ComponentEditType.IMAGE);
        assertNotNull(ComponentEditType.VIDEO);
        assertNotNull(ComponentEditType.TEXT);
        assertNotNull(ComponentEditType.TITLE);
        assertNotNull(ComponentEditType.FILE);
        assertNotNull(ComponentEditType.CAROUSEL);
        assertNotNull(ComponentEditType.REFERENCE);
        assertNotNull(ComponentEditType.FLASH);
        assertNotNull(ComponentEditType.TEASER);
        assertNotNull(ComponentEditType.TABLE);
        assertNotNull(ComponentEditType.NOICON);
        assertNotNull(ComponentEditType.NONE);
        assertNotNull(ComponentEditType.DROPTARGETS);
    }

    @Test
    void testComponentEditTypeUniqueness() {
        assertNotSame(ComponentEditType.CHART, ComponentEditType.IMAGE);
        assertNotSame(ComponentEditType.IMAGE, ComponentEditType.VIDEO);
        assertNotSame(ComponentEditType.VIDEO, ComponentEditType.TEXT);
        assertNotSame(ComponentEditType.TEXT, ComponentEditType.TITLE);
        assertNotSame(ComponentEditType.TITLE, ComponentEditType.FILE);
        assertNotSame(ComponentEditType.FILE, ComponentEditType.CAROUSEL);
        assertNotSame(ComponentEditType.CAROUSEL, ComponentEditType.REFERENCE);
        assertNotSame(ComponentEditType.REFERENCE, ComponentEditType.FLASH);
        assertNotSame(ComponentEditType.FLASH, ComponentEditType.TEASER);
        assertNotSame(ComponentEditType.TEASER, ComponentEditType.TABLE);
        assertNotSame(ComponentEditType.TABLE, ComponentEditType.NOICON);
        assertNotSame(ComponentEditType.NOICON, ComponentEditType.NONE);
        assertNotSame(ComponentEditType.NONE, ComponentEditType.DROPTARGETS);
    }

    @Test
    void testTypeEqualsWithObject() {
        ComponentEditType.Type type = new ComponentEditType.Type("CAROUSEL");
        Object obj = new ComponentEditType.Type("CAROUSEL");
        assertEquals(type, obj);
    }

    @Test
    void testTypeHashCode() {
        ComponentEditType.Type type = new ComponentEditType.Type("FLASH");
        assertEquals("FLASH".hashCode(), type.hashCode());
    }

    @Test
    void testComponentEditTypeObject() {
        ComponentEditType type = new ComponentEditType();
        assertNotNull(type.hashCode());
    }
}