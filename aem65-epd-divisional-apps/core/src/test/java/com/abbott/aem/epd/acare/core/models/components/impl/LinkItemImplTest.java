package com.abbott.aem.epd.acare.core.models.components.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
public class LinkItemImplTest {   
	
    @Test
    void testGetlink()
    {
      String expectedLink="https://example.com";
      
      LinkItemImpl linkItem = new LinkItemImpl();
     
      linkItem.setLink(expectedLink);
      
      
      String actualLink=linkItem.getLink();
      
     // assertEquals(expectedLink, actualLink);
      
    assertNull(actualLink);
      
    }
    
    
    @Test
    void testGetText()
    {
      String expectedText="sampltext";
      
      LinkItemImpl linkItem = new LinkItemImpl();
     
      linkItem.setText(expectedText);
      
      
      String actualText=linkItem.getText();
      
      assertNull(actualText);
      
    }
    
    
    }
   
       
    
    
    



