package com.abbott.aem.epd.acare.core.models.components.impl;

import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
public class SocialImageImplTest {   
	
    @Test
    void testGetlink()
    {
      String expectedLink="https://example.com";
      
      SocialImageImpl linkItem = new SocialImageImpl();
     
      linkItem.setLink(expectedLink);
      
      
      String actualLink=linkItem.getLink();
      
      
    assertNull(actualLink);
      
    }
    
    
    @Test
    void testGetsocialAltText()
    {
      String expectedText="sampltext";
      
      SocialImageImpl linkItem = new SocialImageImpl();
     
      linkItem.setSocialAltText(expectedText);
      
      
      String actualText=linkItem.getSocialAltText();
      
      assertNull(actualText);
      
    }
    
    
    
    @Test
    void testGetsocialIcon()
    {
      String expectedText="twitter";
      
      SocialImageImpl linkItem = new SocialImageImpl();
     
      linkItem.setSocialIcon(expectedText);
      
      
      String actualText=linkItem.getSocialIcon();
      
      assertNull(actualText);
      
    }
    
    }
   
       
    
    
    



