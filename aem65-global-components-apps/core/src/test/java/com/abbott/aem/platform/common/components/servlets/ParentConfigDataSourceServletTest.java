package com.abbott.aem.platform.common.components.servlets;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import lombok.NonNull;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.io.IOException;
import java.io.PrintWriter;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith({MockitoExtension.class, AemContextExtension.class})
class ParentConfigDataSourceServletTest {

    private final AemContext context = new AemContext(ResourceResolverType.RESOURCERESOLVER_MOCK);

    private static final String PROPERTY = "inheritableProperty";

    @BeforeEach
    void setUp() throws IOException {
        context.load().json("/com/abbott/aem/platform/common/components/servlets/parentConfigData.json", "/content/bts");
        when(request.getResourceResolver()).thenReturn(context.resourceResolver());
        when(response.getWriter()).thenReturn(writer);
    }

    @InjectMocks
    ParentConfigDataSourceServlet servlet;

    @NonNull
    @Mock
    SlingHttpServletRequest request;

    @NonNull
    @Mock
    SlingHttpServletResponse response;

    @Mock
    PrintWriter writer;

    @Captor
    ArgumentCaptor<String> result;

    @Test
    void checkContentPageWithPropertySetOnParent_returnProperPath() throws IOException {
        setRequestPath("/content/bts/global-reference/master/ja/home/landing", PROPERTY);
        servlet.doGet(request, response);
        verify(writer).write(result.capture());
        assertEquals("true (configured at: /content/bts/global-reference/master/ja)", result.getValue());
    }

    @Test
    void checkTooHighPage_returnEmptyString() throws IOException {
        setRequestPath("/content/bts", PROPERTY);
        servlet.doGet(request, response);
        verify(writer).write(result.capture());
        assertEquals(StringUtils.EMPTY, result.getValue());
    }

    @Test
    void checkContentPageWithoutPropertySetOnParent_returnEmptyString() throws IOException {
        setRequestPath("/content/bts/global-reference/master/ja/home/landing", "notSetProperty");
        servlet.doGet(request, response);
        verify(writer).write(result.capture());
        assertEquals(StringUtils.EMPTY, result.getValue());
    }

    private void setRequestPath(String path, String property) {
        when(request.getParameter("property")).thenReturn(property);
        when(request.getParameter("item")).thenReturn(path);
    }

}
