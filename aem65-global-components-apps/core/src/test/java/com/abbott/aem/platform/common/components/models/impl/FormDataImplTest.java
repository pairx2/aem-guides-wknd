package com.abbott.aem.platform.common.components.models.impl;

import java.lang.reflect.Field;
import java.util.List;


import com.abbott.aem.platform.common.components.models.FormData;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class FormDataImplTest {

    private static String PATH = "/content/formdata";

    private final AemContext ctx = new AemContext();

    private ProxyComponentService proxyComponentService;

    private Component component;

    private FormDataImpl formdata;

    @BeforeEach
    void setup() throws Exception{
        proxyComponentService = Mockito.mock(ProxyComponentService.class);
        component = Mockito.mock(Component.class);
        ProxyPaths path = null;
        Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("Hello");
        ctx.registerService(ProxyComponentService.class, proxyComponentService);

        ctx.addModelsForClasses(FormDataImpl.class);
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/FormDataImplTest.json", "/content");

        formdata = new FormDataImpl();

        Field numberOfButtonsField = FormDataImpl.class.getDeclaredField("numberOfButtons");
        numberOfButtonsField.setAccessible(true);
        numberOfButtonsField.set(formdata, 5);
    }


    @Test
    void getDataSource() {
        ctx.currentResource(FormDataImplTest.PATH);
        FormData formData = ctx.request().adaptTo(FormData.class);
        assertEquals("dataSource", formData.getDataSource());
    }

    @Test
    void getDisplayOutput() {
        ctx.currentResource(FormDataImplTest.PATH);
        FormData formData = ctx.request().adaptTo(FormData.class);
        assertEquals("displayOutput", formData.getDisplayOutput());
    }

    @Test
    void getTargetDataSource() {
        ctx.currentResource(FormDataImplTest.PATH);
        FormData formData = ctx.request().adaptTo(FormData.class);
        assertEquals("targetDataSource", formData.getTargetDataSource());
    }

    @Test
    void getNumberOfButtons() {
        ctx.currentResource(FormDataImplTest.PATH);
        FormData formData = ctx.request().adaptTo(FormData.class);
        assertEquals(0, formData.getNumberOfButtons());
    }

    @Test
    void getTitle() {
        ctx.currentResource(FormDataImplTest.PATH);
        FormData formData = ctx.request().adaptTo(FormData.class);
        assertEquals("title", formData.getTitle());
    }

    @Test
    void getButtonPosition() {
        ctx.currentResource(FormDataImplTest.PATH);
        FormData formData = ctx.request().adaptTo(FormData.class);
        assertEquals("buttonPosition", formData.getButtonPosition());
    }

    @Test
    void testGetListOfButtons() {
        List<String> result = formdata.getListOfButtons();

        assertEquals(5, result.size());
        for (int i = 0; i < 5; i++) {
            assertEquals("btn-" + i, result.get(i));
        }
    }

}