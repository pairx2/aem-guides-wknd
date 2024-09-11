package com.abbott.aem.cloud.platform.core.util;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;

import javax.jcr.Binary;
import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.servlet.RequestDispatcher;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.day.cq.commons.jcr.JcrConstants;

@ExtendWith({ MockitoExtension.class })
public class ResourceDataUtilTest {

	
	@Mock
	SlingHttpServletRequest httpServletRequest;
	
	@Mock
	SlingHttpServletResponse httpServletResponse;
	
	@Mock
	RequestDispatcher requestDispatcher;
	
	@Mock
	BufferedSlingHttpServletResponse bufferedSlingHttpServletResponse;
	
	@Mock
	BufferedServletOutput bufferedServletOutput;
	
	@Mock
	ResourceResolver resolver;
	
	@Mock
	Resource resource;
	
	@Mock
	Node node;
	
	@Mock
	Property property;
	
	@Mock
	Binary binary;
	
	@Mock
	InputStream ip;
	
	@Test
	void testGetIncludeAsString() {
		String path = "/content/bts";
		when(httpServletRequest.getRequestDispatcher(path)).thenReturn(requestDispatcher);
		
		String result = ResourceDataUtil.getIncludeAsString(path, httpServletRequest, httpServletResponse);
		assertNull(result);
	}
	
	@Test
	void testGetIncludeAsString1() {
		String path = "/content/bts";
		when(httpServletRequest.getRequestDispatcher(path)).thenReturn(requestDispatcher);
		
		String result = ResourceDataUtil.getIncludeAsString(path, httpServletRequest, httpServletResponse);
		assertNull(result);
	}
	
	@Test
	void testGetNTFileAsInputStream() throws RepositoryException {
		String path = "/content/bts";
		when(resolver.resolve(path)).thenReturn(resource);
		when( resource.adaptTo(Node.class)).thenReturn(node);
		when(node.getNode(JcrConstants.JCR_CONTENT)).thenReturn(node);
		when(node.getProperty(JcrConstants.JCR_DATA)).thenReturn(property);
		when(property.getBinary()).thenReturn(binary);
		when(binary.getStream()).thenReturn(ip);
		InputStream ins = ResourceDataUtil.getNTFileAsInputStream(path,resolver);
		
		assertNotNull(ins);
	}
	
	@Test
	void testGetNTFileAsInputStream1() throws RepositoryException, IOException {
		InputStream ips =  new ByteArrayInputStream(Charset.forName("UTF-16").encode("mystring").array());
		String path = "/content/bts";
		when(resolver.resolve(path)).thenReturn(resource);
		when( resource.adaptTo(Node.class)).thenReturn(node);
		when(node.getNode(JcrConstants.JCR_CONTENT)).thenReturn(node);
		when(node.getProperty(JcrConstants.JCR_DATA)).thenReturn(property);
		when(property.getBinary()).thenReturn(binary);
		ip = mock(InputStream.class);
		when(binary.getStream()).thenReturn(ips);
		
		String ins = ResourceDataUtil.getNTFileAsString(path,resolver);
		
		assertNotNull(ins);
	}
	
	@Test
	void testGetNTFileAsInputStream2() throws RepositoryException, IOException {
		InputStream ips =  new ByteArrayInputStream(Charset.forName("UTF-16").encode("mystring").array());
		when( resource.adaptTo(Node.class)).thenReturn(node);
		when(node.getNode(JcrConstants.JCR_CONTENT)).thenReturn(node);
		when(node.getProperty(JcrConstants.JCR_DATA)).thenReturn(property);
		when(property.getBinary()).thenReturn(binary);
		ip = mock(InputStream.class);
		when(binary.getStream()).thenReturn(ips);
		
		String ins = ResourceDataUtil.getNTFileAsString(resource);
		
		assertNotNull(ins);
	}
	
}
