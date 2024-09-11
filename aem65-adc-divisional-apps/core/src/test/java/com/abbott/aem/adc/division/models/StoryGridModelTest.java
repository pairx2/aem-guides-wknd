package com.abbott.aem.adc.division.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.adc.division.models.StoryGridModel;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class StoryGridModelTest {
	
	private final AemContext aemContext = new AemContext(); 
	private static final String PATH = "/content";
  
@BeforeEach
    public void setUp() {
        aemContext.addModelsForClasses(StoryGridModel.class);
        aemContext.load().json("/com/abbott/aem/adc/division/models/StoryGridModelTest.json","/content");        
    }

@Test
void testGetBlock11Image() {  
	     String expected="BlockImage11";	     
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getBlock11Image();
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testSetBlock11Image() {  
	     String expected="BlockImage11";	     
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "BlockImage11";
	     if (storyGridModel != null) {
           storyGridModel.setBlock11Image(actual);
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testGetBlock12Image() {  
	     String expected="BlockImage12";     
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getBlock12Image();
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testSetBlock12Image() {  
	     String expected="BlockImage12";     
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual="BlockImage12";
	     if (storyGridModel != null) {
           storyGridModel.setBlock12Image(actual);
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testGetBlock13Image() {  
	     String expected="BlockImage13";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class); ;    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getBlock13Image();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetBlock13Image() {  
	     String expected="BlockImage13";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class); ;    
	     String actual= "BlockImage13";
	     if (storyGridModel != null) {
           storyGridModel.setBlock13Image(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetBlock14Image() {  
	     String expected="BlockImage14";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getBlock14Image();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetBlock14Image() {  
	     String expected="BlockImage14";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= "BlockImage14";
	     if (storyGridModel != null) {
           storyGridModel.setBlock14Image(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetBlock21Image() {  
	     String expected="BlockImage21";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getBlock21Image();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetBlock21Image() {  
	     String expected="BlockImage21";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "BlockImage21";
	     if (storyGridModel != null) {
          storyGridModel.setBlock21Image(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetBlock22Image() {  
	     String expected="BlockImage22";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);   
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getBlock22Image();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetBlock22Image() {  
	     String expected="BlockImage22";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);   
	     String actual= "BlockImage22";
	     if (storyGridModel != null) {
          storyGridModel.setBlock22Image(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetBlock23Image() {  
	     String expected="BlockImage23";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getBlock23Image();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetBlock23Image() {  
	     String expected="BlockImage23";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "BlockImage23";
	     if (storyGridModel != null) {
          storyGridModel.setBlock23Image(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetBlock33Image() {  
	     String expected="BlockImage33";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getBlock33Image();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetBlock33Image() {  
	     String expected="BlockImage33";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "BlockImage33";
	     if (storyGridModel != null) {
         storyGridModel.setBlock33Image(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta14ImageV1() {  
	     String expected="Cta14Image";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta14ImageV1();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta14ImageV1() {  
	     String expected="Cta14Image";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= "Cta14Image";
	     if (storyGridModel != null) {
         storyGridModel.setCta14ImageV1(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta14QuoteV1() {  
	     String expected="Cta14Quote";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta14QuoteV1();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta14QuoteV1() {  
	     String expected="Cta14Quote";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "Cta14Quote";
	     if (storyGridModel != null) {
          storyGridModel.setCta14QuoteV1(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta14TextV1() {  
	     String expected="Cta14Text";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta14TextV1();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta14TextV1() {  
	     String expected="Cta14Text";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= "Cta14Text";
	     if (storyGridModel != null) {
          storyGridModel.setCta14TextV1(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta14LinkV1() {  
	     String expected="Cta14Link";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);   
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta14LinkV1();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta14LinkV1() {  
	     String expected="Cta14Link";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);   
	     String actual= "Cta14Link";
	     if (storyGridModel != null) {
         storyGridModel.setCta14LinkV1(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta31Image1V1() {  
	     String expected="Cta31Image1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);   
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta31Image1V1();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta31Image1V1() {  
	     String expected="Cta31Image1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);   
	     String actual= "Cta31Image1";
	     if (storyGridModel != null) {
          storyGridModel.setCta31Image1V1(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta31QuoteV1() {  
	     String expected="Cta31Quote";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta31QuoteV1();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta31QuoteV1() {  
	     String expected="Cta31Quote";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= "Cta31Quote";
	     if (storyGridModel != null) {
          storyGridModel.setCta31QuoteV1(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta31TextV1() {  
	     String expected="Cta31Text";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta31TextV1();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta31TextV1() {  
	     String expected="Cta31Text";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "Cta31Text";
	     if (storyGridModel != null) {
           storyGridModel.setCta31TextV1(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta31LinkV1() {  
	     String expected="Cta31Link";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta31LinkV1();
	     }
	     assertEquals(expected, actual); 
   }
@Test
void testSetCta31LinkV1() {  
	     String expected="Cta31Link";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= "Cta31Link";
	     if (storyGridModel != null) {
            storyGridModel.setCta31LinkV1(actual);
	     }
	     assertEquals(expected, actual); 
   }
@Test
void testGetCta31Image1V2() {  
	     String expected="Cta31Image1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta31Image1V2();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta31Image1V2() {  
	     String expected="Cta31Image1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "Cta31Image1";
	     if (storyGridModel != null) {
           storyGridModel.setCta31Image1V2(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta31QuoteV2() {  
	     String expected="Cta31Quote";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta31QuoteV2();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta31QuoteV2() {  
	     String expected="Cta31Quote";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= "Cta31Quote";
	     if (storyGridModel != null) {
          storyGridModel.setCta31QuoteV2(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta31TextV2() {  
	     String expected="Cta31Text";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);   
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta31TextV2();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta31TextV2() {  
	     String expected="Cta31Text";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);   
	     String actual= "Cta31Text";
	     if (storyGridModel != null) {
           storyGridModel.setCta31TextV2(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetcta31LinkV2() {  
	     String expected="Cta31Link";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta31LinkV2();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetcta31LinkV2() {  
	     String expected="Cta31Link";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "Cta31Link";
	     if (storyGridModel != null) {
           storyGridModel.setCta31LinkV2(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetHeader() {  
	     String expected="header";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getHeader();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetHeader() {  
	     String expected="header";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= "header";
	     if (storyGridModel != null) {
         storyGridModel.setHeader(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetDescription() {  
	     String expected="description";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getDescription();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetDescription() {  
	     String expected="description";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "description";
	     if (storyGridModel != null) {
          storyGridModel.setDescription(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetStoryType() {  
	     String expected="storyType";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getStoryType();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetStoryType() {  
	     String expected="storyType";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= "storyType";
	     if (storyGridModel != null) {
          storyGridModel.setStoryType(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetStoryTopic() {  
	     String expected="storyTopic";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getStoryTopic();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetStoryTopic() {  
	     String expected="storyTopic";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= "storyTopic";
	     if (storyGridModel != null) {
           storyGridModel.setStoryTopic(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetProductType() {  
	     String expected="productType";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getProductType();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetProductType() {  
	     String expected="productType";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= "productType";
	     if (storyGridModel != null) {
           storyGridModel.setProductType(actual);
	     }
	     assertEquals(expected, actual);
   }

@Test
void testGetAgeRange() {  
	     String expected="ageRange";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getAgeRange();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetAgeRange() {  
	     String expected="ageRange";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= "ageRange";
	     if (storyGridModel != null) {
          storyGridModel.setAgeRange(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetSeeMoreText() {  
	     String expected="seeMoreText";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getSeeMoreText();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetSeeMoreText() {  
	     String expected="seeMoreText";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);     
	     String actual= "seeMoreText";
	     if (storyGridModel != null) {
          storyGridModel.setSeeMoreText(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetLeftArrowImage() {  
	     String expected="leftArrowImage";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getLeftArrowImage();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetLeftArrowImage() {  
	     String expected="leftArrowImage";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "leftArrowImage";
	     if (storyGridModel != null) {
           storyGridModel.setLeftArrowImage(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta31Image1V3() {  
	     String expected="Cta31Image1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta31Image1V3();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta31Image1V3() {  
	     String expected="Cta31Image1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "Cta31Image1";
	     if (storyGridModel != null) {
          storyGridModel.setCta31Image1V3(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta31QuoteV3() {  
	     String expected="cta31QuoteV3";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta31QuoteV3();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta31QuoteV3() {  
	     String expected="cta31QuoteV3";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "cta31QuoteV3";
	     if (storyGridModel != null) {
            storyGridModel.setCta31QuoteV3(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta31TextV3() {  
	     String expected="cta31TextV3";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta31TextV3();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta31TextV3() {  
	     String expected="cta31TextV3";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "cta31TextV3";
	     if (storyGridModel != null) {
         storyGridModel.setCta31TextV3(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta31LinkV3() {  
	     String expected="cta31LinkV3";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta31LinkV3();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta31LinkV3() {  
	     String expected="cta31LinkV3";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "cta31LinkV3";
	     if (storyGridModel != null) {
          storyGridModel.setCta31LinkV3(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta32Image2V1() {  
	     String expected="cta32Image2V1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta32Image2V1();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta32Image2V1() {  
	     String expected="cta32Image2V1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "cta32Image2V1";
	     if (storyGridModel != null) {
          storyGridModel.setCta32Image2V1(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta32QuoteV1() {  
	     String expected="cta32QuoteV1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta32QuoteV1();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetCta32QuoteV1() {  
	     String expected="cta32QuoteV1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "cta32QuoteV1";
	     if (storyGridModel != null) {
         storyGridModel.setCta32QuoteV1(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta32TextV1() {  
	     String expected="cta32TextV1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta32TextV1();
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testSetCta32TextV1() {  
	     String expected="cta32TextV1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "cta32TextV1";
	     if (storyGridModel != null) {
          storyGridModel.setCta32TextV1(actual);
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testGetCta32LinkV1() {  
	     String expected="cta32LinkV1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta32LinkV1();
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testSetCta32LinkV1() {  
	     String expected="cta32LinkV1";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "cta32LinkV1";
	     if (storyGridModel != null) {
         storyGridModel.setCta32LinkV1(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetCta32Image2V2() {  
	     String expected="cta32Image2V2";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta32Image2V2();
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testSetCta32Image2V2() {  
	     String expected="cta32Image2V2";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "cta32Image2V2";
	     if (storyGridModel != null) {
          storyGridModel.setCta32Image2V2(actual);
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testGetCta32QuoteV2() {  
	     String expected="cta32QuoteV2";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta32QuoteV2();
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testSetCta32QuoteV2() {  
	     String expected="cta32QuoteV2";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "cta32QuoteV2";
	     if (storyGridModel != null) {
         storyGridModel.setCta32QuoteV2(actual);
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testGetCta32TextV2() {  
	     String expected="cta32TextV2";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta32TextV2();
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testSetCta32TextV2() {  
	     String expected="cta32TextV2";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "cta32TextV2";
	     if (storyGridModel != null) {
          storyGridModel.setCta32TextV2(actual);
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testGetCta32LinkV2() {  
	     String expected="cta32LinkV2";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getCta32LinkV2();
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testSetCta32LinkV2() {  
	     String expected="cta32LinkV2";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "cta32LinkV2";
	     if (storyGridModel != null) {
         storyGridModel.setCta32LinkV2(actual);
	     }
	     assertEquals(expected, actual);
   } 
@Test
void testGetRightArrowImage() {  
	     String expected="RightArrowImage";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getRightArrowImage();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetRightArrowImage() {  
	     String expected="RightArrowImage";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "RightArrowImage";
	     if (storyGridModel != null) {
         storyGridModel.setRightArrowImage(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetStoryPopupAgeRange() {  
	     String expected="StoryPopupAgeRange";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getStoryPopupAgeRange();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetStoryPopupAgeRange() {  
	     String expected="StoryPopupAgeRange";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "StoryPopupAgeRange";
	     if (storyGridModel != null) {
           storyGridModel.setStoryPopupAgeRange(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetStoryPopupProductType() {  
	     String expected="StoryPopupProductType";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getStoryPopupProductType();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetStoryPopupProductType() {  
	     String expected="StoryPopupProductType";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "StoryPopupProductType";
	     if (storyGridModel != null) {
           storyGridModel.setStoryPopupProductType(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetDisclaimer() {  
	     String expected="Disclaimer";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getDisclaimer();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetDisclaimer() {  
	     String expected="Disclaimer";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "Disclaimer";
	     if (storyGridModel != null) {
          storyGridModel.setDisclaimer(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetStoryPopupShareStoryText() {  
	     String expected="StoryPopupShareStoryText";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getStoryPopupShareStoryText();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetStoryPopupShareStoryText() {  
	     String expected="StoryPopupShareStoryText";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "StoryPopupShareStoryText";
	     if (storyGridModel != null) {
           storyGridModel.setStoryPopupShareStoryText(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetStoryPopupStoryType() {  
	     String expected="StoryPopupStoryType";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getStoryPopupStoryType();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetStoryPopupStoryType() {  
	     String expected="StoryPopupStoryType";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "StoryPopupStoryType";
	     if (storyGridModel != null) {
          storyGridModel.setStoryPopupStoryType(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetStoryPopuStoryTopic() {  
	     String expected="StoryPopuStoryTopic";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getStoryPopuStoryTopic();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetStoryPopuStoryTopic() {  
	     String expected="StoryPopuStoryTopic";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "StoryPopuStoryTopic";
	     if (storyGridModel != null) {
         storyGridModel.setStoryPopuStoryTopic(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetFbShareLabel() {  
	     String expected="FbShareLabel";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getFbShareLabel();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetFbShareLabel() {  
	     String expected="FbShareLabel";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "FbShareLabel";
	     if (storyGridModel != null) {
           storyGridModel.setFbShareLabel(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetTwitterShareLabel() {  
	     String expected="TwitterShareLabel";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
           actual = storyGridModel.getTwitterShareLabel();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetTwitterShareLabel() {  
	     String expected="TwitterShareLabel";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "TwitterShareLabel";
	     if (storyGridModel != null) {
           storyGridModel.setTwitterShareLabel(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetLearnMore() {  
	     String expected="LearnMore";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
	    	 actual= storyGridModel.getLearnMore();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetLearnMore() {  
	     String expected="LearnMore";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "LearnMore";
	     if (storyGridModel != null) {
          storyGridModel.setLearnMore(actual);
	     }
	     assertEquals(expected, actual);
   }
@Test
void testGetTargetLink() {  
	     String expected="TargetLink";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= StringUtils.EMPTY;
	     if (storyGridModel != null) {
	    	 actual= storyGridModel.getTargetLink();
	     }
	     assertEquals(expected, actual);
   }
@Test
void testSetTargetLink() {  
	     String expected="TargetLink";
	     StoryGridModel storyGridModel = aemContext.currentResource("/content/storygrid").adaptTo(StoryGridModel.class);    
	     String actual= "TargetLink";
	     if (storyGridModel != null) {
	    	 storyGridModel.setTargetLink(actual);
	     }
	     assertEquals(expected, actual);
   }
}
