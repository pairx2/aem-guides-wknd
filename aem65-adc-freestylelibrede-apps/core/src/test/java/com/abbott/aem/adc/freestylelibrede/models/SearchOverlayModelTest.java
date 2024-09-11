package com.abbott.aem.adc.freestylelibrede.models;

import static org.mockito.ArgumentMatchers.any;

import org.apache.sling.models.spi.Injector;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class})
public class SearchOverlayModelTest  extends BaseModelTest<SearchOverlayModel> {
    

    @Mock
	ExternalizerService externalizerService;

	@InjectMocks
    private ExternalizeInjector injector = new ExternalizeInjector();

	private final AemContext context = new AemContext();

	@InjectMocks
	private SearchOverlayModel model;

    @BeforeEach
	void setup() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("www.freestylelibre.de/page");
		context.registerService(Injector.class, injector);
		context.registerService(ExternalizerService.class, externalizerService);
		model = loadModel(SearchOverlayModel.class);
	}

	@Test
	public void getResultPage() {
		Assert.assertEquals("www.freestylelibre.de/page", model.getResultPage());
	}

	@Test
	public void getFaqPagePath() {
		Assert.assertEquals("www.freestylelibre.de/page", model.getFaqPagePath());
	}

    @Test
	public void getShowAllStyle() {
		Assert.assertEquals("primary", model.getShowAllStyle());
	}

	@Test
	public void ean () {
		Assert.assertEquals(3, model.getNrOfResults());
	}

	@Test
	public void nrOfViewMore() {
		Assert.assertEquals(3, model.getNrOfViewMore());
	}

	@Test
	public void getSearchNrOfResults(){
		Assert.assertEquals(10, model.getSearchNrOfResults());
	}

	@Test
	public void getSearchNrOfViewMore(){
		Assert.assertEquals(10, model.getSearchNrOfViewMore());
	}

	@Test
	public void getTopFaqLabel(){
		Assert.assertEquals("topFaqLabel", model.getTopFaqLabel());
	}

	@Test
	public void getDescription(){
		Assert.assertEquals("Überprüfen Sie den Status Ihrer Bestellungen und Lieferungen", model.getSearchDefaultList().get(0).getDescription());
	}

	@Test
	public void geUrl(){
		Assert.assertEquals("/mein-konto/kundenkonto", model.getSearchDefaultList().get(0).getUrl());
	}

	@Test
	public void getTitle(){
		Assert.assertEquals("Bestell- und Lieferstatus", model.getSearchDefaultList().get(0).getTitle());
	}

	@Test
	public void getRendition(){
		Assert.assertEquals("v2-rendition", model.getRendition());
	}	

	@Test
	public void getNoResultDescription(){
		Assert.assertEquals("Leider konnten wir zu Ihrer Anfrage nichts Passendes finden. Bitte versuchen Sie es mit einem anderen Suchbegriff oder besuchen alternativ unseren Bereich für Häufige Fragen (FAQ).", model.getNoResultDescription());
	}

	@Test
	public void getSysSourceType(){
		Assert.assertEquals("Zendesk", model.getSysSourceType());
	}

	@Test
	public void getNoResultBtnLink(){
		Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/hilfe/haeufige-fragen", model.getNoResultBtnLink());
	}
}