package com.abbott.aem.ardx.division.core.servlet;

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
import java.util.Locale;
import java.util.Map;
import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFormatException;
import javax.servlet.Servlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.adobe.xfa.ut.StringUtils;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Component(service = Servlet.class, property = {
		SLING_SERVLET_RESOURCE_TYPES + "=" + ArdxDocumentReportServlet.RESOURCE_TYPE,
		SLING_SERVLET_METHODS + "=" + METHOD_GET })
public class ArdxDocumentReportServlet extends SlingAllMethodsServlet implements JcrConstants,NameConstants,DamConstants   {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static final String RESOURCE_TYPE = "ardx/division/components/content/report";
	public static final String SLASH = "/";
	public static final String DEFAULT = "default";
	transient JsonArray array = null;
	transient JsonObject localeJson = null;
	private static final Logger log = LoggerFactory.getLogger(ArdxDocumentReportServlet.class);

	/**
	 * This method responses a Report of DAM assets
	 * 
	 * @throws IOException
	 */
	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
		String title = null;
		String path = null;
		Node metaNode = null;
		Node jcrNode = null;
		String strDamPath = null;
		String strTagPath = null;
		String fromDate = null;
		String toDate = null;
		SearchResult result = null;
		List<Hit> hits = null;
		ResourceResolver resourceResolver = request.getResourceResolver();
		TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
		SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		strDamPath = request.getParameter("dampath");
		strTagPath = request.getParameter("tagpath");
		fromDate = request.getParameter("fromdate");
		toDate = request.getParameter("todate");
		String hiddenPath =SLASH.concat("content/ardx/eifu/report/jcr:content/root/hidden");
		Resource res = resourceResolver.getResource(hiddenPath);
		strDamPath = checkStrDamPath(strDamPath);
		strTagPath = checkStrTagPath(strTagPath);
		array = new JsonArray();
		Query query = getQueryResult(strDamPath, resourceResolver);
		try {
			Date d1 = checkDate(fromDate,dateFormat1);
			Date d2 = checkDate(toDate,dateFormat1);
		    localeJson = getLocaleJson(res);
			result = query.getResult();
			hits = result.getHits();
			if (hits != null) {
				for (Hit hit : hits) {
					Date d3 = null;
					Calendar cal = null;
					String date = null;
					Resource assetResource = hit.getResource();
					path = assetResource.getPath();
					jcrNode = resourceResolver.getResource(path .concat(SLASH).concat(JcrConstants.JCR_CONTENT)).adaptTo(Node.class);
					metaNode = resourceResolver.getResource(path.concat(SLASH).concat(JcrConstants.JCR_CONTENT).concat("/metadata")).adaptTo(Node.class);
					if (metaNode.hasProperty(NameConstants.PN_ON_TIME)) {
						cal = metaNode.getProperty(NameConstants.PN_ON_TIME).getDate();
						date = dateFormat.format(cal.getTime());
						d3 = dateFormat.parse(date);
					}
					
					boolean isDateRange = isInDateRange( d3, d2, d1);
					if (jcrNode.hasProperty(NameConstants.PN_PAGE_LAST_REPLICATION_ACTION)
							&& jcrNode.getProperty(NameConstants.PN_PAGE_LAST_REPLICATION_ACTION).getValue().getString().equals("Activate")
							&& isDateRange) {
						title = getTitle(metaNode, path);
						putDataInJson(metaNode, tagManager, title, date,strTagPath);

					}
				}
			}
		}

		catch (ValueFormatException e1) {
			log.error("ValueFormatException in ARDX Document Report " + e1.getMessage());
		} catch (RepositoryException e1) {
			log.error("RepositoryException in ARDX Document Report" + e1.getMessage());
		} catch (java.text.ParseException e1) {
			log.error("ParseException in ARDX Document Report" + e1.getMessage());
		}

		response.setContentType("application/json;charset=UTF-8");
		try {
			response.getWriter().write(array.toString());
		} catch (IOException e) {
			log.error("IOException in ARDX Document Report" + e.getMessage());
		}

	}
	
	private JsonObject getLocaleJson(Resource res) throws ValueFormatException, PathNotFoundException, RepositoryException {
		JsonObject jsonObj = new JsonObject();
		Node node = null!=res ? res.adaptTo(Node.class):null;
		String localeJsonString = null!=node && node.hasProperty("value")?node.getProperty("value").getValue().getString():null;
		if(null != localeJsonString) {
			jsonObj =new JsonParser().parse(localeJsonString).getAsJsonObject();
		}
		
		return jsonObj;
	}

	private Date checkDate(String toDate, SimpleDateFormat dateFormat1) throws ParseException {
		return StringUtils.isEmpty(toDate) ?null:dateFormat1.parse(toDate);
	}

	

	private String checkStrTagPath(String strTagPath) {
		if (StringUtils.isEmpty(strTagPath)) {
			strTagPath = "ardx:eifu";
		} else {
			strTagPath = strTagPath.trim();
		}
		return strTagPath;
	}

	private String checkStrDamPath(String strDamPath) {
		if (StringUtils.isEmpty(strDamPath)) {
			strDamPath = SLASH.concat("content/dam/ardx/eifu");
		} else {
			strDamPath = strDamPath.trim();
		}
		return strDamPath;
	}

	private void putDataInJson(Node metaNode, TagManager tagManager, String title, String date, String strTagPath)
			throws PathNotFoundException, ValueFormatException, RepositoryException {
		if (metaNode.hasProperty(NameConstants.PN_TAGS)) {
			Property prop = metaNode.getProperty(NameConstants.PN_TAGS);
			if (prop != null && prop.isMultiple()) {
				javax.jcr.Value[] tags = prop.getValues();
				putData(tags, tagManager,strTagPath,title,date);
				
			}
		}

	}

	private void putData(Value[] tags, TagManager tagManager, String strTagPath, String title, String date) throws ValueFormatException, RepositoryException {
		Map<String, String> countries = new HashMap<>();
		if (tags.length > 0) {
			Map<Locale, String> cat = null;
			Map<Locale, String> subcat =null;
			String role = "";
			String product = "";
			for (int j = 0; j < tags.length; j++) {

				String tagString = tags[j].getString();
				if (tagString.startsWith(strTagPath.concat("/languages/"))) {
					getCountryLanguageMap(tagManager, tagString, countries);

				} else if (tagString.startsWith(strTagPath.concat("/products/"))) {
					String tagitle = tagManager.resolve(tagString).getTitle();
					product = tagitle;

				} else if (tagString.startsWith(strTagPath.concat("/categories/"))) {
					cat = getCategory(tagString, tagManager);
					subcat = getSubcategory(tagString, tagManager);

				} else if (tagString.startsWith(strTagPath.concat("/user-role/"))) {
					role = tagManager.resolve(tagString).getTitle();

				}

			}
			pushDataToJson(countries, cat, subcat, product, role, title, date);
		}
		
	}

	private void getCountryLanguageMap(TagManager tagManager, String tagString,
			Map<String, String> countries) {
		Tag tag = tagManager.resolve(tagString);
		Tag ltag = tagManager.resolve(tagString.substring(0, tagString.lastIndexOf(SLASH)));
		if(null!=tag && null !=ltag) {
			String tagTitle = tag.getTitle();
			if (tagString.split(SLASH).length == 4) {
				if(!StringUtils.isEmpty(countries.get(tagTitle))){
					countries.put(tagTitle,countries.get(tagTitle).concat("::::").concat(ltag.getTitle()));
				}
				else {
					countries.put(tag.getTitle(),ltag.getTitle());
				}

			} else {
				countries.put("", tag.getTitle());
			}
		}
	}

	private Map<Locale, String> getSubcategory(String tagString, TagManager tagManager) {
		Map<Locale, String> subcat = new HashMap<>();
		Tag tag = tagManager.resolve(tagString);
		if (null != tag && tagString.split(SLASH).length == 4 ) {
				subcat = tag.getLocalizedTitles();
				subcat.put(new Locale(DEFAULT), tag.getTitle());
		}
		return subcat;
	}

	private Map<Locale, String> getCategory(String tagString, TagManager tagManager) {
		Map<Locale, String> cat = new HashMap<>();
		if (tagString.split(SLASH).length == 4) {
			Tag catTagg = tagManager.resolve(tagString.substring(0, tagString.lastIndexOf(SLASH)));
			if (null != catTagg) {
				cat = catTagg.getLocalizedTitles();
				cat.put(new Locale(DEFAULT), catTagg.getTitle());
			}
		}
		else {
			cat = getCategoryfromTag(tagString,tagManager);
			
		}
		return cat;
	}

	private Map<Locale, String> getCategoryfromTag(String tagString, TagManager tagManager) {
		Map<Locale, String> cat = new HashMap<>();
		Tag tag = tagManager.resolve(tagString);
		if (null != tag) {
			cat = tag.getLocalizedTitles();
			cat.put(new Locale(DEFAULT), tag.getTitle());
		}
		return cat;
	}

	private String getTitle(Node metaNode, String path)
			throws PathNotFoundException, ValueFormatException, RepositoryException {
		String title = null;
		if (metaNode.hasProperty(DamConstants.DC_TITLE)) {
			if (metaNode.getProperty(DamConstants.DC_TITLE).isMultiple()) {
				title = metaNode.getProperty(DamConstants.DC_TITLE).getValues()[0].getString();
			} else {
				title = metaNode.getProperty(DamConstants.DC_TITLE).getValue().getString();
			}
		}

		if (title == null) {
			title = metaNode.hasProperty(JcrConstants.JCR_TITLE) ? metaNode.getProperty(JcrConstants.JCR_TITLE).getValue().getString() : null;

		}
		return null != title ? title : path;
	}

	private boolean isInDateRange( Date d3, Date d2, Date d1) {
		
		if(null ==d2 && null ==d1) {
			return true;
		}
		if(null!=d2 && null !=d1 && null !=d3) {
			return   d3.compareTo(d2) <= 0 && d3.compareTo(d1) >= 0;
		}
		else if(null!=d2 && null !=d3) {
			return   d3.compareTo(d2) <= 0 ;
		}
		else if(null !=d1 && null !=d3) {
			return d3.compareTo(d1) >= 0 ;
		}
		return false;
	}

	private void pushDataToJson(Map<String, String> countries, Map<Locale, String> cat, Map<Locale, String> subcat, String product, String role,
			String title, String date) {
		for (Map.Entry<String, String> entry : countries.entrySet()) {
			JsonObject jsonData = null;
			String language = entry.getValue();
			if(language.contains("::::")) {
				String []languages = language.split("::::");
				for (int i =0;i<languages.length;i++) {
					jsonData = new JsonObject();
					jsonData.addProperty("Country", entry.getKey());
					jsonData.addProperty("Language",languages[i]);
					String category = getCategoryFromMap(localeJson,cat,languages[i]);
					String subcategory = getCategoryFromMap(localeJson,subcat,languages[i]);
					jsonData.addProperty("Role", role);
					jsonData.addProperty("Product Category", category);
					jsonData.addProperty("Product Sub-Category", subcategory);
					jsonData.addProperty("Product", product);
					jsonData.addProperty("IFU Name (Document Name)", title);
					jsonData.addProperty("Effective Date", date);
					array.add(jsonData);
				}
			}
			else {
				jsonData = new JsonObject();
				String category = getCategoryFromMap(localeJson,cat,language);
				String subcategory = getCategoryFromMap(localeJson,subcat,language);
				jsonData.addProperty("Country", entry.getKey());
				jsonData.addProperty("Language", language);
				jsonData.addProperty("Role", role);
				jsonData.addProperty("Product Category", category);
				jsonData.addProperty("Product Sub-Category", subcategory);
				jsonData.addProperty("Product", product);
				jsonData.addProperty("IFU Name (Document Name)", title);
				jsonData.addProperty("Effective Date", date);
				array.add(jsonData);
			}
			
			

		}

	}

	private String getCategoryFromMap(JsonObject localeJson, Map<Locale, String> cat, String language) {
		Locale locale = null !=localeJson.get(language)?new Locale(localeJson.get(language).getAsString()):new Locale(DEFAULT);
		String category = "";
		if(null !=cat) {
			if(cat.containsKey(locale)) {
				category = cat.get(locale);
			}
			else {
				category=cat.get(new Locale(DEFAULT));
			}
			}
			
		
		return category;
	}

	private Query getQueryResult(String strDamPath, ResourceResolver resourceResolver) {
		Session session = resourceResolver.adaptTo(Session.class);
		QueryBuilder queryBuilder = resourceResolver.adaptTo(QueryBuilder.class);
		Map<String, String> map = new HashMap<>();
		map.put("path", strDamPath);
		map.put("type", DamConstants.NT_DAM_ASSET );
		map.put("property", "@jcr:content/metadata/dc:format");
		map.put("property.value", "application/pdf");
		map.put("mainasset", "true");
		map.put("orderby", "@jcr:content/metadata/onTime");
		map.put("orderby.sort", "desc");
		map.put("p.limit", "-1");
		return queryBuilder.createQuery(PredicateGroup.create(map), session);
	}

}
