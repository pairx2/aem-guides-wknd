package com.abbott.aem.corp.division.core.components.models.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.abbott.aem.corp.division.core.components.models.BannerDetails;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {BannerDetails.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class BannerDetailsImpl implements BannerDetails{
	
    @Setter(AccessLevel.NONE)
	@ValueMapValue
    @Getter
    public String bannerType;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String link;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String text;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String videoScript;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String videoType;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String cerosNeeded;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String cerosScript;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String autoPlay;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String textPosition;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String hubModelPopup;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String playerId;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String mediaId;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String colorType;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String imagePath;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String altText;
	

	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
    public String newTab;

}
