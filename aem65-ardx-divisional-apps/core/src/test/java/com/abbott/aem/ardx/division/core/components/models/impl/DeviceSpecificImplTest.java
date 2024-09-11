package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.DeviceSpecific;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(AemContextExtension.class)
class DeviceSpecificImplTest {

    private static final String PATH = "/content/devicespecific";
    private final AemContext ctx = new AemContext();
    DeviceSpecific deviceSpecific;

    @BeforeEach
    void setUp() throws Exception {
        ctx.addModelsForClasses(DeviceSpecificImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/DeviceSpecificImplTest.json",
                "/content");
        ctx.currentResource(DeviceSpecificImplTest.PATH);
        deviceSpecific = ctx.request().adaptTo(DeviceSpecific.class);
    }

    @Test
    final void testGetMobile() {
        final String expected = "True";
        String actual = deviceSpecific.getMobile();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetTablet() {
        final String expected = "True";
        String actual = deviceSpecific.getTablet();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetDesktop() {
        final String expected = "True";
        String actual = deviceSpecific.getDesktop();
        assertEquals(expected, actual);
    }
}
