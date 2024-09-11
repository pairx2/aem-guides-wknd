package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.fasterxml.jackson.annotation.JsonProperty;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = {"adc/freestylelibrede/components/content/banner"})
public interface BannerModel{

    @Inject
    String getBannerType();
	
	@Inject
    String getBgColor();
	
	@Inject
    String getDeepLinkText();
	
	@Inject
    String getDeepLinkTarget();
    
	@Externalize
    String getDeepLink();
    
	@Inject
    String getImage();
	
	@Inject
    String getImageTab();
	
	@Inject
    String getImageMobile();

    @Inject
    String getProductImage();

	@Inject
    String getProductImageTab();
	
	@Inject
    String getProductImageMobile();
	
    @Inject
    String getVideo();

    @Inject
    String getHeading();

    @Inject
    String getSubHeading();

    @Inject
    String getDescription();
	
	@Inject
    String getDisclaimer();

	@Inject
    String getCtaLayout();

    @ChildResource
    BaseCTAModel getCta1();

    @ChildResource
    BaseCTAModel getCta2();
    
    @ChildResource
    BaseCTAModel getDownloadcta();

    @Inject
    String getImageAlignment();

    @Inject
    String getVideoAlignment();

    @Inject
    String getTextAlignmentFullBleed();

    @Inject
    String getVideoTextAlignmentFullBleed();

    @Inject
    String getTextAlignmentHalfWidth();

    @Inject
    String getTextAlignmentProduct();

    @Inject
    String getProductSku();
    
    @Inject
    String getProductImageAlignment();
    
    @Inject
	String getSubHeadingType();
	
    @Inject
	String getHeadingType();
    
    @Inject
    String getSubHeadingTextColor();
    
    @Inject
	String getHeadingTextColor(); 
	
	@Inject
	String getHeadingAlignment(); 
    
	@Inject
    String getTextAlignmentImageBanner();
	
	@Inject
    String getTextPositionImageBanner();
	
	@Inject
	String getProductFrequency();
	
	@JsonProperty("hasImageDownloadButton")
	@Inject
	Boolean getImageDownloadButton();
	
	@Inject
	String getDeepLinkId();
	
	@Inject
	@Via(type = org.apache.sling.models.annotations.via.ChildResource.class)
	List<ImageIcons> getImageIcons();

	@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	interface ImageIcons {
		@Inject
		String getImageIcon();
	}
	@Inject
    String getVideoImage();
	
	@Inject
    String getVideoImageTab();
	
	@Inject
    String getVideoImageMobile();
	
	@Inject
	String getVideoPlayOption();
}
