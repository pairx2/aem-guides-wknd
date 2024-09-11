package com.abbott.aem.adc.freestylelibrede.services.impl.dto;

import java.io.IOException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;

import junitx.framework.Assert;

public class PayonResponseCodeTest {
		
	@InjectMocks
	PayonResponseCode payonResponseCode;

	@BeforeEach
	void setup() throws IOException {
		payonResponseCode = new PayonResponseCode();
		new PayonResponseCode("10001","PayonResponseCode Description");
				
	}

	@Test
	void getCode() {
		payonResponseCode.setCode("1001");
		Assert.assertEquals("1001", payonResponseCode.getCode());
	}

	@Test
	void getDescription() {	
		payonResponseCode.setDescription("Description");
		Assert.assertEquals("Description", payonResponseCode.getDescription());
	}
	
}
