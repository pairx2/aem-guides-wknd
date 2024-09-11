package com.abbott.aem.adc.freestylelibrede.services.impl;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.BaseModelTest;
import com.abbott.aem.adc.freestylelibrede.services.FileReaderService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class FileReaderServiceImplTest extends BaseModelTest {  
	private final AemContext context = new AemContext();
	 FileReaderService fileReaderService = new FileReaderServiceImpl();
    @Test
    void readTextFile() { 
    	 context.load().json("/services/FileReaderService/faq-landing.json","/content/adc/freestylelibrede/de/de/v3/help/faq");
    	 String result = fileReaderService.readTextFile("/services/FileReaderService/faq-landing.json",context.resourceResolver());
         Assert.assertNotNull(result);
    }
    
}