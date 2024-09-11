package com.abbott.aem.adc.freestylelibrede.constants;

import static org.junit.Assert.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.BaseModelTest;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class HttpHeadersTest extends BaseModelTest<HttpHeaders> {
	@BeforeEach
	void setup() {
		new HttpHeaders.PrettyPrintHeader();
		new HttpHeaders.BearerAuthorizationHeader("bearer");
		new HttpHeaders.JsonContentTypeHeader();
		new HttpHeaders.OAuthAuthorizationHeader("oauth");
	}
	@Test
	public void test() {
		assertNotNull(new HttpHeaders.PrettyPrintHeader());
		assertNotNull(new HttpHeaders.BearerAuthorizationHeader("bearer"));
		assertNotNull(new HttpHeaders.JsonContentTypeHeader());
		assertNotNull(new HttpHeaders.OAuthAuthorizationHeader("oauth"));
	}
}
