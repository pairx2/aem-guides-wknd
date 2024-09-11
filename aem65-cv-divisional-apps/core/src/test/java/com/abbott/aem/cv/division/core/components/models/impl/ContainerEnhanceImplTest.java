package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.ContainerEnhance;
import com.abbott.aem.platform.common.components.models.Container;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class ContainerEnhanceImplTest {

	@InjectMocks
	private ContainerEnhanceImpl model = new ContainerEnhanceImpl();

	@Mock
	private Container container;
	
    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
	private Component component;
    private static final String PATH = "/content/Container";

    @BeforeEach
    public void setUp() {
    	proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(ContainerEnhance.class);
        ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/ContainerEnhanceImplTest.json", "/content");
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getBackgroundMobileImageReference() {
        final String expected = "/content/dam/cv/cardiovascular/usa/patient-pressure-monitoring-smiling-2-headerbanner-1440x450-d.jpg";
        ctx.currentResource(PATH);
        ContainerEnhance container = ctx.request().adaptTo(ContainerEnhance.class);
        String actual = container.getBackgroundMobileImageReference();
        assertEquals(expected, actual);
    }

    @Test
    void getImageDisplayOptions() {
        final String expected = "showAsBackground";
        ctx.currentResource(PATH);
        ContainerEnhance container = ctx.request().adaptTo(ContainerEnhance.class);
        String actual = container.getImageDisplayOptions();
        assertEquals(expected, actual);
    }

	@Test
	public void testGetId() {
		model.getId();
	}

	@Test
	public void testGetData() {
		model.getData();
	}

	@Test
	public void testGetAppliedCssClasses() {
		model.getAppliedCssClasses();
	}

	@Test
	public void testGetExportedType() {
		model.getExportedType();
	}

}

