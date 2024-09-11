package com.abbott.aem.adc.freestylelibrede.services.impl.dto;

import java.io.IOException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import junitx.framework.Assert;

public class PayonResponseTest {

	PayonResponse payonResponse;
	@InjectMocks
	PayonResponseCode result;

	@BeforeEach
	void setup() throws IOException {
		result = new PayonResponseCode();
		
		payonResponse = new PayonResponse();
		new PayonResponse(result,"10001");
		
	}

	@Test
	void getId() {
		payonResponse.setId("101");
		Assert.assertEquals("101", payonResponse.getId());
	}

	@Test
	void getResult() {
		result.setCode("1001");
		result.setDescription("Description");
		payonResponse.setResult(result);
		Assert.assertEquals("1001", payonResponse.getResult().getCode());		
		Assert.assertEquals("Description", payonResponse.getResult().getDescription());
	}
	
	
}
