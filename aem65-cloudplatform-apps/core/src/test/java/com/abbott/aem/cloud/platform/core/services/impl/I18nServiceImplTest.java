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
class I18nServiceImplTest {
    AemContext context = new AemContext();

    @InjectMocks
    private I18nServiceImpl i18nService;

    @Mock
    private TagManager tagManager;

    @Mock
    private ResourceResolver resourceResolver;

    @Mock
    private Tag tag;

    @BeforeEach
    void setUp() {
        context.registerInjectActivateService(i18nService, "i18n.root.path", "/content/cq:tags");

        //mock for getTag
        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(tagManager.resolve("/content/cq:tags/abbot")).thenReturn(tag);

        //mock for getTags
        Iterator<Tag> tags = mock(Iterator.class);
        when(tag.listAllSubTags()).thenReturn(tags);
        when(tags.hasNext()).thenReturn(true, false);
        when(tags.next()).thenReturn(tag);

        when(tag.getPath()).thenReturn("/content/cq:tags");
    }

    @Test
    void testGetTagsJson(){
        when(tag.getName()).thenReturn("en");
        when(tag.getTitle(Locale.ENGLISH)).thenReturn("English Title");

        JsonArray jsonTags = i18nService.getTagsJson("abbot", "en", resourceResolver);
        assertEquals("[{\"path\":\"/content/cq:tags\",\"key\":\"en\",\"value\":\"English Title\"}]", jsonTags.toString());
    }

    @Test
    void testGetTagsJson_whenInvalidLanguage(){
        Map<Locale, String> localizedTagMap = new HashMap<>();
        localizedTagMap.put(Locale.CANADA, "ca");

        when(tag.getName()).thenReturn("ca");
        when(tag.getTitle()).thenReturn("Title");
        when(tag.getLocalizedTitles()).thenReturn(localizedTagMap);

        JsonArray jsonTags = i18nService.getTagsJson("abbot", ".ca", resourceResolver);
        assertEquals("[{\"path\":\"/content/cq:tags\",\"key\":\"ca\",\"value\":\"Title\",\"localizedValues\":{\"en_CA\":\"ca\"}}]", jsonTags.toString());
    }
}
