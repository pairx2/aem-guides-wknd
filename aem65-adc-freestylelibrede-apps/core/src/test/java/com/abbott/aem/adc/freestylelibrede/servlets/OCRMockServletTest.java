package com.abbott.aem.adc.freestylelibrede.servlets;
import java.io.IOException;
import javax.servlet.ServletException;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.junit.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;


@ExtendWith({AemContextExtension.class,MockitoExtension.class})
public class OCRMockServletTest {
	
	private AemContext context = new AemContext();
  
    @InjectMocks
    OCRMockServlet ocrMockservlet = new OCRMockServlet();
      
    @Mock
    SlingHttpServletRequest request ;  
    
    @Mock
    SlingHttpServletResponse response;   
    
    private static final String POST_SUCCESS = "{\"transactionId\":\"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\"data\":{\"personal\":{\"firstname\":\"Hans\",\"lastname\":\"Muster\",\"birthday\":\"1970-01-01\"},\"address\":{\"street\":\"Mustergasse 12\",\"postcode\":12345,\"city\":\"Mannheim\",\"country\":\"Germany\"},\"insurance\":{\"kvnr\":\"T948589740\",\"payer\":{\"name\":\"AOK Rheinland-Pfalz\",\"id\":\"106415300\"}},\"other\":{\"rxDate\":\"2019-02-03\",\"description\":\"Order for a device\",\"validityPeriod\":1,\"practitionerNumber\":21734638,\"jobLocationCode\":389823887,\"stamp\":true}}}";
    
    
    @BeforeEach
    void setup() throws IOException {
    	
        request = context.request();
        response = context.response(); 
              
    }   
    
   @Test
    protected void testDopost() {
	   
    	try {
			ocrMockservlet.doPost(request,response);
			Assert.assertEquals("application/json;charset=UTF-8",response.getContentType());
		    Assert.assertEquals("UTF-8",response.getCharacterEncoding());
		    Assert.assertEquals(POST_SUCCESS,new String(POST_SUCCESS));
		    
		} catch (ServletException e) {
			
			Assert.fail();
			
		} catch (IOException e) {
			
			Assert.fail();
			
		}
       
    }
       
}
