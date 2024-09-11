package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.FloatingActionButton;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;



@ExtendWith(AemContextExtension.class)

class FloatingActionButtonImplTest {

	private final AemContext ctx = new AemContext();
	private ProxyComponentService proxyComponentService;
	private Component component;
   

    @BeforeEach
    void setUp() throws Exception {
    	proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		
        ctx.addModelsForClasses(FloatingActionButtonImpl.class );
        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/FloatingActionButtonImplTest.json", "/content");
        
        
    }

   
     @Test
	final void testGetButtonStyle() {
		final String expected = "Full-width";
		ctx.currentResource("/content/floatingactionbutton");
		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
		String actual = floatingactionbutton.getButtonStyle();
		assertEquals(expected, actual);
	}
   
    @Test
  	final void testGetButtonIcon() {
  		final String expected = "icon_sample";
  		ctx.currentResource("/content/floatingactionbutton");
  		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
  		String actual = floatingactionbutton.getButtonIcon();
  		assertEquals(expected, actual);
  	}
    
    @Test
   	final void testGetButtonType() {
   		final String expected = "url";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getButtonType();
   		assertEquals(expected, actual);
   	}

  
    @Test
   	final void testGetButtonText() {
   		final String expected = "FLOATBUTTON";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getButtonText();
   		assertEquals(expected, actual);
   	}


    @Test
   	final void testGetButtonColor() {
   		final String expected = "primary-button";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getButtonColor();
   		assertEquals(expected, actual);
   	}
    
   
    @Test
   	final void testGetButtonSize() {
   		final String expected = "large";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getButtonSize();
   		assertEquals(expected, actual);
   	}


    @Test
   	final void testGetUrlLink() {
   		final String expected = "https://www.abbott.co.in/";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getUrlLink();
   		assertEquals(expected, actual);
   	}


    @Test
   	final void testGetTargetNewWindow() {
   		final String expected = "true";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getTargetNewWindow();
   		assertEquals(expected, actual);
   	}
    
   
    @Test
   	final void testGetRedirectConfirm() {
   		final String expected = "true";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getRedirectConfirm();
   		assertEquals(expected, actual);
   	}
   
    @Test
   	final void testGetAnchorName() {
   		final String expected = "anchor";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getAnchorName();
   		assertEquals(expected, actual);
   	}

    
    @Test
   	final void testGetMediaId() {
   		final String expected = "96509be644984210b51b42f6fb811762";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getMediaId();
   		assertEquals(expected, actual);
   	}

   
    @Test
   	final void testGetPlayerId() {
   		final String expected = "limelight_player_1";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getPlayerId();
   		assertEquals(expected, actual);
   	}
    
   
    @Test
   	final void testGetOrgId() {
   		final String expected = "b0029788f6f3415db64a9cf5452f5200";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getOrgId();
   		assertEquals(expected, actual);
   	}

   
    @Test
   	final void testGetVideoId() {
   		final String expected = "aYBGV8ssve4";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getVideoId();
   		assertEquals(expected, actual);
   	}


    @Test
   	final void testGetPhoneNumber() {
   		final String expected = "9999999999";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getPhoneNumber();
   		assertEquals(expected, actual);
   	}

   
    @Test
   	final void testGetAssetLink() {
   		final String expected = "https://qa-author1.aws-aem1.abbott.com/content/dam/ALFA-ROMEO-4C-0.jpg";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getAssetLink();
   		assertEquals(expected, actual);
   	}
    
    
    @Test
   	final void testGetModalUrl() {
   		final String expected = "/content/ef";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getModalUrl();
   		assertEquals(expected, actual);
   	}

	
	@Test
   	final void testGetModalIcon() {
   		final String expected = "icon_sample";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getModalIcon();
   		assertEquals(expected, actual);
   	}

	
	@Test
   	final void testGetModalTitle() {
   		final String expected = "Modal Title";
   		ctx.currentResource("/content/floatingactionbutton");
   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
   		String actual = floatingactionbutton.getModalTitle();
   		assertEquals(expected, actual);
   	}
	

	 @Test
	   	final void testGetHideButtonText() {
	   		final String expected = "true";
	   		ctx.currentResource("/content/floatingactionbutton");
	   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
	   		String actual = floatingactionbutton.getHideButtonText();
	   		assertEquals(expected, actual);
	   	}
	 @Test
	   	final void testGetIconPosition() {
	   		final String expected = "left";
	   		ctx.currentResource("/content/floatingactionbutton");
	   		FloatingActionButton floatingactionbutton = ctx.request().adaptTo(FloatingActionButton.class);
	   		String actual = floatingactionbutton.getIconPosition();
	   		assertEquals(expected, actual);
	   	}

}
