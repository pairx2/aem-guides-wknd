package com.abbott.aem.bts.cybersecurity.components.model.impl;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.bts.cybersecurity.components.model.ArcherProp;
import com.abbott.aem.bts.cybersecurity.components.model.impl.ArcherPropImpl;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;


@ExtendWith(AemContextExtension.class)
class ArcherPropImplTest {

	private final AemContext ctx = new AemContext();
	
	private final AemContext ctx1 = new AemContext();

	@BeforeEach
	public void setUp() {
		ctx.addModelsForClasses(ArcherPropImpl.class);
		ctx.load().json("/com/abbott/aem/bts/cybersecurity/components/model/impl/ArcherPropImplTest.json", "/content/dam/bts/cybersecurity/us/en");
		ctx.currentResource("/content/dam/bts/cybersecurity/us/en");
		ctx.resourceResolver();
		
		ctx1.addModelsForClasses(ArcherPropImpl.class);
		ctx1.load().json("/com/abbott/aem/bts/cybersecurity/components/model/impl/emptyContent.json", "/content/dam/bts/cybersecurity/us/en");
		ctx1.currentResource("/content/dam/bts/cybersecurity/us/en");
	}

	@Test
	void testInitModel() {
		ArcherProp archerProp =ctx.request().adaptTo(ArcherProp.class);
		assertNotNull(archerProp.getProductTypes());
		assertNotNull(archerProp.getCategories());
	}

	@Test
	void testInitProductResource() {
		ArcherProp archerProp =ctx1.request().adaptTo(ArcherProp.class);
		assertNull(archerProp.getProductTypes());
	}
}
