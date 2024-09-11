package com.abbott.aem.adc.freestylelibrede.servlets;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.EditorItem;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
public class OCRMockResponseTest {
	
	private AemContext context = new AemContext();
	  
    @InjectMocks
    OCRMockResponse ocrmockResponse = new OCRMockResponse();
    
    private static final String POST_SUCCESS = "{\"transactionId\":\"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\"data\":{\"personal\":{\"firstname\":\"Hans\",\"lastname\":\"Muster\",\"birthday\":\"1970-01-01\"},\"address\":{\"street\":\"Mustergasse 12\",\"postcode\":12345,\"city\":\"Mannheim\",\"country\":\"Germany\"},\"insurance\":{\"kvnr\":\"T948589740\",\"payer\":{\"name\":\"AOK Rheinland-Pfalz\",\"id\":\"106415300\"}},\"other\":{\"rxDate\":\"2019-02-03\",\"description\":\"Order for a device\",\"validityPeriod\":1,\"practitionerNumber\":21734638,\"jobLocationCode\":389823887,\"stamp\":true}}}";
    
    @Test
    protected void test() {
    	Assert.assertEquals("{\"transactionId\":\"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\"data\":{\"personal\":{\"firstname\":\"Hans\",\"lastname\":\"Muster\",\"birthday\":\"1970-01-01\"},\"address\":{\"street\":\"Mustergasse 12\",\"postcode\":12345,\"city\":\"Mannheim\",\"country\":\"Germany\"},\"insurance\":{\"kvnr\":\"T948589740\",\"payer\":{\"name\":\"AOK Rheinland-Pfalz\",\"id\":\"106415300\"}},\"other\":{\"rxDate\":\"2019-02-03\",\"description\":\"Order for a device\",\"validityPeriod\":1,\"practitionerNumber\":21734638,\"jobLocationCode\":389823887,\"stamp\":true}}}",POST_SUCCESS);
     	
    }
    }

