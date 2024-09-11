package com.abbott.aem.adc.freestylelibrede.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.ArgumentMatchers.any;
import org.apache.sling.models.spi.Injector;

import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class})
public class NavigationMenuV2ModelTest  extends BaseModelTest<NavigationMenuV2Model> {
    
	@InjectMocks
	private NavigationMenuV2Model model;

    @InjectMocks
	ExternalizeInjector externalizeInjector = new ExternalizeInjector();

    @Mock
	ExternalizerService externalizerService;

	@InjectMocks
    private ExternalizeInjector injector = new ExternalizeInjector();

    @BeforeEach
	void setup() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("/content/adc/freestylelibrede/de/de/v3/homepage");
		context.registerService(Injector.class, injector);
		context.registerService(ExternalizerService.class, externalizerService);
		model = loadModel(NavigationMenuV2Model.class);
	}

	@Test
	public void getHomepagePath() {
		Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/homepage", model.getHomepagePath());
	}

	@Test
	public void getHomepagePathLabel() {
		Assert.assertEquals("Homepage", model.getHomepagePathLabel());
	}

	@Test
	public void getCloseIconText() {
		Assert.assertEquals("Close", model.getCloseIconText());
	}

    @Test
	public void getMenuItemTitle() {
		Assert.assertEquals("Rezept Einreichen", model.getMenuItems().get(0).getTitle());
	}

	@Test
	public void getMenuItemId() {
		Assert.assertEquals("123456", model.getMenuItems().get(0).getMenuItemId());
	}

	@Test
	public void getNavItemLinkEvent() {
		Assert.assertEquals("navItemLinkEvent", model.getMenuItems().get(0).getNavItemLinkEvent());
	}

	@Test
	public void getSubMenuItemTitle() {
		Assert.assertEquals("Rezept Einreichen", model.getMenuItems().get(0).getSubMenuItems().get(0).getTitle());
	}

	@Test
	public void getSubMenuItemDescription() {
		Assert.assertEquals("Rezept einreichen und Bestellung aufgeben", model.getMenuItems().get(0).getSubMenuItems().get(0).getDescription());
	}

	@Test
	public void getSubMenuItemIconPath() {
		Assert.assertEquals("/content/dam/adc/freestylelibrede/de/de/fsl3/images/header/Rezept einreichen@3x.png", model.getMenuItems().get(0).getSubMenuItems().get(0).getIconPath());
	}

	@Test
	public void getSubMenuItemLink() {
		Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/homepage", model.getMenuItems().get(0).getSubMenuItems().get(0).getLink());
	}

	@Test
	public void getSubMenuItemLinkAction() {
		Assert.assertEquals("_blank", model.getMenuItems().get(0).getSubMenuItems().get(0).getLinkAction());
	}

	@Test
	public void getSubNavItemLinkEvent() {
		Assert.assertEquals("subNavItemLinkEvent", model.getMenuItems().get(0).getSubMenuItems().get(0).getSubNavItemLinkEvent());
	}

	@Test
	public void getMenuButtonText() {
		Assert.assertEquals("Button 1", model.getMenuButtons().get(0).getText());
	}

	@Test
	public void getMenuButtonAction() {
		Assert.assertEquals("_self", model.getMenuButtons().get(0).getAction());
	}

	@Test
	public void getMenuButtonType() {
		Assert.assertEquals("primary", model.getMenuButtons().get(0).getType());
	}
	
}
