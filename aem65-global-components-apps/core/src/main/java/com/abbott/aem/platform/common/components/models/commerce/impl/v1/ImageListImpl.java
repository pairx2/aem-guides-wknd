package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import com.abbott.aem.platform.common.components.models.commerce.ImageList;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.util.List;

@Model(adaptables = SlingHttpServletRequest.class, adapters = ImageList.class, resourceType = ImageListImpl.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
          extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ImageListImpl implements ImageList {
    public static final String RESOURCE_TYPE = "abbott-platform/components/commerce/imagelist/v1/imagelist";

    @Self
    @Delegate(types = Component.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private Component component;

    @ChildResource(injectionStrategy = InjectionStrategy.OPTIONAL)
    @Setter(AccessLevel.NONE)
    @Getter
    public List<Resource> imageList;
}
