package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.Spacer;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class SpacerImplTest {

    private final AemContext ctx = new AemContext();

    @BeforeEach
    void setUp() throws Exception {
        ctx.addModelsForClasses(SpacerImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/SpacerImplTest.json", "/content");
    }

    @Test
    void testGetDesktopPixels() {
        final String expected = "500";
        ctx.currentResource("/content/spacer");
        Spacer spacer = ctx.request().adaptTo(Spacer.class);
        String actual = spacer.getDesktopPixels();
        assertEquals(expected, actual);
    }

    @Test
    void testGetTabletPixels() {
        final String expected = "300";
        ctx.currentResource("/content/spacer");
        Spacer spacer = ctx.request().adaptTo(Spacer.class);
        String actual = spacer.getTabletPixels();
        assertEquals(expected, actual);
    }

    @Test
    void testGetMobilePixels() {
        final String expected = "200";
        ctx.currentResource("/content/spacer");
        Spacer spacer = ctx.request().adaptTo(Spacer.class);
        String actual = spacer.getMobilePixels();
        assertEquals(expected, actual);
    }

}