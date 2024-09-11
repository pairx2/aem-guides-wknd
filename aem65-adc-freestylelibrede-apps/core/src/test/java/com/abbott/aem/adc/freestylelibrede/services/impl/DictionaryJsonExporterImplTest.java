package com.abbott.aem.adc.freestylelibrede.services.impl;


import com.adobe.granite.i18n.LocaleUtil;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class DictionaryJsonExporterImplTest {

    private AemContext context = new AemContext();

    @Mock
    SlingHttpServletRequest request;

    final StringWriter writer = new StringWriter();

    String i18nRootPath;

    DictionaryJsonExporterImpl dictionaryJsonExporter = new DictionaryJsonExporterImpl();
    @Mock
    DictionaryJsonExporterImpl.Configuration configuration;

    @BeforeEach
    void setup() throws IOException {
        Mockito.when(configuration.i18n_tags_root_path()).thenReturn("/content/cq:tags/i18n/freestylelibre");
        dictionaryJsonExporter.init(configuration);
    }

    @Test
    void createJson() throws IOException {

        String path ="/content/cq:tags/i18n";
        Resource rootRes = context.load().json("/com.abbott.aem.adc.freestylelibrede.services.impl.DictionaryJsonExporterImpl.json", path);
        Resource resource  = rootRes.getChild("freestylelibre");
        context.currentResource(resource);
        Mockito.when(request.getResourceResolver()).thenReturn(context.currentResource().getResourceResolver());
        String localeString = "de";
        Locale locale = LocaleUtil.parseLocale(localeString);
        byte[] bytes = dictionaryJsonExporter.createJson(request,locale);
        Assert.assertEquals("{\"magento_error_code4321\":\"Der Artikel\",\"return_warning\":\"Wir können\"}", new String(bytes, StandardCharsets.UTF_8));

    }

    /*
    @Test
    void createJson() throws IOException {

        final ResourceBundle resourceBundle = new PropertyResourceBundle(this.getClass().getResourceAsStream("/de_DE.properties"));

        new DictionaryJsonExporterImpl().createJson(resourceBundle, writer);

        Assert.assertEquals("{\"test\":\"true\"}", writer.toString());

    }

    @Test
    void createJsonBytes() throws IOException {

        final ResourceBundle resourceBundle = new PropertyResourceBundle(this.getClass().getResourceAsStream("/de_DE.properties"));

        byte[] bytes = new DictionaryJsonExporterImpl().createJson(resourceBundle);

        Assert.assertEquals("{\"test\":\"true\"}", new String(bytes, StandardCharsets.UTF_8));

    }

    @Test
    void writeJson() throws IOException {

        JsonWriter jsonWriter = new JsonWriter(writer);

        String[] array = new String[]{"a","b","c"};

        new DictionaryJsonExporterImpl().writeJson(jsonWriter, array);

        Assert.assertEquals("[\"a\",\"b\",\"c\"]",writer.toString());
    }*/

}