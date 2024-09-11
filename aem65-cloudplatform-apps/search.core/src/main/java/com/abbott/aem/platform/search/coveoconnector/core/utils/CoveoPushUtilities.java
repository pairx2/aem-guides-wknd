package com.abbott.aem.platform.search.coveoconnector.core.utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;
import java.util.zip.DeflaterOutputStream;

import javax.inject.Inject;
import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.net.ssl.HttpsURLConnection;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.day.cq.commons.jcr.JcrConstants;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.engine.SlingRequestProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.Externalizer;
import com.day.cq.commons.PathInfo;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.contentsync.handler.util.RequestResponseFactory;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.dam.commons.util.DamUtil;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.WCMMode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

/**
 * The Class CoveoPushUtilities.
 */
public class CoveoPushUtilities {

	/** The Constant COMPONENT_ROOT_PATH. */
	private static final String COMPONENT_ROOT_PATH = "componentRootPath";

	/** The Constant BEARER2. */
	private static final String BEARER2 = "Bearer ";

	/** The Constant AUTHORIZATION2. */
	private static final String AUTHORIZATION2 = "Authorization";

	/** The Constant POST. */
	private static final String POST = "POST";

	/** The Constant AES256. */
	private static final String AES256 = "AES256";

	/** The Constant APPLICATION_OCTET_STREAM. */
	private static final String APPLICATION_OCTET_STREAM = "application/octet-stream";

	/** The Constant CONTENT_TYPE3. */
	private static final String CONTENT_TYPE3 = "Content-Type";

	/** The Constant X_AMZ_SERVER_SIDE_ENCRYPTION. */
	private static final String X_AMZ_SERVER_SIDE_ENCRYPTION = "x-amz-server-side-encryption";

	/** The Constant ZLIB. */
	private static final String ZLIB = ".zlib";

	/** The Constant JCR_CONTENT_METADATA2. */
	private static final String JCR_CONTENT_METADATA2 = "/jcr:content/metadata";

	/** The Constant DOCUMENTS_DOCUMENT_ID. */
	public static final String DOCUMENTS_DOCUMENT_ID = "/documents?documentId=";

	/** The Constant SOURCES. */
	public static final String SOURCES = "/sources/";

	/** The Constant V1_ORGANIZATIONS. */
	public static final String V1_ORGANIZATIONS = "/v1/organizations/";

	/** The Constant BEARER. */
	private static final String BEARER = BEARER2;

	/** The Constant APPLICATION_JSON. */
	private static final String APPLICATION_JSON = "application/json";

	/** The Constant AUTHORIZATION. */
	private static final String AUTHORIZATION = AUTHORIZATION2;

	/** The Constant CONTENT_TYPE2. */
	private static final String CONTENT_TYPE2 = "content-type";

	/** The Constant CONTENT_TYPE. */
	private static final String CONTENT_TYPE = "contentType";

	/** The Constant PUT. */
	private static final String PUT = "PUT";

	/** The Constant OK. */
	private static final String OK = "OK";

	/** The Constant REBUILD. */
	private static final String REBUILD = "REBUILD";

	/** The Constant JCR_CONTENT. */
	private static final String JCR_CONTENT = "/jcr:content";

	/** The Constant JCR_CONTENT_METADATA. */
	private static final String JCR_CONTENT_METADATA = JCR_CONTENT_METADATA2;

	/** The Constant URL. */
	private static final String URL = "url";

	/** The Constant HTML2. */
	private static final String HTML2 = "html";

	/** The Constant PATH. */
	private static final String PATH = "path";

	/** The Constant FILE_TYPE. */
	private static final String FILE_TYPE = "filetype";

	/** The Constant HTML. */
	private static final String HTML = ".html";

	/** The Constant FILE_EXTENSION. */
	private static final String FILE_EXTENSION = "fileExtension";

	/** The Constant DATA2. */
	private static final String DATA2 = "data";

	/** The Constant GET. */
	private static final String GET = "GET";

	/** The Constant VAR_COVEOCONNECTOR_COVEOMAPPINGS. */
	private static final String VAR_COVEOCONNECTOR_COVEOMAPPINGS = "/var/coveoconnector/coveomappings";

	/** The Constant COVEO_TYPE. */
	private static final String COVEO_TYPE = "coveoType";

	/** The Constant AEM_FIELD. */
	private static final String AEM_FIELD = "aemField";

	/** The Constant COVEO_FIELD. */
	private static final String COVEO_FIELD = "coveoField";

	/** The Constant EXTERNALIZER_DOMAIN_NAME. */
	private static final String EXTERNALIZER_DOMAIN_NAME = "externalizerDomain";

	/** The Constant PUBLISH. */
	private static final String PUBLISH = "publish";

	/** The Constant SYMBOL_SEPERATOR. */
	private static final String SYMBOL_SEPERATOR = "|";

	/** The Constant SYMBOL_SEMICOLON. */
	private static final String SYMBOL_SEMICOLON = ";";

	/** The Constant CONTENT_FRAGMENT_MASTER. */
	private static final String CONTENT_FRAGMENT_MASTER = "/jcr:content/data/master";

	/** The Constant TAGS. */
	private static final String TAGS = "tags";
	
	/** The Constant SEARCHPAGE. */
    private static final String SEARCHPAGE = "searchpage";

	/** The Constant HIERARCHIAL_FACETS. */
	private static final String HIERARCHIAL_FACETS = "categoryTagHierarchicalFacets";

	/** The Constant CATEGORY_FACETS. */
	private static final String CATEGORY_FACETS = "categoryTagFacets";
	
	/** The Constant CATEGORYLEVEL1. */
	private static final String CATEGORYLEVEL1 ="categorylevel1";

	/** The Constant CATEGORYLEVEL2. */
	private static final String CATEGORYLEVEL2 ="categorylevel2";

	/** The Constant CATEGORYLEVEL1FACET. */
	private static final String CATEGORYLEVEL1FACET = "categorylevel1Facet";
	
	/** The Constant CATEGORYLEVEL2FACET. */
	private static final String CATEGORYLEVEL2FACET = "categorylevel2Facet";

	/** The Constant LOCALIZE_TAGS_TITLE. */
	private static final String LOCALIZE_TAGS_TITLE = "localizetagstitle";

	/** The Constant STR_TRUE. */
	private static final String STR_TRUE = "true";

	/** The Constant CR_LANGUAGE. */
	private static final String JCR_LANGUAGE = "jcrlanguage";


	/** The organization id. */
	private String organizationId;

	/** The source id. */
	private String sourceId;

	/** The access token. */
	private String accessToken;

	/** The coveo push url. */
	private String coveoPushUrl;

	/** The coveo platform url. */
	private String coveoPlatformUrl;

	/** The inheritance logic properties. */
	private String[] inheritanceLogicProperties;

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(CoveoPushUtilities.class.getName());
	
	/** The RESPONSE CODE. */
	private static final String RESPONSE_CODE = "<<= Response Code = ";
	
	private static final String ERROR = "Error = {}";
	
	private static final String FAILED = "Failed";
	
	private static final String JSON_DATA = "Json Data ------->>>>> {}";
	
	private static final String LINE_SEPARATOR = "line.separator";
	
	private static final String UNSUPPORTED_NODE_LOGGER = "Unsupported node result type: ";
	

	/** The mapper. */
	@Inject
	private ObjectMapper mapper = new ObjectMapper();

	/**
	 * Instantiates a new coveo push utilities.
	 */
	public CoveoPushUtilities() {

	}

	/**
	 * Instantiates a new coveo push utilities.
	 *
	 * @param organizationId             the organization id
	 * @param sourceId                   the source id
	 * @param accessToken                the access token
	 * @param serverPath                 the server path
	 * @param coveoPushUrl               the coveo push url
	 * @param coveoPlatformUrl           the coveo platform url
	 * @param inheritanceLogicProperties the inheritance logic properties
	 */
	public CoveoPushUtilities(String organizationId, String sourceId, String accessToken, String serverPath,
							  String coveoPushUrl, String coveoPlatformUrl, String[] inheritanceLogicProperties) {
		this.organizationId = organizationId;
		this.sourceId = sourceId;
		this.accessToken = accessToken;
		this.coveoPushUrl = coveoPushUrl;
		this.coveoPlatformUrl = coveoPlatformUrl;
		this.inheritanceLogicProperties = inheritanceLogicProperties.clone();
	}

	/**
	 * Set Coveo Source Status to <code>statusType</code>.
	 *
	 * @param statusType the new source status
	 * @throws Exception the exception
	 */
	private void setSourceStatus(String statusType) throws IOException {

		URL url = new URL(coveoPushUrl + V1_ORGANIZATIONS + organizationId + SOURCES + sourceId + "/status?statusType="
				+ statusType);
		LOGGER.debug("=>> Setting Source Status: {}", url);

		HttpsURLConnection conn = createHTTPSConnection(url);
		conn.setRequestProperty(AUTHORIZATION, BEARER + accessToken);
		conn.setReadTimeout(10000);
		conn.setConnectTimeout(15000);
		conn.setRequestMethod(POST);
		conn.setDoInput(true);
		conn.setDoOutput(true);
		conn.connect();

		int responseCode = conn.getResponseCode();
		LOGGER.debug(RESPONSE_CODE, responseCode, " ", conn.getResponseMessage());

		if (responseCode != 201) {
			// If the request failed in some way. Check the error stream for information
			throw new IOException("Unable to set source status");
		}
	}

	/**
	 * PUT the provided JSON Document on Coveo.
	 *
	 * @param json  the JSON Document
	 * @param docId the unique Coveo documentId / URI
	 * @return the string
	 * @throws IOException 
	 */
	public String pushDocumentToCoveo(String json, String docId) throws IOException {
		String apiStatus = "";
		URL url = new URL(coveoPushUrl + V1_ORGANIZATIONS + organizationId + SOURCES + sourceId
				+ DOCUMENTS_DOCUMENT_ID + URLEncoder.encode(docId, "UTF-8"));
		LOGGER.info("=>> PUT document to Coveo: {}", url);
		HttpsURLConnection conn = createHTTPSConnection(url);

		try {
			// Set authorization and content-type headers
			conn.setRequestProperty(AUTHORIZATION, BEARER + accessToken);
			conn.setRequestProperty(CONTENT_TYPE2, APPLICATION_JSON);

			// Set parameters of the HttpURLConnection
			conn.setReadTimeout(10000);
			conn.setConnectTimeout(15000);
			conn.setRequestMethod("PUT");
			conn.setDoInput(true);
			conn.setDoOutput(true);

			writeStream(json, conn);

			int responseCode = conn.getResponseCode();
			LOGGER.info( RESPONSE_CODE, responseCode, " ", conn.getResponseMessage());
			if (responseCode == 202) {
				apiStatus = OK;
			}

			if (responseCode != 202) {
				InputStream is = conn.getErrorStream();
				LOGGER.error(ERROR, readStream(is));
				apiStatus = FAILED;
			}

		} finally {
			conn.disconnect();
		}

		return apiStatus;
	}

	/**
	 * Write stream.
	 *
	 * @param json the json
	 * @param conn the conn
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	public void writeStream(String json, HttpsURLConnection conn) throws IOException {
		BufferedOutputStream bos = getOutPutStream(conn);
		BufferedInputStream bis = getInputStream(json);
		int i;
		// read byte by byte until end of stream
		try {
			while ((i = bis.read()) >= 0) {
				bos.write(i);
			}
		} finally {
			bis.close();
			bos.close();
		}
	}

	/**
	 * Gets the input stream.
	 *
	 * @param json the json
	 * @return the input stream
	 */
	public BufferedInputStream getInputStream(String json) {
		return new BufferedInputStream(
				new ByteArrayInputStream(json.getBytes(StandardCharsets.UTF_8)));
	}

	/**
	 * Gets the out put stream.
	 *
	 * @param conn the conn
	 * @return the out put stream
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	public BufferedOutputStream getOutPutStream(HttpsURLConnection conn) throws IOException {
		return new BufferedOutputStream(conn.getOutputStream());
	}

	/**
	 * Creates the HTTPS connection.
	 *
	 * @param url the url
	 * @return the https URL connection
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	public HttpsURLConnection createHTTPSConnection(URL url) throws IOException {
		return (HttpsURLConnection) url.openConnection();
	}

	/**
	 * Push single item data to source.
	 *
	 * @param docId              the doc id
	 * @param itemPath           the item path
	 * @param resourceResolver   the resource resolver
	 * @param resource           the resource
	 * @param aemContentType     the aem content type
	 * @param isContentFragment  the is content fragment
	 * @return the string
	 * @throws IOException the exception
	 */
	public String pushSingleItemDataToSource(String docId, String itemPath, ResourceResolver resourceResolver,
											 Resource resource, String aemContentType, boolean isContentFragment)
			throws IOException, RepositoryException, ServletException {
		String apiStatus = "";

		setSourceStatus(REBUILD);

		Node node = resource.adaptTo(Node.class);
		Resource contentResource = fetchContentResource(aemContentType, resource);

		if (null != node && null != contentResource) {
			String jsonData = "";

			ValueMap itemValueMap = contentResource.adaptTo(ValueMap.class);
			// populate json object with the meta-data for the single item
			JsonObject jObj = populateJsonObjectwithMetaData(resourceResolver, contentResource, itemValueMap,
					aemContentType, isContentFragment, false);

			// Logic to pick properties of content fragment properties and put in main JSON
			if (isContentFragment) {
				Resource masterResource = resourceResolver.getResource(node.getPath() + CONTENT_FRAGMENT_MASTER);
				JsonObject contentObj = populateJsonObjectwithMetaData(resourceResolver, masterResource,
						masterResource.adaptTo(ValueMap.class), aemContentType, isContentFragment, false);
				updateJsonObject(jObj, contentObj);
			}

			// Logic to pick published date of an asset and update in main JSON
			if (aemContentType.equals(DamConstants.NT_DAM_ASSET)) {
				Resource jcrContentResource = resourceResolver.getResource(node.getPath() + JCR_CONTENT);
				JsonObject jcrContentObj = populateJsonObjectwithMetaData(resourceResolver, jcrContentResource,
						jcrContentResource.adaptTo(ValueMap.class), aemContentType, isContentFragment, true);
				updateJsonObject(jObj, jcrContentObj);
			}
			String localizeTagsTitle = jObj.has(LOCALIZE_TAGS_TITLE) ? jObj.get(LOCALIZE_TAGS_TITLE).getAsString() : null;
			String siteLanguage = jObj.has(JCR_LANGUAGE) ? jObj.get(JCR_LANGUAGE).getAsString() : null;
			// if localization of tags title is enabled, get locale based on jcrlanguage else set locale to null.
			Locale locale = StringUtils.isNotBlank(siteLanguage) && StringUtils.equals(localizeTagsTitle, STR_TRUE) ? new Locale(siteLanguage) : null;
			LOGGER.debug("Json object before entering tags parsing logic {}", jObj);
			if (jObj.has(TAGS) && !jObj.get(TAGS).isJsonNull()) {
				jObj.addProperty(HIERARCHIAL_FACETS, formHierarchicalTagStructure(resourceResolver, jObj.get(TAGS).getAsString(), locale));
				jObj.addProperty(CATEGORY_FACETS, formCategoryTagStructure(resourceResolver, jObj.get(TAGS).getAsString(), locale));
			}

			LOGGER.debug("Json object before entering CATEGORYLEVEL1 parsing logic {}", jObj);
			if (jObj.has(CATEGORYLEVEL1) && !jObj.get(CATEGORYLEVEL1).isJsonNull()) {
				jObj.addProperty(CATEGORYLEVEL1FACET, formCategoryTagStructure(resourceResolver, jObj.get(CATEGORYLEVEL1).getAsString(), locale));
			}
			LOGGER.debug("Json object before entering CATEGORYLEVEL2 parsing logic {}", jObj);
			if (jObj.has(CATEGORYLEVEL2) && !jObj.get(CATEGORYLEVEL2).isJsonNull()) {
				jObj.addProperty(CATEGORYLEVEL2FACET, formCategoryTagStructure(resourceResolver, jObj.get(CATEGORYLEVEL2).getAsString(), locale));
			}

			String extension = getContentExtension(itemPath);

			if (aemContentType.equals(NameConstants.NT_PAGE)) {
				// checking if the resource type is of page
				if (null != itemValueMap) {
					// populate the data property for the single item for a cq page

					jObj.addProperty(DATA2, getHTMlContent(resource, resourceResolver, itemPath));
					jObj.addProperty(FILE_EXTENSION, extension);
					commonAEMFields(docId, itemPath, jObj, extension);
					jsonData = jObj.toString();
					LOGGER.debug(JSON_DATA, jsonData);
					LOGGER.debug("Json path to be pushed to api for AEM page ------->>>>> {}", docId);
					// Finally push the meta-data and the data of single item into coveo
					apiStatus = pushDocumentToCoveo(jsonData, docId);
				}
			} else if (aemContentType.equals(DamConstants.NT_DAM_ASSET) && !isContentFragment) {
				jObj = useCompressedBinaryDataFileId(itemPath, jObj, extension, resourceResolver);
				commonAEMFields(docId, itemPath, jObj, extension);
				jsonData = jObj.toString();
				LOGGER.debug(JSON_DATA, jsonData);
				LOGGER.debug("Json path to be pushed to api for assets ------->>>>> {}", docId);
				// Finally push the meta-data and the data of single item into coveo
				apiStatus = pushDocumentToCoveo(jsonData, docId);
			} else {
				Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);
				String externalizerDomainName = getExternalizeDomainName(resource, resourceResolver,
						true);
				if (jObj.has(SEARCHPAGE) && 
		                !jObj.get(SEARCHPAGE).isJsonNull()) {
					String searchpage = externalizer.externalLink(resourceResolver, externalizerDomainName,
							resourceResolver.map(jObj.get(SEARCHPAGE).getAsString()));
					docId = String.format("%1$s%2$s%3$s%4$s", searchpage, HTML, "?path=", itemPath);
				}

				commonAEMFields(docId, itemPath, jObj, "content-fragment");
				jsonData = jObj.toString();
				LOGGER.debug(JSON_DATA, jsonData);
				LOGGER.debug("Json path to be pushed to api for assets ------->>>>> {}", docId);
				// Finally push the meta-data and the data of single item into coveo
				apiStatus = pushDocumentToCoveo(jsonData, docId);
			}
		}
		setSourceStatus("IDLE");
		return apiStatus;
	}

	private Resource fetchContentResource(String aemContentType, Resource resource) {
		Resource result = null;
		ResourceResolver resolver = resource.getResourceResolver();
		if (aemContentType.equals(NameConstants.NT_PAGE)) {
			result =  resolver.getResource(resource.getPath() + JCR_CONTENT);
		} else if (aemContentType.equals(DamConstants.NT_DAM_ASSET)) {
			result = resolver.getResource(resource.getPath() + JCR_CONTENT_METADATA);
		}
		return result;
	}

	/**
	 * Update json object.
	 *
	 * @param jObj       the j obj
	 * @param contentObj the content obj
	 */
	@SuppressWarnings("unchecked")
	private void updateJsonObject(JsonObject jObj, JsonObject contentObj) {
		contentObj.entrySet().stream()
				.filter(entry -> Objects.nonNull(entry.getValue()))
				.filter(entry -> !entry.getValue().isJsonNull())
				.forEach(entry -> jObj.add(entry.getKey(), entry.getValue()));
	}

	/**
	 * Gets the HT ml content.
	 *
	 * @param resource         the resource
	 * @param resourceResolver the resource resolver
	 * @param resourcePath     the resource path
	 * @return the HT ml content
	 * @throws ServletException    the servlet exception
	 * @throws IOException         Signals that an I/O exception has occurred.
	 * @throws RepositoryException the repository exception
	 */
	public String getHTMlContent(Resource resource, ResourceResolver resourceResolver, String resourcePath)
			throws ServletException, IOException, RepositoryException {
		String requestPath = resourcePath + getInheritedValue(resource, COMPONENT_ROOT_PATH, resourceResolver) + HTML;
		SlingRequestProcessor slingRequestProcessor = (SlingRequestProcessor) OSGIServiceReference
				.getOsgiServiceReference(SlingRequestProcessor.class);
		RequestResponseFactory requestResponseFactory = (RequestResponseFactory) OSGIServiceReference
				.getOsgiServiceReference(RequestResponseFactory.class);

		HttpServletRequest req = requestResponseFactory.createRequest(GET, requestPath);
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		HttpServletResponse resp = requestResponseFactory.createResponse(out);

		WCMMode.DISABLED.toRequest(req);
		slingRequestProcessor.processRequest(req, resp, resourceResolver);

		return out.toString();
	}

	/**
	 * Common AEM fields.
	 *
	 * @param docId     the doc id
	 * @param itemPath  the item path
	 * @param jObj      the j obj
	 * @param extension the extension
	 */
	private void commonAEMFields(String docId, String itemPath, JsonObject jObj, String extension) {
		jObj.addProperty(URL, docId);
		jObj.addProperty(FILE_TYPE, extension.toUpperCase());
		jObj.addProperty(PATH, itemPath);
	}

	/**
	 * Gets the content extension.
	 *
	 * @param path the path
	 * @return the content extension
	 */
	public String getContentExtension(String path) {
		PathInfo pathInfo = new PathInfo(path);
		String extension = "";
			extension = pathInfo.getExtension();
			if (extension == null) {
				extension = HTML2;
			}
		return extension;
	}

	/**
	 * Use compressed binary data file id.
	 *
	 * @param itemPath         the item path
	 * @param jObj             the j obj
	 * @param extension        the extension
	 * @param resource         the resource
	 * @param resourceResolver the resource resolver
	 * @return the JSON object
	 * @throws IOException
	 */
	private JsonObject useCompressedBinaryDataFileId(String itemPath, JsonObject jObj, String extension, ResourceResolver resourceResolver) throws IOException {
		Resource original = null;
		AbstractMap.SimpleEntry<String, String> s3File = getS3File();
		String uploadUri = s3File.getKey();
		String fileId = s3File.getValue();
		// Asset asset =
		Resource assetResource = resourceResolver.getResource(itemPath + JCR_CONTENT_METADATA);
		Asset asset = null;
		if (null != assetResource) {
			asset = DamUtil.getAssetFromMetaRes(assetResource);
		}

		if (null != asset && null != asset.getOriginal()) {
			original = asset.getOriginal();
		}

		if (null != original) {
			InputStream is = original.adaptTo(InputStream.class);
			int originalFileSize = is.available();
			File temp = File.createTempFile("temp", ZLIB);
			
			try(InputStream zis = zlibInputStream(is, temp)) {
				putFileOnS3(zis, uploadUri);
			}
			if (!temp.delete()) {
				LOGGER.error("temp file deletion failed");
			}
			jObj.addProperty("CompressedBinaryDataFileId", fileId);
			jObj.addProperty("fileSize", originalFileSize);
			jObj.addProperty("FileExtension", extension);
		}
		return jObj;
	}

	/**
	 * Put file on S 3.
	 *
	 * @param in        an InputStream that reads from a zlib-compressed file
	 * @param uploadUri a pre-signed AWS S3 upload url
	 * @throws IOException the exception
	 */
	public void putFileOnS3(InputStream in, String uploadUri) throws IOException {
		URL url = new URL(uploadUri);
		LOGGER.debug("=>> PUT file to S3: " + url.toString());
		HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();

		try {
			// Add the required headers
			conn.setRequestProperty(CONTENT_TYPE3, APPLICATION_OCTET_STREAM);
			conn.setRequestProperty(X_AMZ_SERVER_SIDE_ENCRYPTION, AES256);

			// Set parameters of the HttpURLConnection
			conn.setReadTimeout(10000);
			conn.setConnectTimeout(15000);
			conn.setRequestMethod(PUT);
			conn.setDoInput(true);
			conn.setDoOutput(true);

			// write the zlib file to the URL Connection stream
			BufferedOutputStream bos = new BufferedOutputStream(conn.getOutputStream());
			try {
				BufferedInputStream bis = new BufferedInputStream(in);
				int i;
				while ((i = bis.read()) >= 0) {
					bos.write(i);
				}
				bos.flush();
			} finally {
				bos.close();
			}

			int responseCode = conn.getResponseCode();
			LOGGER.debug(RESPONSE_CODE + responseCode + " " + conn.getResponseMessage());

			if (responseCode != 200) {
				InputStream is = conn.getErrorStream();
				throw new IOException("Unable to upload file to S3");
			}
		} finally {
			conn.disconnect();
		}
	}
	/**
	 * Zlib input stream.
	 *
	 * @param original the original
	 * @param temp     the temp
	 * @return inputstream for reading the zlip'ed temp file
	 * @throws IOException the exception
	 */
	public InputStream zlibInputStream(InputStream original, File temp) throws IOException {

		LOGGER.debug("Zlib inputstream to temp file: {}", temp);
		FileOutputStream fos = new FileOutputStream(temp);
		DeflaterOutputStream dos = new DeflaterOutputStream(fos);

		doCopy(original, dos); // copy original stream to temp.zlib

		return new FileInputStream(temp);
	}

	/**
	 * Getting a pre-signed AWS S3 URL, and a fileID which will be used further.
	 *
	 * @return the s 3 file
	 */
	public AbstractMap.SimpleEntry<String, String> getS3File() {
		HttpsURLConnection conn = null;

		try {
			URL url = new URL(coveoPushUrl + V1_ORGANIZATIONS + organizationId + "/files");
			LOGGER.debug("=>> Getting S3 File Info: {}", url);

			conn = (HttpsURLConnection) url.openConnection();
			// Add the Authorization header with the accessToken
			conn.setRequestProperty(AUTHORIZATION2, BEARER2 + accessToken);

			// Set parameters of the HttpURLConnection
			conn.setReadTimeout(10000);
			conn.setConnectTimeout(15000);
			conn.setRequestMethod(POST);
			conn.setDoInput(true);
			conn.setDoOutput(true);
			conn.connect();

			int responseCode = conn.getResponseCode();
			LOGGER.debug(RESPONSE_CODE, responseCode, " ", conn.getResponseMessage());

			if (responseCode == 201) {
				InputStream is = conn.getInputStream();
				String uploadUri = StringUtils.EMPTY;
				String fileId = StringUtils.EMPTY;
				try(BufferedReader reader = new BufferedReader(new InputStreamReader(is))){
				String output = reader.readLine();
				LOGGER.debug("<<= Response Body: {}", output);
				JsonObject root = new JsonParser().parse(output).getAsJsonObject();

				// Extract the uploadUri and fileId
				uploadUri = root.get("uploadUri").getAsString();
				fileId = root.get("fileId").getAsString();
				}
				// return those two values
				return new AbstractMap.SimpleEntry<>(uploadUri, fileId);
			} else {
				// Else the request failed in some way. Check the error stream for information
				LOGGER.error("Unable to fetching S3 URL");
			}
		} catch (ProtocolException e) {
			LOGGER.warn("Protocol exception ", e);
		} catch (IOException e) {
			LOGGER.warn("IO exception ", e);
		} finally {
			if (conn != null) {
				conn.disconnect();
			}
		}
		return new AbstractMap.SimpleEntry<>(StringUtils.EMPTY, StringUtils.EMPTY);
	}

	/**
	 * Populate json objectwith meta data.
	 *
	 * @param resourceResolver  the resource resolver
	 * @param resource          the resource
	 * @param itemValueMap      the item value map
	 * @param contentType       the content type
	 * @param isContentFragment the is content fragment
	 * @param assetProperties   the asset properties
	 * @return the JSON object
	 * @throws RepositoryException the repository exception
	 */
	/*
	 * Create and push the meta data propeeties for the current item into coveo
	 * source
	 */
	private JsonObject populateJsonObjectwithMetaData(ResourceResolver resourceResolver, Resource resource,
													  ValueMap itemValueMap, String contentType, boolean isContentFragment, boolean assetProperties)
			throws RepositoryException {
		JsonObject jObj = new JsonObject();

		JsonArray fieldsMappingObjsArray = getAemCoveoFieldsMappings(resourceResolver, VAR_COVEOCONNECTOR_COVEOMAPPINGS,
				contentType);
		if (null != fieldsMappingObjsArray) {
			for (JsonElement fieldMappingObj : fieldsMappingObjsArray) {
				JsonObject obj = fieldMappingObj.getAsJsonObject();
				String type = obj.get(COVEO_TYPE).getAsString();
				String aemFieldProperty = obj.get(AEM_FIELD).getAsString();
				String coveoFieldProperty = obj.get(COVEO_FIELD).getAsString();
					switch (type) {
					case "DOUBLE":
						jObj.addProperty(coveoFieldProperty,
								getPropertyFromExternalResourceDouble(resourceResolver, resource, obj, aemFieldProperty));
						break;
					case "LONG_64":
						jObj.addProperty(coveoFieldProperty,
								getPropertyFromExternalResourceLong(resourceResolver, resource, obj, aemFieldProperty));
						break;
					case "DATE":
						String date = getStringLastModified(itemValueMap, aemFieldProperty);
						if(!StringUtils.isEmpty(date)) {
							jObj.addProperty(coveoFieldProperty,date);
						}
						break;
					case "STRING":
					default:
						String props = getPropertyFromExternalResourceString(resourceResolver, resource, aemFieldProperty,
								isContentFragment, assetProperties);
						if(props!=null) {
							jObj.addProperty(coveoFieldProperty,props);
						}
						
						LOGGER.debug("default");
				}
				
			}
		}
		return jObj;
	}

	/**
	 * Gets the property from external resource long.
	 *
	 * @param resourceResolver the resource resolver
	 * @param resource         the resource
	 * @param obj              the obj
	 * @param aemFieldProperty the aem field property
	 * @return the property from external resource long
	 * @throws RepositoryException the repository exception
	 */
	private Long getPropertyFromExternalResourceLong(ResourceResolver resourceResolver, Resource resource,
													 JsonObject obj, String aemFieldProperty) throws RepositoryException {
		Long value;
		String property = obj.get(AEM_FIELD).getAsString();
		if (aemFieldProperty.contains("@")) {
			String externalproperty = externalPropertyBifurcation(obj.get(AEM_FIELD).getAsString());
			value = getPropertyValueExternalResource(Long.class, resource.adaptTo(Node.class),
					property.split("@")[0], resourceResolver, externalproperty);
		} else {
			value = getPropertyValue(Long.class, resource.adaptTo(Node.class), property);
		}
		return Objects.isNull(value) ? 0L : value;
	}

	/**
	 * Gets the property from external resource double.
	 *
	 * @param resourceResolver the resource resolver
	 * @param resource         the resource
	 * @param obj              the obj
	 * @param aemFieldProperty the aem field property
	 * @return the property from external resource double
	 * @throws RepositoryException the repository exception
	 */
	private Double getPropertyFromExternalResourceDouble(ResourceResolver resourceResolver, Resource resource,
														 JsonObject obj, String aemFieldProperty) throws RepositoryException {
		Double value;
		String property = obj.get(AEM_FIELD).getAsString();
		if (aemFieldProperty.contains("@")) {
			String externalproperty = externalPropertyBifurcation(obj.get(AEM_FIELD).getAsString());
			value = getPropertyValueExternalResource(Double.class, resource.adaptTo(Node.class), // can coveo be any other type
							property.split("@")[0], resourceResolver, externalproperty);
		} else {
			value =  getPropertyValue(Double.class, resource.adaptTo(Node.class), property);
		}
		return Objects.isNull(value) ? 0.0 : value;
	}

	/**
	 * Gets the property from external resource string.
	 *
	 * @param resourceResolver  the resource resolver
	 * @param resource          the resource
	 * @param aemFieldProperty  the aem field property
	 * @param isContentFragment the is content fragment
	 * @param assetProperties   the asset properties
	 * @return the property from external resource string
	 * @throws RepositoryException the repository exception
	 */
	private String getPropertyFromExternalResourceString(ResourceResolver resourceResolver, Resource resource,
														 String aemFieldProperty, boolean isContentFragment,
													   boolean assetProperties) throws RepositoryException {
		String result;
		String[] inheritanceLogicProperties = this.inheritanceLogicProperties.clone();
		if (aemFieldProperty.contains("@")) {
			String externalproperty = externalPropertyBifurcation(aemFieldProperty);
			result = getStringOrStringArrayValueOfProperty(resource.adaptTo(Node.class), aemFieldProperty.split("@")[0],
							resourceResolver, externalproperty, inheritanceLogicProperties, isContentFragment,
							assetProperties);
		} else {
			// send along the null as the last parameter
			result = getStringOrStringArrayValueOfProperty(resource.adaptTo(Node.class),
							aemFieldProperty, resourceResolver, null, inheritanceLogicProperties,
							isContentFragment, assetProperties);
		}
		return result;
	}

	/**
	 * External property bifurcation.
	 *
	 * @param aemFieldProperty the aem field property
	 * @return the string
	 */
	private String externalPropertyBifurcation(String aemFieldProperty) {
		String[] externalPropertySize = aemFieldProperty.split("@", 3);
		return aemFieldProperty.split("@")[externalPropertySize.length - 1];
	}

	/**
	 * Gets the aem coveo fields mappings.
	 *
	 * @param resourceResolver the resource resolver
	 * @param configPath       the config path
	 * @param contentType      the content type
	 * @return the aem coveo fields mappings
	 */
	public JsonArray getAemCoveoFieldsMappings(ResourceResolver resourceResolver, String configPath,
											   String contentType) {
		JsonArray aemCoveoMappings = null;
		Resource configRes = resourceResolver.getResource(configPath);
		ValueMap configValueMap = configRes.adaptTo(ValueMap.class);
		if (null != configValueMap) {
			String fieldMappings = null;
			if (contentType.equals(NameConstants.NT_PAGE)) {
				fieldMappings = configValueMap.get("pageFieldMapping", String.class);
			} else if (contentType.equals(DamConstants.NT_DAM_ASSET)) {
				fieldMappings = configValueMap.get("assetFieldMapping", String.class);
			}
			if (fieldMappings != null) {
				aemCoveoMappings = new Gson().fromJson(fieldMappings, new TypeToken<JsonArray>() {
				}.getType());
			}
		}

		return aemCoveoMappings;
	}

	/**
	 * Gets the string or string array value of property.
	 *
	 * @param node                       the node
	 * @param propertyName               the property name
	 * @param resourceResolver           the resource resolver
	 * @param externalProperty           the external property
	 * @param inheritanceLogicProperties the inheritance logic properties
	 * @param isContentFragment          the is content fragment
	 * @param assetProperties            the asset properties
	 * @return the string or string array value of property
	 * @throws RepositoryException the repository exception
	 */
	public String getStringOrStringArrayValueOfProperty(Node node, String propertyName,
														ResourceResolver resourceResolver, String externalProperty, String[] inheritanceLogicProperties,
														boolean isContentFragment, boolean assetProperties) throws RepositoryException {
		String nodePath = "";
		if (null == externalProperty) {

			if (node == null || propertyName == null) {
				LOGGER.error("getStringOrStringArrayValueOfProperty: node or propertyName is null");
				return null;
			}
			String propertyValue = null;

			if (node.hasProperty(propertyName)) {
				nodePath = node.getPath();
				Property property = node.getProperty(propertyName);
				if (property == null) {
					return null;
				}
				if (property.isMultiple()) {
					propertyValue = setStringBuilder(property);
				} else {
					propertyValue = property.getString();
				}
			} else {

				// If inheritanceLogicProperties (like jcr:language etc.) is not found at node,
				// then search for it in the parent hierarchy
				if (ArrayUtils.contains(inheritanceLogicProperties, propertyName)) {
					if (isContentFragment) {
						if (assetProperties) {
							propertyValue = getInheritedFragmentValue(node.getParent().getParent(), propertyName,
									resourceResolver);
						}
					} else {
						propertyValue = getInheritedValue(
								resourceResolver.getResource(node.getPath()), propertyName,
								resourceResolver);
					}
				}
			}
			if (StringUtils.isBlank(propertyValue)) {
				LOGGER.debug("getStringOrStringArrayValueOfProperty: property {} in the node {} is blank.",
						propertyName, nodePath);
				return null;
			}
			return propertyValue;
		} else {

			// Look for the external property via the query builder search and gets its
			// location and read the intended property from that location
			if (node == null || propertyName == null) {
				LOGGER.error("getStringOrStringArrayValueOfProperty: node or propertyName is null");
				return null;
			}
			String propertyValue = null;

			/*
			 * Property was not found directly under the page node, so looking into the
			 * child nodes
			 */
			SearchResult result = findPropertyExists(node.getPath(), resourceResolver.adaptTo(Session.class),
					resourceResolver.adaptTo(QueryBuilder.class), externalProperty);
			if (null != result && !(result.getHits().isEmpty())) {
				for (Hit hit : result.getHits()) {
					Node nodeData = resourceResolver.getResource(hit.getPath()).adaptTo(Node.class);
					propertyValue = getExternalPropertiesFromProductData(nodeData, propertyName, resourceResolver,
							externalProperty);
				}

			}
			
			if (StringUtils.isBlank(propertyValue)) {
				LOGGER.debug("getStringOrStringArrayValueOfProperty: property {} in the node {} is blank.",
						externalProperty, nodePath);
				return null;
			}
			return propertyValue;
		}
	}

	/**
	 * Gets the inherited fragment value.
	 *
	 * @param node             the node
	 * @param propertyName     the property name
	 * @param resourceResolver the resource resolver
	 * @return the inherited fragment value
	 * @throws RepositoryException the repository exception
	 */
	private String getInheritedFragmentValue(Node node, String propertyName, ResourceResolver resourceResolver)
			throws RepositoryException {
		String propertyValue = "";
		TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
		if (null != resourceResolver.getResource(node.getPath() + JCR_CONTENT_METADATA2)) {
			Node parentNode = resourceResolver.getResource(node.getPath() + JCR_CONTENT_METADATA2).adaptTo(Node.class);
			if (parentNode.hasProperty(propertyName)) {
				Property property = parentNode.getProperty(propertyName);
				if (StringUtils.equals(CONTENT_TYPE, property.getName())) {
					propertyValue = tagManager.resolve(property.getString()).getTitle();
				} else {
					propertyValue = property.getString();
				}
			} else {
				propertyValue = getInheritedFragmentValue(node.getParent(), propertyName, resourceResolver);
			}
		}
		return propertyValue;
	}

	/**
	 * Gets the inherited value.
	 *
	 * @param resource         the resource
	 * @param propertyName     the property name
	 * @param resourceResolver the resource resolver
	 * @return the inherited value
	 * @throws RepositoryException the repository exception
	 */
	public String getInheritedValue(Resource resource, String propertyName, ResourceResolver resourceResolver)
			throws RepositoryException {
		String path = resource.getPath();
		InheritanceValueMap inheritedProp;
		String contentType = resource.adaptTo(ValueMap.class).get(JcrConstants.JCR_PRIMARYTYPE).toString();
		if(propertyName.equalsIgnoreCase(EXTERNALIZER_DOMAIN_NAME) && contentType.equals(DamConstants.NT_DAM_ASSET)) {
			Resource res = resourceResolver.getResource(path+JCR_CONTENT_METADATA2);
			inheritedProp = new HierarchyNodeInheritanceValueMap(res);
			return inheritedProp.getInherited(propertyName, String.class);
		}
		else {
			inheritedProp = new HierarchyNodeInheritanceValueMap(resource);
			return inheritedProp.getInherited(propertyName, String.class);
		}
		
		
		
	}

	/**
	 * Gets the externalize domain name.
	 *
	 * @param resource         the resource
	 * @param resourceResolver the resource resolver
	 * @return the externalize domain name
	 * @throws RepositoryException the repository exception
	 */
	public String getExternalizeDomainName(Resource resource, ResourceResolver resourceResolver,
										   boolean isContentFragment) throws RepositoryException {
		String externalizerDomainName = null;
		if (isContentFragment) {
			externalizerDomainName = getInheritedFragmentValue(resource.adaptTo(Node.class), EXTERNALIZER_DOMAIN_NAME,
					resourceResolver);
		} else {
			externalizerDomainName = getInheritedValue(resource, EXTERNALIZER_DOMAIN_NAME, resourceResolver);
		}
		if (externalizerDomainName == null || externalizerDomainName.isEmpty()) {
			externalizerDomainName = PUBLISH;
		}

		return externalizerDomainName;
	}

	/**
	 * Gets the external properties from product data.
	 *
	 * @param node             the node
	 * @param propertyName     the property name
	 * @param resourceResolver the resource resolver
	 * @param externalProperty the external property
	 * @return the external properties from product data
	 * @throws RepositoryException the repository exception
	 */
	private static String getExternalPropertiesFromProductData(Node node, String propertyName,
															   ResourceResolver resourceResolver, String externalProperty) throws RepositoryException {
		String productPropertyVal = "";
		Property pathProperty = node.getProperty(externalProperty);
		String productPath = pathProperty.getString();
		if (productPath != null) {
			Resource pRes = resourceResolver.getResource(productPath);
			Node varProdNode = pRes.adaptTo(Node.class);

			if (null != varProdNode) {
				Property property = varProdNode.getProperty(propertyName);
				if (property.isMultiple()) {
					productPropertyVal = setStringBuilder(property);
					return productPropertyVal;
				} else {
					productPropertyVal = property.getString();
				}
				return productPropertyVal;
			}
		}
		return productPropertyVal;
	}

	/**
	 * Find property exists.
	 *
	 * @param itemPath     the item path
	 * @param session      the session
	 * @param queryBuilder the query builder
	 * @param propertyName the property name
	 * @return the search result
	 */
	public static SearchResult findPropertyExists(String itemPath, Session session, QueryBuilder queryBuilder,
												  String propertyName) {
		SearchResult result = null;

		Map<String, String> map = new HashMap<>();
		map.put(PATH, itemPath); /*
		 * The item path for now will just be the path till jcr:content node,later we
		 * have proper field mappings present, we can change that to a specific node
		 * path
		 */
		map.put("property", propertyName);
		map.put("property.operation", "exists");
		Query query = queryBuilder.createQuery(PredicateGroup.create(map), session);
		result = query.getResult();

		return result;
	}

	

	/**
	 * Sets the string builder.
	 *
	 * @param property the property
	 * @return the string
	 * @throws RepositoryException the repository exception
	 */
	public static String setStringBuilder(Property property) throws RepositoryException {
		Value[] propValues = property.getValues();
		StringBuilder sb = new StringBuilder();
		if (propValues != null && propValues.length > 0) {
			String lineSeparator = System.getProperty(LINE_SEPARATOR);
			String delimiter = "";
			for (Value propValue : propValues) {
				if (propValue != null && StringUtils.isNotBlank(propValue.getString())) {
					sb.append(delimiter);
					sb.append(propValue.getString());
					delimiter = lineSeparator;
				}
			}
		}
		return sb.toString();
	}

	/**
	 * Gets the property value.
	 *
	 * @param <T>              the generic type
	 * @param resultClass      the result class
	 * @param node             the node
	 * @param nodePropertyName the node property name
	 * @param resourceResolver the resource resolver
	 * @return the property value
	 * @throws RepositoryException the repository exception
	 */
	@SuppressWarnings("unchecked")
	public static <T> T getPropertyValue(Class<T> resultClass, Node node, String nodePropertyName) throws RepositoryException {
		T result = null;
		if (node != null) {
			Property property = null;
			if (node.hasProperty(nodePropertyName)) {
				try {
					property = node.getProperty(nodePropertyName);
					if (null != property) {

						if (String.class == resultClass) {
							result = (T) property.getString();
						} else if (Long.class == resultClass) {
							result = (T) ((Long) property.getLong());
						} else if (Date.class == resultClass) {
							result = (T) property.getDate().getTime();
						} else if (Double.class == resultClass) {
							result = (T) ((Double) property.getDouble());
						} else if (Boolean.class == resultClass) {
							result = (T) ((Boolean) property.getBoolean());
						} else {
							LOGGER.error(UNSUPPORTED_NODE_LOGGER,  resultClass);
						}
					}
				} catch (RepositoryException e) {
					LOGGER.error("Exception occured ", e);
				}
			}
		} else {
			LOGGER.error(
					"Node is null in DataNodeUtil.getPropertyValue(Class<T> resultClass, Node node, NodePropertyName nodePropertyName)!!!");
		}
		return result;
	}

	/**
	 * Gets the property value external resource.
	 *
	 * @param <T>              the generic type
	 * @param resultClass      the result class
	 * @param node             the node
	 * @param nodePropertyName the node property name
	 * @param resourceResolver the resource resolver
	 * @param externalProperty the external property
	 * @return the property value external resource
	 * @throws RepositoryException the repository exception
	 */
	@SuppressWarnings("unchecked")
	public static <T> T getPropertyValueExternalResource(Class<T> resultClass, Node node, String nodePropertyName,
														 ResourceResolver resourceResolver, String externalProperty) throws RepositoryException {
		T result = null;
		if (node != null) {
			Property property = null;
			if (node.hasProperty(externalProperty)) {
				property = node.getProperty(externalProperty);
				if (null != property) {

					if (String.class == resultClass) {
						result = (T) property.getString();
					} else if (Long.class == resultClass) {
						result = (T) ((Long) property.getLong());
					} else if (Date.class == resultClass) {
						result = (T) property.getDate().getTime();
					} else if (Double.class == resultClass) {
						result = (T) ((Double) property.getDouble());
					} else if (Boolean.class == resultClass) {
						result = (T) ((Boolean) property.getBoolean());
					} else {
						LOGGER.error(UNSUPPORTED_NODE_LOGGER, resultClass);
					}
				}
			}

			else {
				SearchResult prodcutRootPathResult = findPropertyExists(node.getPath(),
						resourceResolver.adaptTo(Session.class), resourceResolver.adaptTo(QueryBuilder.class),
						externalProperty);
				if (null != prodcutRootPathResult && !(prodcutRootPathResult.getHits().isEmpty())) {
					for (Hit hit : prodcutRootPathResult.getHits()) {
						String productDataPath = resourceResolver.getResource(hit.getPath()).adaptTo(Node.class)
								.getProperty(externalProperty).getString();
						Resource pRes = resourceResolver.getResource(productDataPath);
						Node varProdNode = pRes.adaptTo(Node.class);
						if (null != varProdNode) {
							property = varProdNode.getProperty(nodePropertyName); // i added this line just need
							// to check whether it is
							// right or not
							if (String.class == resultClass) {
								result = (T) property.getString();
							} else if (Long.class == resultClass) {
								result = (T) ((Long) property.getLong());
							} else if (Date.class == resultClass) {
								result = (T) property.getDate().getTime();
							} else if (Double.class == resultClass) {
								result = (T) ((Double) property.getDouble());
							} else if (Boolean.class == resultClass) {
								result = (T) ((Boolean) property.getBoolean());
							} else {
								LOGGER.error(UNSUPPORTED_NODE_LOGGER,  resultClass);
							}

						}
					}

				}

			}

		} else {
			LOGGER.error(
					"Node is null in DataNodeUtil.getPropertyValue(Class<T> resultClass, Node node, NodePropertyName nodePropertyName)!!!");
		}
		return result;
	}

	/**
	 * Gets the string last modified.
	 *
	 * @param itemValueMap the item value map
	 * @param dateProperty the date property
	 * @return the string last modified
	 */
	public String getStringLastModified(ValueMap itemValueMap, String dateProperty) {

		String lastmodified = "";
		Calendar productLastModified = itemValueMap.get(dateProperty, Calendar.class);
		if (null != productLastModified) {
			DateFormat df = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss.SSS");
			lastmodified = df.format(productLastModified.getTime());
		}
		return lastmodified;
	}

	/**
	 * DELETE the specified documentId / URI on Coveo.
	 *
	 * @param docId the Coveo documentId / URI
	 * @return the string
	 */
	public String deleteDocumentOnCoveo(String docId, String itemPath, ResourceResolver resourceResolver,
										Resource resource, String aemContentType, boolean isContentFragment) throws IOException, RepositoryException {
		String apiStatus = "";

		// append docId (url-encoded to be safe)
		docId = updateDocId(docId, itemPath, resourceResolver, resource, aemContentType, isContentFragment);

		URL url = new URL("https://push.cloud.coveo.com/v1/organizations/" + organizationId + SOURCES + sourceId
				+ DOCUMENTS_DOCUMENT_ID + URLEncoder.encode(docId, StandardCharsets.UTF_8.toString()));
		LOGGER.debug("=>> DELETE document to Coveo: {}", url);
		HttpsURLConnection conn = createHTTPSConnection(url);
		try {
			// Set authorization and content-type headers
			conn.setRequestProperty(AUTHORIZATION, BEARER + accessToken);
			conn.setRequestProperty(CONTENT_TYPE2, APPLICATION_JSON);

			// Set parameters of the HttpURLConnection
			conn.setReadTimeout(10000);
			conn.setConnectTimeout(15000);
			conn.setRequestMethod("DELETE");
			conn.setDoInput(true);
			conn.setDoOutput(true);

			int responseCode = conn.getResponseCode();
			LOGGER.debug(RESPONSE_CODE, responseCode, " ", conn.getResponseMessage());

			if (responseCode == 202) {
				apiStatus = OK;

			}
			if (responseCode != 202) {
				apiStatus = FAILED;
				// If the request failed in some way. Check the error stream for information
				InputStream is = conn.getErrorStream();
				LOGGER.error(ERROR, readStream(is));
			}
			
		} finally {
			conn.disconnect();
		}
		return apiStatus;
	}

	/**
	 * The docId has a different format if the document is a FAQ.
	 * @param docId              the doc id
	 * @param itemPath           the item path
	 * @param resourceResolver   the resource resolver
	 * @param resource           the resource
	 * @param aemContentType     the aem content type
	 * @param isContentFragment  the is content fragment
	 * @return updated docId
	 * @throws RepositoryException
	 */
	private String updateDocId(String docId, String itemPath, ResourceResolver resourceResolver, Resource resource,
							   String aemContentType, boolean isContentFragment) throws RepositoryException {
		Resource contentResource = fetchContentResource(aemContentType, resource);

		if (!isContentFragment || contentResource == null) {
			return docId; // if it's not a content fragment we do nothing.
		}

		ValueMap itemValueMap = contentResource.adaptTo(ValueMap.class);
		// populate json object with the meta-data for the single item
		JsonObject jObj = populateJsonObjectwithMetaData(resourceResolver, contentResource, itemValueMap,
				aemContentType, isContentFragment, false);

		Resource masterResource = resourceResolver.getResource(resource.getPath() + CONTENT_FRAGMENT_MASTER);
		JsonObject contentObj = populateJsonObjectwithMetaData(resourceResolver, masterResource,
				masterResource.adaptTo(ValueMap.class), aemContentType, isContentFragment, false);
		updateJsonObject(jObj, contentObj);

		if (aemContentType.equals(DamConstants.NT_DAM_ASSET)) {
			Resource jcrContentResource = resourceResolver.getResource(resource.getPath() + JCR_CONTENT);
			JsonObject jcrContentObj = populateJsonObjectwithMetaData(resourceResolver, jcrContentResource,
					jcrContentResource.adaptTo(ValueMap.class), aemContentType, isContentFragment, true);
			updateJsonObject(jObj, jcrContentObj);
		}

		if (jObj.has(SEARCHPAGE) && 
		        !jObj.get(SEARCHPAGE).isJsonNull()) {
			Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);
			String externalizerDomainName = getExternalizeDomainName(resource, resourceResolver,
					true);
			String searchpage = externalizer.externalLink(resourceResolver, externalizerDomainName,
					resourceResolver.map(jObj.get(SEARCHPAGE).getAsString()));
			docId = String.format("%1$s%2$s%3$s%4$s", searchpage, HTML, "?path=", itemPath);
		}
		return docId;
	}

	/**
	 * Copy inputstream to outputstream.
	 *
	 * @param is the is
	 * @param os the os
	 * @throws IOException the exception
	 */
	private void doCopy(InputStream is, OutputStream os) throws IOException {
		byte[] bytes = new byte[1024];
		int length;
		try {
			while ((length = is.read(bytes)) >= 0) {
				os.write(bytes, 0, length);
			}
		} finally {
			os.close();
			is.close();
		}
	}

	/**
	 * Read inputstream into a String.
	 *
	 * @param stream the stream
	 * @return the string
	 * @throws IOException the exception
	 */
	private String readStream(InputStream stream) throws IOException {
		StringBuilder builder = new StringBuilder();

		try (BufferedReader in = new BufferedReader(new InputStreamReader(stream))) {
			String line;
				while ((line = in.readLine()) != null) {
					builder.append(line).append("\n"); // + "\r\n"(no need, json has no line breaks!)
				}
			
		}
		return builder.toString();
	}

	/**
	 * Form category tag structure.
	 *
	 * @param resolver  the resolver
	 * @param tagString the tag string
	 * @param locale  the locale
	 * @return the string
	 */
	private String formCategoryTagStructure(ResourceResolver resolver, String tagString, Locale locale) {
		String[] tagsArray = tagString.split(System.getProperty(LINE_SEPARATOR));
		LOGGER.debug("length of tags is :{}", tagsArray.length);
		String categoryTags = Arrays.stream(tagsArray)
				.map(this::tagNameToPath)
				.map(tagPath -> findTag(resolver, tagPath))
				.filter(Optional::isPresent)
				.map(Optional::get)
				.map(Tag -> Tag.getTitle(locale))
				.sorted()
				.collect(Collectors.joining(";"));
		LOGGER.debug("category tags are :{}", categoryTags);
		return categoryTags;
	}

	/**
	 * Form heirarchical tag structure.
	 *
	 * @param resolver  the resolver
	 * @param tagString the tag string
	 * @param locale the locale
	 * @return the string
	 */
	private String formHierarchicalTagStructure(ResourceResolver resolver, String tagString, Locale locale) {
		String[] tagsArray = tagString.split(System.getProperty(LINE_SEPARATOR));
		LOGGER.debug("Tags Array {}", tagsArray.length);
		Set<String> tagsSet = new TreeSet<>();
		// Logic to pick the tags till namespace and ignore one level below namespace
		for (String tagPath : tagsArray) {
			LOGGER.debug("Tag {}", tagPath);
			List<String> tagsList = new ArrayList<>();
			findTag(resolver, tagPath).ifPresent(tag -> {
				getTagsTitlesTillNamespace(tag, tagsList, locale);
				int size = tagsList.size();
				for (int i = size - 3; i > 0; i--) {
					String tagTitle = tagsList.get(i);
					tagsSet.add(tagTitle);
					tagTitle = tagTitle + SYMBOL_SEPERATOR + tagsList.get(i - 1);
					tagsSet.add(tagTitle);
				}
			});
		}
		StringBuilder builder = new StringBuilder();
		for (int i = 0; i < tagsSet.toArray().length; i++) {
			if (i != tagsSet.size() - 1) {
				builder.append(tagsSet.toArray()[i]).append(SYMBOL_SEMICOLON);
			} else {
				builder.append(tagsSet.toArray()[i]);
			}
		}
		return builder.toString();
	}

	/**
	 * Find Tag under provided path. Throw error if tag does not exist.
	 * @param resolver the resolver
	 * @param tagPath the tag path
	 * @return Optional with found Tag or empty if Tag doesn't exist
	 */
	private Optional<Tag> findTag(ResourceResolver resolver, String tagPath) {
		Optional<Tag> result = Optional.ofNullable(resolver.adaptTo(TagManager.class))
				.map(manager -> manager.resolve(tagPath));
		if (!result.isPresent()) {
			LOGGER.error("No tag found under path '{}'. Tag omitted in indexing process, " +
					"please validate correctness of the path.", tagPath);
		}
		return result;
	}

	/**
	 * Map Tag name to full path
	 * @param tagname the tag name
	 * @return full tag path
	 */
	private String tagNameToPath(String tagname) {
		return "/content/cq:tags/" + StringUtils.replace(tagname, ":", "/");
	}

	/**
	 * Gets the tags titles till namespace.
	 *
	 * @param tag            the tag
	 * @param tagsList the tags titles list
	 * @param locale the locale
	 * @return the tags titles till namespace
	 */
	private List<String> getTagsTitlesTillNamespace(Tag tag, List<String> tagsList, Locale locale) {
		if (!tag.isNamespace()) {
			tagsList.add(tag.getTitle(locale));
			getTagsTitlesTillNamespace(tag.getParent(), tagsList, locale);
		}
		return tagsList;
	}

	/**
	 * Gets the organization id.
	 *
	 * @return the organizationId
	 */
	public String getOrganizationId() {
		return organizationId;
	}

	/**
	 * Sets the organization id.
	 *
	 * @param organizationId the organizationId to set
	 */
	public void setOrganizationId(String organizationId) {
		this.organizationId = organizationId;
	}

	/**
	 * Gets the source id.
	 *
	 * @return the sourceId
	 */
	public String getSourceId() {
		return sourceId;
	}

	/**
	 * Sets the source id.
	 *
	 * @param sourceId the sourceId to set
	 */
	public void setSourceId(String sourceId) {
		this.sourceId = sourceId;
	}

	/**
	 * Gets the access token.
	 *
	 * @return the accessToken
	 */
	public String getAccessToken() {
		return accessToken;
	}

	/**
	 * Sets the access token.
	 *
	 * @param accessToken the accessToken to set
	 */
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	/**
	 * Gets the coveo push url.
	 *
	 * @return the coveoPushUrl
	 */
	public String getCoveoPushUrl() {
		return coveoPushUrl;
	}

	/**
	 * Sets the coveo push url.
	 *
	 * @param coveoPushUrl the coveoPushUrl to set
	 */
	public void setCoveoPushUrl(String coveoPushUrl) {
		this.coveoPushUrl = coveoPushUrl;
	}

	/**
	 * Gets the coveo platform url.
	 *
	 * @return the coveoPlatformUrl
	 */
	public String getCoveoPlatformUrl() {
		return coveoPlatformUrl;
	}

	/**
	 * Sets the coveo platform url.
	 *
	 * @param coveoPlatformUrl the coveoPlatformUrl to set
	 */
	public void setCoveoPlatformUrl(String coveoPlatformUrl) {
		this.coveoPlatformUrl = coveoPlatformUrl;
	}

	/**
	 * Gets the inheritance logic properties.
	 *
	 * @return the inheritanceLogicProperties
	 */
	public String[] getInheritanceLogicProperties() {
		return inheritanceLogicProperties.clone();
	}

	/**
	 * Sets the inheritance logic properties.
	 *
	 * @param inheritanceLogicProperties the inheritanceLogicProperties to set
	 */
	public void setInheritanceLogicProperties(String[] inheritanceLogicProperties) {
		this.inheritanceLogicProperties = inheritanceLogicProperties.clone();
	}

	/**
	 * Gets the mapper.
	 *
	 * @return the mapper
	 */
	public ObjectMapper getMapper() {
		return mapper;
	}

	/**
	 * Sets the mapper.
	 *
	 * @param mapper the mapper to set
	 */
	public void setMapper(ObjectMapper mapper) {
		this.mapper = mapper;
	}

}