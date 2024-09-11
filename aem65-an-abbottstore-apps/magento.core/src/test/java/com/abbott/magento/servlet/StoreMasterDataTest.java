package com.abbott.magento.servlet;

import static org.mockito.Mockito.when;

import java.io.IOException;

import javax.servlet.ServletException;


import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.magento.services.ProductRootCatConfigService;

@ExtendWith(MockitoExtension.class)
class StoreMasterDataTest {

	    @Mock
	    MockSlingHttpServletRequest request;
	  	@Mock
	  	MockSlingHttpServletResponse response;
	    @Mock
	    ResourceResolver resourceResolver;
 	    @InjectMocks
	    StoreMasterData storeMasterData;
	    @Mock
	    ProductRootCatConfigService categoryConfig;
	 
	
	@Test
	void testStoreMasterData() throws ServletException, IOException {
		when(request.getResourceResolver()).thenReturn(resourceResolver);
		when(categoryConfig.getStoreName()).thenReturn("abbott");
		storeMasterData.bindConfigurationFactory(categoryConfig);

		storeMasterData.doGet(request, response);
		storeMasterData.unbindConfigurationFactory(categoryConfig);
	 
	}

}
