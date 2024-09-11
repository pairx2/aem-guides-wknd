package com.abbott.aem.corp.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.text.ParseException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.corp.division.core.components.models.PressReleaseDynamicPull;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class PressReleaseDynamicPullImplTest {
	
	private final AemContext ctx = new AemContext();
	PressReleaseDynamicPull pressReleaseDynamicPull;
	
	@Mock
	private PageManager pageManager;
	
	@Mock
	private Page page;
	
	
	@BeforeEach
	public void setUp() throws Exception {
				
		ctx.addModelsForClasses(PressReleaseDynamicPullImpl.class);
       	
	}

	@Test
    void testGetTitle() {
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullImpl.json", "/content/corp/abbott/us/en/corpnewsroom/utilities/executive-team/robert-ford");
		ctx.currentResource("/content/corp/abbott/us/en/corpnewsroom/utilities/executive-team/robert-ford/jcr:content");
		pressReleaseDynamicPull = ctx.request().adaptTo(PressReleaseDynamicPull.class);
        final String titleExpected = "Nueva Prueba De";
        String titleActual = pressReleaseDynamicPull.getTitle();
        assertEquals(titleExpected, titleActual);
    }
	
	@Test
    void testGetDescription() {
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullImpl.json", "/content/corp/abbott/us/en/corpnewsroom/utilities/executive-team/robert-ford");
		ctx.currentResource("/content/corp/abbott/us/en/corpnewsroom/utilities/executive-team/robert-ford/jcr:content");
		pressReleaseDynamicPull = ctx.request().adaptTo(PressReleaseDynamicPull.class);
        final String descriptionExpected = "Confiable y asequible. Estamos lanzando";
        String descriptionActual = pressReleaseDynamicPull.getDescription();
        assertEquals(descriptionExpected, descriptionActual);
    }
	
	@Test
    void testGetPressDate() {
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullImpl.json", "/content/corp/abbott/us/en/corpnewsroom/utilities/executive-team/robert-ford");
		ctx.currentResource("/content/corp/abbott/us/en/corpnewsroom/utilities/executive-team/robert-ford/jcr:content");
		pressReleaseDynamicPull = ctx.request().adaptTo(PressReleaseDynamicPull.class);
        final String pressDateExpected = "2023-06-09T02:15:00.000+05:30";
        String pressDateActual = pressReleaseDynamicPull.getPressDate();
        assertEquals(pressDateExpected, pressDateActual);
    }
	
	@Test
    void testPresDateError() throws ParseException {
		
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullImplErr.json", "/content/err");
		ctx.currentResource("/content/err");
		pressReleaseDynamicPull = ctx.request().adaptTo(PressReleaseDynamicPull.class);
		
	}
	
	@Test
    void testGetProfileImage() {
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullImpl.json", "/content/corp/abbott/us/en/corpnewsroom/utilities/executive-team/robert-ford");
		ctx.currentResource("/content/corp/abbott/us/en/corpnewsroom/utilities/executive-team/robert-ford/jcr:content");
		pressReleaseDynamicPull = ctx.request().adaptTo(PressReleaseDynamicPull.class);
        final String profileImgExpected = "/content/dam/corp/abbott/en-us/redesign/experts/Ford-Robert1-360x380_910x460.jpg";
        String profileImgActual = pressReleaseDynamicPull.getProfileImage();
        assertEquals(profileImgExpected, profileImgActual);
    }
	
	
	@Test
    void testArticleSubTitle() {
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullImpl.json", "/content/corp/abbott/us/en/corpnewsroom/utilities/executive-team/robert-ford");
		ctx.currentResource("/content/corp/abbott/us/en/corpnewsroom/utilities/executive-team/robert-ford/jcr:content");
		pressReleaseDynamicPull = ctx.request().adaptTo(PressReleaseDynamicPull.class);
        assertNotNull(pressReleaseDynamicPull.getArticleColor());
        assertNotNull(pressReleaseDynamicPull.getArticleDate());
        assertNotNull(pressReleaseDynamicPull.getArticleDescription());
        assertNotNull(pressReleaseDynamicPull.getArticleImage());
        assertNotNull(pressReleaseDynamicPull.getArticleSubTitle());
        assertNotNull(pressReleaseDynamicPull.getCategoryTitle());
        
    }
	

	
}
