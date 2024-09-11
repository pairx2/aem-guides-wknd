package com.abbott.aem.an.abbottstore.servlets;

import com.abbott.aem.an.abbottstore.services.UrlConfigService;
import com.abbott.aem.an.abbottstore.utils.RequestHandler;

import org.apache.http.client.fluent.Request;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.io.PrintWriter;

import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LoginRecaptchaServletTest {

	
	public static final String SITE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
    
    @Mock
    SlingHttpServletRequest req;

    @Mock
    SlingHttpServletResponse response;

    @InjectMocks
    LoginRecaptchaServlet loginRecaptchaServlet;

    @Mock
    UrlConfigService urlConfigService;

    @Mock
    PrintWriter out;
    

    @BeforeEach
    void setUp() throws IOException {
        when(req.getParameter("loginRecaptchaToken")).thenReturn("recaptchaResponse");
        when(urlConfigService.getLoginSecretKey()).thenReturn("secret key");
        when(response.getWriter()).thenReturn(out);
    }

    @Test
    void doPost() throws IOException {
    	String params = "secret=secret key&response=recaptchaResponse";
    	try(MockedStatic<RequestHandler> requestHandler = mockStatic(RequestHandler.class)){
    	requestHandler.when(()->RequestHandler.VerifyResponse(SITE_VERIFY_URL, params)).thenReturn(true);
        loginRecaptchaServlet.doPost(req, response);
    	}
    }
    
    @Test
    void doPostNoResponse() throws IOException {
    	loginRecaptchaServlet.doPost(req, response);
    }
}