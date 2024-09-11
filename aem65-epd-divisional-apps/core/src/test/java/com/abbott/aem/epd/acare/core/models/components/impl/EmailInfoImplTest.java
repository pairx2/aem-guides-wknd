package com.abbott.aem.epd.acare.core.models.components.impl;

import com.abbott.aem.epd.acare.core.models.components.EmailInfo;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(AemContextExtension.class)
class EmailInfoImplTest {
    @InjectMocks
    EmailInfoImpl emailInfoImpl;

    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
    private Component component;
    @BeforeEach
    public void setUp() throws Exception {
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(EmailInfoImpl.class);
        ctx.load().json("/com/abbott/aem/epd/acare/core/models/components/impl/EmailInfoImplTest.json", "/content/emailinfo");
    }

    @Test
    void testGetEmailFrom() {
        final String expected = "name.surnameFrom@xyz.com";
        ctx.currentResource("/content/emailinfo");
        EmailInfo emailinfo1 = ctx.request().adaptTo(EmailInfo.class);
        emailinfo1.setEmailFrom(expected);
        String actual = emailinfo1.getEmailFrom();
        assertEquals("name.surnameFrom@xyz.com", actual);
    }

    @Test
    void TestGetEmailSubject() {
        final String expected = "SampleEmailSubject";
        ctx.currentResource("/content/emailinfo");
        EmailInfo emailinfo1 = ctx.request().adaptTo(EmailInfo.class);
        emailinfo1.setEmailSubject(expected);
        String actual = emailinfo1.getEmailSubject();
        assertEquals(expected, actual);
    }

    @Test
    void TestGetEmailTo() {
        final String expected = "name.surnameTo@xyz.com";
        ctx.currentResource("/content/emailinfo");
        EmailInfo emailinfo1 = ctx.request().adaptTo(EmailInfo.class);
        emailinfo1.setEmailTo(expected);
        String actual = emailinfo1.getEmailTo();
        assertEquals(expected, actual);
    }

    @Test
    void getEmailCC() {
        final String expected = "name.surnameCC@xyz.com";
        ctx.currentResource("/content/emailinfo");
        EmailInfo emailinfo1 = ctx.request().adaptTo(EmailInfo.class);
        emailinfo1.setEmailCC(expected);
        String actual = emailinfo1.getEmailCC();
        assertEquals(expected, actual);
    }

    @Test
    void getEmailBCC() {
        final String expected = "name.surnameBCC@xyz.com";
        ctx.currentResource("/content/emailinfo");
        EmailInfo emailinfo1 = ctx.request().adaptTo(EmailInfo.class);
        emailinfo1.setEmailBCC(expected);
        String actual = emailinfo1.getEmailBCC();
        assertEquals(expected, actual);

    }
}