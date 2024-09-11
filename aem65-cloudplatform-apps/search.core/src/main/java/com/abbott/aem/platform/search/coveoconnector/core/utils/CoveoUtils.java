package com.abbott.aem.platform.search.coveoconnector.core.utils;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.day.cq.tagging.TagConstants;
import org.apache.sling.api.resource.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.Asset;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;

/**
 * The Class coveoUtils.
 */
public final class CoveoUtils {

	/**
	 * Instantiates a new coveo utils.
	 */
	public CoveoUtils() throws UnsupportedOperationException {
		// Constructor
		
	}

	/** The Constant LOG. */
	private static final Logger LOG = LoggerFactory.getLogger(CoveoUtils.class);

	/**
	 * This method is used to extract the tags from the content page.
	 *
	 * @param pageContent    the page content
	 * @param requiredParent the required parent
	 * @return Array of tags which are attached to the page. Empty array if no tags
	 *         are attached
	 */
	public static List<String> getPageTags(Resource pageContent, String requiredParent) {
		LOG.info("inside getPages");
		if (pageContent == null) {
			return new ArrayList<>();
		}
		Page page = null;
		if (pageContent.getParent() != null) {
			Resource parent = pageContent.getParent();
			if (parent != null) {
				page = parent.adaptTo(Page.class);
			}
		}

		if (page == null) {
			return new ArrayList<>();
		}
		LOG.info("page is{}", page.getName());
		List<String> tagTitles = new ArrayList<>();
		Tag[] tags = page.getTags();

		if (tags != null) {
			for (int i = 0; i < tags.length; i++) {
				Tag tag = tags[i];
				if (tag.getPath().startsWith(requiredParent)) {
					tagTitles.add(tag.getTitle());
				}
			}

		}
		return tagTitles;
	}

	/**
	 * This method is used to extract the tags from the content asset.
	 *
	 * @param assetContent   the asset content
	 * @param requiredParent the required parent
	 * @return Array of tags which are attached to the Asset. Empty array if no tags
	 *         are attached
	 */
	public static List<String> getAssetTags(Resource assetContent, String requiredParent) {
		LOG.info("inside getAssetTags");

		if (assetContent == null) {
			return new ArrayList<>();
		}
		Asset asset = assetContent.adaptTo(Asset.class);
		if (asset == null) {
			return new ArrayList<>();
		}
		Object tagsArr = asset.getMetadata(TagConstants.PN_TAGS);
		List<String> tagTitles = new ArrayList<>();

		if (tagsArr != null && tagsArr instanceof Object[]) {
			Object[] tags = (Object[]) tagsArr;
			TagManager tagManager = assetContent.getResourceResolver().adaptTo(TagManager.class);

			for (Object tag : tags) {
				if (tagManager != null) {
					Tag tagObj = tagManager.resolve(tag.toString());
					if (tagObj.getPath().startsWith(requiredParent)) {
						tagTitles.add(tagObj.getName());
					}

				}
			}
		}

		return tagTitles;

	}

	/**
	 * This method converts jcr formatted date to coveo specification format.
	 *
	 * @param cal the cal
	 * @return coveo formatted date of type string
	 */
	public static String coveoDate(Calendar cal) {
		LOG.info("inside coveoDate");

		if (cal == null) {
			return "";
		}
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-DD'T'hh:mm:ss");
		return dateFormat.format(cal.getTime()) + "Z";
	}

	/**
	 * This method returs currentDate.
	 *
	 * @return Date value
	 */
	public static String getCurrentTimeStamp() {
		SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// dd/MM/yyyy
		Date now = new Date();
		return sdfDate.format(now);
	}

	/**
	 * This method returns httpURL.
	 *
	 * @param coveoServerURL the coveo server URL
	 * @return httpURL value
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	public static HttpURLConnection getHttpConnection(String coveoServerURL) throws IOException {
		LOG.info("inside getHttpConnection");

		HttpURLConnection connection = null;
		URL url = null;
		url = new URL(coveoServerURL);
		connection = (HttpURLConnection) url.openConnection();
		connection.setConnectTimeout(15000);
		connection.setReadTimeout(15000);

		return connection;
	}

	/**
	 * Checks given String is empty or not.
	 *
	 * @param input the input
	 * @return boolean.
	 */
	public static boolean isNotEmpty(String input) {
		boolean flag = false;
		if (input != null && !input.isEmpty())
			flag = true;
		return flag;
	}

}