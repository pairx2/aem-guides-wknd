package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.CtaSectionEnhance;
import com.abbott.aem.platform.common.components.models.CtaSection;
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
class CtaSectionEnhanceImplTest {

	@InjectMocks
	private CtaSectionEnhanceImpl model = new CtaSectionEnhanceImpl();

	@Mock
	private CtaSection ctaSection;
	
    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
	private Component component;
    private static final String PATH = "/content/Ctasection";

    @BeforeEach
    public void setUp() {
    	proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(CtaSectionEnhance.class);
        ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/CtaSectionEnhanceImplTest.json", "/content");
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getIcon() {
        final String expected = "abt-icon abt-icon-globe";
        ctx.currentResource(PATH);
        CtaSectionEnhance ctasection = ctx.request().adaptTo(CtaSectionEnhance.class);
        String actual = ctasection.getIcon();
        assertEquals(expected, actual);
    }

    @Test
    void getIconColor() {
        final String expected = " magenta";
        ctx.currentResource(PATH);
        CtaSectionEnhance ctasection = ctx.request().adaptTo(CtaSectionEnhance.class);
        String actual = ctasection.getIconColor();
        assertEquals(expected, actual);
    }

    @Test
	public void testGetTitle() {
		model.getTitle();
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
	
	@Test
	public void testGetSubTitle() {
		model.getSubTitle();
	}
	
	@Test
	public void testGetDescription() {
		model.getDescription();
	}
	
	@Test
	public void testGetButtonCount() {
		model.getButtonCount();
	}
	
	@Test
	public void testGetBackgroundColor() {
		model.getBackgroundColor();
	}
	
	@Test
	public void testGetListOfButtons() {
		model.getListOfButtons();
	}

}

