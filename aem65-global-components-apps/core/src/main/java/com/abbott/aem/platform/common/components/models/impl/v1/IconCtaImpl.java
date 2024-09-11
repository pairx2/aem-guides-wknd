package com.abbott.aem.platform.common.components.models.impl.v1;
import com.abbott.aem.platform.common.components.models.IconCtaItem;
import java.util.List;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import com.abbott.aem.platform.common.components.models.IconCta;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@EqualsAndHashCode
@ToString
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
	   adapters = { IconCta.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
	   resourceType = IconCtaImpl.RESOURCE_TYPE)
public class IconCtaImpl implements IconCta {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/iconcta/v1/iconcta";

	
        @ValueMapValue
        @Getter
        private String title;

        @ValueMapValue
        @Getter
        private boolean cardAlignment;
        
        @ValueMapValue
        @Getter
        private String id;
        
        @ValueMapValue
        @Getter
        private String ruleColor;
        
        @ValueMapValue
        @Getter
        private boolean topMargin;
        
        @ValueMapValue
        @Getter
        private boolean bottomMargin;
       
        @ChildResource
        @Getter     
        private List<IconCtaItem> multifield;        
}