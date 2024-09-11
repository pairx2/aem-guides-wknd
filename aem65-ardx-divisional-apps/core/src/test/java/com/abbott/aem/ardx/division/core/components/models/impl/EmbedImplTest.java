package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.Embed;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class EmbedImplTest {

    private final AemContext ctx = new AemContext();
    private final String EMBED_RESOURCE = "/content/ardxembed";
    private final String SECOND_EMBED_RESOURCE = "/content/ardxembedwithoutwidth";

    @BeforeEach
    void setUp() throws Exception {
        ctx.addModelsForClasses(EmbedImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/EmbedImplTest.json", "/content");
    }

    @Test
    final void testGetIframe() {
        final String expected = "hi";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getIframe();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetType() {
        final String expected = "url";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getType();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetMarketoFormId() {
        final String expected = "123";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getMarketoFormId();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetMarketoMunchkinId() {
        final String expected = "397-wai-057";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getMarketoMunchkinId();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetActonScript() {
        final String expected = "text";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getActonScript();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetSuccessMessageActOnForms() {
        final String expected = "Acton Success Message";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getSuccessMessageActOnForms();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetLinktoExternalPage() {
        final String expected = "https://www.youtube.com/embed/ouEzZbj1BkQ";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getLinktoExternalPage();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetSuccessMessage() {
        final String expected = "Marketo Success Message";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getSuccessMessage();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetAppendParameter() {
        final String expected = "true";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getAppendParameter();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetTitle() {
        final String expected = "Title";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getTitle();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetScrollToTop() {
        final String expected = "true";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getScrollToTop();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetLazyLoading() {
        final String expected = "true";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getLazyLoading();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetWidthifcondition() {
        final String expected = "100%";
        ctx.currentResource(SECOND_EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getWidth();
        assertEquals(expected, actual);
    }
    
    @Test
    final void testGetWidthelsecondition() {
        final String expected = "99%";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getWidth();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetHeight() {
        final String expected = "100";
        ctx.currentResource(EMBED_RESOURCE);
        Embed embed = ctx.request().adaptTo(Embed.class);
        String actual = embed.getHeight();
        assertEquals(expected, actual);
    }
    


}