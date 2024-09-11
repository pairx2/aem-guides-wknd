package com.abbott.aem.av.division.core.servlets;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_GET;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.servlet.Servlet;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;

import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.vault.util.JcrConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.DamConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.NameConstants;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

/**
 *
 * @author EIPESX
 *
 */
@Component(service = Servlet.class, property = {
		SLING_SERVLET_RESOURCE_TYPES + "=" + AvDocumentReportServlet.RESOURCE_TYPE,
		SLING_SERVLET_METHODS + "=" + METHOD_GET })
public class AvDocumentReportServlet extends SlingAllMethodsServlet
		implements JcrConstants, NameConstants, DamConstants {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	public static final String RESOURCE_TYPE = "av/division/components/content/report";
	public static final String SLASH = "/";
	public static final String AVEIFU = "av:eifu";

	private static final Logger log = LoggerFactory.getLogger(AvDocumentReportServlet.class);
	private static final String IFU_ID = "ifu_id";
	private static final String REV_NUMBER = "revision_number";
	private static final String TITLE = "title";

	/**
	 * This method responses a Report of DAM assets
	 *
	 * @throws IOException
	 */
	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
		String path = null;
		Node metaNode = null;
		Node jcrNode = null;
		String strDamPath = null;
		String strTagPath = null;
		int batchSize = 1000;
		int offset = 0;
		SearchResult result = null;
		JsonArray array = new JsonArray();
		List<Hit> hits = null;
		boolean moreResults = false;
		ResourceResolver resourceResolver = request.getResourceResolver();
		do {
			strDamPath = request.getParameter("dampath");
			strTagPath = request.getParameter("tagpath");
			strDamPath = checkStrDamPath(strDamPath);
			strTagPath = checkStrTagPath(strTagPath);
			Query query = getQueryResult(strDamPath, resourceResolver);
			TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
			query.setStart(offset);
			query.setHitsPerPage(batchSize);
			try {
				result = query.getResult();
				hits = result.getHits();
				if (hits != null) {
					for (Hit hit : hits) {
						Resource assetResource = hit.getResource();
						path = assetResource.getPath();
						jcrNode = resourceResolver.getResource(path.concat(SLASH).concat(JcrConstants.JCR_CONTENT))
								.adaptTo(Node.class);
						metaNode = resourceResolver
								.getResource(path.concat(SLASH).concat(JcrConstants.JCR_CONTENT).concat("/metadata"))
								.adaptTo(Node.class);
						metaDataCheck(metaNode, tagManager, request, array, jcrNode, path, strTagPath);
					}
					offset += batchSize;
					moreResults = offset <= result.getTotalMatches();
				}
			} catch (RepositoryException | IllegalStateException | ParseException e1) {
				log.error("Exception in AV Document Report {}", e1.getMessage());
			}
		} while (moreResults);
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write(array.toString());
	}

	private boolean isInDateRange(Date d3, Date d2, Date d1) {
		if (null == d2 && null == d1) {
			return true;
		}
		if (null != d2 && null != d1 && null != d3) {
			return d3.compareTo(d2) <= 0 && d3.compareTo(d1) >= 0;
		} else if (null != d2 && null != d3) {
			return d3.compareTo(d2) <= 0;
		} else if (null != d1 && null != d3) {
			return d3.compareTo(d1) >= 0;
		}
		return false;
	}

	private Date checkDate(String toDate, SimpleDateFormat dateFormat1) throws ParseException {
		return StringUtils.isEmpty(toDate) ? null : dateFormat1.parse(toDate);
	}

	private String checkStrTagPath(String strTagPath) {
		if (StringUtils.isEmpty(strTagPath)) {
			strTagPath = AVEIFU;
		} else {
			strTagPath = strTagPath.trim().replace(":", "/");
		}
		return strTagPath;
	}

	private String checkStrDamPath(String strDamPath) {
		if (StringUtils.isEmpty(strDamPath)) {
			strDamPath = SLASH.concat("/content/dam/av/eifu");
		} else {
			strDamPath = strDamPath.trim();
		}
		return strDamPath;
	}

	private void putDataInJson(Node metaNode, TagManager tagManager, String date, JsonArray array, String strTagPath,
			String path, Map<String, String> propertiesMap) throws RepositoryException {
		if (metaNode.hasProperty(NameConstants.PN_TAGS)) {
			Property prop = metaNode.getProperty(NameConstants.PN_TAGS);
			if (prop != null && prop.isMultiple()) {
				javax.jcr.Value[] tags = prop.getValues();
				if (tags.length > 0) {
					createJSONArray(tags, tagManager, date, array, strTagPath, path, propertiesMap);
				}
			}
		}
	}

	private String getTitle(Node metaNode, String path) throws RepositoryException {
		String title = null;
		if (metaNode.hasProperty(DamConstants.DC_TITLE)) {
			if (metaNode.getProperty(DamConstants.DC_TITLE).isMultiple()) {
				title = metaNode.getProperty(DamConstants.DC_TITLE).getValues()[0].getString();
			} else {
				title = metaNode.getProperty(DamConstants.DC_TITLE).getValue().getString();
			}
		}
		if (title == null) {
			title = metaNode.hasProperty(JcrConstants.JCR_TITLE)
					? metaNode.getProperty(JcrConstants.JCR_TITLE).getValue().getString()
					: null;
		}
		return null != title ? title : path;

	}

	private void metaDataCheck(Node metaNode, TagManager tagManager, SlingHttpServletRequest request, JsonArray array,
			Node jcrNode, String path, String strTagPath) throws RepositoryException, ParseException {
		String fromDate = null;
		String toDate = null;
		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		fromDate = request.getParameter("fromdate");
		toDate = request.getParameter("todate");
		Date d1 = checkDate(fromDate, dateFormat1);
		Date d2 = checkDate(toDate, dateFormat1);
		Calendar cal = null;
		String date = null;
		Date d3 = null;
		String ifuId = "";
		String revision = "";
		SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
		if (metaNode.getParent().hasProperty(NameConstants.PN_ON_TIME)) {
			cal = metaNode.getParent().getProperty(NameConstants.PN_ON_TIME).getDate();
			date = dateFormat.format(cal.getTime());
			d3 = dateFormat.parse(date);
		}
		boolean isDateRange = isInDateRange(d3, d2, d1);
		if (jcrNode.hasProperty(NameConstants.PN_PAGE_LAST_REPLICATION_ACTION) && jcrNode
				.getProperty(NameConstants.PN_PAGE_LAST_REPLICATION_ACTION).getValue().getString().equals("Activate")
				&& isDateRange) {
			if (metaNode.hasProperty(IFU_ID))
				ifuId = metaNode.getProperty(IFU_ID).getValue().getString();
			if (metaNode.hasProperty(REV_NUMBER))
				revision = metaNode.getProperty(REV_NUMBER).getValue().getString();
			String pdfTitle = getTitle(metaNode, path);
			Map<String, String> propertiesMap = new HashMap<>();
			propertiesMap.put(IFU_ID, ifuId);
			propertiesMap.put(REV_NUMBER, revision);
			propertiesMap.put(TITLE, pdfTitle);
			putDataInJson(metaNode, tagManager, date, array, strTagPath, path, propertiesMap);
		}
	}

	private void createJSONArray(Value[] tags, TagManager tagManager, String date, JsonArray array, String strTagPath,
			String path, Map<String, String> propertiesMap) throws RepositoryException {
		JsonObject jsonObj = null;
		String[] finalTag = null;
		for (int j = 0; j < tags.length; j++) {
			finalTag = getFinalTag(tags[j]);
			if (finalTag != null) {
				String strTag = "/content/cq:tags/".concat(strTagPath);
				if (finalTag.length == 7) {
					jsonObj = configure(finalTag, strTag, tagManager);
				} else if (finalTag.length == 8) {
					jsonObj = populateJson(finalTag, strTag, tagManager);
				}
				if (null != jsonObj) {
					jsonObj.addProperty("IFU Name (Document Name)", propertiesMap.get(TITLE));
					jsonObj.addProperty("Effective Date", date);
					jsonObj.addProperty("Document DAM path", path);
					jsonObj.addProperty("IFU ID", propertiesMap.get(IFU_ID));
					jsonObj.addProperty("Revision", propertiesMap.get(REV_NUMBER));
					array.add(jsonObj);
				}
			}
		}
	}

	private JsonObject configure(String[] finalTag, String strTag, TagManager tagManager) {
		JsonObject jsonObj = new JsonObject();
		String cat = "";
		String subcat = "";
		String country = "";
		String language = "";
		String role = "";
		String product = "";
		for (int i = 1; i < finalTag.length; i++) {
			String data = finalTag[i];
			strTag = strTag.concat(SLASH).concat(data);
			Tag tag = tagManager.resolve(strTag);
			String tagTitle = null != tag ? tag.getTitle() : "";
			if (i == 1) {
				country = tagTitle;
			} else if (i == 2 && StringUtils.length(tagTitle) > 2) {
				language = tagTitle.substring(0, 1).toUpperCase() + tagTitle.substring(1);
			} else if (i == 3) {
				role = tagTitle;
			} else if (i == 4) {
				cat = tagTitle;
			} else if (i == 5) {
				subcat = tagTitle;
			} else if (i == 6) {
				product = tagTitle;
			}
		}
		jsonObj.addProperty("Country", country);
		if (StringUtils.length(language) > 2)
			jsonObj.addProperty("Language", language.substring(0, 1).toUpperCase() + language.substring(1));
		jsonObj.addProperty("Role", role);
		jsonObj.addProperty("Product Category", cat);
		jsonObj.addProperty("Product Sub-Category", subcat);
		jsonObj.addProperty("Product", product);
		return jsonObj;
	}

	private JsonObject populateJson(String[] finalTag, String strTag, TagManager tagManager) {
		JsonObject jsonObj = new JsonObject();
		String businessUnit = "";
		String cat = "";
		String subcat = "";
		String country = "";
		String language = "";
		String role = "";
		String product = "";
		for (int i = 1; i < finalTag.length; i++) {
			String data = finalTag[i];
			strTag = strTag.concat(SLASH).concat(data);
			Tag tag = tagManager.resolve(strTag);
			String tagTitle = null != tag ? tag.getTitle() : "";
			if (i == 1) {
				country = tagTitle;
			} else if (i == 2) {
				language = tagTitle;
			} else if (i == 3) {
				role = tagTitle;
			} else if (i == 4) {
				businessUnit = tagTitle;
			} else if (i == 5) {
				cat = tagTitle;
			} else if (i == 6) {
				subcat = tagTitle;
			} else if (i == 7) {
				product = tagTitle;
			}
		}
		jsonObj.addProperty("Country", country);
		if (StringUtils.length(language) > 2)
			jsonObj.addProperty("Language", language.substring(0, 1).toUpperCase() + language.substring(1));
		jsonObj.addProperty("Role", role.toUpperCase());
		jsonObj.addProperty("Specialty", businessUnit);
		jsonObj.addProperty("Product Category", cat);
		jsonObj.addProperty("Product Sub-Category", subcat);
		jsonObj.addProperty("Product", product);
		return jsonObj;
	}

	private String[] getFinalTag(Value value) throws RepositoryException {
		String tagVariable = value.getString();
		if (tagVariable.startsWith(SLASH)) {
			tagVariable = tagVariable.replaceFirst(SLASH, "");
		}
		return tagVariable.split(SLASH);
	}

	private Query getQueryResult(String strDamPath, ResourceResolver resourceResolver) {
		Session session = resourceResolver.adaptTo(Session.class);
		QueryBuilder queryBuilder = resourceResolver.adaptTo(QueryBuilder.class);
		Map<String, String> map = new HashMap<>();
		map.put("path", strDamPath);
		map.put("type", DamConstants.NT_DAM_ASSET);
		map.put("property", "@jcr:content/metadata/dc:format");
		map.put("property.value", "application/pdf");
		map.put("mainasset", "true");
		map.put("orderby", "@jcr:content/onTime");
		map.put("orderby.sort", "desc");
		map.put("p.limit", "-1");
		return queryBuilder.createQuery(PredicateGroup.create(map), session);
	}
}
