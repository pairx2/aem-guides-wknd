package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.platform.common.components.models.Video;
import com.abbott.aem.platform.common.components.models.VideoSource;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;
import com.day.cq.wcm.api.components.Component;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * The Class VideoImpl.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { Video.class,
		ComponentExporter.class }, resourceType = {
				VideoImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class VideoImpl implements Video {
	/**
	 * The Constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/video/v1/video";
	public static final String DAM_VIDEO = "dam";

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
	private String videoURL;

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
	private String videoSize;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean autoPlay;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String videoCaption;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String videoTranScriptText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String videoIframeLang;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String wistiaVideoID;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String videoDocumentNumber;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String imagePath;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String imageAltText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String embedOption;
	
		
	
    @ValueMapValue
	@Setter(AccessLevel.NONE)
	private String id;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String playerType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String videoControlOn;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String audioControlOn;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean loopOn;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean autoplayMobileView;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String fileReference;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String fallBackImage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String limeLightFallBackImage;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String damFallBackImage;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String wistiaFallBackImage;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String alt; 
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String videoAlignment;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String captionPlacement;
	
	@ValueMapValue
    @Setter(AccessLevel.NONE)
    private String margin;
	
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
	private String downloadProxyPath;

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
		downloadProxyPath = proxyComponentService.getProxyPath(component, ProxyPaths.downloadProxy);

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
	@Override
	public String getUrlIndex() {
		
		if(videoURL!=null) {
		urlIndex = videoURL.substring(videoURL.lastIndexOf("/")+1); 
		}
		return urlIndex;
	}	
}