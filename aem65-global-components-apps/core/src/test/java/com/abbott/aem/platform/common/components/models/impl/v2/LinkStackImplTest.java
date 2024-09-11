package com.abbott.aem.platform.common.components.models.impl.v2;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(AemContextExtension.class)
class LinkStackImplTest {

    private final AemContext ctx = new AemContext();
    private LinkStackImpl linkStack;


    @BeforeEach
    void setUp() {
        ctx.addModelsForClasses(LinkStackImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v2/LinkStackImplTest.json", "/content");
        linkStack = new LinkStackImpl();
    }

    @Test
    void testGetEnableButton() {
        Assertions.assertNotEquals("null", linkStack.getEnableButton());
    }

    @Test
    void testEnableStickyList() {
        Assertions.assertNotEquals("null", linkStack.getEnableStickyList());
    }


}
