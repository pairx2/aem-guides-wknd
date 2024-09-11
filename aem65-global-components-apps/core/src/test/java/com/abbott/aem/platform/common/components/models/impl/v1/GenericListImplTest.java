package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.GenericList;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.junit.Before;
import org.junit.Test;

import java.util.*;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class GenericListImplTest {

    private Resource mockResource;
    private Resource mockChildResource;
    private ValueMap mockValueMap;
    private GenericListImpl genericListImpl;

    @Before
    public void setUp() {
        // Mock the resource and value map
        mockResource = mock(Resource.class);
        mockChildResource = mock(Resource.class);
        mockValueMap = mock(ValueMap.class);

        // Setup mock children
        Iterator<Resource> mockChildrenIterator = mock(Iterator.class);
        when(mockResource.listChildren()).thenReturn(mockChildrenIterator);
        when(mockChildrenIterator.hasNext()).thenReturn(true, false);
        when(mockChildrenIterator.next()).thenReturn(mockChildResource);

        // Setup mock value map
        when(mockChildResource.getValueMap()).thenReturn(mockValueMap);
        when(mockValueMap.get(GenericListImpl.PN_TEXT, String.class)).thenReturn("Test Text");
        when(mockValueMap.get(GenericListImpl.PN_VALUE, String.class)).thenReturn("Test Value");

        // Initialize the GenericListImpl with the mocked resource
        genericListImpl = new GenericListImpl(mockResource);
    }

    @Test
    public void testGetItems() {
        List<GenericList.Item> items = genericListImpl.getItems();
        assertNotNull(items);
        assertEquals(1, items.size());
        GenericList.Item item = items.get(0);
        assertEquals("Test Text", item.getText());
        assertEquals("Test Value", item.getValue());
    }

    @Test
    public void testLookupText() {
        assertEquals("Test Text", genericListImpl.lookupText("Test Value"));
        assertNull(genericListImpl.lookupText("Nonexistent Value"));
    }

    @Test
    public void testLookupTextWithLocale() {
        Locale locale = new Locale("en");
        when(mockValueMap.get(GenericListImpl.PN_TEXT + ".en", String.class)).thenReturn("Localized Text");

        assertEquals("Localized Text", genericListImpl.lookupText("Test Value", locale));
        assertEquals("Test Text", genericListImpl.lookupText("Test Value", null));
    }

    @Test
    public void testGetTextWithEmptyLanguage() {
        Locale locale = new Locale("", "US");
        GenericList.Item item = genericListImpl.getItems().get(0);
        assertEquals("Test Text", item.getText(locale));
    }

    @Test
    public void testGetLocalizedTextReturnsNull() {
        Locale locale = new Locale("de");
        GenericList.Item item = genericListImpl.getItems().get(0);
        when(mockValueMap.get(GenericListImpl.PN_TEXT + ".de", String.class)).thenReturn(null);
        assertEquals("Test Text", item.getText(locale));
    }

    @Test
    public void testLookupTextReturnsNull() {
        assertNull(genericListImpl.lookupText("Nonexistent Value", new Locale("en")));
    }
}