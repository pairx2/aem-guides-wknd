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
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import com.google.common.collect.ImmutableMap;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class ImageModelTest {

	@InjectMocks
	private ImageModel imageModel;
	private AemContext context;
	Resource imageResource;

	@BeforeEach
	void setUp() throws PathNotFoundException, RepositoryException {

		imageResource = context.create().resource(
				"/content/an/similac/global/en/products/article/jcr:content/root/row_container/content/column_control/2colpar1/image",
				new ValueMapDecorator(
						ImmutableMap.<String, Object>of("imgSrc", "/content/dam/an/similac/commons/730_410.png")));

		context.addModelsForClasses(ImageModel.class);
		Session mockSession = mock(Session.class);
		context.registerAdapter(ResourceResolver.class, Session.class, mockSession);
		context.currentResource(imageResource);
		// Mocks for static method SimilacResourceUtils.getBase64Image(..)
		Node node = mock(Node.class);
		Property prty = mock(Property.class);
		Binary binary = mock(Binary.class);
		InputStream ip = IOUtils.toInputStream("/content/product/baby-formula.png");
		when(mockSession.getNode(any())).thenReturn(node);
		when(node.getProperty("jcr:data")).thenReturn(prty);
		when(prty.getBinary()).thenReturn(binary);
		when(binary.getStream()).thenReturn(ip);
		imageModel = context.request().adaptTo(ImageModel.class);
	}

	@Test
	void testGetImageBase() {

		String imageBase = imageModel.getImageBase();
		assertNotNull(imageBase);
		assertEquals("/content/dam/an/similac/commons/730_410.png/jcr:content/renditions/cq5dam.thumbnail.48.48.png",
				imageBase);
	}

}
