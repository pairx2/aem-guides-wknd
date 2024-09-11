package com.abbott.aem.platform.common.components.models.impl.v1;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.experimental.Delegate;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Image;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;
import com.abbott.aem.platform.common.components.models.PanAndZoom;

@EqualsAndHashCode
@ToString
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
          extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
       adapters = { PanAndZoom.class },
       defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
       resourceType = PanAndZoomImpl.RESOURCE_TYPE)
public class PanAndZoomImpl implements PanAndZoom {

    public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/panandzoom/v1/panandzoom";

    @Self
    @Via(type = ResourceSuperType.class)
    @Delegate(types = Image.class)
    private Image image;

    @ValueMapValue
    @Getter
	private boolean  topMargin;
			
	
    @ValueMapValue
    @Getter
	private boolean  bottomMargin;
			
	
    @ValueMapValue
    @Getter
	private String captionPlacement;
	
	
    @ValueMapValue
    @Getter
	private String captionAlignment;
			
    @ValueMapValue
    @Getter
	private String imageAlignment;
	
    @ValueMapValue
    @Getter
    private boolean  displayOriginalImage;
	  
	
    @ValueMapValue
    @Getter
	private boolean  displayPopupTitle;
	
	
    @ValueMapValue
    @Getter
	private String zoomIn;
	
	
    @ValueMapValue
    @Getter
	private String zoomOut;
	
	
}
