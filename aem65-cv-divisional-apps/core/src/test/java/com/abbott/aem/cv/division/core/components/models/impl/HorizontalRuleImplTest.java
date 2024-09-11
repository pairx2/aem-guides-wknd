package com.abbott.aem.cv.division.core.components.models.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.abbott.aem.cv.division.core.components.models.HorizontalRule;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class HorizontalRuleImplTest {

    private final AemContext ctx = new AemContext();
    private static final String PATH = "/content/HorizontalRule";

    @BeforeEach
    public void setUp() {
        ctx.addModelsForClasses(HorizontalRule.class );
        ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/HorizontalRuleImplTest.json", "/content");
    }

    @Test
    void testGetRuleColor() {
        final String expected = "abbott-charcoal";
        ctx.currentResource(PATH);
        HorizontalRule horizontalrule= ctx.request().adaptTo(HorizontalRule.class);
        String actual = horizontalrule.getRuleColor();
        assertEquals(expected, actual);

    }

    @Test
    void testGetTopMargin() {
        final String expected = "margin-top-large";
        ctx.currentResource(PATH);
        HorizontalRule horizontalrule= ctx.request().adaptTo(HorizontalRule.class);
        String actual = horizontalrule.getTopMargin();
        assertEquals(expected, actual);
    }
    @Test
    void testGetBottomMargin() {
        final String expected = "margin-bottom-large";
        ctx.currentResource(PATH);
        HorizontalRule horizontalrule= ctx.request().adaptTo(HorizontalRule.class);
        String actual = horizontalrule.getBottomMargin();
        assertEquals(expected, actual);

    }


}