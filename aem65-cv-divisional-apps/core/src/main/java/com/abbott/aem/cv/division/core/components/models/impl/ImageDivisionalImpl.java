package com.abbott.aem.cv.division.core.components.models.impl;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Image;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;
import com.abbott.aem.cv.division.core.components.models.ImageDivisional;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;



@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { ImageDivisional.class, ComponentExporter.class },
	   resourceType = {ImageDivisionalImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class ImageDivisionalImpl implements ImageDivisional {
	public static final String RESOURCE_TYPE = "cv/division/components/content/image/v1/image";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Image.class)
	@Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
	private Image image;

	@ValueMapValue 
    @Getter
	private String captionAlignment;
	
	@ValueMapValue 
    @Getter
	private String urlAction;
	
	@ValueMapValue 
    @Getter
	private String url;
	
	@ValueMapValue 
    @Getter
	private String anchorName;
	
	@ValueMapValue 
    @Getter
	private String assetUrl;
	
	@ValueMapValue 
    @Getter
	private String captionPlacement;
	
	@ValueMapValue 
    @Getter
	private String imageAlignment;
	
	@ValueMapValue 
    @Getter
	private String imageWidth;
	
	@ValueMapValue 
    @Getter
	private String imageHeight;
	
	@ValueMapValue 
    @Getter
	private String limelightPlayerId;
	
	@ValueMapValue 
    @Getter
	private String limelightMediaId;
	
	@ValueMapValue 
    @Getter
	private String orgId;
	
	@ValueMapValue 
    @Getter
	private String youTubeUrl;
	
	@ValueMapValue 
    @Getter
	private String fileReference;
	
	@ValueMapValue 
    @Getter
	private String parallaxFileReference; 	
	
	@ValueMapValue 
    @Getter
	private String checkbox;
	
	@ValueMapValue 
    @Getter
	private String external;
	
	@ValueMapValue 
    @Getter
	private String displayOriginalImage;
	
	public String getUrl() {
        if (url != null) {
            url = PlatformUtil.ensureProperLink(url);
        }
        return url;
    }

	
}

