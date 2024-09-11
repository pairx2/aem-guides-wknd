package com.abbott.aem.platform.common.components.pojo;

import com.abbott.aem.platform.common.components.models.ScrollInteractions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Collections;

class ScrollInteractionsDefaultAnimationsTest {

    private ScrollInteractions mockScrollInteraction1;
    private ScrollInteractions mockScrollInteraction2;

    @BeforeEach
    public void setUp() {
        mockScrollInteraction1 = mock(ScrollInteractions.class);
        mockScrollInteraction2 = mock(ScrollInteractions.class);

        when(mockScrollInteraction1.getGradientType()).thenReturn("Radial");
        when(mockScrollInteraction1.getBackgroundColorStyle(true)).thenReturn("style1");
        when(mockScrollInteraction2.getGradientType()).thenReturn("Linear");
        when(mockScrollInteraction2.getBackgroundColorStyle(true)).thenReturn("style2");
    }

    @Test
    void testConstructorWithScrollInteractions() {
        List<ScrollInteractions> scrollInteractions = Arrays.asList(mockScrollInteraction1, mockScrollInteraction2);
        ScrollInteractionsDefaultAnimations animations = new ScrollInteractionsDefaultAnimations(scrollInteractions);

        assertEquals(2, animations.getPanels().size());
        assertEquals("panel1", animations.getPanels().get(0).getPanelId());
        assertEquals("panel2", animations.getPanels().get(1).getPanelId());

        Map<String, String> backgroundStylesDataAttributes = animations.getBackgroundStylesDataAttributes();
        assertEquals(2, backgroundStylesDataAttributes.size());
        assertEquals("style1", backgroundStylesDataAttributes.get("data-panelbg1"));
        assertEquals("style2", backgroundStylesDataAttributes.get("data-panelbg2"));
    }

    @Test
    void testGetPanels() {
        List<ScrollInteractions> scrollInteractions = Arrays.asList(mockScrollInteraction1, mockScrollInteraction2);
        ScrollInteractionsDefaultAnimations animations = new ScrollInteractionsDefaultAnimations(scrollInteractions);

        List<ScrollInteractionsDetails> panels = animations.getPanels();
        assertEquals(2, panels.size());
        assertEquals("panel1", panels.get(0).getPanelId());
        assertEquals("panel2", panels.get(1).getPanelId());
    }

    @Test
    void testGetBackgroundStylesDataAttributes() {
        List<ScrollInteractions> scrollInteractions = Arrays.asList(mockScrollInteraction1, mockScrollInteraction2);
        ScrollInteractionsDefaultAnimations animations = new ScrollInteractionsDefaultAnimations(scrollInteractions);

        Map<String, String> backgroundStylesDataAttributes = animations.getBackgroundStylesDataAttributes();
        assertEquals(2, backgroundStylesDataAttributes.size());
        assertEquals("style1", backgroundStylesDataAttributes.get("data-panelbg1"));
        assertEquals("style2", backgroundStylesDataAttributes.get("data-panelbg2"));
    }

    @Test
    void testGetScrollInteractionsDetails() {
        List<ScrollInteractions> scrollInteractions = Arrays.asList(mockScrollInteraction1, mockScrollInteraction2);
        ScrollInteractionsDefaultAnimations animations = new ScrollInteractionsDefaultAnimations(scrollInteractions);

        List<ScrollInteractionsDetails> details = animations.getScrollInteractionsDetails();
        assertEquals(2, details.size());
        assertEquals("panel1", details.get(0).getPanelId());
        assertEquals("panel2", details.get(1).getPanelId());
    }

    @Test
    void testConstructorWithEmptyList() {
        List<ScrollInteractions> scrollInteractions = Collections.emptyList();
        ScrollInteractionsDefaultAnimations animations = new ScrollInteractionsDefaultAnimations(scrollInteractions);

        assertTrue(animations.getPanels().isEmpty());
        assertTrue(animations.getBackgroundStylesDataAttributes().isEmpty());
        assertTrue(animations.getScrollInteractionsDetails().isEmpty());
    }
}