
package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.InputStream;

import javax.jcr.Binary;
import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.commons.io.IOUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class DisruptorModelTest {
	
	private static final String TEST_IMAGE_PATH = "/content/dam/abbott/abbott-home/AS-STO-BAN-HERO-375x240.jpg";

	@InjectMocks
	private DisruptorModel disruptorModel;

	@BeforeEach
	public void setup(AemContext context) throws PathNotFoundException, RepositoryException {

		Resource disruptorResource = context.create().resource(
				"/content/experience-fragments/an/similac/global/en/product-disruptor-fragment/master/jcr:content/root/disruptor",
				"drawerText", "Join Similac® StrongMoms® to receive exclusive benefits!", 
				"disruptorTitle", "When you sign up for Similac® StrongMoms® Rewards, you’ll receive up to $400* in benefits and support throughout your journey.",
				"altText", "similac", 
				"ctaLabel", "sign up", 
				"termsText", "* Offers may vary. † Submit registration to read details.", 
				"ctaURL", "#", 
				"imagePathTab", TEST_IMAGE_PATH, 
				"imagePathMob", TEST_IMAGE_PATH, 
				"imagePath", TEST_IMAGE_PATH);

		context.addModelsForClasses(DisruptorModel.class);
		Session mockSession = mock(Session.class);
		context.registerAdapter(ResourceResolver.class, Session.class, mockSession);
		context.currentResource(disruptorResource);
		// Mocks for static method SimilacResourceUtils.getBase64Image(..)
		Node node = mock(Node.class);
		Property prty = mock(Property.class);
		Binary binary = mock(Binary.class);
		InputStream ip = IOUtils.toInputStream("/content/product/baby-formula.png");
		when(mockSession.getNode(any())).thenReturn(node);
		when(node.getProperty("jcr:data")).thenReturn(prty);
		when(prty.getBinary()).thenReturn(binary);
		when(binary.getStream()).thenReturn(ip);
		disruptorModel = context.request().adaptTo(DisruptorModel.class);

	}

	@Test
	void testGetImagePath() {
		String imagePath = disruptorModel.getImagePath();
		assertNotNull(imagePath);
		assertEquals(TEST_IMAGE_PATH, imagePath);
	}

	@Test
	void testGetDisruptorTitle() {
		String disruptorTitle = disruptorModel.getDisruptorTitle();
		assertNotNull(disruptorTitle);
		assertEquals(
				"When you sign up for Similac® StrongMoms® Rewards, you’ll receive up to $400* in benefits and support throughout your journey.",
				disruptorTitle);
	}

	@Test
	void testGetAltText() {
		String altText = disruptorModel.getAltText();
		assertNotNull(altText);
		assertEquals("similac", altText);
	}

	@Test
	void testGetCtaLabel() {
		String ctaLabel = disruptorModel.getCtaLabel();
		assertNotNull(ctaLabel);
		assertEquals("sign up", ctaLabel);
	}

	@Test
	void testGetCtaURL() {
		
		String ctaURL = disruptorModel.getCtaURL();
		assertNotNull(ctaURL);
		assertEquals("#", ctaURL);
	}

	@Test
	void testGetDrawerText() {
		String drawerText = disruptorModel.getDrawerText();
		assertNotNull(drawerText);
		assertEquals("Join Similac® StrongMoms® to receive exclusive benefits!", drawerText);
	}

	@Test
	void testGetImagePathMob() {
		
		String imagePathMob = disruptorModel.getImagePathMob();
		assertNotNull(imagePathMob);
		assertEquals(TEST_IMAGE_PATH, imagePathMob);
	}

	@Test
	void testGetImagePathTab() {
		
		String imagePathTab = disruptorModel.getImagePathTab();
		assertNotNull(imagePathTab);
		assertNotNull(disruptorModel.getImageBase());
		assertEquals(TEST_IMAGE_PATH, imagePathTab);
	}

	@Test
	void testgetTermsText() {
		String termsText = disruptorModel.getTermsText();
		assertNotNull(termsText);
		assertEquals("* Offers may vary. † Submit registration to read details.", termsText);
	}

}
