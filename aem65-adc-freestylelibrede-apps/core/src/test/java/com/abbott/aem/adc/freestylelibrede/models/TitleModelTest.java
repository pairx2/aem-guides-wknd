package com.abbott.aem.adc.freestylelibrede.models;

import java.lang.reflect.Field;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.adobe.cq.wcm.core.components.models.Title;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class TitleModelTest extends BaseModelTest<TitleModel> {

       public final AemContext context = new AemContext();

       @InjectMocks
       private TitleModel model;
       
       @Mock
       Title titleModel ;
       
       @BeforeEach
       void setup() {
             MockitoAnnotations.initMocks(this);
             
       }

       @Test
       void testTextColor() {
             String textColor = "Text Color";
             try {
                    Field canonicalUrlField = model.getClass().getDeclaredField("textColor");
                    canonicalUrlField.setAccessible(true);
                    canonicalUrlField.set(model, textColor);
             } catch (NoSuchFieldException | IllegalAccessException e) {
                    Assert.fail("Exception occurred in getTextColor" + e.getMessage());
             }
             Assert.assertEquals("Text Color",model.getTextColor());
       }
       
       @Test
       void testCardDisplay() {
             boolean cardDisplay = true;
             try {
                    Field canonicalUrlField = model.getClass().getDeclaredField("cardDisplay");
                    canonicalUrlField.setAccessible(true);
                    canonicalUrlField.set(model, cardDisplay);
             } catch (NoSuchFieldException | IllegalAccessException e) {
                    Assert.fail("Exception occurred in getCardDisplay" + e.getMessage());
             }
             Assert.assertEquals(true,model.getCardDisplay());
       }
       
       @Test
       void testTextAlignment() {
             String textAlignment = "left";
             try {
                    Field canonicalUrlField = model.getClass().getDeclaredField("textAlignment");
                    canonicalUrlField.setAccessible(true);
                    canonicalUrlField.set(model, textAlignment);
             } catch (NoSuchFieldException | IllegalAccessException e) {
                    Assert.fail("Exception occurred in getTextAlignment" + e.getMessage());
             }
             Assert.assertEquals("left",model.getTextAlignment());
       }
       
       @Test
       void testAdditionalClass() {
             String titleClass = "faq-title";
             try {
                    Field canonicalUrlField = model.getClass().getDeclaredField("additionalClass");
                    canonicalUrlField.setAccessible(true);
                    canonicalUrlField.set(model, titleClass);
             } catch (NoSuchFieldException | IllegalAccessException e) {
                    Assert.fail("Exception occurred in testAdditionalClass" + e.getMessage());
             }
             Assert.assertEquals("faq-title",model.getAdditionalClass());
       }
            
}
