package com.abbott.aem.epd.acare.core.models;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class ExternalUrlModelTest {
    @Mock
    ExternalUrlModel externalUrlModel;

    AemContext ctx = new AemContext();
    @Mock
    ProxyComponentService proxyComponentService;
    @Mock
    Component component;
    @Mock
    Page currentPage;
    @Mock
    Resource resource;

    @Mock
    PageManager pageManager;

    @Mock
    public Externalizer externalizer;

    @Mock
    public ResourceResolver resourceResolver;

    @Mock
    public ExternalUrlModel externalizerModel;


    @BeforeEach
    void setUp() {
        proxyComponentService = mock(ProxyComponentService.class);
        component = mock(Component.class);
        ProxyPaths path = null;
        lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(ExternalUrlModel.class);
        //ctx.load().json("/com/abbott/aem/epd/acare/core/models/ExternalUrlModelTest.json", "/content/externalUrlModel");
        pageManager = mock(PageManager.class);
        currentPage = mock(Page.class);
        resource = mock(Resource.class);
        externalizer = mock(Externalizer.class);
        resourceResolver=mock(ResourceResolver.class);

    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void testInit() {
        final String expected = "https://www.abc.com/content/example.html?1_exp";
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        externalUrlModel.setPath(expected);
        externalUrlModel.init();
        assertNotNull(externalUrlModel.absoluteUrl);

    }
    @Test
    void testGetpath(){
        final String expected = "SamplePath";
        //ctx.currentResource("/content/externalUrlModel");
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        externalUrlModel.setPath(expected);
        String actual = externalUrlModel.getPath();
        assertEquals(expected, actual);
    }
    
    @Test
    void testGetExternalizedUrl() {
        final String expected = "https://www.abc.com/content/example.html?1_exp";
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        String actaul=externalUrlModel.getExternalizedUrl(expected);
        assertEquals(expected,actaul);

    }

    @Test
    void testGetExternalizedUrlNullPath() {
        final String expected = null;
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        String actaul=externalUrlModel.getExternalizedUrl(expected);
        assertEquals(expected,actaul);

    }

    @Test
    void testGetExternalizedUrlOtherPath() {
        final String expected = "abc.com";
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        String actaul=externalUrlModel.getExternalizedUrl(expected);
        assertEquals(expected,actaul);

    }

    @Test
    void testGetReformedText() {
        final String expected = "href=\"/abc.com\"";
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        String actaul=externalUrlModel.getReformedText(expected);
        assertEquals(expected,actaul);

    }

    @Test
    void testGetExternalizedUrlFourParam() {
        final String expected = "https://www.abc.com/content/example.html?1_exp";
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        String actaul=externalUrlModel.getExternalizedUrl(expected,resourceResolver,externalizer,false,false);
        assertEquals(expected,actaul);

    }

    @Test
    void testGetQueryParamIndexQUESTIONMARK() {
        final int expected=40;
        final String tempPath = "https://www.abc.com/content/example.html?1_exp";
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        int actaul=externalUrlModel.getQueryParamIndex(tempPath,expected);
        assertEquals(expected,actaul);

    }

    @Test
    void testGetQueryParamIndexSLASH_QUESTIONMARK() {
        final int expected=40;
        final String tempPath = "https://www.abc.com/content/example.html/?1_exp";
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        int actaul=externalUrlModel.getQueryParamIndex(tempPath,expected);
        assertEquals(expected,actaul);

    }

    @Test
    void testGetQueryParamIndexHASH_SLASH_QUESTIONMARK() {
        final int expected=40;
        final String tempPath = "https://www.abc.com/content/example.html#/?1_exp";
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        int actaul=externalUrlModel.getQueryParamIndex(tempPath,expected);
        assertEquals(expected,actaul);

    }
    @Test
    void testGetQueryParamIndexHASH() {
        final int expected=40;
        final String tempPath = "https://www.abc.com/content/example.html#1_exp";
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        int actaul=externalUrlModel.getQueryParamIndex(tempPath,expected);
        assertEquals(expected,actaul);

    }

    @Test
    void testGetStringValue() {
        final String expected="1_exp";
        final String tempPath = "https://www.abc.com/content/example.html#1_exp";
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        String actaul=externalUrlModel.getStringValue(41,tempPath);
        assertEquals(expected,actaul);
    }

    @Test
    void testGetPagePath() {
        final String expected="https://www.abc.com/content/example";
        final String tempPath = "https://www.abc.com/content/example.html#1_exp";
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        String actaul=externalUrlModel.getPagePath(true,tempPath,40);
        assertEquals(expected,actaul);
    }

    @Test
    void testGetExternalizedLink() {
        final String expected="1_exp";
        final String tempPath = "https://www.abc.com/content/example.html#1_exp";
        final String tempTokenParam="1_exp";
        ExternalUrlModel externalUrlModel=new ExternalUrlModel();
        String actaul=externalUrlModel.getExternalizedLink(tempPath,resourceResolver,externalizer,false,false,tempTokenParam);
        assertEquals(expected,actaul);
    }


}