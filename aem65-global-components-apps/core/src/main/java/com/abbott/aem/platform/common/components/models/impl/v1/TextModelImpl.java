package com.abbott.aem.platform.common.components.models.impl.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.abbott.aem.platform.common.components.models.TextModel;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Text;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { TextModel.class,
		ComponentExporter.class }, resourceType = {
				TextModelImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TextModelImpl extends ComponentProxyImpl implements TextModel {
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/text/v1/text";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Text.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Text text;

	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String shortEnabled;

	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String numberOfLines;

	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String moreLink;
	

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String lessLink;

	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String startColor;
	
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String startColorPosition;
	
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String endColor;
	
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String endColorPosition;
	
	@Override
	public String getShortEnabled() {
		return shortEnabled;
	}
	
	@Override
	public String getNumberOfLines() {
		return numberOfLines;
	}
	
	@Override
	public String getMoreLink() {
		return moreLink;
	}
	
	@Override
	public String getLessLink() {
		return lessLink;
	}
	
	@Override
	public String getStartColor() {
		return startColor;
	}
	
	@Override
	public String getStartColorPosition() {
		return startColorPosition;
	}

	@Override
	public String getEndColor() {
		return endColor;
	}

	@Override
	public String getEndColorPosition() {
		return endColorPosition;
	}


}
