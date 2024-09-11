package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.Layer;
import com.abbott.aem.platform.common.components.models.ScrollInteractions;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.util.ComponentUtils;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.components.ComponentContext;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Inject;

import java.util.IllegalFormatException;
import java.util.List;

@Slf4j
@Data
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
	   adapters = { ScrollInteractions.class, ComponentExporter.class },
	   resourceType = { ScrollInteractionsImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ScrollInteractionsImpl implements ScrollInteractions {
	
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/scrollinteractions/v1/scrollinteractions";
	
	public static final String GRADIENT_TYPE_RADIAL = "radial";
	public static final String GRADIENT_TYPE_LINEAR = "linear";
	public static final String GRADIENT_TYPE_NONE = "none";
	public static final String SOLID_TO_GRADIENT_STYLE = "radial-gradient(650px at 25%%, %s 0%%, %s 100%%)";
	public static final String RADIAL_BASIC_GRADIENT_STYLE = "radial-gradient(circle at center %s, %s %s%%, %s %s%%)";
	//650px at 25%,
	public static final String RADIAL_ADVANCED_GRADIENT_STYLE = "radial-gradient(%spx at %s%%, %s %s%%, %s %s%%)";
	public static final String LINEAR_BASIC_GRADIENT_STYLE = "linear-gradient(%s 0%%, %s 100%%)";
	
	@JsonIgnore
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Page currentPage;
	
	@JsonIgnore
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private ComponentContext componentContext;
	
	@Inject
	public ScrollInteractionsImpl(@ScriptVariable Page currentPage, @ScriptVariable ComponentContext componentContext) {
		this.currentPage = currentPage;
		this.componentContext = componentContext;
	}
	
	@JsonIgnore
	@Self
	private SlingHttpServletRequest slingHttpServletRequest;
	
	@JsonIgnore
	@Self
	private Resource resource;
	
	@Setter(AccessLevel.NONE)
	@Default (values = "mediaLeft")
	@ValueMapValue
	private String layout;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private boolean useContainer;
	
	@ChildResource
	@Setter(AccessLevel.NONE)
	private List<Layer> layers;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String backgroundColor;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Default(values = "none")
	private String gradientType;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String radialGradientAlignment;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Default(values = "650")
	private String radialGradientSize;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Default(values = "25")
	private String advancedGradientAlignment;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String startColor;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Default(values = "0")
	private String startColorPosition;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String endColor;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Default(values = "100")
	private String endColorPosition;
	
	/**
	 * This will provide the Bg color string for each panel, which could be in 3 different panels.
	 * ex:  1. --panel1bg: radial-gradient(circle at center left, green 0%, orange 100%);
	 2. --panel2bg: red;
	 3. --panel3bg: linear-gradient(#e66465, #9198e5);
	 */
	@Override
	public String getBackgroundColorStyle(boolean isRadialGradientPresent){
		try{
			if(StringUtils.isNoneBlank(startColor,endColor)){
				switch(gradientType) {
					case GRADIENT_TYPE_RADIAL:
						return getRadialGradient();
					case GRADIENT_TYPE_LINEAR:
						return String.format(LINEAR_BASIC_GRADIENT_STYLE, startColor, endColor);
					case GRADIENT_TYPE_NONE:
						return isRadialGradientPresent ? convertSolidColorToGradient(backgroundColor) : backgroundColor;
					default: // no default
						return StringUtils.EMPTY;
				}
			}else{
				log.debug("Two colors need to be selected");
			}
		}catch (IllegalFormatException e){
			log.error("Error getting background style ", e.getMessage());
		}
		return StringUtils.EMPTY;
	}
	
	@Override
	public String getId(){
		if(resource != null){
			return ComponentUtils.getId(resource, currentPage, componentContext);
		} else if(slingHttpServletRequest != null){
			return ComponentUtils.getId(slingHttpServletRequest.getResource(), currentPage, componentContext);
		}
		return StringUtils.EMPTY;
	}
	
	public String getRadialGradient(){
		if(StringUtils.isNoneBlank(radialGradientAlignment, radialGradientSize, advancedGradientAlignment)
				&& radialGradientAlignment.equalsIgnoreCase("advanced")){
			return String.format(RADIAL_ADVANCED_GRADIENT_STYLE, radialGradientSize, advancedGradientAlignment, startColor, startColorPosition, endColor,
					endColorPosition);
		}
		return String.format(RADIAL_BASIC_GRADIENT_STYLE, radialGradientAlignment, startColor, startColorPosition, endColor, endColorPosition);
	}

	@Override
	public String getGradientType() {
		return gradientType;
	}
	
	public String convertSolidColorToGradient(String backgroundColor) {
		return String.format(SOLID_TO_GRADIENT_STYLE, backgroundColor, backgroundColor);
	}
}