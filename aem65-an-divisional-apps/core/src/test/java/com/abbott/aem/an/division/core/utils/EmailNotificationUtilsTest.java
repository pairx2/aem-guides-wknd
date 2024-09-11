package com.abbott.aem.an.division.core.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mockStatic;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.division.api.jobs.EmailRunJobConfiguration;

@ExtendWith(MockitoExtension.class)
class EmailNotificationUtilsTest {

	@InjectMocks
	EmailNotificationUtils emailNotificationUtils;

	@Mock
	EmailRunJobConfiguration emailRunJobConfiguration;
	
	@Mock
	CloseableHttpClient mockClosableHttpClient;

	@Mock
	CloseableHttpResponse response;

	@Mock
	StatusLine statusLine;
	
	@Mock
	HttpEntity entity;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testSendEmailNotification() throws ClientProtocolException, IOException {
		try (MockedStatic<HttpClients> mockClient = mockStatic(HttpClients.class);
				MockedStatic<EntityUtils> mockEntityUtils = mockStatic(EntityUtils.class)) {
			Mockito.when(emailRunJobConfiguration.getApplicationId()).thenReturn("app123");
			Mockito.when(emailRunJobConfiguration.getDomainName()).thenReturn("abbott");
			Mockito.when(emailRunJobConfiguration.getServiceUrl()).thenReturn("http://abbott.com/service");
			Mockito.when(emailRunJobConfiguration.getApplicationAccessKey()).thenReturn("access_key");
			Mockito.when(emailRunJobConfiguration.getOriginSecretKey()).thenReturn("origin_secret_key");
			mockClient.when(HttpClients::createDefault).thenReturn(mockClosableHttpClient);
			Mockito.when(mockClosableHttpClient.execute(Mockito.any())).thenReturn(response);
			Mockito.when(response.getStatusLine()).thenReturn(statusLine);
			Mockito.when(statusLine.getStatusCode()).thenReturn(200);
			Mockito.when(response.getEntity()).thenReturn(entity);
			mockEntityUtils.when(() -> EntityUtils.toString(entity)).thenReturn("Email is sent successfully");
			String emailResponse = emailNotificationUtils.sendEmailNotification("sample email content", emailRunJobConfiguration,"Activated_Items");
			assertEquals("Email is sent successfully", emailResponse);
		}
	}
	
	@Test
	void testSendEmailNotification_throwsIOException() throws ClientProtocolException, IOException {
		try (MockedStatic<HttpClients> mockClient = mockStatic(HttpClients.class);
				MockedStatic<EntityUtils> mockEntityUtils = mockStatic(EntityUtils.class)) {
			Mockito.when(emailRunJobConfiguration.getApplicationId()).thenReturn("app123");
			Mockito.when(emailRunJobConfiguration.getDomainName()).thenReturn("abbott");
			Mockito.when(emailRunJobConfiguration.getServiceUrl()).thenReturn("http://abbott.com/service");
			Mockito.when(emailRunJobConfiguration.getApplicationAccessKey()).thenReturn("access_key");
			Mockito.when(emailRunJobConfiguration.getOriginSecretKey()).thenReturn("origin_secret_key");
			mockClient.when(HttpClients::createDefault).thenReturn(mockClosableHttpClient);
			Mockito.when(mockClosableHttpClient.execute(Mockito.any())).thenThrow(new IOException());
			String emailResponse = emailNotificationUtils.sendEmailNotification("sample email content", emailRunJobConfiguration,"Activated_Items");
			assertTrue(emailResponse.isEmpty());
		}
	}
	
	@Test
	void testSendEmailNotification_InvalidResponseCode() throws ClientProtocolException, IOException {
		try (MockedStatic<HttpClients> mockClient = mockStatic(HttpClients.class);
				MockedStatic<EntityUtils> mockEntityUtils = mockStatic(EntityUtils.class)) {
			Mockito.when(emailRunJobConfiguration.getApplicationId()).thenReturn("app123");
			Mockito.when(emailRunJobConfiguration.getDomainName()).thenReturn("abbott");
			Mockito.when(emailRunJobConfiguration.getServiceUrl()).thenReturn("http://abbott.com/service");
			Mockito.when(emailRunJobConfiguration.getApplicationAccessKey()).thenReturn("access_key");
			Mockito.when(emailRunJobConfiguration.getOriginSecretKey()).thenReturn("origin_secret_key");
			mockClient.when(HttpClients::createDefault).thenReturn(mockClosableHttpClient);
			Mockito.when(mockClosableHttpClient.execute(Mockito.any())).thenReturn(response);
			Mockito.when(response.getStatusLine()).thenReturn(statusLine);
			Mockito.when(statusLine.getStatusCode()).thenReturn(202);
			Mockito.when(response.getEntity()).thenReturn(entity);
			mockEntityUtils.when(() -> EntityUtils.toString(entity)).thenReturn("Email sending failed");
			String emailResponse = emailNotificationUtils.sendEmailNotification("sample email content", emailRunJobConfiguration,"Activated_Items");
			assertEquals("Email sending failed" ,emailResponse);
		}
	}

}
