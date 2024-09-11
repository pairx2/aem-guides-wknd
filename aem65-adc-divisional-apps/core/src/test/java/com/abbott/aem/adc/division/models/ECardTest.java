package com.abbott.aem.adc.division.models;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;


import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;


@ExtendWith(AemContextExtension.class)
class ECardTest {

	private final AemContext aemContext = new AemContext();
	private static final String PATH = "/content";
  
@BeforeEach
    public void setUp() {
        aemContext.addModelsForClasses(ECard.class);
        aemContext.load().json("/com/abbott/aem/adc/division/models/ECardTest.json","/content");        
    }

@Test
 void testGetPageTypeName() {  
	     String expected="MyPage";
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);
	     String actual= StringUtils.EMPTY;	  
	     if (eCard != null) {
            actual = eCard.getPageTypeName();
        }
        assertEquals(expected, actual);
    }

@Test
void testSetPageTypeName() {  
	     String expected="MyPage";
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);
	     String actual= "MyPage";	  
	     if (eCard != null) {
          eCard.setPageTypeName(actual);
       }
       assertEquals(expected, actual);
   }

@Test
void testGetBinLabel() {  
	     String expected="BIN"; 
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);
	     String actual= StringUtils.EMPTY;
	     if (eCard != null) {
           actual = eCard.getBinLabel();
	     }	     																
	     assertEquals(expected, actual);
   }

@Test
void testSetBinLabel() {  
	     String expected="BIN"; 
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);
	     String actual= "BIN";
	     if (eCard != null) {
	    	 eCard.setBinLabel(actual);
	     }	     																
	     assertEquals(expected, actual);
   }

@Test
void testGetGroupLabel() {  
	     String expected="GROUP";	     
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);    
	     String actual= StringUtils.EMPTY;
	     if (eCard != null) {
           actual = eCard.getGroupLabel();
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testSetGroupLabel() {  
	     String expected="GROUP";	     
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);    
	     String actual= "GROUP";
	     if (eCard != null) {
           eCard.setGroupLabel(actual);
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testGetMemberidLabel() {  
	     String expected="MemberIDLabel";     
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= StringUtils.EMPTY;
	     if (eCard != null) {
           actual = eCard.getMemberidLabel();
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testSetMemberidLabel() {  
	     String expected="MemberIDLabel";     
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= "MemberIDLabel";
	     if (eCard != null) {
          eCard.setMemberidLabel(actual);
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testGetExplabel() {  
	     String expected="Expiration";     
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= StringUtils.EMPTY;
	     if (eCard != null) {
           actual = eCard.getExplabel();
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testSetExplabel() {  
	     String expected="Expiration";     
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= "Expiration"; 
	     if (eCard != null) {
      eCard.setExplabel(actual);
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testGetCardSectionText() {  
	     String expected="CardSectionText";	     
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);    
	     String actual= StringUtils.EMPTY;
	     if (eCard != null) {
           actual = eCard.getCardSectionText();
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testSetCardSectionText() {  
	     String expected="CardSectionText";	     
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);    
	     String actual="CardSectionText";
	     if (eCard != null) {
           eCard.setCardSectionText(actual);
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testGetCardNumber() {  
	     String expected="CardNumber";    
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= StringUtils.EMPTY;
	     if (eCard != null) {
           actual = eCard.getCardNumber();
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testSetCardNumber() {  
    String expected="CardNumber";    
    ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
    String actual= "CardNumber";
    if (eCard != null) {
     eCard.setCardNumber(actual);
    }	     																
    assertEquals(expected, actual);
}
@Test
void testGetLogoImage() {  
	     String expected="logoImage";    
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= StringUtils.EMPTY;
	     if (eCard != null) {
           actual = eCard.getLogoImage();
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testSetLogoImage() {  
	     String expected="logoImage";    
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= "logoImage";
	     if (eCard != null) {
           eCard.setLogoImage(actual);
	     }	     																
	     assertEquals(expected, actual);
   }

@Test
void testGetLogoImgAltText() {  
	     String expected="logoImgAltText";    
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= StringUtils.EMPTY;
	     if (eCard != null) {
           actual = eCard.getLogoImgAltText();
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testSetLogoImgAltText() {  
	     String expected="logoImgAltText";    
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual="logoImgAltText";
	     if (eCard != null) {
           eCard.setLogoImgAltText(actual);
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testGetRightheading() {  
	     String expected="rightheading";    
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= StringUtils.EMPTY;
	     if (eCard != null) {
           actual = eCard.getRightheading();
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testSetRightheading() {  
	     String expected="rightheading";    
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= "rightheading";
	     if (eCard != null) {
           eCard.setRightheading(actual);
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testGetRightSubSection() {  
	     String expected="rightSubSection";    
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= StringUtils.EMPTY;
	     if (eCard != null) {
           actual = eCard.getRightSubSection();
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testSetRightSubSection() {  
	     String expected="rightSubSection";    
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= "rightSubSection";
	     if (eCard != null) {
         eCard.setRightSubSection(actual);
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testGetCardheading() {  
	     String expected="cardheading";    
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= StringUtils.EMPTY;
	     if (eCard != null) {
           actual = eCard.getCardheading();
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testSetCardheading() {  
	     String expected="cardheading";    
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= "cardheading";
	     if (eCard != null) {
           eCard.setCardheading(actual);
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testGetFootnotes() {  
	     String expected="footnotes";    
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= StringUtils.EMPTY;
	     if (eCard != null) {
           actual = eCard.getFootnotes();
	     }	     																
	     assertEquals(expected, actual);
   }
@Test
void testSetFootnotes() {  
	     String expected="footnotes";    
	     ECard eCard = aemContext.currentResource("/content/ecard").adaptTo(ECard.class);   
	     String actual= "footnotes";
	     if (eCard != null) {
           eCard.setFootnotes(actual);
	     }	     																
	     assertEquals(expected, actual);
   }
}