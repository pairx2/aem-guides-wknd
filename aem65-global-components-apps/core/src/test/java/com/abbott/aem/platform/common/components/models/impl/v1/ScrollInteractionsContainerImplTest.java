package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import com.abbott.aem.platform.common.components.models.ScrollInteractions;
import com.abbott.aem.platform.common.components.pojo.ScrollInteractionsAnimations;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.lang.reflect.Field;
import java.util.List;


public class ScrollInteractionsContainerImplTest {

    private ScrollInteractionsContainerImpl scrollInteractionsContainer;

    @Mock
    private SlingHttpServletRequest slingHttpServletRequest;
    @Mock
    private Resource resource;
    @Mock
    private Resource childResource;
    @Mock
    private ScrollInteractions scrollInteractions;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        scrollInteractionsContainer = new ScrollInteractionsContainerImpl();
        scrollInteractionsContainer.setSlingHttpServletRequest(slingHttpServletRequest);
    }

    @Test
    public void testInit_successful() {
        when(slingHttpServletRequest.getResource()).thenReturn(resource);
        when(resource.getChildren()).thenReturn(Collections.singleton(childResource));
        when(childResource.adaptTo(ScrollInteractions.class)).thenReturn(scrollInteractions);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Field objectMapperField = ScrollInteractionsContainerImpl.class.getDeclaredField("objectMapper");
            objectMapperField.setAccessible(true);
            objectMapperField.set(scrollInteractionsContainer, objectMapper);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            fail("Reflection error: " + e.getMessage());
        }

        scrollInteractionsContainer.init();

        List<ScrollInteractions> interactions = scrollInteractionsContainer.getScrollInteractions();
        assertNotNull(interactions);
        assertFalse(interactions.isEmpty());

        ScrollInteractionsAnimations animations = scrollInteractionsContainer.getScrollInteractionsAnimations();

        String jsonConfig = scrollInteractionsContainer.getJsonConfig();

        // Optionally, check the contents of jsonConfig
        try {
            String expectedJson = objectMapper.writeValueAsString(interactions);
            assertNull(expectedJson, jsonConfig);
        } catch (JsonProcessingException e) {
            fail("JSON processing failed in test: " + e.getMessage());
        }
    }

    @Test
    public void testInit_jsonProcessingException() throws Exception {
        when(slingHttpServletRequest.getResource()).thenReturn(resource);
        when(resource.getChildren()).thenReturn(Collections.singleton(childResource));
        when(childResource.adaptTo(ScrollInteractions.class)).thenReturn(scrollInteractions);

        ObjectMapper objectMapperMock = mock(ObjectMapper.class);
        Field objectMapperField = ScrollInteractionsContainerImpl.class.getDeclaredField("objectMapper");
        objectMapperField.setAccessible(true);
        objectMapperField.set(scrollInteractionsContainer, objectMapperMock);

        doThrow(JsonProcessingException.class).when(objectMapperMock).writeValueAsString(any());

        scrollInteractionsContainer.init();

        assertNull(scrollInteractionsContainer.getJsonConfig());

    }

    @Test
    public void testInit_runtimeException() {
        when(slingHttpServletRequest.getResource()).thenReturn(resource);
        when(resource.getChildren()).thenThrow(RuntimeException.class);

        scrollInteractionsContainer.init();

        assertNull(scrollInteractionsContainer.getScrollInteractions());
        assertNull(scrollInteractionsContainer.getScrollInteractionsAnimations());
    }

    @Test
    public void testGetters() throws NoSuchFieldException, IllegalAccessException {
        Field titleField = ScrollInteractionsContainerImpl.class.getDeclaredField("title");
        titleField.setAccessible(true);
        titleField.set(scrollInteractionsContainer, "Sample Title");

        Field animationField = ScrollInteractionsContainerImpl.class.getDeclaredField("animation");
        animationField.setAccessible(true);
        animationField.set(scrollInteractionsContainer, "Sample Animation");

        assertEquals("Sample Title", scrollInteractionsContainer.getTitle());
        assertEquals("Sample Animation", scrollInteractionsContainer.getAnimation());

        titleField.set(scrollInteractionsContainer, null);
        animationField.set(scrollInteractionsContainer, null);

        assertNull(scrollInteractionsContainer.getTitle());
        assertNull(scrollInteractionsContainer.getAnimation());
    }

    @Test
    public void testEmptyScrollInteractions() {
        when(slingHttpServletRequest.getResource()).thenReturn(resource);
        when(resource.getChildren()).thenReturn(Collections.emptyList());

        scrollInteractionsContainer.init();

        assertNotNull(scrollInteractionsContainer.getScrollInteractions());
        assertTrue(scrollInteractionsContainer.getScrollInteractions().isEmpty());
    }

    @Test
    public void testNullChildResource() {
        when(slingHttpServletRequest.getResource()).thenReturn(resource);
        when(resource.getChildren()).thenReturn(Collections.singleton(null));

        scrollInteractionsContainer.init();

        assertNotNull(scrollInteractionsContainer.getScrollInteractions());
        assertTrue(scrollInteractionsContainer.getScrollInteractions().isEmpty());
    }

}