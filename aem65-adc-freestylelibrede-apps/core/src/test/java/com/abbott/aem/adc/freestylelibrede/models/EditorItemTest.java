package com.abbott.aem.adc.freestylelibrede.models;

import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.Assert;
import org.apache.sling.i18n.ResourceBundleProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class EditorItemTest extends BaseModelTest {

    public AemContext context = new AemContext();

    EditorItem item;

    @Mock
    private ResourceBundleProvider mockResourceBundleProvider;



    @Mock
    private Component component;

    @BeforeEach
    void setUp() throws IOException {

        ResourceBundle resourceBundle = new PropertyResourceBundle(this.getClass().getResourceAsStream("/de_DE.properties"));
        context.registerService(ResourceBundleProvider.class, mockResourceBundleProvider);
        when(mockResourceBundleProvider.getResourceBundle(any(), any())).thenReturn(resourceBundle);

        loadResource("/com.abbott.aem.adc.freestylelibrede.models.EditorItemComponent.json","/apps/adc/freestylelibrede/components/commons/editor-item-mock");

       item = new EditorItem(context.request(), loadResource(EditorItem.class));
    }

    @Test
    void getIconClass() {
        Assert.assertEquals("css-class",item.getIconClass());
    }

    @Test
    void getAccountNavEvent(){
        Assert.assertEquals("accountNavEvent", item.getAccountNavEvent());
    }

    @Override
    protected AemContext getContext() {
        return context;
    }
}