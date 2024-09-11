package com.abbott.aem.bts.cybersecurity.components.model;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.ArrayList;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class ProductCategoriesTest {

	public final AemContext context = new AemContext(ResourceResolverType.JCR_MOCK);


	@InjectMocks
	public String numberOfCardsComponents = "4" ;
	private  ArrayList<Integer> cardList;

	@Test
	void testInit() {
		ProductCategories pg = new ProductCategories();
		pg.numberOfCardsComponents = "4";
		assertNotNull(pg.numberOfCardsComponents);
		pg.init();
	}

	@Test
	void testGetCardList() {
		ProductCategories pg = new ProductCategories();
		pg.numberOfCardsComponents = "4";
		pg.init();
		assertNotNull(pg.getCardList());
	}

	@Test
	void testInitWithNoCards() {
		ProductCategories pg = new ProductCategories();
		pg.init();
		assertNull(pg.numberOfCardsComponents);
	}
}
