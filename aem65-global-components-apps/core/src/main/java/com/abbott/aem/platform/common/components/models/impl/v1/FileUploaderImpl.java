package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.FileUploader;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { FileUploader.class, ComponentExporter.class },
	   resourceType = { FileUploaderImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FileUploaderImpl extends ComponentProxyImpl implements FileUploader {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/fileuploadandcropping/v1/fileuploadandcropping";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String uploaderIcon;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String dragAndDropText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String orText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String fileSelectionText;	

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String fileUploadedLabel;	

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String fileCheckIcon;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String removeIcon;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String removeLabel;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean enableCropping;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String croppingLabel;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private Integer cropWidth;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private Integer cropHeight;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String fileUploaderIsRequired;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String requiredMessage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private Integer imageValidateSizeMinWidth;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private Integer imageValidateSizeMinHeight;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String maxFileSize;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String acceptedFileTypes;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String labelMaxFileSize;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String imageValidateSizeLabelImageSizeTooSmall;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String imageValidateSizeLabelExpectedMinSize;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String labelFileTypeNotAllowed;

}