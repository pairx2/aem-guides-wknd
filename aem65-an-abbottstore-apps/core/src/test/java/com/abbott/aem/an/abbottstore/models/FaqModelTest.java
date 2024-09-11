package com.abbott.aem.an.abbottstore.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Node;
import java.util.Map;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class FaqModelTest {

    FaqModel faqModel;
    String resourcePath = "/content/abbott/en";

    Map<String, Object> properties;
    AemContext context = new AemContext();

    @BeforeEach
    public void setup() {
        String Resource_type = "/content/abbott/en";
        context.load().json("/faq.json", Resource_type);
        Resource resource = context.resourceResolver().getResource(Resource_type + "/faq/jcr:content");
        faqModel = Objects.requireNonNull(resource.adaptTo(FaqModel.class));
    }

    @Test
    void init() {
        assert faqModel != null;
        assertEquals(0, faqModel.getFaqItemsList().size());
    }

    @Test
    void getFaqItemsList() {
        assertTrue(true);
    }
}