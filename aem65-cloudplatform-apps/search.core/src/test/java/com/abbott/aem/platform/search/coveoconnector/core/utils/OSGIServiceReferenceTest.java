package com.abbott.aem.platform.search.coveoconnector.core.utils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.resourcebuilder.api.ResourceBuilderFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.osgi.framework.FrameworkUtil;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class, AemContextExtension.class})
class OSGIServiceReferenceTest {

    @InjectMocks
    OSGIServiceReference osgiServiceReference;

    AemContext context = new AemContext();

    @Test
    void testObjectToString(){
        assertTrue(osgiServiceReference.toString().contains("OSGIServiceReference"));
    }

    @Test
    void testGetOsgiServiceReference() {
        MockedStatic<FrameworkUtil> mockedStatic = mockStatic(FrameworkUtil.class);
        when(FrameworkUtil.getBundle(ResourceBuilderFactory.class)).thenReturn(context.bundleContext().getBundle());

        ResourceBuilderFactory factoryObject = (ResourceBuilderFactory) OSGIServiceReference.getOsgiServiceReference(ResourceBuilderFactory.class);
        assertNotNull(factoryObject);
        mockedStatic.close();
    }
}
