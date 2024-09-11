package com.abbott.aem.platform.common.components.models.impl.v1;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(AemContextExtension.class)
class SearchFilterTest {

    private final AemContext context = new AemContext();
    private SearchFilter searchFilter;

    @BeforeEach
    public void setUp() {
        context.create().resource("/content/searchfilter",
                "fieldName", "testField",
                "fieldValue", "testValue");
        Resource resource = context.resourceResolver().getResource("/content/searchfilter");
        assertNotNull(resource, "Resource should not be null");
        searchFilter = resource.adaptTo(SearchFilter.class);
        assertNotNull(searchFilter, "SearchFilter adaptation should not be null");
    }

    @Test
    void testFieldName() {
        assertEquals("testField", searchFilter.getFieldName());
    }

    @Test
    void testFieldValue() {
        assertEquals("testValue", searchFilter.getFieldValue());
    }
}