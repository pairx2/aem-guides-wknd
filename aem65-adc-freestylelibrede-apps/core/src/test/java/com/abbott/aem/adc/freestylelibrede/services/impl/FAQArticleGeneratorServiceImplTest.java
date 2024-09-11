package com.abbott.aem.adc.freestylelibrede.services.impl;

import com.abbott.aem.adc.freestylelibrede.models.BaseModelTest;
import com.abbott.aem.adc.freestylelibrede.services.FAQArticleGeneratorService;
import com.abbott.aem.adc.freestylelibrede.services.FileReaderService;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.commons.io.IOUtils;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import java.io.IOException;
import java.io.InputStream;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class FAQArticleGeneratorServiceImplTest extends BaseModelTest<FAQArticleGeneratorServiceImpl> {

	private final AemContext context = new AemContext();

	@Mock
	FileReaderService fileReaderService;

	@InjectMocks
	FAQArticleGeneratorService faqArticleGeneratorService = new FAQArticleGeneratorServiceImpl();

	@BeforeEach
	void setup() throws IOException {
		context.load().json("/services/FAQArticleGeneratorService/faq-landing.json",
				"/content/adc/freestylelibrede/de/de/v3/help/faq");
		final String input = readFile();
		Mockito.when(fileReaderService.readTextFile(any(), any())).thenReturn(input);

		faqArticleGeneratorService.generateFromFile(context.resourceResolver());

	}

	@Test
	void generateFromFile() {

		final PageManager pageManager = context.resourceResolver().adaptTo(PageManager.class);

		final Page page = pageManager.getPage(
				"/content/adc/freestylelibrede/de/de/v3/help/faq/sensor/how-big-is-the-sensor--how-deeply-is-it-inserted-");

		Assert.assertNotNull(page);

		Assert.assertEquals("How big is the sensor? How deeply is it inserted?", page.getTitle());
		Assert.assertEquals("/conf/adc/freestylelibrede/settings/wcm/templates/article",
				page.getProperties().get("cq:template", String.class));
	}

	@Test
	void dontGenerateFromFileIfNoParent() {
		Assert.assertNull(context.resourceResolver().getResource(
				"/content/adc/freestylelibrede/de/de/v3/help/faq/lesegeraet/what-happens-if-the-reader-runs-out-of-power--do-i-lose-glucose-"));
	}

	private String readFile() throws IOException {

		InputStream is = null;
		try {
			is = this.getClass().getResourceAsStream("/services/FAQArticleGeneratorService/faq-input.json");
			return IOUtils.toString(is, "UTF-8");
		} catch (Exception e) {
			if (is != null) {
				is.close();
			}
		}
		return null;

	}

}