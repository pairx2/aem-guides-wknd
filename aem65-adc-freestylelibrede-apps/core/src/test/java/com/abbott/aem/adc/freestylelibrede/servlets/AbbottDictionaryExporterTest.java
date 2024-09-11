package com.abbott.aem.adc.freestylelibrede.servlets;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;
import org.apache.commons.codec.CharEncoding;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.servlets.post.JSONResponse;
import org.apache.sling.testing.mock.sling.servlet.MockRequestPathInfo;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.services.DictionaryJsonExporter;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
class AbbottDictionaryExporterTest {

    private AemContext context = new AemContext();

    @Mock
    DictionaryJsonExporter dictionaryJsonExporter;

    @InjectMocks
    AbbottDictionaryExporter exporter = new AbbottDictionaryExporter();


    MockSlingHttpServletRequest request;
    MockSlingHttpServletResponse response;

    @BeforeEach
    void setup() throws IOException {

        context.registerService(DictionaryJsonExporter.class,dictionaryJsonExporter);
        request = context.request();
        response= context.response();

        ((MockRequestPathInfo) request.getRequestPathInfo()).setSelectorString("de");

        Mockito.when(dictionaryJsonExporter.createJson(any(),any())).thenReturn( "abc".getBytes(CharEncoding.UTF_8));
    }


    @Test
    void doGet() throws IOException {
        exporter.doGet(request,response);

        Assert.assertEquals("application/json;charset=UTF-8",response.getContentType());
        Assert.assertEquals("UTF-8",response.getCharacterEncoding());
        Assert.assertEquals("abc",new String(response.getOutput(),"UTF-8"));
        Assert.assertEquals(3,response.getContentLength());


    }
}