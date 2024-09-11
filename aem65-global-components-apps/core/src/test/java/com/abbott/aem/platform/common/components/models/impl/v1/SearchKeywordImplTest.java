package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.SearchKeyword;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(AemContextExtension.class)
class SearchKeywordImplTest {

    private final AemContext context = new AemContext();

    private SearchKeyword searchKeyword;

    @BeforeEach
    public void setUp() {
        context.create().resource("/content/searchkeyword",
                "searchKeyword", "testSearchKeyword");
        Resource resource = context.resourceResolver().getResource("/content/searchkeyword");
        assertNotNull(resource, "Resource should not be null");
        searchKeyword = resource.adaptTo(SearchKeyword.class);
    }

    @Test
    void testSearchKeyword() {
        assertEquals("testSearchKeyword", searchKeyword.getSearchKeyword());
    }

}
