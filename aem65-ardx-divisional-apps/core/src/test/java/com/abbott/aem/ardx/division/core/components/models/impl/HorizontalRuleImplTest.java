package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.HorizontalRule;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;
@ExtendWith(AemContextExtension.class)
public class HorizontalRuleImplTest {
    
    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
    private Component component;
    private final String RULE_RESOURCE = "/content/horizontalrule";
    private final String RULE_RESOURCE_PATH = "/com/abbott/aem/platform/common/components/models/impl/v1/HorizontalRuleImplTest.json";


    @BeforeEach
    void setUp() throws Exception {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(HorizontalRuleImpl.class);
        ctx.load().json(RULE_RESOURCE_PATH, "/content");
        ctx.currentResource(RULE_RESOURCE);
    }

    @Test
    void testGetRuleColor() {
        final String expected = "#fffff";
        ctx.currentResource(RULE_RESOURCE);
        HorizontalRule rule = ctx.request().adaptTo(HorizontalRule.class);
        String actual = rule.getRuleColor();
        assertEquals(expected, actual);
    }

    @Test
    void testGetRuleTopMargin() {
        final String expected = "10";
        ctx.currentResource(RULE_RESOURCE);
        HorizontalRule rule = ctx.request().adaptTo(HorizontalRule.class);
        String actual = rule.getRuleTopMargin();
        assertEquals(expected, actual);
    }

    @Test
    void testGetRuleBottomMargin() {
        final String expected = "20";
        ctx.currentResource(RULE_RESOURCE);
        HorizontalRule rule = ctx.request().adaptTo(HorizontalRule.class);
        String actual = rule.getRuleBottomMargin();
        assertEquals(expected, actual);
    }

    @Test
    void testGetRuleThickness() {
        final String expected = "5";
        ctx.currentResource(RULE_RESOURCE);
        HorizontalRule rule = ctx.request().adaptTo(HorizontalRule.class);
        String actual = rule.getRuleThickness();
        assertEquals(expected, actual);
    }

    @Test
    void testGetMarginCheckBox() {
        final String expected = "true";
        ctx.currentResource(RULE_RESOURCE);
        HorizontalRule rule = ctx.request().adaptTo(HorizontalRule.class);
        String actual = rule.getMarginCheckBox();
        assertEquals(expected, actual);
    }

    @Test
    void testGetRuleTopAndBottomMargin() {
        final String expected = "50";
        ctx.currentResource(RULE_RESOURCE);
        HorizontalRule rule = ctx.request().adaptTo(HorizontalRule.class);
        String actual = rule.getRuleTopAndBottomMargin();
        assertEquals(expected, actual);
    }

   


}

