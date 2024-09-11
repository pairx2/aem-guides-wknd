package com.abbott.aem.cloud.platform.core.services;

import com.adobe.cq.xf.ExperienceFragmentVariation;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ExperienceFragmentTargetRewriterTest {

    @InjectMocks
    private ExperienceFragmentTargetRewriter rewriter;

    private final AemContext context = new AemContext();

    @BeforeEach
    public void setUp() {
        context.registerInjectActivateService(rewriter, "strip.paths", new String[]{"test"});
    }

    @Test
    void testRewriteLinkWithNonEmptyStripPaths() {
        // Test a link with non-empty stripPaths
        String link = "https://abbott.com/test";
        String rewrittenLink = rewriter.rewriteLink(link, "tag", "attribute");

        // The link should not be modified as stripPaths is empty
        assertEquals("https://abbott.com/", rewrittenLink);
    }

    @Test
    void testRewriteLinkWithEmptyStripPaths() {
        context.registerInjectActivateService(rewriter, "strip.paths", new String[]{});
        // Test a link with empty stripPaths
        String link = "https://abbott.com/test";
        String rewrittenLink = rewriter.rewriteLink(link, "tag", "attribute");

        // The link should have the specified path stripped
        assertEquals(link, rewrittenLink);
    }

    @Test
    void testRewriteLinkWithBlankLink() {
        // Test a blank link
        String link = "";
        String rewrittenLink = rewriter.rewriteLink(link, "tag", "attribute");

        // The blank link should remain blank
        assertEquals(link, rewrittenLink);
    }

    @Test
    void testShouldRewrite() {
        ExperienceFragmentVariation variation = Mockito.mock(ExperienceFragmentVariation.class);

        // The shouldRewrite method always returns true
        assertTrue(rewriter.shouldRewrite(variation));
    }

    @Test
    void testGetPriority() {
        // The getPriority method always returns 0
        assertEquals(0, rewriter.getPriority());
    }
}
