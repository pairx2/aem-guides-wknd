package com.abbott.aem.platform.common.components.models.impl.v1;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(AemContextExtension.class)
class SortFilterTest {

    private final AemContext context = new AemContext();
    private SortFilter sortFilter;

    @BeforeEach
    public void setUp() {
        context.create().resource("/content/sortFilter",
                "fieldName", "testField",
                "fieldValue", "testValue");
        Resource resource = context.resourceResolver().getResource("/content/sortFilter");
        assertNotNull(resource, "Resource should not be null");
        sortFilter = resource.adaptTo(SortFilter.class);
        assertNotNull(sortFilter, "sortFilter adaptation should not be null");
    }

    @Test
    void testFieldName() {
        assertEquals("testField", sortFilter.getFieldName());
    }

    @Test
    void testFieldValue() {
        assertEquals("testValue", sortFilter.getFieldValue());
    }
}
