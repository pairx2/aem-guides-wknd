package com.abbott.aem.cloud.platform.core.services.impl;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.google.gson.JsonArray;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
@MockitoSettings(strictness = Strictness.LENIENT)
class TagExporterServiceImplTest {
    AemContext context = new AemContext();

    @InjectMocks
    private TagExporterServiceImpl tagExporterService;


    @Mock
    private TagManager tagManager;

    @Mock
    private ResourceResolver resourceResolver;

    @BeforeEach
    void setUp() {
        context.registerInjectActivateService(tagExporterService, "getTagsRootPath", "/content/cq:tags");
        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
    }

    @Test
    void testGetTagPath() {
        String requestPath = "/content/cq:tags/test";
        String requestSelectorString = "";

        String tagPath = tagExporterService.getTagPath(requestPath, requestSelectorString);

        assertEquals(requestPath, tagPath);
    }

    @Test
    void testGetTagPath_partialMatchingPath() {
        String requestPath = "/content/abbott/test.sample.html";
        String requestSelectorString = ".sample.html";

        String tagPath = tagExporterService.getTagPath(requestPath, requestSelectorString);

        assertEquals("/content/cq:tags/content/abbott/tes", tagPath);
    }

    @Test
    void testGetTagPath_nonMatchingPath() {
        String requestPath = "/abbott";
        String requestSelectorString = ".sample.html";

        String tagPath = tagExporterService.getTagPath(requestPath, requestSelectorString);

        assertEquals("/content/cq:tags/abbott", tagPath);
    }

    @Test
    void testGetAllTags() {
        String tagPath = "/content/sample/tag";
        String[] requestSelectors = { "en", "fr" };

        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        Tag tag = mock(Tag.class);
        when(tagManager.resolve(tagPath)).thenReturn(tag);

        //mock for getApplicationMap
        Iterator<Tag> tags = mock(Iterator.class);
        when(tag.listAllSubTags()).thenReturn(tags);
        when(tags.hasNext()).thenReturn(true, false);
        when(tags.next()).thenReturn(tag);

        when(tag.getName()).thenReturn("tag1");
        when(tag.getTitle()).thenReturn("Tag Title");
        when(tag.getPath()).thenReturn("/content/cq:tags");

        //mock for getGlobalMap
        Tag globalTag = mock(Tag.class);
        Iterator<Tag> globalTagIterator = mock(Iterator.class);
        when(tagManager.resolve("/content/cq:tags/i18n/global")).thenReturn(globalTag);
        when(globalTag.listAllSubTags()).thenReturn(globalTagIterator);
        when(globalTagIterator.hasNext()).thenReturn(true, false);
        when(globalTagIterator.next()).thenReturn(globalTag);
        when(globalTag.getName()).thenReturn("global-tag");
        when(globalTag.getPath()).thenReturn("/content/cq:tags/abbot");

        JsonArray jsonTags = tagExporterService.getAllTags(tagPath, requestSelectors, resourceResolver);
        assertEquals("[{\"path\":\"\",\"key\":\"tag1\",\"value\":null},{\"path\":\"/abbot\",\"key\":\"global-tag\",\"value\":null}]", jsonTags.toString());
    }


    @Test
    void testGetAllTags_defaultLang() {
        String tagPath = "/content/sample/tag";
        String[] requestSelectors = { "en", "" };
        Map<Locale, String> localizedTag = new HashMap<>();
        localizedTag.put(Locale.CANADA, "ca");

        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        Tag tag = mock(Tag.class);
        when(tagManager.resolve(tagPath)).thenReturn(tag);
        when(tag.getLocalizedTitles()).thenReturn(localizedTag);

        //mock for getApplicationMap
        Iterator<Tag> tags = mock(Iterator.class);
        when(tag.listAllSubTags()).thenReturn(tags);
        when(tags.hasNext()).thenReturn(true, false);
        when(tags.next()).thenReturn(tag);

        when(tag.getName()).thenReturn("tag1");
        when(tag.getTitle()).thenReturn("Tag Title");
        when(tag.getPath()).thenReturn("/content/cq:tags");

        //mock for getGlobalMap
        Tag globalTag = mock(Tag.class);
        Iterator<Tag> globalTagIterator = mock(Iterator.class);
        when(tagManager.resolve("/content/cq:tags/i18n/global")).thenReturn(globalTag);
        when(globalTag.listAllSubTags()).thenReturn(globalTagIterator);
        when(globalTagIterator.hasNext()).thenReturn(true, false);
        when(globalTagIterator.next()).thenReturn(globalTag);
        when(globalTag.getName()).thenReturn("global-tag");
        when(globalTag.getPath()).thenReturn("/content/cq:tags/abbot");

        JsonArray jsonTags = tagExporterService.getAllTags(tagPath, requestSelectors, resourceResolver);
        assertEquals("[{\"path\":\"\",\"key\":\"tag1\",\"value\":\"Tag Title\",\"localizedValues\":{\"en_CA\":\"ca\"}},{\"path\":\"/abbot\",\"key\":\"global-tag\",\"value\":null}]", jsonTags.toString());
    }

}
