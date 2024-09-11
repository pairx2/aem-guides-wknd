package com.abbott.aem.platform.common.components.models.impl.v1;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import com.abbott.aem.platform.common.components.models.FloatingActionButton;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { FloatingActionButton.class, ComponentExporter.class },
	   resourceType = { FloatingActionButtonImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FloatingActionButtonImpl  implements FloatingActionButton {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/floatingactionbutton/v1/floatingactionbutton";

	
	  @ValueMapValue 
	  @Setter(AccessLevel.NONE)
		private String buttonStyle;
	
	 @ValueMapValue
	@Setter(AccessLevel.NONE)
		 private String buttonIcon;
	
	
	@ValueMapValue
    @Setter(AccessLevel.NONE)
	 private String buttonColor;
	
	@ValueMapValue
	 @Setter(AccessLevel.NONE)
	private String buttonSize;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String buttonType;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String  urlLink;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String targetNewWindow;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String redirectConfirm;
	
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String anchorName;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String mediaId;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String playerId;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String orgId;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String videoId;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String phoneNumber;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String assetLink;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String modalIcon;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String modalTitle;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String modalUrl;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String buttonText;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String ariaLabel;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String hideOnDesktop;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String hideButtonText;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String id;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String iconPosition;
		
	@Override
	public String getUrlLink() {
        if (urlLink != null) {
            urlLink = PlatformUtil.ensureProperLink(urlLink);
        }
        return urlLink;
    }

}