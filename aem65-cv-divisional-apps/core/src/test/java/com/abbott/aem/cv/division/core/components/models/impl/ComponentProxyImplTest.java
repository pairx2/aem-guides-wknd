package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.platform.common.components.models.ComponentProxy;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

@ExtendWith(AemContextExtension.class)
class ComponentProxyImplTest {

	@InjectMocks
	private ComponentProxyImpl model = new ComponentProxyImpl();

	@Mock
	private ComponentProxy componentProxy;
	
    private final AemContext ctx = new AemContext();

    @BeforeEach
    public void setUp() {
        ctx.addModelsForClasses(ComponentProxy.class);
        MockitoAnnotations.initMocks(this);
    }

    @Test
	public void testGetLinkProxyPath() {
		model.getLinkProxyPath();
	}
    
    @Test
	public void testGetLinkstackProxyPath() {
		model.getLinkstackProxyPath();
	}
    
    @Test
	public void testGetLogoProxyPath() {
		model.getLogoProxyPath();
	}
    
    @Test
	public void testGetSocialmediaProxyPath() {
		model.getSocialmediaProxyPath();
	}
    
    @Test
	public void testGetDownloadProxyPath() {
		model.getDownloadProxyPath();
	}
    
    @Test
	public void testGetNonClickableLinkProxyPath() {
		model.getNonClickableLinkProxyPath();
	}
    
    @Test
	public void testGetChipProxyPath() {
		model.getChipProxyPath();
	}
    
    @Test
	public void testGetTitleProxyPath() {
		model.getTitleProxyPath();
	}
    
    @Test
	public void testGetTextProxyPath() {
		model.getTextProxyPath();
	}
    
    @Test
	public void testGetButtonProxyPath() {
		model.getButtonProxyPath();
	}
    
    @Test
	public void testGetTileProxyPath() {
		model.getTileProxyPath();
	}
    
    @Test
	public void testGetHeadersearchProxyPath() {
		model.getHeadersearchProxyPath();
	}
    
    @Test
	public void testGetBadgeProxyPath() {
		model.getBadgeProxyPath();
	}
    
    @Test
	public void testGetImageProxyPath() {
		model.getImageProxyPath();
	}
    
    @Test
	public void testGetCustomtextlistProxyPath() {
		model.getCustomtextlistProxyPath();
	}
    
    @Test
	public void testGetVideoProxyPath() {
		model.getVideoProxyPath();
	}
    
    @Test
	public void testGetSearchbarProxyPath() {
		model.getSearchbarProxyPath();
	}
    
    @Test
	public void testGetChipslistProxyPath() {
		model.getChipslistProxyPath();
	}
    
    @Test
	public void testGetTabsearchProxyPath() {
		model.getTabsearchProxyPath();
	}
    
    @Test
	public void testGetSearchfacetProxyPath() {
		model.getSearchfacetProxyPath();
	}
    
    @Test
	public void testGetCardcarouselProxyPath() {
		model.getCardcarouselProxyPath();
	}
    
    @Test
	public void testGetTilelistProxyPath() {
		model.getTilelistProxyPath();
	}
    
    @Test
	public void testGetTermssectionProxyPath() {
		model.getTermssectionProxyPath();
	}
    
    @Test
	public void testGetLanguageNavigationProxyPath() {
		model.getLanguageNavigationProxyPath();
	}
    
    @Test
	public void testGetMegamenuProxyPath() {
		model.getMegamenuProxyPath();
	}
    
    @Test
	public void testGetPoiLocatorSearchBarProxyPath() {
		model.getPoiLocatorSearchBarProxyPath();
	}
    
    @Test
	public void testGetPoiLocatorResultProxyPath() {
		model.getPoiLocatorResultProxyPath();
	}
    
    @Test
	public void testGetPinIconPopUpProxyPath() {
		model.getPinIconPopUpProxyPath();
	}
    
    @Test
	public void testGetContentFragmentListProxyPath() {
		model.getContentFragmentListProxyPath();
	}
    
    @Test
	public void testGetOptionProxyPath() {
		model.getOptionProxyPath();
	}
    
    @Test
	public void testGetTooltipsProxyPath() {
		model.getTooltipsProxyPath();
	}
    
    @Test
	public void testGetContainerProxyPath() {
		model.getContainerProxyPath();
	}
    
    @Test
	public void testGetHeaderV2SectionProxyPath() {
		model.getHeaderV2SectionProxyPath();
	}
    
    @Test
	public void testGetiIconCtaProxyPath() {
		model.getIconCtaProxyPath();
	}

}

