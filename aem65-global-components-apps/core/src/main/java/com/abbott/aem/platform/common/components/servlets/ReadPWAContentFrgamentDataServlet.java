package com.abbott.aem.platform.common.components.servlets;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_POST;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_PATHS;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

import javax.servlet.Servlet;

import org.apache.commons.io.IOUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;

import com.abbott.aem.platform.common.components.pojo.PWAContentFragment;
import com.adobe.cq.dam.cfm.ContentElement;
import com.adobe.cq.dam.cfm.ContentFragment;
import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component(service = Servlet.class, property = { SLING_SERVLET_PATHS + "=" + ReadPWAContentFrgamentDataServlet.DEFAULT_OG_PATH,
		SLING_SERVLET_METHODS + "=" + METHOD_POST })
public class ReadPWAContentFrgamentDataServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = -256425619548399065L;
	public static final String PATH = "bin/pwa/cfreader";

	public static final String PATH_DELIMITER = "/";
	private static final String CONTENT_TYPE = "application/json";
	private static final String UTF8 = "UTF-8";
	private static final String NEWLINE = "\n";
	private static final String CACHING_STRATEGY = "cachingStrategy";
	private static final String CACHE_NAME = "cacheName";
	private static final String PRECACHED_URL = "precachedUrl";
	private static final String OFFLINE_PAGE = "offlinePage";
	private static final String DOMAINWHITE_LIST = "domainWhiteList";
	private static final String CACHE_URLS = "cacheableUrls";
	private static final String EXCLUDE_URLS = "excludedUrls";
	private static final String HANDLER_EXPIRATION_LIMIT = "handlerExpirationLimit";
	private static final String LOCAL_HOST_URL = "localHostUrl";	
	private static final String CONTENT_BASE_PATH = "contentBasePath";
	private static final String EMPTY = "";

	public static final String DEFAULT_OG_PATH = PATH_DELIMITER + PATH;

	@Override
	protected void doPost(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
			throws IOException {

		List<String> lstGlobalUrl = new ArrayList<>();
		ResourceResolver resourceResolver = null;

		try {
			String body = IOUtils.toString(request.getReader());
			JsonParser jsonParser = new JsonParser();
			JsonElement jsonElement = jsonParser.parse(body);
			JsonObject reqJsonObject = jsonElement.getAsJsonObject();
			PWAContentFragment contentfrg = new PWAContentFragment();
			resourceResolver = request.getResourceResolver();

			String pwaContentFragmentPath = reqJsonObject.get("pwaContentFragmentPath").getAsString();
			Resource cfParentResource = resourceResolver.resolve(pwaContentFragmentPath);
			ContentFragment contentFragment = cfParentResource.adaptTo(ContentFragment.class);

			if (Objects.nonNull(contentFragment)) {

				ContentElement precachedUrl = contentFragment.getElement(PRECACHED_URL);
				String urls = precachedUrl.getContent();
				String[] strSplit = urls.split(NEWLINE);
				List<String> lstPrecachedUrl = new ArrayList<>(Arrays.asList(strSplit));
				lstPrecachedUrl.removeAll(Arrays.asList(EMPTY, null));

				ContentElement excludedUrls = contentFragment.getElement(EXCLUDE_URLS);
				String excludeurl = excludedUrls.getContent();
				strSplit = excludeurl.split(NEWLINE);
				List<String> lstExcludedUrl = new ArrayList<>(Arrays.asList(strSplit));
				lstExcludedUrl.removeAll(Arrays.asList(EMPTY, null));

				ContentElement offlineurlContent = contentFragment.getElement(OFFLINE_PAGE);
				String offlineurl = offlineurlContent.getContent();

				lstGlobalUrl = getAllUrlList(lstPrecachedUrl, lstGlobalUrl, lstExcludedUrl, resourceResolver, offlineurl);
				log.info("Cache Urls count for PWA for domain {}", lstGlobalUrl.size());
				contentfrg = setContentFragmentModel(contentFragment, lstGlobalUrl);
			}

			PrintWriter out = response.getWriter();
			response.setContentType(CONTENT_TYPE);
			response.setCharacterEncoding(UTF8);
			out.print(new Gson().toJson(contentfrg));
			out.flush();

		} catch (Exception ex) {
			log.debug("Error in /bin/pwa/cfreader Servlet", ex.getMessage());
		} finally {
			if (Objects.nonNull(resourceResolver))
				resourceResolver.close();
		}
	}

	private PWAContentFragment setContentFragmentModel(ContentFragment contentFragmentSiteData,
			List<String> lstGlobalUrl) {

		PWAContentFragment pwaContentfragment = new PWAContentFragment();

		ContentElement contentElement = contentFragmentSiteData.getElement(CACHING_STRATEGY);
		pwaContentfragment.setCachingStrategy(contentElement.getContent());

		contentElement = contentFragmentSiteData.getElement(CACHE_NAME);
		pwaContentfragment.setCacheName(contentElement.getContent());

		contentElement = contentFragmentSiteData.getElement(PRECACHED_URL);
		String precacheurls = contentElement.getContent();
		String[] strSplit = precacheurls.split(NEWLINE);
		pwaContentfragment.setPrecachedUrl(new ArrayList<>(Arrays.asList(strSplit)));

		contentElement = contentFragmentSiteData.getElement(OFFLINE_PAGE);
		pwaContentfragment.setOfflinePage(contentElement.getContent());

		contentElement = contentFragmentSiteData.getElement(DOMAINWHITE_LIST);
		pwaContentfragment.setDomainWhiteList(contentElement.getContent());
		
		contentElement = contentFragmentSiteData.getElement(CACHE_URLS);
		String urls = contentElement.getContent();
		strSplit = urls.split(NEWLINE);
		List<String> lstCacheableUrl = new ArrayList<>(Arrays.asList(strSplit));
		lstCacheableUrl.removeAll(Arrays.asList(EMPTY, null));
		pwaContentfragment.setCacheableUrls(lstCacheableUrl);

		contentElement = contentFragmentSiteData.getElement(EXCLUDE_URLS);
		pwaContentfragment.setExcludedUrls(contentElement.getContent());

		contentElement = contentFragmentSiteData.getElement(HANDLER_EXPIRATION_LIMIT);
		pwaContentfragment.setHandlerExpirationLimit(contentElement.getContent());
		pwaContentfragment.setMasterCacheUrlList(lstGlobalUrl);
		
		contentElement = contentFragmentSiteData.getElement(LOCAL_HOST_URL);
		pwaContentfragment.setLocalHostUrl(contentElement.getContent());
		
		contentElement = contentFragmentSiteData.getElement(CONTENT_BASE_PATH);
		pwaContentfragment.setContentBasePath(contentElement.getContent());
			
		return pwaContentfragment;
	}

	private void addOfflineUrl(List<String> lstPrecachedUrl,String offlineUrl) {
		if (Objects.nonNull(offlineUrl) && !offlineUrl.isEmpty())
			lstPrecachedUrl.add(offlineUrl);

	}
	private void createGlobalList(ResourceResolver resourceResolver,String url,List<String> lstGlobalUrl,List<String> lstExcludedUrl) {
		try {
			Page pdpPage = resourceResolver.getResource(url).adaptTo(Page.class);			
			if (Objects.nonNull(pdpPage)) {
				if (!lstGlobalUrl.contains(url))
					lstGlobalUrl.add(url);
				
				Iterator<Page> checkChild = pdpPage.listChildren(null, true);
				while (checkChild.hasNext()) {
					Page existingPage = checkChild.next();
					if (!lstGlobalUrl.contains(existingPage.getPath())
							&& !lstExcludedUrl.contains(existingPage.getPath()))
						lstGlobalUrl.add(existingPage.getPath());
				}
			}
		} catch (RuntimeException ex) {
			log.debug("Error in /bin/pwa/cfreader GetAllUrlList Servlet", ex.getMessage());
		}
	}
	private List<String> getAllUrlList(List<String> lstPrecachedUrl, List<String> lstGlobalUrl,
			List<String> lstExcludedUrl, ResourceResolver resourceResolver, String offlineUrl) {
		addOfflineUrl(lstPrecachedUrl,offlineUrl);
		for (String url : lstPrecachedUrl) {
			if (lstExcludedUrl.contains(url))
				continue;
			createGlobalList(resourceResolver,url,lstGlobalUrl,lstExcludedUrl);
		
		}
		return lstGlobalUrl;
	}

}
