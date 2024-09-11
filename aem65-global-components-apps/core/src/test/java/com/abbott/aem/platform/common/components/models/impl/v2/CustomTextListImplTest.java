package com.abbott.aem.platform.common.components.models.impl.v2;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;


@ExtendWith(AemContextExtension.class)
class CustomTextListImplTest {

    private final AemContext ctx = new AemContext();
    private CustomTextListImpl customTextList;


    @BeforeEach
    void setUp() {
        ctx.addModelsForClasses(LinkStackImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v2/CustomTextListImplTest.json", "/content");
        customTextList = new CustomTextListImpl();
    }

    @Test
    void testGetIconSize() {
        Assertions.assertNotEquals("null", customTextList.getIconSize());
    }

}
