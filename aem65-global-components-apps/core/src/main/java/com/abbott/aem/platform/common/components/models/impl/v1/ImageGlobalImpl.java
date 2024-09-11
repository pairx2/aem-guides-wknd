package com.abbott.aem.platform.common.components.models.impl.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.abbott.aem.platform.common.components.models.ImageGlobal;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Image;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

@Model(adaptables = { SlingHttpServletRequest.class },
     adapters = { ImageGlobal.class,ComponentExporter.class }, 
     resourceType = { ImageGlobalImpl.RESOURCE_TYPE }
  , defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class ImageGlobalImpl extends ComponentProxyImpl implements ImageGlobal {

    protected static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/image/v1/image";


    @Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Image.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Image image;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String tabletImage;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    public String mobileImage;
  
}

