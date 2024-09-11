package com.abbott.aem.platform.common.components.pojo;

import com.abbott.aem.platform.common.components.models.ScrollInteractions;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Collections;

class ScrollAnimationFactoryTest {

    @Test
    void testCreateScrollInteractionsAnimationsDefault() {
        ScrollAnimationFactory factory = new ScrollAnimationFactory();
        List<ScrollInteractions> interactions = Collections.emptyList(); // Use an appropriate mock or real object here

        ScrollInteractionsAnimations result = factory.createScrollInteractionsAnimations("default", interactions);

        assertNotNull(result);
        assertTrue(result instanceof ScrollInteractionsDefaultAnimations);
    }

    @Test
    void testCreateScrollInteractionsAnimationsNonDefault() {
        ScrollAnimationFactory factory = new ScrollAnimationFactory();
        List<ScrollInteractions> interactions = Collections.emptyList(); // Use an appropriate mock or real object here

        ScrollInteractionsAnimations result = factory.createScrollInteractionsAnimations("non-default", interactions);

        assertNull(result);
    }

}