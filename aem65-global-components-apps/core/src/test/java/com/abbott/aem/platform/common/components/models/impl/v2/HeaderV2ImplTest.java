package com.abbott.aem.platform.common.components.models.impl.v2;
import static org.junit.jupiter.api.Assertions.*;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.SlingHttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;


@ExtendWith(AemContextExtension.class)
class HeaderV2ImplTest {

    private final AemContext ctx = new AemContext();

    @InjectMocks
    private HeaderV2Impl headerV2Impl;

    @Mock
    private SlingHttpServletRequest request;

    @BeforeEach
    void setUp() {
        ctx.addModelsForClasses(HeaderV2Impl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v2/HeaderV2ImplTest.json", "/content");
        headerV2Impl = ctx.request().adaptTo(HeaderV2Impl.class);
        headerV2Impl = new HeaderV2Impl();

    }

    @Test
    void testHeaderV2ImplNotNull() {
        assertNotNull(headerV2Impl, "HeaderV2Impl should not be null");
    }

    @Test
    void testIsHideTopUtilitySection() {
        assertFalse(headerV2Impl.isHideTopUtilitySection(), "Default value should be false");
    }

    @Test
    void testIsHideBottomUtilitySection() {
        assertFalse(headerV2Impl.isHideBottomUtilitySection(), "Default value should be false");
    }

    @Test
    void testIsSticky() {
        assertThrows(UnsupportedOperationException.class, headerV2Impl::getIsSticky, "getIsSticky() should throw UnsupportedOperationException");
    }
    @Test
    void testIsStickyDirectly() {
        assertFalse(headerV2Impl.isSticky(), "Default value should be false");

    }

}

