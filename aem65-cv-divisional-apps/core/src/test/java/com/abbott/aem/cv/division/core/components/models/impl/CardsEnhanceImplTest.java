package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.CardsEnhance;
import com.abbott.aem.platform.common.components.models.Cards;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
class CardsEnhanceImplTest {

	@InjectMocks
	private CardsEnhanceImpl model = new CardsEnhanceImpl();

	@Mock
	private Cards cards;
	
    private final AemContext ctx = new AemContext();
    private ProxyComponentService proxyComponentService;
	private Component component;
    private static final String PATH = "/content/Card";

    @BeforeEach
    public void setUp() {
    	proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
        ctx.addModelsForClasses(CardsEnhance.class);
        ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/CardsEnhanceImplTest.json", "/content");
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getLinkType() {
        final String expected = "downloadAsset";
        ctx.currentResource(PATH);
        CardsEnhance cardsenhance = ctx.request().adaptTo(CardsEnhance.class);
        String actual = cardsenhance.getLinkType();
        assertEquals(expected, actual);
    }

    @Test
    void getAnchorName() {
        final String expected = "anchor";
        ctx.currentResource(PATH);
        CardsEnhance cardsenhance = ctx.request().adaptTo(CardsEnhance.class);
        String actual = cardsenhance.getAnchorName();
        assertEquals(expected, actual);
    }
    
    @Test
    void getMediaID() {
        final String expected = "96509be644984210b51b42f6fb811762";
        ctx.currentResource(PATH);
        CardsEnhance cardsenhance = ctx.request().adaptTo(CardsEnhance.class);
        String actual = cardsenhance.getMediaID();
        assertEquals(expected, actual);
    }
    
    @Test
    void getLimelightPlayerID() {
        final String expected = "limelight_player_1";
        ctx.currentResource(PATH);
        CardsEnhance cardsenhance = ctx.request().adaptTo(CardsEnhance.class);
        String actual = cardsenhance.getLimelightPlayerID();
        assertEquals(expected, actual);
    }
    
    @Test
    void getOrgID() {
        final String expected = "b0029788f6f3415db64a9cf5452f5200";
        ctx.currentResource(PATH);
        CardsEnhance cardsenhance = ctx.request().adaptTo(CardsEnhance.class);
        String actual = cardsenhance.getOrgID();
        assertEquals(expected, actual);
    }
    
    @Test
    void getVideoURL() {
        final String expected = "https://www.youtube.com/embed/tgbNymZ7vqY";
        ctx.currentResource(PATH);
        CardsEnhance cardsenhance = ctx.request().adaptTo(CardsEnhance.class);
        String actual = cardsenhance.getVideoURL();
        assertEquals(expected, actual);
    }
    
    @Test
    void getImage() {
        final String expected = "/content/dam/epd/medicine/poc/08 Hipertensión y Colesterol.jpeg";
        ctx.currentResource(PATH);
        CardsEnhance cardsenhance = ctx.request().adaptTo(CardsEnhance.class);
        String actual = cardsenhance.getImage();
        assertEquals(expected, actual);
    }
    
    @Test
    void getPhoneNumber() {
        final String expected = "9884784827";
        ctx.currentResource(PATH);
        CardsEnhance cardsenhance = ctx.request().adaptTo(CardsEnhance.class);
        String actual = cardsenhance.getPhoneNumber();
        assertEquals(expected, actual);
    }
    
    @Test
	public void testGetTitle() {
		model.getTitle();
	}

	@Test
	public void testGetId() {
		model.getId();
	}

	@Test
	public void testGetData() {
		model.getData();
	}

	@Test
	public void testGetAppliedCssClasses() {
		model.getAppliedCssClasses();
	}

	@Test
	public void testGetExportedType() {
		model.getExportedType();
	}
	
    @Test
	public void testGetHoverText() {
		model.getHoverText();
	}
 
    @Test
   	public void testGetModalIcon() {
   		model.getModalIcon();
   	}
   
    @Test
   	public void testGetExpFragPathVideo() {
   		model.getExpFragPathVideo();
   	}
    
    @Test
   	public void testGetAction() {
   		model.getAction();
   	}
    
    @Test
   	public void testGetExternal() {
   		model.getExternal();
   	}
    
    @Test
   	public void testGetCtaTwo() {
   		model.getCtaTwo();
   	}
    
    @Test
   	public void testGetCtaOne() {
   		model.getCtaOne();
   	}
    
    @Test
   	public void testGetCardLink() {
   		model.getCardLink();
   	}
    
    @Test
   	public void testGetLink() {
   		model.getLink();
   	}
    
    @Test
   	public void testGetActions() {
   		model.getActions();
   	}
    
    @Test
   	public void testGetPretitle() {
   		model.getPretitle();
   	}
    
    @Test
   	public void testGetDescription() {
   		model.getDescription();
   	}
    
    @Test
   	public void testGetTitleType() {
   		model.getTitleType();
   	}
    
    @Test
   	public void testGetImageResource() {
   		model.getImageResource();
   	}
    
    @Test
   	public void testIsClickable() {
   		model.isClickable();
   	}
    
    @Test
   	public void testIsActionsEnabled() {
   		model.isActionsEnabled();
   	}
     
    @Test
   	public void testIsImageLinkHidden() {
   		model.isImageLinkHidden();
   	}
    
    @Test
   	public void testTitleLinkHidden() {
   		model.isTitleLinkHidden();
   	}
}
