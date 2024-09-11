package com.abbott.aem.cloud.api.jobs;

import java.io.StringReader;
import java.security.AccessControlException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TimeZone;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.PropertyIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.nodetype.PropertyDefinition;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonException;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.JsonString;
import javax.json.JsonValue;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.commons.jcr.JcrUtil;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;

/**
 * @author VIDHYKX2 AEM Wrapper service to be consumed by ESL for updating
 *         metadata and documents.
 *
 */
@Component(immediate = true, service = { JobConsumer.class, AbbottJob.class }, property = {
		JobConsumer.PROPERTY_TOPICS + "=" + EifuManualsAssetMetadataUpdateJob.TOPIC })

public class EifuManualsAssetMetadataUpdateJob implements JobConsumer, AbbottJob {

	public static final String DAM_AV_MANUALS_EIFU_GLOBAL = "/content/dam/av/manuals-eifu/global/";
	@Reference
	ResourceResolverFactory resolverFactory;

	@Reference
	private Replicator replicator;

	private String damPath = "";
	private Resource globalPdfResource;
	private static final Logger LOGGER = LoggerFactory.getLogger(EifuManualsAssetMetadataUpdateJob.class);
	public static final String TOPIC = "eifumanualsmetadataupdate/esl/job";
	protected static final String EIFU_SERVICE = "eifu-system-user";
	public static final String PAYLOAD_JSON = "data";
	public static final String PAYLOAD = "payload";
	private static final String AV_MANUALSEIFU = "av:manualseifu/";
	private static final String FORWARD_SLASH = "/";
	private static final String CATEGORY = "category";
	private static final String SUB_CATEGORY = "subCategory";
	private static final String PDF_PATH = "pdf_path";
	private static final String METADATA = "metadata";
	private static final String CONTENT_TYPE = "content_type";
	private static final String COUNTRY_LANGUAGE_TAGS = "country-language-tags";
	private static final String SAP_PRODUCTS = "sap_products";
	private static final String JCR_METADATA = "jcr:content/metadata";
	private static final String IFU_TITLE = "ifu_title";
	private static final String HIERARCHIES = "hierarchies";
	private static final String LANG_ISO = "language_iso";
	private static final String LANG_NAME = "language_name";
	private static final String COUNTRY_ISO = "country_iso";
	private static final String COUNTRY_NAME = "country_name";
	private static final String BU = "bu";
	private static final String REPLACE = "\\s";
	private static final String TRADEMARK = "\u2122";
	private static final String REGMARK = "\u00AE";
	private static final String HTML_TRADE = "&trade;";
	private static final String MARKUP_TRADE = "<sup>TM</sup>";
	private static final String HTML_REG = "&reg;";
	private static final String SPL_CHAR = "[^\\p{IsAlphabetic}\\p{IsIdeographic}\\s\\d]";
	private static final String EFFBEGIN_PUB = "effective_begin_date";
	private static final String HCP_CONSTANT = "hcp";
	private static final String NHCP_CONSTANT = "nhcp";
	private static final String HCP = "Healthcare Professional IFU";
	private static final String NHCP = "Patient Manual";
	private static final String SAP_DESCRIPTION = "sap_description";
	private static final String SAP_DESCRIPTION_LIST = "sap_product_description_list";
	private static final String SAP_MODELNO = "sap_model_number";
	private static final String SAP_MODELNO_LIST = "sap_product_model_number_list";

	private static final String PRE_VERSIONS = "previous_versions";
	private static final String PRE_ID = "previous_ifu_id";
	private static final String PRE_IFU_REV = "previous_ifu_rev";
	private static final String PRE_VER = "previousversions";
	private static final String COUNTRY_LANGUAGE_TAGS_TO_BE_REMOVED = "country-language-tags-to-be-removed";

	@Override
	public JobResult process(Job job) {
		JobResult result = JobResult.CANCEL;
		String payloadObj = job.getProperty(PAYLOAD_JSON).toString();
		LOGGER.debug("in process method with payload as ==> {} ", payloadObj);
		try (JsonReader jsonReader = Json.createReader(new StringReader(payloadObj));
				ResourceResolver resolver = resolverFactory.getServiceResourceResolver(getResolverParams())) {
			JsonObject object = jsonReader.readObject();
			JsonObject metadata = object.getJsonObject(PAYLOAD).getJsonObject(METADATA);
			damPath = metadata.getString(PDF_PATH);
			JsonArray countrytags = object.getJsonObject(PAYLOAD).get(COUNTRY_LANGUAGE_TAGS).asJsonArray();
			Map<String, ArrayList<String>> addedList = createHashMap(countrytags);
			Map<String, Set<String>> countryLanMap = new HashMap<>();
			addCountryLanDetails(countryLanMap, countrytags);
			globalPdfResource = resolver.getResource(damPath);
			String parentPath = globalPdfResource.getParent().getPath();
			Session session = resolver.adaptTo(Session.class);
			JsonArray countryLanguageTags = object.getJsonObject(PAYLOAD).get(COUNTRY_LANGUAGE_TAGS_TO_BE_REMOVED)
					.asJsonArray();
			Map<String, ArrayList<String>> removalList = createHashMap(countryLanguageTags);
			removalList=filterCountryRemoval(addedList,removalList);
			checkPdfBasedOnCountryLanguageTags(removalList, globalPdfResource, resolver, session);
			ArrayList<String> damPaths = createResourcepaths(parentPath, countryLanMap, session);
			Node sourceNode = globalPdfResource.adaptTo(Node.class);
			setOnTimeSapvalues(damPaths, metadata, object, sourceNode, resolver);
			Map<String, List<Tag>> tagMap = new HashMap<>();
			List<Tag> tagsArray = new ArrayList<>();
			TagManager tagManager = resolver.adaptTo(TagManager.class);
			for (JsonValue i : countrytags) {
				JsonArray hierarchies = (JsonArray) i.asJsonObject().get(HIERARCHIES);
				for (JsonValue j : hierarchies) {
					String contentType = j.asJsonObject().getString(CONTENT_TYPE);
					String hcp = contentType.equals(HCP) ? HCP_CONSTANT : StringUtils.EMPTY;
					hcp = contentType.equals(NHCP) ? NHCP_CONSTANT : HCP_CONSTANT;
					String countryIso = i.asJsonObject().getString(COUNTRY_ISO).toUpperCase();
					String countryName = i.asJsonObject().getString(COUNTRY_NAME);
					String languageIso = i.asJsonObject().getString(LANG_ISO).toLowerCase();
					String languageName = i.asJsonObject().getString(LANG_NAME);
					String business = j.asJsonObject().getString(BU).toLowerCase().replaceAll(SPL_CHAR, "")
							.replaceAll(REPLACE, "-").replace(",", "");
					String businessTitle = j.asJsonObject().getString(BU);
					String category = j.asJsonObject().getString(CATEGORY).toLowerCase().replaceAll(SPL_CHAR, "")
							.replaceAll(REPLACE, "-").replace(",", "");
					String categoryTitle = j.asJsonObject().getString(CATEGORY);
					String subCategory = j.asJsonObject().getString(SUB_CATEGORY).toLowerCase().replaceAll(SPL_CHAR, "")
							.replaceAll(REPLACE, "-").replace(",", "");
					String subCategoryTitle = j.asJsonObject().getString(SUB_CATEGORY);
					String countryTitle = countryIso + " " + countryName;
					String countrytagStructure = AV_MANUALSEIFU.concat(countryIso);
					tagManager.createTag(countrytagStructure, countryTitle, " ", true);
					String languagetagStructure = AV_MANUALSEIFU.concat(countryIso).concat(FORWARD_SLASH)
							.concat(languageIso);
					tagManager.createTag(languagetagStructure, languageName, " ", true);
					String hcptagStructure = AV_MANUALSEIFU.concat(countryIso).concat(FORWARD_SLASH).concat(languageIso)
							.concat(FORWARD_SLASH).concat(hcp);
					tagManager.createTag(hcptagStructure, hcp.toUpperCase(), " ", true);
					String businesstagStructure = AV_MANUALSEIFU.concat(countryIso).concat(FORWARD_SLASH)
							.concat(languageIso).concat(FORWARD_SLASH).concat(hcp).concat(FORWARD_SLASH)
							.concat(business);
					tagManager.createTag(businesstagStructure, businessTitle, " ", true);
					String categorytagStructure = AV_MANUALSEIFU.concat(countryIso).concat(FORWARD_SLASH)
							.concat(languageIso).concat(FORWARD_SLASH).concat(hcp).concat(FORWARD_SLASH)
							.concat(business).concat(FORWARD_SLASH).concat(category);
					tagManager.createTag(categorytagStructure, categoryTitle, " ", true);
					String subCategorytagStructure = AV_MANUALSEIFU.concat(countryIso).concat(FORWARD_SLASH)
							.concat(languageIso).concat(FORWARD_SLASH).concat(hcp).concat(FORWARD_SLASH)
							.concat(business).concat(FORWARD_SLASH).concat(category).concat(FORWARD_SLASH)
							.concat(subCategory);
					tagManager.createTag(subCategorytagStructure, subCategoryTitle, " ", true);
					String title = replaceSymbols(((JsonString) metadata.get(IFU_TITLE)).getString());
					String titleTagStructure = AV_MANUALSEIFU.concat(countryIso).concat(FORWARD_SLASH)
							.concat(languageIso).concat(FORWARD_SLASH).concat(hcp).concat(FORWARD_SLASH)
							.concat(business).concat(FORWARD_SLASH).concat(category).concat(FORWARD_SLASH)
							.concat(subCategory).concat(FORWARD_SLASH)
							.concat(title.toLowerCase().replaceAll(SPL_CHAR, "").replaceAll(REPLACE, "-"));
					Tag tag = tagManager.createTag(titleTagStructure, title, " ", true);
					if (tag != null) {
						tagsArray.add(tag);
						List<Tag> tagSet = tagMap.getOrDefault(countryIso.concat(FORWARD_SLASH).concat(languageIso),
								new ArrayList<>());
						tagSet.add(tag);
						tagMap.put(countryIso.concat(FORWARD_SLASH).concat(languageIso), tagSet);
					}
				}
			}
			setMetaDataValues(damPaths, metadata, tagMap, globalPdfResource, resolver);
			resolver.commit();
			session.save();
			result = JobResult.OK;
		} catch (JsonException | PersistenceException | LoginException | AccessControlException
				| InvalidTagFormatException | ParseException | RepositoryException e) {
			LOGGER.error("Exception occurred while setting metadata for the document", e);
			LOGGER.error("Job failed to update metadata for this document ==> {}", damPath);
		}
		return result;
	}

	private Map<String, ArrayList<String>> filterCountryRemoval(Map<String, ArrayList<String>> addedList,
			Map<String, ArrayList<String>> removalList) {
		for (Entry<String, ArrayList<String>> entry : addedList.entrySet()) {
			String key = entry.getKey();
			ArrayList<String> firstList = entry.getValue();
			ArrayList<String> secondList = removalList.get(key);
			if (null != secondList && !secondList.isEmpty()) {
				if (secondList.size() == firstList.size() && firstList.equals(secondList)) {
					removalList.remove(key);
				} else {
					removalList.get(key).removeAll(firstList);
				}
			}
		}
		return removalList;
	}

	private Map<String, ArrayList<String>> createHashMap(JsonArray countryLanguageTags) {
		Map<String, ArrayList<String>> countryList = new HashMap<>();
		for (JsonValue value : countryLanguageTags) {
			String countryIso = value.asJsonObject().getString(COUNTRY_ISO).toUpperCase();
			String languageIso = value.asJsonObject().getString(LANG_ISO).toLowerCase();
			if (countryList.containsKey(countryIso)) {
				ArrayList<String> list = countryList.get(countryIso);
				list.add(languageIso);
				countryList.put(countryIso, list);
			} else {
				ArrayList<String> list = new ArrayList<>();
				list.add(languageIso);
				countryList.put(countryIso, list);
			}
		}
		return countryList;
	}

	private void checkPdfBasedOnCountryLanguageTags(Map<String, ArrayList<String>> removalList, Resource globalPdfResource,
			ResourceResolver resolver, Session session) {
		for (Map.Entry<String, ArrayList<String>> entry : removalList.entrySet()) {
			String countryIso = entry.getKey().toUpperCase();
			List<String> languageIso = entry.getValue();
			for (Iterator<String> iterator = languageIso.iterator(); iterator.hasNext();) {
				String lang = iterator.next();
				String pdfPath = DAM_AV_MANUALS_EIFU_GLOBAL.concat(countryIso).concat(FORWARD_SLASH).concat(lang).concat(FORWARD_SLASH)
						.concat(globalPdfResource.getName());
				Resource pdfResource = resolver.getResource(pdfPath);
				if (null != pdfResource) {
					Resource asssetJcrContent = pdfResource.getChild(JcrConstants.JCR_CONTENT);
					ModifiableValueMap jcrMap = asssetJcrContent.adaptTo(ModifiableValueMap.class);
					if (jcrMap.containsKey(DamConstants.PN_ON_TIME))
						jcrMap.remove(DamConstants.PN_ON_TIME);
					Resource metadataRes = pdfResource.getChild(JCR_METADATA);
					Node node = metadataRes.adaptTo(Node.class);
					removeMetaProperties(node,session,pdfPath);
				}
			}
		}
		commitChanges(resolver);
	}

	private void removeMetaProperties(Node node, Session session, String pdfPath) {
		try {
			PropertyIterator metaProps = node.getProperties();
			while (metaProps.hasNext()) {
				Property property = metaProps.nextProperty();
				PropertyDefinition prdf = property.getDefinition();
				if (!prdf.isProtected())
					property.remove();
			}
			replicator.replicate(session, ReplicationActionType.DEACTIVATE, pdfPath);
		} catch (ReplicationException | RepositoryException e) {
			LOGGER.error("Exception occured while unpublishing the document", e);
		}
		
	}

	private void commitChanges(ResourceResolver resolver) {

		try {
			if (resolver.hasChanges()) {
				resolver.commit();
			}
		} catch (PersistenceException e) {
			LOGGER.error("Exception occured while deleting the document", e);
		}
	}

	private void setOnTimeSapvalues(ArrayList<String> damPaths, JsonObject metadata, JsonObject object, Node sourceNode,
			ResourceResolver resolver) throws RepositoryException, ParseException {
		for (String path : damPaths) {
			Session session = resolver.adaptTo(Session.class);
			JcrUtil.copy(sourceNode, session.getNode(path), globalPdfResource.getName());
			Resource assetResource = resolver.getResource(path.concat("/" + globalPdfResource.getName()));
			String onTime = ((JsonString) metadata.get(EFFBEGIN_PUB)).getString();
			setOntime(onTime, assetResource);
			Resource metadataRes = assetResource.getChild(JCR_METADATA);
			ModifiableValueMap map = metadataRes.adaptTo(ModifiableValueMap.class);
			JsonArray sapProducts = object.getJsonObject(PAYLOAD).get(SAP_PRODUCTS).asJsonArray();
			ArrayList<String> sapDescription = new ArrayList<>();
			ArrayList<String> sapModelNumber = new ArrayList<>();
			for (JsonValue sap : sapProducts) {
				sapDescription.add(sap.asJsonObject().getString(SAP_DESCRIPTION));
				sapModelNumber.add(sap.asJsonObject().getString(SAP_MODELNO));
			}
			if (!sapDescription.isEmpty()) {
				map.put(SAP_DESCRIPTION_LIST, sapDescription.toArray(new String[sapDescription.size()]));
			}
			if (!sapModelNumber.isEmpty()) {
				map.put(SAP_MODELNO_LIST, sapModelNumber.toArray(new String[sapModelNumber.size()]));
			}
			ArrayList<String> previousVersionsList = new ArrayList<>();
			JsonArray previousVersions = object.getJsonObject(PAYLOAD).get(PRE_VERSIONS).asJsonArray();
			for (JsonValue prv : previousVersions) {
				previousVersionsList.add(prv.asJsonObject().getString(PRE_ID).concat("_")
						.concat(prv.asJsonObject().getString(PRE_IFU_REV)));
			}
			if (!previousVersionsList.isEmpty()) {
				map.put(PRE_VER, previousVersionsList.toArray(new String[previousVersionsList.size()]));
			}

		}

	}

	private void setMetaDataValues(ArrayList<String> damPaths, JsonObject metadata, Map<String, List<Tag>> tagMap,
			Resource globalPdfResource, ResourceResolver resolver) {
		for (String path : damPaths) {
			int lanIndex = path.lastIndexOf(FORWARD_SLASH);
			String lan = path.substring(lanIndex - 2);
			Resource assetResource = resolver.getResource(path.concat(FORWARD_SLASH + globalPdfResource.getName()));
			Resource metadataRes = assetResource.getChild(JCR_METADATA);
			ModifiableValueMap map = metadataRes.adaptTo(ModifiableValueMap.class);
			List<Tag> tagList = tagMap.get(lan);
			List<String> tagList2 = new ArrayList<>();
			for (Iterator<Tag> iterator = tagList.iterator(); iterator.hasNext();) {
				Tag tag = iterator.next();
				tagList2.add(tag.getTagID());
			}
			map.put(NameConstants.PN_TAGS, tagList2.toArray(new String[tagList.size()]));
			for (Map.Entry<String, JsonValue> entry : metadata.entrySet()) {
				String key = entry.getKey();
				String value = ((JsonString) entry.getValue()).getString();
				map.put(key, replaceSymbols(value));
			}
			String pdfTitle = replaceSymbols(((JsonString) metadata.get(IFU_TITLE)).getString());
			if (map.containsKey(DamConstants.DC_TITLE)) {
				map.remove(DamConstants.DC_TITLE);
			}
			if (map.containsKey(JcrConstants.JCR_TITLE)) {
				map.remove(JcrConstants.JCR_TITLE);
			}
			map.put(DamConstants.DC_TITLE, pdfTitle);
			map.put(JcrConstants.JCR_TITLE, pdfTitle);
			map.put("division", "av");
		}

	}

	private void setOntime(String onTime, Resource assetResource) throws ParseException {
		if (StringUtils.isNotBlank(onTime)) {
			SimpleDateFormat inputFormat = new SimpleDateFormat("dd-MMM-yyyy");
			Date date = inputFormat.parse(onTime);
			SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
			outputFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
			String outputDate = outputFormat.format(date);
			Resource asssetJcrContent = assetResource.getChild(JcrConstants.JCR_CONTENT);
			ModifiableValueMap jcrMap = asssetJcrContent.adaptTo(ModifiableValueMap.class);
			jcrMap.put(DamConstants.PN_ON_TIME, outputDate);
		}

	}

	private Map<String, Set<String>> addCountryLanDetails(Map<String, Set<String>> countryLanMap,
			JsonArray countrytags) {
		for (JsonValue i : countrytags) {
			String countryIso = i.asJsonObject().getString(COUNTRY_ISO).toUpperCase();
			String languageIso = i.asJsonObject().getString(LANG_ISO).toLowerCase();
			Set<String> countrySet = countryLanMap.getOrDefault(countryIso, new HashSet<>());
			countrySet.add(languageIso);
			countryLanMap.put(countryIso, countrySet);
		}
		return countryLanMap;
	}

	private ArrayList<String> createResourcepaths(String damPath, Map<String, Set<String>> countryLanMap,
			Session session) {
		try {
			ArrayList<String> damPaths = new ArrayList<>();
			for (Map.Entry<String, Set<String>> entry : countryLanMap.entrySet()) {
				String country = entry.getKey();
				Set<String> val = entry.getValue();
				String lanPath = damPath.concat(FORWARD_SLASH).concat(country);
				Node langNode = JcrUtil.createPath(lanPath, JcrResourceConstants.NT_SLING_FOLDER, session);
				if (!langNode.hasNode(JcrConstants.JCR_CONTENT)) {
					langNode.addNode(JcrConstants.JCR_CONTENT, JcrConstants.NT_UNSTRUCTURED);
				}
				JcrUtil.copy(session.getNode(damPath.concat(FORWARD_SLASH).concat(JCR_METADATA)),
						langNode.getNode(JcrConstants.JCR_CONTENT), METADATA);
				for (String lan : val) {
					String pdfPath = damPath.concat(FORWARD_SLASH).concat(country).concat(FORWARD_SLASH).concat(lan);
					damPaths.add(pdfPath);
					Node pdfNode = JcrUtil.createPath(pdfPath, JcrResourceConstants.NT_SLING_FOLDER, session);
					if (!pdfNode.hasNode(JcrConstants.JCR_CONTENT)) {
						pdfNode.addNode(JcrConstants.JCR_CONTENT, JcrConstants.NT_UNSTRUCTURED);
					}
					JcrUtil.copy(session.getNode(damPath.concat(FORWARD_SLASH).concat(JCR_METADATA)),
							pdfNode.getNode(JcrConstants.JCR_CONTENT), METADATA);
				}
			}
			return damPaths;
		} catch (RepositoryException e) {
			LOGGER.error("Exception occured while setting metadata for the document", e);
		}
		return new ArrayList<>();
	}

	private String replaceSymbols(String string) {
		return string.replace(HTML_TRADE, TRADEMARK).replace(MARKUP_TRADE, TRADEMARK).replace(HTML_REG, REGMARK)
				.replace("&nbsp;", " ").replace("&amp;", "\u0026").replace("&ndash;", "\u2013")
				.replace("&rsquo;", "\u2019").replace("&mu;", "\u03BC").replace("&deg;", "\u00B0")
				.replace("&egrave;", "\u00E8").replace("&ouml;", "\u00F6").replace("&auml;", "\u00E4")
				.replace("&aacute;", "\u00E1").replace("&uacute;", "\u00FA").replace("&oacute;", "\u00F3")
				.replace("&bdquo;", "\u201E").replace("&mdash;", "\u2014").replace("&ldquo;", "\u201C")
				.replace("&rdquo;", "\u201D").replace("&micro;", "\u00B5").replace("&eacute;", "\u00E9")
				.replace("\\r", "").replace("\\n", "").replace("\\r\\n", "");
	}

	public String getTopic() {
		return TOPIC;
	}

	private static Map<String, Object> getResolverParams() {
		Map<String, Object> parameters = new HashMap<>();
		parameters.put(ResourceResolverFactory.SUBSERVICE, EIFU_SERVICE);
		return parameters;
	}
}