package com.abbott.aem.bts.cybersecurity.components.model.impl;

import com.abbott.aem.bts.cybersecurity.components.model.CyberSecurityFormContainer;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

/**
 * @author Pawan.Namagiri
 */
@ExtendWith(AemContextExtension.class)
public class CyberSecurityContainerImplTest {

    private final AemContext ctx = new AemContext();
    private final AemContext ctx1 = new AemContext();
    private final AemContext ctx2 = new AemContext();

    private Page currentPage;

    private PageManager pageManager;

    private ProxyComponentService proxyComponentService;

    private Component component;

    @BeforeEach
    public void setUp() throws Exception {

        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(CyberSecurityContainerImpl.class);
        ctx.load().json("/com/abbott/aem/bts/cybersecurity/components/model/impl/FormContainerImplTest.json", "/content");

        ctx1.registerService(ProxyComponentService.class, proxyComponentService);
        ctx1.addModelsForClasses(CyberSecurityContainerImpl.class);
        ctx1.load().json("/com/abbott/aem/bts/cybersecurity/components/model/impl/FormContainerImplTest1.json", "/content");

        ctx2.registerService(ProxyComponentService.class, proxyComponentService);
        ctx2.addModelsForClasses(CyberSecurityContainerImpl.class);
        ctx2.load().json("/com/abbott/aem/bts/cybersecurity/components/model/impl/FormContainerImplTest2.json", "/content");

        pageManager = Mockito.mock(PageManager.class);
        currentPage = Mockito.mock(Page.class);
        ctx.currentPage(currentPage);

    }

    @Test
    void testGetReCaptchaKey() {
        final String expected = "check";
        Resource resource = ctx.currentResource("/content/formContainer");
        Mockito.lenient().when(currentPage.adaptTo(Resource.class)).thenReturn(resource);
        Mockito.lenient().when(currentPage.getPath()).thenReturn(expected);
        CyberSecurityFormContainer formContainer = ctx.request().adaptTo(CyberSecurityFormContainer.class);
        String actual = formContainer.getReCaptchaKey();
        assertEquals(expected, actual);
    }

    @Test
    void testGetRecaptchaScriptSrc() {
        final String expected = "check";
        Resource resource = ctx.currentResource("/content/formContainer");
        Mockito.lenient().when(currentPage.adaptTo(Resource.class)).thenReturn(resource);
        CyberSecurityFormContainer formContainer = ctx.request().adaptTo(CyberSecurityFormContainer.class);
        String actual = formContainer.getRecaptchaScriptsrc();
        assertEquals(expected, actual);
    }

    @Test
    void testGetThankYouPage() {
        final String expected = "/content/bts/thankyou";
        ctx.currentResource("/content/formContainer");
        Page currentPage = ctx.create().resource(expected, "jcr:primaryType", "cq:Page").adaptTo(Page.class);
        CyberSecurityFormContainer formContainer = ctx.request().adaptTo(CyberSecurityFormContainer.class);
        Mockito.lenient().when(pageManager.getPage(expected)).thenReturn(currentPage);
        String actual = formContainer.getThankYouPage();
        assertEquals(expected, actual);
    }

    @Test
    void testGetThankYouPageNull() {
        ctx.load().json("/com/abbott/aem/bts/cybersecurity/components/model/impl/FormContainerImplTest3.json", "/content/nulltest");
        ctx.currentResource("/content/nulltest/formContainer");
        CyberSecurityFormContainer formContainer = ctx.request().adaptTo(CyberSecurityFormContainer.class);
        String actual = formContainer.getThankYouPage();
        assertEquals("/content/404", actual);
    }

    @Test
    void testGetErrorPage() {
        final String expected = "/content/bts/error";
        ctx.currentResource("/content/formContainer");
        Page currentPage = ctx.create().resource(expected, "jcr:primaryType", "cq:Page").adaptTo(Page.class);
        Mockito.lenient().when(pageManager.getPage(Mockito.anyString())).thenReturn(currentPage);
        CyberSecurityFormContainer formContainer = ctx.request().adaptTo(CyberSecurityFormContainer.class);
        String actual = formContainer.getErrorPage();
        assertEquals(expected, actual);
    }

    @Test
    void testGetErrorPageNull() {
        ctx.load().json("/com/abbott/aem/bts/cybersecurity/components/model/impl/FormContainerImplTest3.json", "/content/nulltest");
        ctx.currentResource("/content/nulltest/formContainer");
        CyberSecurityFormContainer formContainer = ctx.request().adaptTo(CyberSecurityFormContainer.class);
        String actual = formContainer.getErrorPage();
        assertEquals("/content/404", actual);
    }

    @Test
    void testGetThankYouPageWithNoRedirect() {
        final String expected = "/bts/thankyou";
        ctx1.currentResource("/content/formContainer");
        CyberSecurityFormContainer formContainer = ctx1.request().adaptTo(CyberSecurityFormContainer.class);
        String actual = formContainer.getThankYouPage();
        assertEquals(expected, actual);
    }

    @Test
    void testGetThankYouPageWithNullRedirect() {
        ctx2.currentResource("/content/formContainer");
        CyberSecurityFormContainer formContainer = ctx2.request().adaptTo(CyberSecurityFormContainer.class);
        String actual = formContainer.getThankYouPage();
        assertNull(actual);
    }

    @Test
    void testGetErrorPageWithNoRedirect() {
        final String expected = "/bts/error";
        ctx1.currentResource("/content/formContainer");
        CyberSecurityFormContainer formContainer = ctx1.request().adaptTo(CyberSecurityFormContainer.class);
        String actual = formContainer.getErrorPage();
        assertEquals(expected, actual);
    }

    @Test
    void testGetErrorPageWithNullRedirect() {
        ctx2.currentResource("/content/formContainer");
        CyberSecurityFormContainer formContainer = ctx2.request().adaptTo(CyberSecurityFormContainer.class);
        String actual = formContainer.getErrorPage();
        assertNull(actual);
    }

    @Test
    void testGetCurrentPagePath() {
        final String expected = "";
        ctx.currentResource("/content/formContainer");
        Mockito.lenient().when(pageManager.getPage(Mockito.anyString())).thenReturn(currentPage);
        Mockito.lenient().when(currentPage.getPath()).thenReturn(expected);
        CyberSecurityFormContainer formContainer = ctx.request().adaptTo(CyberSecurityFormContainer.class);
        String actual = formContainer.getCurrentPagePath();
        assertEquals(expected, actual);
        assertEquals("Wizard", formContainer.getFormMode());
        assertEquals("Contact Us", formContainer.getFormType());
        assertEquals("Submitted Successfully", formContainer.getSuccessMessage());
        assertEquals("Submission Failed", formContainer.getFailureMessage());
        assertEquals("7GHAW89", formContainer.getRecaptcha());
        assertEquals("Submit", formContainer.getSubmit());
        assertEquals("Reset", formContainer.getReset());
        assertEquals("Cancel", formContainer.getCancel());
        List<String> expectedSteps = Arrays.asList("step 1", "step 2");
        assertEquals(expectedSteps, formContainer.getStepLabel());
        assertEquals("/content/dam/abbott-platform/test.jpg", formContainer.getStepCompleteIcon());
        assertEquals("GET", formContainer.getRequestType());
    }

}
