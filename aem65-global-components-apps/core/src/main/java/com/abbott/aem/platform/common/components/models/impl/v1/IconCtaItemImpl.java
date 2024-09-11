package com.abbott.aem.platform.common.components.models.impl.v1;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.IconCtaItem;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;

import lombok.Data;
import lombok.Setter;
import lombok.AccessLevel;

/**
 * Model used by IconCta to create a list 
 */
@Data
@Model(adaptables = Resource.class,
	   adapters = { IconCtaItem .class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class IconCtaItemImpl implements IconCtaItem {
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String cardTitle;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String buttonText;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String buttonType;
		
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String urlImage;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String altText;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String isDecorative;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String isActive;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String videoURL;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String url;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String phoneNumber;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String emailSubject;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String emailTemplatePath;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String downloadAsset; 
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String anchorName;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String targetnewWindow;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String medID;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String vidID;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String orID;  
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String videoID; 
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String playerID;  
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String accountID; 
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String buttoncolorTheme;
	@Override
	public String getUrl() {
        if (url != null) {
            url = PlatformUtil.ensureProperLink(url);
        }
        return url;
    }
}