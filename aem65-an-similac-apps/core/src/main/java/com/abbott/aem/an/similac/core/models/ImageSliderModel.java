package com.abbott.aem.an.similac.core.models;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;

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

import com.day.cq.wcm.api.Page;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

/**
 *
 * 
 * Image Slider is the SlingModel to hold the details of individual Image Slider
 * 
 * @author Cognizant
 */
@Model(adaptables = SlingHttpServletRequest.class, resourceType = {
		"an/similac/components/content/products/image-slider" }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = {
		@ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class ImageSliderModel {

	private static final String MEDIA_GALLERY_ENTRIES = "media_gallery_entries";

	private static final String IMG_THUMBNAIL_80_80 = "thumbnail-80x80.png";

	private static final String IMG_MOBILE_319_319 = "cq5dam.thumbnail.319.319.png";

	private static final String IMG_TABLET_480_600 = "thumbnail-480x600.png";

	private static final String SRC_SET = "srcSet";

	private static final String MEDIA = "media";

	private static final String ORIGINAL = "original";

	private static final String THUMBNAIL = "thumbnail";

	private static final String IMG_SET = "imageSet";

	private static final String IMG_ARRAY = "imageArray";

	private static final String MOB_MEDIA = "(max-width: 575.98px)";

	private static final String TAB_MEDIA = "(max-width: 991.98px)";

	private String imgSliderJson;

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;

	/** The slides list. */
	private List<String> imageList;

	/**
	 * Activate method is used to get page property details.
	 */
	@PostConstruct
	protected void activate() {
		ValueMap pageProperties;
		if (currentPage.getContentResource() != null) {
			pageProperties = currentPage.getContentResource().adaptTo(ValueMap.class);
		} else {
			pageProperties = ValueMap.EMPTY;
		}

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

					JsonObject mobJson = new JsonObject();
					JsonObject tabJson = new JsonObject();
					JsonObject mediaJson = new JsonObject();
					JsonArray jsonArray = new JsonArray();
					
					String resolvedMediaImage = "/jcr:content/renditions/";

					if (StringUtils.isNotBlank(resolvedMediaImage)) {
						
						mobJson.addProperty(SRC_SET, mediaImage + resolvedMediaImage + IMG_MOBILE_319_319);
						mobJson.addProperty(MEDIA, MOB_MEDIA);
						
						tabJson.addProperty(SRC_SET, mediaImage + resolvedMediaImage + IMG_TABLET_480_600);
						tabJson.addProperty(MEDIA,TAB_MEDIA);

						jsonArray.add(mobJson);
						jsonArray.add(tabJson);

						mediaJson.addProperty(ORIGINAL, mediaImage);
						mediaJson.addProperty(THUMBNAIL, mediaImage + resolvedMediaImage + IMG_THUMBNAIL_80_80);
						mediaJson.add(IMG_SET, jsonArray);
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

}
