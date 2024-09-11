package com.abbott.aem.corp.division.core.components.models.impl;

import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.jcr.JcrConstants;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.abbott.aem.corp.division.core.components.models.PressReleaseDynamicPull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Named;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.sling.api.resource.ValueMap;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {PressReleaseDynamicPull.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PressReleaseDynamicPullImpl implements PressReleaseDynamicPull {

	public static final Logger log = LoggerFactory.getLogger(PressReleaseDynamicPullImpl.class);

	@SlingObject
	private ResourceResolver resourceResolver;
	
	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
	@Named(JcrConstants.JCR_TITLE)
    public String title;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	public String navTitle;


	@Setter(AccessLevel.NONE)
    @ValueMapValue
    @Getter
	@Named(JcrConstants.JCR_DESCRIPTION)
    public String description;
	
	@Setter(AccessLevel.NONE)  
    @ValueMapValue
	@Getter
	@Named("authoredDate")
    public String pressDate;

	@SlingObject
	private Resource currentResource;

	@Setter(AccessLevel.NONE)
	@Getter
	public String pressPagePath;

	@Setter(AccessLevel.NONE)
	@Getter
	public String pressDateFormat;

	@Setter(AccessLevel.NONE)
	@Getter
	public String execTitle;

	@Setter(AccessLevel.NONE)
	@Getter
	public String execDescription;

	@Setter(AccessLevel.NONE)
	@Getter
	public String execImage;

	@Setter(AccessLevel.NONE)  
    @ValueMapValue
	@Getter
	public String profileImage;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	@Named("articlesubtitle")
	public String articleSubTitle;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	@Named("articledescription")
	public String  articleDescription;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	@Named("articledate")
	public String articleDate;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	@Named("articleimage")
	public String articleImage;
	
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	@Named("categoryTitle")
	public String categoryTitle;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	@Getter
	@Named("articlecolor")
	public String articleColor;


	@PostConstruct
	protected void init() {
		title = title !=null ? title : navTitle;
		pressDateFormat = getFormatPressDate(pressDate);
		pressPagePath = currentResource.getParent().getPath();
		execTitle = getNodePropertyValue(pressPagePath+"/jcr:content/root/container/title",JcrConstants.JCR_TITLE);
		execTitle = formatTextValue(execTitle);
		execTitle = execTitle !=null ? execTitle : title;
		execImage = getNodePropertyValue(pressPagePath+"/jcr:content/root/container/columncontrol/tab_item_no_0/image","fileReference");
		execImage = execImage !=null ? execImage : profileImage;
		execDescription = getNodePropertyValue(pressPagePath+"/jcr:content/root/container/columncontrol/tab_item_no_1/text","text");
		execDescription = formatTextValue(execDescription);
		execDescription = execDescription !=null ? execDescription : description;
	}


	public String getFormatPressDate(String pressPageDate)  {
		String formatDate = StringUtils.EMPTY;
		if (StringUtils.isNotBlank(pressPageDate)) {
			SimpleDateFormat parseDateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Date dateformatted = null;
			try {
				dateformatted = parseDateFormat.parse(pressPageDate);
			} catch (ParseException parseException) {
				log.error("Error in date format of getFormatPressDate method "+parseException.getMessage());
			}
			SimpleDateFormat expDateFormat = new SimpleDateFormat("MMM. dd, yyyy");
			formatDate = expDateFormat.format(dateformatted);
			if(null !=formatDate) {
				formatDate = formatDate.contains("Jun") ?formatDate.replace("Jun.", "June"):formatDate;
				formatDate = formatDate.contains("Jul") ?formatDate.replace("Jul.", "July"):formatDate;
				formatDate = formatDate.contains("May") ?formatDate.replace("May.", "May"):formatDate;
			}
		}
		return formatDate;
	}

	public String getNodePropertyValue(String nodeName, String propName) {
		String propValue = null;
		Resource resource = resourceResolver.getResource(nodeName);
		if(resource !=null){
			ValueMap propertyMap = resource.getValueMap();
			if(propertyMap !=null){
				propValue = propertyMap.get(propName,StringUtils.EMPTY);
			}
		}
		return propValue;
	}

	public String formatTextValue(String textValue){
		String formatValue =  StringUtils.EMPTY;
		if(textValue !=null){
			formatValue = textValue.replaceAll("<[^>]++>", "");
			formatValue = formatValue.replace("&nbsp;", "");
			formatValue = formatValue.replace("_", "");
	    }
		return formatValue;
	}
}

	

