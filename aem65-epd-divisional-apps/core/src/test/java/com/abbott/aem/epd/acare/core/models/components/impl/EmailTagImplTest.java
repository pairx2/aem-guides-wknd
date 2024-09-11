package com.abbott.aem.epd.acare.core.models.components.impl;

import com.abbott.aem.epd.acare.core.models.components.EmailInfo;
import com.abbott.aem.epd.acare.core.models.components.EmailTag;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.adobe.cq.sightly.SightlyWCMMode;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(AemContextExtension.class)
class EmailTagImplTest {
    @InjectMocks
    EmailTagImpl emailtagImpl;

    private final AemContext ctx = new AemContext();
    private final AemContext ctx2 = new AemContext();
    private ProxyComponentService proxyComponentService;
    private Component component;
    private Page currentPage;

    private PageManager pageManager;
    @BeforeEach
    void setUp() {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(EmailTagImpl.class);
        ctx.load().json("/com/abbott/aem/epd/acare/core/models/components/impl/EmailTagImplTest.json", "/content/emailtag");

        pageManager = Mockito.mock(PageManager.class);
        currentPage = Mockito.mock(Page.class);
        ctx.currentPage(currentPage);
        ctx2.currentPage(currentPage);
    }

    @Test
    void TestGetTagIcon() {
        final String expected = "Abbott";
        ctx.currentResource("/content/emailtag");
        EmailTag emailtag1 = ctx.request().adaptTo(EmailTag.class);
        emailtag1.setTagIcon(expected);
        String actual = emailtag1.getTagIcon();
        assertEquals(expected, actual);

    }

    @Test
    void TestGetTagLink() {
        final String expected = "HTTP://www.abbott.com/";
        ctx.currentResource("/content/emailtag");
        EmailTag emailtag1 = ctx.request().adaptTo(EmailTag.class);
        emailtag1.setTagLink(expected);
        String actual = emailtag1.getTagLink();
        assertEquals(expected, actual);
    }

    @Test
    void TestGetTagLinkText() {
        final String expected = "SampleTagLinkText";
        ctx.currentResource("/content/emailtag");
        EmailTag emailtag1 = ctx.request().adaptTo(EmailTag.class);
        emailtag1.setTagLinkText(expected);
        String actual = emailtag1.getTagLinkText();
        assertEquals(expected, actual);

    }

    @Test
    void TestGetTagAltText() {
        final String expected = "SampleAltText";
        ctx.currentResource("/content/emailtag");
        EmailTag emailtag1 = ctx.request().adaptTo(EmailTag.class);
        emailtag1.setTagAltText(expected);
        String actual = emailtag1.getTagAltText();
        assertEquals(expected, actual);

    }

    @Test
    void TestGetTextColor() {
        final String expected = "Black";
        ctx.currentResource("/content/emailtag");
        EmailTag emailtag1 = ctx.request().adaptTo(EmailTag.class);
        emailtag1.setTextColor(expected);
        String actual = emailtag1.getTextColor();
        assertEquals(expected, actual);

    }

    @Test
    void TestGetTagBGColor() {
        final String expected = "White";
        ctx.currentResource("/content/emailtag");
        EmailTag emailtag1 = ctx.request().adaptTo(EmailTag.class);
        emailtag1.setTagBGColor(expected);
        String actual = emailtag1.getTagBGColor();
        assertEquals(expected, actual);

    }
}