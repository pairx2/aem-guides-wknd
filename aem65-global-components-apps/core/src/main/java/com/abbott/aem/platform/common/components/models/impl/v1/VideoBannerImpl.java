package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.abbott.aem.platform.common.components.models.VideoBanner;
import com.abbott.aem.platform.common.components.models.VideoSource;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.adobe.cq.wcm.core.components.models.Teaser;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;
import com.day.cq.wcm.api.components.Component;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;
import lombok.extern.slf4j.Slf4j;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.*;
import org.apache.sling.models.annotations.via.ResourceSuperType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

/**
 * The Class VideoBanner Impl.
 */
@Slf4j
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
        adapters = { VideoBanner.class, ComponentExporter.class },
        resourceType = { VideoBannerImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)


public class VideoBannerImpl  extends ComponentProxyImpl implements VideoBanner {
    protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/videobanner/v1/videobanner";
    public static final String DAM_VIDEO = "dam";

    /**
     * The button.
     */
    @Self
    @Via(type = ResourceSuperType.class)
    @Delegate(types = Teaser.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private Teaser teaser;

    @ValueMapValue
    @Default(intValues = 0)
    @Setter(AccessLevel.NONE)
    private Integer numberOfButtons;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String startColor;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String endColor;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private Integer startColorPosition;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private Integer endColorPosition;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String fileReference;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String title;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String pretitle;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String description;

    List<String> allowedMimeTypes = Collections
            .unmodifiableList(Arrays.asList("video/3gpp", "video/x-flv", "video/mp4", "video/ogg", "video/webm"));

    @Inject
    private Resource resource;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String videoType;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String accountID;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String videoID;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    protected String playerID;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    protected String damVideo;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String videoIframeTitle;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    protected String orgID;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String mediaID;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String limelightPlayerID;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String playIcon;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String playIconLabel;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String playPauseIconColor;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String pauseIcon;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String pauseIconLabel;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String pauseIconColor;


    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Default(booleanValues = false)
    private Boolean autoPlay;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String videoTranScriptText;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String videoIframeLang;


    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String videoDocumentNumber;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String id;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Default(values="embedded")
    private String playerType;


    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private Boolean playVideoInLoop;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String mediaPositionforLargerScreen;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String mediaPositionforDesktop;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String mediaPositionforTablet;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String mediaPositionforMobile;


    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String contentHorizontalAlignment;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String contentVerticalAlignment;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String textAlignment;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String textColor;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String responsiveTextLayout;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String backgroundMobileAndTablet;

    @Setter(AccessLevel.NONE)
    private String urlIndex;

    @SlingObject
    @JsonIgnore
    private ResourceResolver resourceResolver;

    private List<VideoSource> sources = new ArrayList<>();

    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }


    @Setter(AccessLevel.NONE)
    private String dimorbrightenVideo;

    @OSGiService
    private ProxyComponentService proxyComponentService;

    @ScriptVariable
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private Component component;

    private static final Logger log = LoggerFactory.getLogger(VideoImpl.class);

    @PostConstruct
    protected void init() {

        Resource assetResource = resourceResolver.getResource(damVideo);
        if (assetResource == null) {
            log.debug("asset resource null");
            return;
        }

        Asset videoAsset = assetResource.adaptTo(Asset.class);
        if (videoAsset == null) {
            log.debug("video asset null");
            return;
        }

        String mimeType = videoAsset.getMimeType();
        if (StringUtils.isBlank(mimeType) || !allowedMimeTypes.contains(mimeType)) {
            log.debug("mimeType null");
            return;
        }

        sources.add(new VideoSourceImpl(videoAsset));
        List<Rendition> renditions = videoAsset.getRenditions();
        for (Rendition rendition : renditions) {
            String renditionMimeType = rendition.getMimeType();
            if (StringUtils.isNotBlank(renditionMimeType) && !renditionMimeType.equals(mimeType)
                    && allowedMimeTypes.contains(renditionMimeType)) {
                sources.add(new VideoSourceImpl(rendition));
            }
        }

    }

    public List<String> getListOfButtons() {
        List<String> listOfButtons = new ArrayList<>();
        for (int i = 0; i < numberOfButtons; i++) {
            listOfButtons.add("button-" + i);
        }
        return listOfButtons;
    }

    @Override
	public String getStartColor() {
    	
		return this.startColor;
	}

     @Override
	public String getEndColor() {

		return this.endColor;
	}

    @Override
	public Integer getStartColorPosition() {

		return this.startColorPosition;
		}


    @Override
	public Integer getEndColorPosition() {
	
		return this.endColorPosition;
		}
    
    @Override
	public String getFileReference() {
	
		return this.fileReference;
		}
    
    @Override
   	public String getDescription() {
   	
   		return this.description;
   		}
    
    @Override
   	public String getPlayIcon() {
   	
   		return this.playIcon;
   		}
    
    @Override
   	public String getPlayIconLabel() {
   	
   		return this.playIconLabel;
   		}
       
    @Override
   	public String getPlayPauseIconColor() {
   	
   		return this.playPauseIconColor;
   		}
    
    @Override
   	public String getPauseIcon() {
   	
   		return this.pauseIcon;
   		}
    
    @Override
   	public String getPauseIconLabel() {
   	
   		return this.pauseIconLabel;
   		}
    
    @Override
   	public String getPauseIconColor() {
   	
   		return this.pauseIconColor;
   		}
    
    @Override
   	public String getTextAlignment() {
   	
   		return this.textAlignment;
   		}
    
    @Override
   	public String getTitle() {
   	
   		return this.title;
   		}
    
    @Override
   	public String getPretitle() {
   	
   		return this.pretitle;
   		}
    
    
    
    
   
	

}
