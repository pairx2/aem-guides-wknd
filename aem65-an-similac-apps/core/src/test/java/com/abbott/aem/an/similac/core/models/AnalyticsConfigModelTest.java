package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
@ExtendWith(MockitoExtension.class)
class AnalyticsConfigModelTest {

	private final AemContext ctx = new AemContext();

	private AnalyticsConfigModel analyticsConfigModel;

	@BeforeEach
	void setUp() {
		ctx.addModelsForClasses(AnalyticsConfigModelTest.class);

	}

	@Test
	void testGetEventLabel() {
		analyticsConfigModel = new AnalyticsConfigModel();
		analyticsConfigModel.setPageName("home");
		analyticsConfigModel.setSectionTitle("Similac Strongmoms awards");
		analyticsConfigModel.setLinkName("Register Now");
		String expected = "home_similac-strongmoms-awards_register-now";
		String actual = analyticsConfigModel.getEventLabel();
		assertNotNull(analyticsConfigModel.getPageName());
		assertNotNull(analyticsConfigModel.getLinkName());
		assertNotNull(analyticsConfigModel.getSectionTitle());
		assertNotNull(actual);
		assertEquals(expected, actual);
	}

	@Test
	void testSectionTitle() {
		analyticsConfigModel = new AnalyticsConfigModel();
		analyticsConfigModel.setSectionTitle("What's the Parental ???");
		assertNotNull(analyticsConfigModel.getSectionTitle());
		String expected = "whats-the-parental";
		String actual = analyticsConfigModel.getEventLabel();
		assertNotNull(actual);
		assertEquals(expected, actual);

	}

	@Test
	void testLinkName() {
		analyticsConfigModel = new AnalyticsConfigModel();
		analyticsConfigModel.setLinkName("Register Now");
		assertNotNull(analyticsConfigModel.getLinkName());
		String expected = "register-now";
		String actual = analyticsConfigModel.getEventLabel();
		assertNotNull(actual);
		assertEquals(expected, actual);
	}

	@Test
	void testPageName() {
		analyticsConfigModel = new AnalyticsConfigModel();
		analyticsConfigModel.setPageName("Similac Products");
		assertNotNull(analyticsConfigModel.getPageName());
		String expected = "similac-products";
		String actual = analyticsConfigModel.getEventLabel();
		assertNotNull(actual);
		assertEquals(expected, actual);

	}

	@Test
	void testPageNameandLink() {
		analyticsConfigModel = new AnalyticsConfigModel();
		analyticsConfigModel.setPageName("Similac Products");
		analyticsConfigModel.setLinkName("Register Now");
		assertNotNull(analyticsConfigModel.getPageName());
		assertNotNull(analyticsConfigModel.getLinkName());
		String expected = "similac-products_register-now";
		String actual = analyticsConfigModel.getEventLabel();
		assertNotNull(actual);
		assertEquals(expected, actual);

	}

	@Test
	void testPageNameandSectionTitle() {
		analyticsConfigModel = new AnalyticsConfigModel();
		analyticsConfigModel.setPageName("Similac Products");
		analyticsConfigModel.setSectionTitle("What's is the parental??");
		assertNotNull(analyticsConfigModel.getPageName());
		assertNotNull(analyticsConfigModel.getSectionTitle());
		String expected = "similac-products_whats-is-the-parental";
		String actual = analyticsConfigModel.getEventLabel();
		assertNotNull(actual);
		assertEquals(expected, actual);

	}

	@Test
	void testSectionTitleandLinkName() {
		analyticsConfigModel = new AnalyticsConfigModel();
		analyticsConfigModel.setLinkName("Read More");
		analyticsConfigModel.setSectionTitle("What’s is the parental??");
		assertNotNull(analyticsConfigModel.getSectionTitle());
		assertNotNull(analyticsConfigModel.getLinkName());
		String expected = "whats-is-the-parental_read-more";
		String actual = analyticsConfigModel.getEventLabel();
		assertNotNull(actual);
		assertEquals(expected, actual);

	}

}
