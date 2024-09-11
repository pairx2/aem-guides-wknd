package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.PPCConfig;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(AemContextExtension.class)
class PPCConfigImplTest {

    private final AemContext ctx = new AemContext();
    private final String PPCCONFIG_RESOURCE = "/content/ppcconfig";

    @Mock
    ValueMap map;

    @BeforeEach
    void setUp() throws Exception {
        map = Mockito.mock(ValueMap.class);
        ctx.addModelsForClasses(PPCConfigImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/PPCConfigImplTest.json", "/content");
    }

    @Test
    final void testGetCssClassName() {
        final List<String> expected = Arrays.asList("class-name");
        ctx.currentResource(PPCCONFIG_RESOURCE);
        PPCConfig ppcconfig = ctx.request().adaptTo(PPCConfig.class);
        when(map.containsKey("cssClassName")).thenReturn(true);
        when(map.get("cssClassName", String.class)).thenReturn("class-name");
        when(PlatformUtil.getPropertyValue(map, "cssClassName")).thenReturn("class-name");
        List<String> actual = ppcconfig.getCssClassNames();
        assertEquals(expected, actual);
    }

    @Test
    final void testGetElementIdName() {
        final List<String> expected = Arrays.asList("id-name");
        ctx.currentResource(PPCCONFIG_RESOURCE);
        PPCConfig ppcconfig = ctx.request().adaptTo(PPCConfig.class);
        when(map.containsKey("elementIdName")).thenReturn(true);
        when(map.get("elementIdName", String.class)).thenReturn("id-name");
        when(PlatformUtil.getPropertyValue(map, "elementIdName")).thenReturn("id-name");
        List<String> actual = ppcconfig.getElementIdNames();
        assertEquals(expected, actual);
    }

}
