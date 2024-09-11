package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.utils.AbbottUtils;
import com.day.cq.wcm.api.Page;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

/**
 *
 * @author srividya.b, saikrishna.s
 *
 *         Image Slider
 *
 *         Image Slider is the SlingModel to hold the details of individual
 *         Image Slider
 *
 *         Version Number: 1.0
 */
@Model(adaptables = SlingHttpServletRequest.class, resourceType = {
		"abbott/components/content/image-slider" }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = {
		@ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class ImageSliderModel {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(ImageSliderModel.class);

	/** The Constant MEDIA_GALLERY_ENTRIES. */
	private static final String MEDIA_GALLERY_ENTRIES = "media_gallery_entries";

	private static final String DEFAULT_IMAGE = "/content/dam/abbott/mandatory/Unavailable-Product-1300x1300.jpg";

	/** The Constant ORIGINAL. */
	private static final String ORIGINAL = "original";

	/** The Constant THUMBNAIL. */
	private static final String THUMBNAIL = "thumbnail";

	/** The Constant IMG_ARRAY. */
	private static final String IMG_ARRAY = "imageArray";

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;

	/** The slides list. */
	private List<String> imageList;

	/** The imgSliderJson. */
	private String imgSliderJson;

	/**
	 * Activate method is used to get page property details.
	 */
	@PostConstruct
	protected void activate() {
		LOGGER.debug("Inside image slider activate method");
		ValueMap pageProperties = currentPage.getContentResource().adaptTo(ValueMap.class);
		if (pageProperties.containsKey(MEDIA_GALLERY_ENTRIES)) {
			String[] images = pageProperties.get(MEDIA_GALLERY_ENTRIES, String[].class);
			imageList = Arrays.asList(images);
			getImages();
		}
	}

	/**
	 * getImages method is used to construct the Image JSON.
	 */
	public String getImages() {

		JsonObject finalJson = new JsonObject();
		JsonArray finalArray = new JsonArray();
		if (imageList != null && !imageList.isEmpty()) {
			Iterator<String> imgItr = imageList.iterator();
			while (imgItr.hasNext()) {
				String mediaImage = imgItr.next();
				JsonObject mediaJson = new JsonObject();
				String resolvedMediaImage = AbbottUtils.getHtmlLink(resourceResolver, mediaImage);
				if (StringUtils.isNotBlank(resolvedMediaImage)) {
					mediaJson.addProperty(ORIGINAL, mediaImage);
					mediaJson.addProperty(THUMBNAIL, resolvedMediaImage + CommonConstants.THUMBNAIL_SMALL_IMAGE_EXTENSION);
					finalArray.add(mediaJson);

				}
			}
			finalJson.add(IMG_ARRAY, finalArray);
			imgSliderJson = finalJson.toString();
		}
		return imgSliderJson;

	}
	public String getImgSliderJson() {
		return imgSliderJson;
	}

	public String getDefaultImage() {
		return DEFAULT_IMAGE;
	}

}
