package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.ButtonArdx;
import com.abbott.aem.platform.common.components.models.Button;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.*;
import lombok.experimental.Delegate;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { ButtonArdx.class, ComponentExporter.class },
resourceType = { ButtonArdxImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class ButtonArdxImpl implements ButtonArdx {
	  
	protected static final String RESOURCE_TYPE = "ardx/division/components/content/Button";
	  
	    @Self
	    @Via(type = ResourceSuperType.class)
	    @Delegate(types = Button.class)
	    @Setter(AccessLevel.NONE)
	    @Getter(AccessLevel.NONE)
	    private Button button;
	   
	    @ValueMapValue
		@Setter(AccessLevel.NONE)
		private String buttonType;
	    
	    @ValueMapValue
		@Setter(AccessLevel.NONE)
		private String wistiaVideoId;
	    
	    @ValueMapValue
		@Setter(AccessLevel.NONE)
		private String videoDocumentNumber;
	      
	    @ValueMapValue
	    @Setter(AccessLevel.NONE)
	    public String buttonColor;
	   
	    @ValueMapValue
	    @Setter(AccessLevel.NONE)
	    public String buttonHoverColor;
	    
	    @ValueMapValue
	    @Setter(AccessLevel.NONE)
	    public String textColor;
	    
	    @ValueMapValue
	    @Setter(AccessLevel.NONE)
	    public String textHoverColor;
	    
	    @ValueMapValue
		@Setter(AccessLevel.NONE)
		private String topMargin;

		@ValueMapValue
		@Setter(AccessLevel.NONE)
		private String bottomMargin;

		@ValueMapValue
		@Setter(AccessLevel.NONE)
		private String leftMargin;

		@ValueMapValue
		@Setter(AccessLevel.NONE)
		private String rightMargin;

		@Override
		public String getWistiaVideoId() {
			return wistiaVideoId;
		}

		@Override
		public String getVideoDocumentNumber() {
			return videoDocumentNumber;
		}

		@Override
		public String getButtonColor() {
			return buttonColor;
		}

		@Override
		public String getButtonHoverColor() {
			return buttonHoverColor;
		}

		@Override
		public String getTextColor() {
			return textColor;
		}

		@Override
		public String getTextHoverColor() {
			return textHoverColor;
		}

		@Override
		public String getTopMargin() {
			return topMargin;
		}

		@Override
		public String getBottomMargin() {
			return bottomMargin;
		}

		@Override
		public String getLeftMargin() {
			return leftMargin;
		}

		@Override
		public String getRightMargin() {
			return rightMargin;
		}

}

