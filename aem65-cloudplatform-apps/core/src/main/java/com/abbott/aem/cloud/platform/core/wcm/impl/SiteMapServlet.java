/*
* Copyright (c) Abbott
*/
package com.abbott.aem.cloud.platform.core.wcm.impl;

import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.ValueFormatException;
import javax.jcr.query.Query;
import javax.jcr.query.QueryManager;
import javax.jcr.query.QueryResult;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.FastDateFormat;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.cloud.platform.core.models.SEOHrefLangUrls;
import com.abbott.aem.cloud.platform.core.util.PageUtil;
import com.abbott.aem.cloud.platform.core.util.ParameterUtil;
import com.abbott.aem.cloud.platform.core.models.AssetFolder;
import com.day.cq.commons.Externalizer;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;

import static com.day.cq.wcm.api.NameConstants.NN_TEMPLATE;
import static com.day.crx.JcrConstants.JCR_CONTENT;
import static org.apache.sling.api.servlets.HttpConstants.METHOD_GET;

@Component(immediate = true, service = { Servlet.class })
@SlingServletResourceTypes(resourceTypes = "core/wcm/components/page/v2/page", methods = METHOD_GET, selectors = {
		"sitemap" }, extensions = { "xml" })
@Designate(ocd = SiteMapServletConfiguration.class, factory = true)
public final class SiteMapServlet extends SlingSafeMethodsServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7568964383630165611L;

	private static final Logger logger = LoggerFactory.getLogger(SiteMapServlet.class);

	private static final FastDateFormat DATE_FORMAT = FastDateFormat.getInstance("yyyy-MM-dd");

	private static final String NS = "http://www.sitemaps.org/schemas/sitemap/0.9";

	private static final String XHTML_NS = "http://www.w3.org/1999/xhtml";

	private static final String ROOT_SITE_PATH = "rootSitePath";

	private static final String EXCLUDE_SUB_PAGES_PROP = "hideSubPages";
	
	private static final String INCLUDE_SITEMAP_HREF_PROP ="siteMapHref";
	
	private static final String ASSETS_PATH ="assetsPath";
	
	private static final String REPOSITORY_EXCEPTION ="SitemapServlet :: RepositoryException found in doGet() method::{}";
	
	private static final String CHANGE_FREQUENCY ="changefreq";
	
	private static final String PRIORITY ="priority";
	public static final String FORWARD_SLASH = "/";

	@Reference
	private transient Externalizer externalizer;

	private boolean includeLastModified;

	private String[] changefreqProperties;

	private String[] priorityProperties;

	private List<String> excludeFromSiteMapProperty;

	private boolean extensionlessUrls;

	private boolean removeTrailingSlash;

	private boolean includeInheritValue;

	private String characterEncoding;

	private List<String> excludedPageTemplates;

	private Map<String, String> urlRewrites;

	private List<AssetFolder> assetFoldersList;
	
	private String finalURLPath;
	
	private transient List<SEOHrefLangUrls> seoHrefLangUrlsList;
	
	private List<String> sitemapUrlList;
	
	@Activate
	protected void activate(SiteMapServletConfiguration config) {
		this.includeLastModified = config.include_lastmod();
		this.changefreqProperties = config.changefreq_properties();
		this.priorityProperties = config.priority_properties();
		this.excludeFromSiteMapProperty = Arrays.asList(config.exclude_property());
		this.extensionlessUrls = config.extensionless_urls();
		this.removeTrailingSlash = config.remove_slash();
		this.includeInheritValue = config.include_inherit();
		this.characterEncoding = config.character_encoding();
		this.excludedPageTemplates = config.exclude_templates() != null ? Arrays.asList(config.exclude_templates())
				: List.of();
		this.urlRewrites = ParameterUtil.toMap(config.url_rewrites(), ":", true, "");
	}

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType(request.getResponseContentType());

		if (StringUtils.isNotEmpty(this.characterEncoding)) {
			response.setCharacterEncoding(characterEncoding);
		}
		ResourceResolver resourceResolver = request.getResourceResolver();
		PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
		Page page = pageManager.getContainingPage(request.getResource());

		XMLOutputFactory outputFactory = XMLOutputFactory.newFactory();
		URL url = new URL(request.getRequestURL().toString());
		finalURLPath  = url.getProtocol() + "://" + url.getHost();
		try {
			XMLStreamWriter stream = outputFactory.createXMLStreamWriter(response.getWriter());
			stream.writeStartDocument("1.0");

			stream.writeStartElement("", "urlset", NS);
			stream.writeNamespace("", NS);

			// Adding namespace for xhtml prefix
			stream.writeNamespace("xhtml", XHTML_NS);

			assetFoldersList = new ArrayList<>();
			seoHrefLangUrlsList = new ArrayList<>();
			sitemapUrlList = new ArrayList<>();
			// first do the current page
			write(page, stream, resourceResolver, request);

			//converts first page into CRXDE node
			Node pageNode = page.getContentResource().adaptTo(Node.class);
			iterateDAMNodes(pageNode, ASSETS_PATH);
			
			if(pageNode.hasNode("hrefLangUrls")){
				iterateSEOHrefLangUrls(pageNode);
			}
			
			//iterates through all pages on AEM
			for (Iterator<Page> children = page.listChildren(new PageFilter(false, true), true); children.hasNext();) {
				Page nextPage = children.next();
				if(!sitemapUrlList.contains(nextPage.getPath())) {
				write(nextPage, stream, resourceResolver, request);
				}

				//converts page to node and checks if any DAM asset path was uploaded
				pageNode = nextPage.getContentResource().adaptTo(Node.class);
				iterateDAMNodes(pageNode, ASSETS_PATH);
			}
			
			//iterates through a page's asset folders and writes into sitemap
            if (!assetFoldersList.isEmpty()) {
                for (Resource assetFolder : getAssetFolders(assetFoldersList, resourceResolver)) {
                    writeAssets(stream, assetFolder, resourceResolver);
                }
            }
            
            //check the checkbox value
            String siteMapValue = page.getProperties().get(INCLUDE_SITEMAP_HREF_PROP, String.class);
            
			if(siteMapValue!= null && siteMapValue.equalsIgnoreCase("true") && !seoHrefLangUrlsList.isEmpty()) {
			//iterates through a page's asset folders and writes into sitemap
            	// writing the lang stream parameters
            	
            	for (int i = 0; i < seoHrefLangUrlsList.size(); i++) {				
			     stream.writeStartElement(NS, "url");
				 writeElement(stream, "loc", seoHrefLangUrlsList.get(i).getSeoHrefLangsUrls());               
    				stream.writeStartElement(XHTML_NS, "link");
    				stream.writeAttribute("rel", "alternate");
    				stream.writeAttribute("hreflang", seoHrefLangUrlsList.get(i).getCountryCode());
    				stream.writeAttribute("href", seoHrefLangUrlsList.get(i).getSeoHrefLangsUrls());
    				stream.writeEndElement(); 
    				stream.writeEndElement();
            }            
            
		} 
			stream.writeEndDocument();
        } catch (XMLStreamException e) {
        	logger.error("SitemapServlet :: XMLStreamException found in doGet() method::{}",e.getMessage());
        } catch (PathNotFoundException e) {
        	logger.error("SitemapServlet :: PathNotFoundException found in doGet() method::{}",e.getMessage());
		} catch (RepositoryException e) {
			logger.error(REPOSITORY_EXCEPTION,e.getMessage());
		}
	}
	
	private void iterateDAMNodes(Node node, String path) {
		try {
			if(node.hasNode(path)){
				iterateDAMpath(node);
			}
		} catch (RepositoryException e) {
			logger.error("Exception occured ::", e);
		}
	}

	private String applyUrlRewrites(String url) {
		try {
			String path = URI.create(url).getPath();
			for (Map.Entry<String, String> rewrite : urlRewrites.entrySet()) {
				if (path.startsWith(rewrite.getKey())) {
					return url.replaceFirst(rewrite.getKey(), rewrite.getValue());
				}
			}
			return url;
		} catch (IllegalArgumentException e) {
			return url;
		}
	}
	private Collection<Resource> getAssetFolders(List<AssetFolder> assetFoldersList, ResourceResolver resolver) {
    	List<Resource> allAssetFolders = new ArrayList<>();
    	if (assetFoldersList != null && !assetFoldersList.isEmpty()) {
			for (AssetFolder assetFolder : assetFoldersList) {
				if (StringUtils.isNotBlank(assetFolder.getAssetFolderPath())) {
					Resource assetFolderResource = resolver.getResource(assetFolder.getAssetFolderPath());
					if (assetFolderResource != null){
						allAssetFolders.add(assetFolderResource);
					}
				}
			}
		}
		if(logger.isDebugEnabled()) {
			logger.debug("SitemapServlet:: Inside getAssetFolders() method. Asset folder resources are:{}", allAssetFolders);
		}
			return allAssetFolders;
		}	

		private void writeAsset(Asset asset, XMLStreamWriter stream, ResourceResolver resolver) throws XMLStreamException {
			stream.writeStartElement(NS, "url");

			String loc = PageUtil.getUrl(asset.getPath(), resolver, externalizer, extensionlessUrls, removeTrailingSlash);			
			loc = finalURLPath + loc;		
			writeElement(stream, "loc", loc);

			if (includeLastModified) {
				long lastModified = asset.getLastModified();
				if (lastModified > 0) {
					writeElement(stream, "lastmod", DATE_FORMAT.format(lastModified));
				}
			}
			for(AssetFolder folder: assetFoldersList){ 
				if(StringUtils.isNotEmpty(folder.getPriority()) && StringUtils.contains(asset.getPath(), folder.getAssetFolderPath())){
					
						writeElement(stream, CHANGE_FREQUENCY, folder.getChangeFrequency());
						writeElement(stream, PRIORITY, folder.getPriority());
					}
			}
			stream.writeEndElement();
   	 	}

	private void writeAssets(final XMLStreamWriter stream, final Resource assetFolder, final ResourceResolver resolver)
	throws XMLStreamException {
		for (Iterator<Resource> children = assetFolder.listChildren(); children.hasNext();) {
			Resource assetFolderChild = children.next();
			if (assetFolderChild.isResourceType(DamConstants.NT_DAM_ASSET)) {
				Asset asset = assetFolderChild.adaptTo(Asset.class);
				writeAsset(asset, stream, resolver);   
			} else {
			writeAssets(stream, assetFolderChild, resolver);
			}
		}
	}

	private void iterateDAMpath(Node pageNode) {
		String priority = "";
		String changeFreq = "";
		try{
			//gets changeFreq and priority value from node above assetsPath
			if(pageNode.hasProperty("changeFrequency")){
				changeFreq = pageNode.getProperty("changeFrequency").getString();
			}
			if(pageNode.hasProperty(PRIORITY)){
				priority = pageNode.getProperty(PRIORITY).getString();
			}
			Node assetFolders = pageNode.getNode(ASSETS_PATH);
			if(null != assetFolders){
				NodeIterator itr = assetFolders.getNodes();
				if(null != itr){
					while(itr.hasNext()){
						Node assetFolderNode = itr.nextNode();
						AssetFolder assetFolder = new AssetFolder();
						if(assetFolderNode.hasProperty("assetSectionPath")){
							assetFolder.setAssetFolderPath(assetFolderNode.getProperty("assetSectionPath").getString());
							assetFolder.setChangeFrequency(changeFreq);
							assetFolder.setPriority(priority);
							
						}


						assetFoldersList.add(assetFolder);
					}
				}
			}
				
			} catch (RepositoryException e) {
				logger.error(REPOSITORY_EXCEPTION,e.getMessage());
			}
	}

	
	private void iterateSEOHrefLangUrls(Node pageNode) {
				try{
					Node hrefLangUrls = pageNode.getNode("hrefLangUrls");
					if(null != hrefLangUrls){
						NodeIterator itr = hrefLangUrls.getNodes();
						if(null != itr){
							while(itr.hasNext()){
								Node hrefLangUrlsNode = itr.nextNode();
								SEOHrefLangUrls seoHrefLangUrls = new SEOHrefLangUrls();
								if(hrefLangUrlsNode.hasProperty("sitemapHreflangUrl")){
									seoHrefLangUrls.setSeoHrefLangsUrls(hrefLangUrlsNode.getProperty("sitemapHreflangUrl").getString());
									seoHrefLangUrls.setCountryCode(hrefLangUrlsNode.getProperty("countryCode").getString());
								}

								seoHrefLangUrlsList.add(seoHrefLangUrls);
							}
						}
					}
						
					} catch (RepositoryException e) {
						logger.error(REPOSITORY_EXCEPTION,e.getMessage());
					}
			}
	
	
	@SuppressWarnings("squid:S1192")
	private void write(Page page, XMLStreamWriter stream, ResourceResolver resolver, SlingHttpServletRequest request)
			throws XMLStreamException, RepositoryException {
		if (isHiddenByPageProperty(page) || isHiddenByPageTemplate(page)) {
			logger.debug("SiteMapServlet :: Inside write() method ::Current page hidden- {}, {}, {}",
					isHiddenByPageProperty(page), "SiteMapServlet :: Inside write() method ::Any parent page hidden-",
					isHiddenByPageTemplate(page)) ;
			boolean isParentPageHidden = Boolean.TRUE.equals(page.getProperties().get(EXCLUDE_SUB_PAGES_PROP, Boolean.class));

			if(!isParentPageHidden) return;
			if(isHiddenByPageProperty(page)) return;
		}
		stream.writeStartElement(NS, "url");
		String loc = "";
		loc = page.getPath();
		String rootPage= request.getRequestURI().split(".sitemap.xml")[0];
		if(page.getPath().equalsIgnoreCase(rootPage)) {
			Node pageNode = page.getContentResource().adaptTo(Node.class);
			 if(null != pageNode && pageNode.hasProperty("hrefLangAlternateUrl")){
				 loc = pageNode.getProperty("hrefLangAlternateUrl").getString();
				 sitemapUrlList.add(loc);
			 }
		}
		loc = PageUtil.getUrl(loc, resolver, externalizer, extensionlessUrls, removeTrailingSlash);
		loc = applyUrlRewrites(loc);
        writeElement(stream, "loc", loc);

		// Adding xhtml:link element in sitemap
		if (null != request.getRequestURI()) {
			String currentSitePath = request.getRequestURI().split(".sitemap.xml")[0];
			writeElement(stream, currentSitePath, page.getPath(), resolver);
		}

		if (includeLastModified) {
			Calendar cal = page.getLastModified();
			if (cal != null) {
				writeElement(stream, "lastmod", DATE_FORMAT.format(cal));
			}
		}

		ValueMap properties = page.getProperties();
		if (includeInheritValue) {
			properties = new HierarchyNodeInheritanceValueMap(page.getContentResource());
		}
		writeFirstPropertyValue(stream, CHANGE_FREQUENCY, changefreqProperties, properties);
		writeFirstPropertyValue(stream, PRIORITY, priorityProperties, properties);

		stream.writeEndElement();
	}

	private boolean isHiddenByPageProperty(Page page) {
		boolean flag = false;
		if (this.excludeFromSiteMapProperty != null) {
			for (String pageProperty : this.excludeFromSiteMapProperty) {
				flag = flag || page.getProperties().get(pageProperty, Boolean.FALSE);
			}
		}
		return flag;
	}

	private boolean isHiddenByPageTemplate(Page page) {
		boolean flag = false;
		if (this.excludedPageTemplates != null) {
			for (String pageTemplate : this.excludedPageTemplates) {
				flag = flag
						|| page.getProperties().get(NN_TEMPLATE, StringUtils.EMPTY).equalsIgnoreCase(pageTemplate);
			}
		}
		return flag;
	}

	private void writeFirstPropertyValue(final XMLStreamWriter stream, final String elementName,
			final String[] propertyNames, final ValueMap properties) throws XMLStreamException {
		for (String prop : propertyNames) {
			String value = properties.get(prop, String.class);
			if (value != null) {
				writeElement(stream, elementName, value);
				break;
			}
		}
	}

	@SuppressWarnings("squid:S1144")
	private void writeFirstPropertyValue(final XMLStreamWriter stream, final String elementName,
			final String[] propertyNames, final InheritanceValueMap properties) throws XMLStreamException {
		for (String prop : propertyNames) {
			String value = properties.get(prop, String.class);
			if (value == null) {
				value = properties.getInherited(prop, String.class);
			}
			if (value != null) {
				writeElement(stream, elementName, value);
				break;
			}
		}
	}

	/**
	 * This method has been added to write the href lang tags on the basis of
	 * current page path for which Sitemap entry is generated
	 * 
	 * @param stream
	 * @param currentSitePath
	 * @param currentPagePath
	 * @param resolver
	 * @throws XMLStreamException
	 * @throws RepositoryException 
	 * @throws PathNotFoundException 
	 * @throws ValueFormatException 
	 */
	private void writeElement(final XMLStreamWriter stream, final String currentSitePath, final String currentPagePath,
			ResourceResolver resolver) throws XMLStreamException, RepositoryException {

		// Getting the root site path page property
		InheritanceValueMap iProperties = new HierarchyNodeInheritanceValueMap(resolver.getResource(currentPagePath));
		String rootSitePath = iProperties.getInherited(ROOT_SITE_PATH, String.class);
		if (StringUtils.isNotEmpty(rootSitePath) && StringUtils.isNotEmpty(currentSitePath)) {
			// Getting the list of paths that needs to be included in href lang
			List<String> langRootPaths = getHreflangRootPaths(rootSitePath, currentSitePath, resolver);
			// Getting the Map which has href lang as key and href lang path as
			// the value
			HashMap<String, String> langPagePaths = generateHreflangPagePaths(langRootPaths, currentPagePath, resolver);
			// Iterating over the Map
			if (null != langPagePaths) {
				for (Map.Entry<String, String> entry : langPagePaths.entrySet()) {
					String href = PageUtil.getUrl(entry.getValue(), resolver, externalizer, extensionlessUrls,
							removeTrailingSlash);
					href = applyUrlRewrites(href);

					// writing the lang stream parameters
					stream.writeStartElement(XHTML_NS, "link");
					stream.writeAttribute("rel", "alternate");
					stream.writeAttribute("hreflang", entry.getKey());
					stream.writeAttribute("href", href);
					stream.writeEndElement();
				}
			}
		}
	}

	/**
	 * This method return list of paths that needs to be included in href lang
	 * 
	 * @param rootSitePath
	 *            - Root site path obtained from the page property within root
	 *            page
	 * @param currentSitePath
	 *            - Servlet path without '.sitemap.xml'
	 * @param resolver
	 *            - Resource resolver
	 * @return List<String> - List of paths
	 */
	private List<String> getHreflangRootPaths(String rootSitePath, String currentSitePath, ResourceResolver resolver) {
		List<String> pageList = new ArrayList<>();
		if (StringUtils.isNotEmpty(rootSitePath) && StringUtils.isNotEmpty(currentSitePath) && currentSitePath.startsWith(rootSitePath)) {
			String queryString = "SELECT * FROM [cq:PageContent] AS page WHERE ISDESCENDANTNODE(page, \'"
						+ rootSitePath + "\') AND [includeInHrefLang] = 'true'";
				try {
					Session session = resolver.adaptTo(Session.class);
					QueryManager queryManager = session.getWorkspace().getQueryManager();
					Query query = queryManager.createQuery(queryString, "JCR-SQL2");

					// Execute the query and get the results ...
					QueryResult result = query.execute();

					// Iterate over the nodes in the results ...
					NodeIterator nodeIter = result.getNodes();
					while (nodeIter.hasNext()) {
						Node node = nodeIter.nextNode();
						
							pageList.add(node.getPath().split(JCR_CONTENT)[0]);
						}
				} catch (RepositoryException e) {
					logger.error("Repository Exception occured while retreiving site pages :", e);
				}
		}
		return pageList;
	}

	/**
	 * This method is used to get a Map which has href lang as key and href lang
	 * path as the value
	 * 
	 * @param hrefRootPaths
	 *            - List of href root paths
	 * @param currentPagePath
	 *            - current page path
	 * @param resolver
	 *            - Resource resolver
	 * @return HashMap<String, String> - HashMap with href lang and path values
	 * @throws RepositoryException 
	 * @throws PathNotFoundException 
	 * @throws ValueFormatException 
	 */
	private HashMap<String, String> generateHreflangPagePaths(List<String> hrefRootPaths, String currentPagePath,
			ResourceResolver resolver) throws RepositoryException {
		HashMap<String, String> hrefLangPaths = null;
		if (StringUtils.isNotEmpty(currentPagePath) && !hrefRootPaths.isEmpty()) {

			// Initialising the Map otherwise it will return null
			hrefLangPaths = new HashMap<>();

			// Checking whether the current page path has '/' in the end or not
			if(!currentPagePath.endsWith(FORWARD_SLASH)){
                currentPagePath = currentPagePath + FORWARD_SLASH;
			}
			logger.debug("Current page path is {}", currentPagePath);

			// Iterating the hrefRootPaths list
			for (String hrefRootPath : hrefRootPaths) {
				String hrefLangPagePath = "";
				String pagePathToReplace = "";

				// Counters to count '/' within the Stings
				int countSlashRootPath = 0;
				int countSlashPagePath = 0;

				// Fetching the language out from language list item
				// which will be used as hreflang


				// Counting the number of '/' within the path from hrefRootPaths
				for (int i = 0; i < hrefRootPath.length(); i++) {
					if (hrefRootPath.charAt(i) == '/') {
						countSlashRootPath++;
					}
				}
				logger.debug("Root path counter slash value is {}",countSlashRootPath);

				// Finding the substring within current page path on the basis
				// of '/' which needs to be replaced
				for (int j = 0; j < currentPagePath.length(); j++) {
					if (currentPagePath.charAt(j) == '/') {
						countSlashPagePath++;
						if (countSlashRootPath == countSlashPagePath) {
							pagePathToReplace = currentPagePath.substring(0, j + 1);
						}
					}
				}
				logger.debug("Page path which should be replaced is {}" , pagePathToReplace);
				logger.debug("Value from which it should be replaced is {}" , hrefRootPath);
				// Transforming the current sitemap page path to new path
				hrefLangPagePath = StringUtils.replace(currentPagePath, pagePathToReplace, hrefRootPath);
				logger.debug("Final href lang page path is {}" , hrefLangPagePath);

				// Checking whether the transformed page exists or not
				// Once validated, adding the same to Map
				PageManager pageManager = resolver.adaptTo(PageManager.class);
				Page pageResource = pageManager.getPage(hrefLangPagePath);
				if (null != pageResource && pageResource.isValid() && !isHiddenByPageProperty(pageResource) && !isHiddenByPageTemplate(pageResource)) {
					// Checking whether the page is hidden by page or template
					Locale pageLocale = pageResource.getLanguage();
					String country = pageLocale.getCountry().toLowerCase();
					String hreflang ="";
					if(StringUtils.isNotBlank(country)) { 
						  hreflang = pageLocale.getLanguage() + "-" + pageLocale.getCountry().toLowerCase();	
					} else {
						  hreflang = pageLocale.getLanguage();	
					}					 
					 Node pageNode = pageResource.getContentResource().adaptTo(Node.class);
					 String hrefLangAlternateUrl ="";	
					 String hrefLangLocale ="";
					 if(null != pageNode && pageNode.hasProperty("hrefLangAlternateUrl")){						 
					 hrefLangAlternateUrl = pageNode.getProperty("hrefLangAlternateUrl").getString();
					 }					 
					 if(null != pageNode && pageNode.hasProperty("hrefLangLocale")){						 
						 hrefLangLocale = pageNode.getProperty("hrefLangLocale").getString();
						 }					 
					 if(hrefLangAlternateUrl!=null && hrefLangAlternateUrl.length()>0) {
					 hrefLangPagePath = hrefLangAlternateUrl ;
					 }
					 if(hrefLangLocale!=null && hrefLangLocale.length()>0) {
						 hreflang = hrefLangLocale ;
						 }
						logger.debug("Href lang map value {}", hreflang);
						logger.debug("Href lang page path map value {}" , hrefLangPagePath);
						hrefLangPaths.put(hreflang, hrefLangPagePath);
						
				}
			}
		}
		return hrefLangPaths;
	}

	/**
	 * This method writes the element and its value in xml using XMLStreamWriter
	 * 
	 * @param stream
	 *            - XMLStreamWriter
	 * @param elementName
	 *            - Name of the element which needs to be written by stream
	 * @param text
	 *            - Value of the element which needs to be written
	 * @throws XMLStreamException
	 *             - XMLStream Exception
	 */
	public void writeElement(final XMLStreamWriter stream, final String elementName, final String text)
			throws XMLStreamException {
		stream.writeStartElement(NS, elementName);
		stream.writeCharacters(text);
		stream.writeEndElement();
	}
}
