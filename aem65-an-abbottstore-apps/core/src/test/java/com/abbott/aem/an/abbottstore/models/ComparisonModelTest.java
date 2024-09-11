package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.impl.UrlConfigServiceImpl;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class ComparisonModelTest {

    Map<String, Object> properties;
    private ComparisonModel comparisonModel;

    @BeforeEach
    public void setup(AemContext context)  {

        context.registerInjectActivateService(new UrlConfigServiceImpl());
        Page page = context.create().page("/content/abbott/en/test");
        properties = new HashMap<>();
        properties.put("sling:resourceType", "abbott/components/content/comparisonmodel");
        properties.put("bgColor", "#000000");
        properties.put("title", "Title");
        properties.put("titleColor", "#ffffff");
        properties.put("subText1", "Sub Text1");
        properties.put("subText2", "Sub Text2");
        properties.put("subText3", "Sub Text3");
        properties.put("text", "Comparison Model Text");
        properties.put("buttonLabel", "Button Label");
        properties.put("buttonLink", "/content/abbott/en/test");
        properties.put("compareItems","compareItems");

        Resource resource = context.create().resource(page, "test", properties);
        comparisonModel = resource.adaptTo(ComparisonModel.class);
    }
    @Test
    public void testGetBgColor() {
        assertEquals("#000000", comparisonModel.getBgColor());
    }

    @Test
    public void testGetTitle() {
        assertEquals("Title", comparisonModel.getTitle());
    }

    @Test
    public void testGetTitleColor() {
        assertEquals("#ffffff", comparisonModel.getTitleColor());
    }

    @Test
    public void testGetSubText1() {
        assertEquals("Sub Text1", comparisonModel.getSubText1());
    }

    @Test
    public void testGetSubText2() {
        assertEquals("Sub Text2", comparisonModel.getSubText2());
    }

    @Test
    public void testGetSubText3() {
        assertEquals("Sub Text3", comparisonModel.getSubText3());
    }

    @Test
    public void testGetText() {
        assertEquals("Comparison Model Text", comparisonModel.getText());
    }

    @Test
    public void testGetButtonLabel() {
        assertEquals("Button Label", comparisonModel.getButtonLabel());
    }

    @Test
    public void testGetButtonLink() {
        assertEquals("/content/abbott/en/test.html", comparisonModel.getButtonLink());
    }

    @Test
    public void testGetCompareItems(){
        assertTrue(comparisonModel.getCompareItems().size()==0);
    }
}
