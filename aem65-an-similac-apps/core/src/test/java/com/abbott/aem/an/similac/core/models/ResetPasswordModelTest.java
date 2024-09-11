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
public class ResetPasswordModelTest {
		
	private static final String TEST_CENTER_IMAGE_BASE64 = "L2NvbnRlbnQvYW4vc2ltaWxhYy90ZXN0LnBuZw==";
	private static final String TEST_FOOTER_IMAGE_BASE64 = "L2NvbnRlbnQvYW4vc2ltaWxhYy90ZXN0LnBuZw==";

	@InjectMocks
	private ResetPasswordModel resetPasswordModel;
		
	@BeforeEach
	public void setup(AemContext context) throws PathNotFoundException, RepositoryException {
		Resource resetResource = context.create().resource(
				"/content/an/similac/global/en/utils/reset-password/jcr:content/root/reset_email",
				"centerImagePath",TEST_CENTER_IMAGE_BASE64,
				"footerImagePath", TEST_FOOTER_IMAGE_BASE64);
				
		context.addModelsForClasses(ResetPasswordModel.class);
		Session mockSession = mock(Session.class);
		context.registerAdapter(ResourceResolver.class, Session.class, mockSession);
		context.currentResource(resetResource);
		// Mocks for static method SimilacResourceUtils.getBase64Image(..)
		Node node = mock(Node.class);
		Property prty = mock(Property.class);
		Binary binary = mock(Binary.class);
		InputStream ip = IOUtils.toInputStream("/content/an/similac/test.png");
		when(mockSession.getNode(any())).thenReturn(node);
		when(node.getProperty("jcr:data")).thenReturn(prty);
		when(prty.getBinary()).thenReturn(binary);
		when(binary.getStream()).thenReturn(ip);
		resetPasswordModel= context.request().adaptTo(ResetPasswordModel.class);
	}

	@Test
	void testCenterImage() {
		String centerImage = resetPasswordModel.getCentreImage();
		//assertNotNull(centerImage);
		//assertEquals(TEST_CENTER_IMAGE_BASE64, centerImage);
	}

	@Test
	void testFooterImage() {
		String footerImage = resetPasswordModel.getFooterImage();
		//assertNotNull(footerImage);
		//assertEquals(TEST_FOOTER_IMAGE_BASE64,footerImage);	
	} 
}
