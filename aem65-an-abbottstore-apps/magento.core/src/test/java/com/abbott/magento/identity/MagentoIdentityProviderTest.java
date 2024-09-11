package com.abbott.magento.identity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import java.io.IOException;

import javax.jcr.SimpleCredentials;
import javax.security.auth.login.LoginException;

import org.apache.jackrabbit.oak.spi.security.authentication.external.ExternalIdentityException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.magento.identity.MagentoIdentityProvider.Config;
import com.abbott.magento.identity.models.MagentoCustomer;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;



@ExtendWith(MockitoExtension.class)
class MagentoIdentityProviderTest {
	char[] pass = {'p','a','s','s'};
	String username = "username";
	String customerData = "{\r\n  \"id\": 456,\r\n  \"group_id\": 2,\r\n  \"default_billing\": \"456\",\r\n  \"default_shipping\": \"456\",\r\n  \"created_at\": \"2017-05-06 06:48:43\",\r\n  \"updated_at\": \"2021-12-30 00:23:01\",\r\n  \"created_in\": \"Default Store View\",\r\n  \"email\": \"success6551450115456@simulator.amazonses.com\",\r\n  \"firstname\": \"PERRY\",\r\n  \"lastname\": \"FISH\",\r\n  \"middlename\": \"W\",\r\n  \"gender\": 0,\r\n  \"store_id\": 1,\r\n  \"website_id\": 1,\r\n  \"addresses\": [\r\n    {\r\n      \"id\": 130438,\r\n      \"customer_id\": 456,\r\n      \"region\": {\r\n        \"region_code\": \"IL\",\r\n        \"region\": \"Illinois\",\r\n        \"region_id\": 23\r\n      },\r\n      \"region_id\": 23,\r\n      \"country_id\": \"US\",\r\n      \"street\": [\r\n        \"3010 Round Table Drive\"\r\n      ],\r\n      \"telephone\": \"2475598736\",\r\n      \"postcode\": \"45069\",\r\n      \"city\": \"West Chester\",\r\n      \"firstname\": \"DEV\",\r\n      \"lastname\": \"USER\"\r\n    }\r\n  ],\r\n  \"disable_auto_group_change\": 0,\r\n  \"extension_attributes\": {\r\n    \"is_subscribed\": false\r\n  },\r\n  \"custom_attributes\": [\r\n    {\r\n      \"attribute_code\": \"wd_company\",\r\n      \"value\": \"ABBOTT\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"wd_status\",\r\n      \"value\": \"R\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"wd_upi\",\r\n      \"value\": \"ABBOTT10033046\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"ssm_order_flag\",\r\n      \"value\": \"2\"\r\n    },\r\n    {\r\n      \"attribute_code\": \"allow_order_limit\",\r\n      \"value\": \"0\"\r\n    }\r\n  ]\r\n}";
	ObjectMapper mapper = new ObjectMapper();
	
	@InjectMocks
	MagentoIdentityProvider magentoIdentityProvider;
	
	@Mock
	Config config;
	
	SimpleCredentials credentials = new SimpleCredentials(username,pass);
	
	
	@Mock
	MagentoIdentityConnector identityConnector;
	
	String[] storeIds = {"abbott","glucerna"};
	String adminUser = "admin";
	String adminPassword = "password";
	String server = "https://dev-server.com";
	
	@BeforeEach
	void setup() {
		when(config.adminUserName()).thenReturn(adminUser);
		when(config.adminPassword()).thenReturn(adminPassword);
		when(config.serverUrl()).thenReturn(server);
		when(config.storeId()).thenReturn(storeIds);
		magentoIdentityProvider.activate(config);
	}
	
	@Test
	void testAuthenticate() throws LoginException, ExternalIdentityException, IOException {
	    mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	 	MagentoCustomer customer = mapper.readValue(customerData, MagentoCustomer.class);
		when(identityConnector.getCustomer(null)).thenReturn(customer);
		assertNotNull(magentoIdentityProvider.authenticate(credentials));
		
	}
	
	@Test
	void testGetMagentoAdminTokenKey() {
		assertNotNull(magentoIdentityProvider.getMagentoAdminTokenKey());
	}
	
	@Test
	void testGetAdminUser() {
		assertNotNull(magentoIdentityProvider.getAdminUser());
	}
	
	@Test
	void testGetAdminPassword() {
		assertNotNull(magentoIdentityProvider.getAdminPassword());
	}
	@Test
	void testGetServer() {
		assertNotNull(magentoIdentityProvider.getServer());
	}
	@Test
	void testGetIdentity() throws ExternalIdentityException {
		assertNull(magentoIdentityProvider.getIdentity());
	}
	@Test
	void testGetUser() throws ExternalIdentityException {
		assertNull(magentoIdentityProvider.getUser());
	}
	@Test
	void testGetGroup() throws ExternalIdentityException {
		assertNull(magentoIdentityProvider.getGroup());
	}
	@Test
	void testListGroups() throws ExternalIdentityException {
		assertNull(magentoIdentityProvider.listGroups());
	}
	@Test
	void testListUsers() throws ExternalIdentityException {
		assertNull(magentoIdentityProvider.listUsers());
	}
	@Test
	void testGetStoreId() {
		assertNotNull(magentoIdentityProvider.getStoreId());
	}
	


}
