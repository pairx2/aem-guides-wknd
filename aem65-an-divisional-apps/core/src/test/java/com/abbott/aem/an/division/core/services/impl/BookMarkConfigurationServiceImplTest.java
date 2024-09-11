package com.abbott.aem.an.division.core.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.division.core.services.impl.BookMarkConfigurationServiceImpl.Config;

import io.wcm.testing.mock.aem.junit5.AemContext;

@ExtendWith({ MockitoExtension.class })
class BookMarkConfigurationServiceImplTest {

	@Mock
	Config config;

	@InjectMocks
	BookMarkConfigurationServiceImpl bookmark;

	public final AemContext context = new AemContext();
	final Map<String, Object> properties = new HashMap<>();

	@BeforeEach
	void setUp() throws IOException {
		MockitoAnnotations.openMocks(this);
		Mockito.when(config.domainUrl()).thenReturn("https://dev.services.abbott/api/system/assets");
		Mockito.when(config.eslApiUrl()).thenReturn("https://esl.com");
		Mockito.when(config.xApplicationAccessKey()).thenReturn("vP+Py29WHTEzTkyApjRLA6bobOaQUBcKp5ssST5FqTp/0Qo=");
		Mockito.when(config.contentType()).thenReturn("application/json");
		Mockito.when(config.xApplicationId()).thenReturn("anhcpsample");
		Mockito.when(config.xCountryCode()).thenReturn("US");
		Mockito.when(config.xPreferredLanguage()).thenReturn("US-en");
		Mockito.when(config.module()).thenReturn(new String[] {"clinical","nutrition"});
		Mockito.when(config.sessionPath()).thenReturn("/content/us/en");
		Mockito.when(config.xOriginSecretKey()).thenReturn("c5b292d1290fce1c463af73ead3897a8");
	}

	@Test
	void testConfigValues() {
		bookmark.activate(config);
		assertEquals("US", bookmark.getCountryCode());
		assertEquals("https://esl.com", bookmark.getApiUrl());
		assertEquals("vP+Py29WHTEzTkyApjRLA6bobOaQUBcKp5ssST5FqTp/0Qo=", bookmark.getxApplicationAccessKey());
		assertEquals("https://dev.services.abbott/api/system/assets", bookmark.getDomainUrl());
		assertEquals("application/json", bookmark.getContentType());
		assertEquals("US-en", bookmark.getPreferredLanguage());
		assertEquals("anhcpsample", bookmark.getxApplicationId());
		assertEquals("/content/us/en", bookmark.getSessionPath());
		assertEquals("c5b292d1290fce1c463af73ead3897a8", bookmark.getxOriginSecretKey());
		assertNotNull(bookmark.getModule());
	}
}
