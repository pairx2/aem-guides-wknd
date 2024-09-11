package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.ImageWithAnimation;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.Data;
import lombok.Setter;
import lombok.AccessLevel;
import lombok.extern.slf4j.Slf4j;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Slf4j
@Data
@Model(adaptables = { SlingHttpServletRequest.class },
       adapters = { ImageWithAnimation.class, ComponentExporter.class },
       resourceType = { ImageWithAnimationImpl.RESOURCE_TYPE },
       defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
          extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ImageWithAnimationImpl extends ComponentProxyImpl implements ImageWithAnimation {
    
	@SuppressWarnings("CQRules:CQBP-71")
    public static final String RESOURCE_TYPE = "apps/abbott-platform/components/content/molecules/imagewithanimation/v1/imagewithanimation";
    
    @Setter(AccessLevel.NONE)
	@ValueMapValue
	private String mainImageFileReference;
    
    @Setter(AccessLevel.NONE)
	@ValueMapValue
	private String animatedImageFileReference;

    @Setter(AccessLevel.NONE)
	@ValueMapValue
	private String staticImageFileReference;
}
