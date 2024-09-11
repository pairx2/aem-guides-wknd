package com.abbott.aem.platform.common.components.models.impl.v2;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;


@ExtendWith(AemContextExtension.class)
class SearchResultItemListImplTest {
    private final AemContext ctx = new AemContext();
    private SearchResultItemListImpl searchResultItemListImpl;


    @BeforeEach
    void setUp() {
        ctx.addModelsForClasses(SearchResultItemImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v2/SearchResultItemListImpl.json", "/content");
        searchResultItemListImpl = new SearchResultItemListImpl();
    }

    @Test
    void testResultKey() {
        Assertions.assertNotEquals("null", searchResultItemListImpl.getResultKey());
    }

    @Test
    void testResultLabel() {
        Assertions.assertNotEquals("null", searchResultItemListImpl.getResultLabel());
    }

    @Test
    void testSelectType() {
        Assertions.assertNotEquals("null", searchResultItemListImpl.getSelectType());
    }

    @Test
    void testUrlLink() {
        Assertions.assertNotEquals("null", searchResultItemListImpl.getUrlLink());
    }
}

