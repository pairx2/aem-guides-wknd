package com.abbott.aem.platform.common.components.servlets;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.HashMap;

import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.Before;
import org.junit.Test;

public class TextValueDataResourceSourceTest {

    private ResourceResolver mockResourceResolver;
    private TextValueDataResourceSource textValueDataResourceSource;

    @Before
    public void setUp() {
        mockResourceResolver = mock(ResourceResolver.class);
        textValueDataResourceSource = new TextValueDataResourceSource(mockResourceResolver, "/some/path", "some/resourceType") {
            @Override
            public String getText() {
                return "testText";
            }

            @Override
            public String getValue() {
                return "testValue";
            }

            @Override
            protected boolean getSelected() {
                return true;
            }
        };
    }

    @Test
    public void testAdaptToValueMap() {
        ValueMap valueMap = textValueDataResourceSource.adaptTo(ValueMap.class);

        assertNotNull(valueMap);
        assertEquals("testText", valueMap.get(TextValueDataResourceSource.PN_TEXT));
        assertEquals("testValue", valueMap.get(TextValueDataResourceSource.PN_VALUE));
        assertEquals(Boolean.TRUE, valueMap.get(TextValueDataResourceSource.PN_SELECTED, Boolean.class));
    }

    @Test
    public void testAdaptToOtherType() {
        String result = textValueDataResourceSource.adaptTo(String.class);
        assertNull(result);
    }

    @Test
    public void testInitValueMap() {
        textValueDataResourceSource.adaptTo(ValueMap.class); // This should initialize the value map

        ValueMap valueMap = textValueDataResourceSource.adaptTo(ValueMap.class);
        assertNotNull(valueMap);
        assertEquals("testText", valueMap.get(TextValueDataResourceSource.PN_TEXT));
        assertEquals("testValue", valueMap.get(TextValueDataResourceSource.PN_VALUE));
        assertEquals(Boolean.TRUE, valueMap.get(TextValueDataResourceSource.PN_SELECTED, Boolean.class));
    }
}