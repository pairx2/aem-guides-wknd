package com.abbott.aem.platform.search.core.jobs;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.servlet.ServletException;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicHttpRequest;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.day.cq.commons.Externalizer;
import com.day.cq.replication.AgentManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.abbott.aem.platform.search.coveoconnector.core.cloudfront.CloudFrontUtil;
import com.abbott.aem.platform.search.coveoconnector.core.constants.CommonConstants;
import com.abbott.aem.platform.search.coveoconnector.core.service.CacheClearService;

import static com.abbott.aem.platform.search.coveoconnector.core.constants.CommonConstants.AGENT_ID;

/**
 * A JobConsumer Service implementation.
 */
@Component(service = JobConsumer.class, immediate = true, configurationPolicy = ConfigurationPolicy.REQUIRE, property = {
		Constants.SERVICE_DESCRIPTION + "=Demo to listen on changes in the resource tree",
		JobConsumer.PROPERTY_TOPICS + "=" + CommonConstants.ABBOTT_FASTLY_CACHECLEAR })
/***
 * Sample OSGi component which works only in specific run mode. When we make
 * component 'policy' to 'REQUIRE', OSGi container expects corresponding
 * configuration object (osgi:Config node) to become satisfied. If we define the
 * sling:OsgiConfig node under 'config.author' folder, we could get this
 * component active in 'author' only run mode and 'unsatisfied' in all other run
 * modes.
 */

public class CacheClearJobConsumer implements JobConsumer {

	/** The Constant ACTION_PATH. */
	protected static final String ACTION_PATH = "actionPath";

	/** The Constant ACTION_TYPE. */
	protected static final String ACTION_TYPE = "actionType";

	/** The Constant READ_SERVICE. */
	protected static final String READ_SERVICE = "readService";

	/** The Constant PUBLISH. */
	private static final String PUBLISH = "publish";
	
	/** The Constant CONTENT_FRAGMENT. */
    private static final String CONTENT_FRAGMENT = "contentFragment";

	/** The Constant TRUE. */
	protected static final String TRUE = "true";

	/** The Constant OK. */
	protected static final String OK = "ok";

	/** The log. */
	protected final Logger log = LoggerFactory.getLogger(CacheClearJobConsumer.class);

	/** The resolver factory. */
	@Reference
	protected ResourceResolverFactory resolverFactory;

	/** The config fetch. */
	@Reference
	CacheClearService configFetch;

	/**
	 * The Agent Manager
	 */
	protected AgentManager agentManager;

	private final ThreadLocal<String> threadLocalAgentId = ThreadLocal.withInitial(() -> Externalizer.PUBLISH);

	@Override
	public JobResult process(Job job) {
		log.debug("Processing the JOB ********");
		String path = (String) job.getProperty(ACTION_PATH);
		String type = (String) job.getProperty(ACTION_TYPE);
		String agentId = (String) job.getProperty(AGENT_ID);
		threadLocalAgentId.set(agentId);

		log.debug("Cache clear details for ({}) and action type:: {}", path, type);

		processJob(path);
		/**
		 * Return the proper JobResult based on the work done...
		 *
		 * > OK : Processed successfully > FAILED: Processed unsuccessfully and
		 * reschedule --> This will keep the JOB up for next retry > CANCEL: Processed
		 * unsuccessfully and do NOT reschedule > ASYNC: Process through the
		 * JobConsumer.AsyncHandler interface
		 */
		return JobConsumer.JobResult.OK;

	}

	/**
	 * Process job.
	 *
	 * @param actionPath the actionPath
	 * @throws LoginException
	 * @throws ServletException
	 * @throws IOException
	 * @throws RepositoryException
	 * @throws Exception           the exception
	 */
	private void processJob(String actionPath) {

		if (StringUtils.isEmpty(actionPath)) {
			log.debug("---->Empty Path, nothing to invalidate");
			return;
		}

		if (actionPath.contains("cacheflush")) {
			clearFullCDNCache(actionPath.substring(0, actionPath.lastIndexOf("/")));
		} else {
			clearCDNCache(actionPath);
		}

	}

	private void clearFullCDNCache(String path) {
		log.debug("clearFullFastlyCache for path = {}", path);
		try (ResourceResolver resolver = resolverFactory.getServiceResourceResolver(getResolverParams())) {
			PageManager pg = resolver.adaptTo(PageManager.class);
			Page pp = pg.getPage(path);
			Iterator<Page> li = pp.listChildren();
			while (li.hasNext()) {
				Page childPage = li.next();

				if (childPage.listChildren().hasNext()) {
					clearFullCDNCache(childPage.getPath());
					clearCDNCache(childPage.getPath());
				} else {
					clearCDNCache(childPage.getPath());
				}

			}

		} catch (LoginException e) {
			log.error("LoginException in clearFullCDNCache Method", e);
		}

	}

	private void clearCDNCache(String path) {
		try (ResourceResolver resolver = resolverFactory.getServiceResourceResolver(getResolverParams())) {
			String fastlypublishhost = configFetch.getPublishHost();
			String purgekey = configFetch.getPurgeKey();
			String edgekey = configFetch.getEdgeKey();
			String methodpurge = "PURGE";
			log.debug("host={}", fastlypublishhost);
			Resource resource = resolver.getResource(path);
			Externalizer externalizer = resolver.adaptTo(Externalizer.class);
			ValueMap itemValueMap = resource.adaptTo(ValueMap.class);
			boolean isContentFragment = itemValueMap.containsKey(CONTENT_FRAGMENT)
                   && Boolean.TRUE.equals(itemValueMap.get(CONTENT_FRAGMENT, Boolean.class));

			String externalizerDomainName = CloudFrontUtil.getExternalizeDomainName(resource, resolver,
					isContentFragment);

			log.debug("getExternalizeDomainName={}", externalizerDomainName);

			if (externalizerDomainName.equals(PUBLISH)) {
				log.debug("Skipping fastly cache flush as Externalizer is not authored");
			} else {
				String searchpage = externalizer.externalLink(resolver, externalizerDomainName,
						resolver.map("/content"));
				searchpage = searchpage.replaceFirst("https://", "").replaceFirst("/content", "");
				log.debug("X-Forwarded-Host={}", searchpage);

				if (!path.contains("/content/dam") && !path.contains("cacheflush")) {
					path = path.concat(".html");
					path = CloudFrontUtil.getShortURL(path,searchpage,resolver);
				}
				if(path.contains("/content/an/similac/us")) {
		        	 path = path.replace("/content/an/similac/us", "");
				}
				path=path.replace(" ", "%20");

				log.debug("Fastly path to be cleared = {}", path);
				//code to get preview domain url
				if(CloudFrontUtil.isPreview(threadLocalAgentId.get())){
					fastlypublishhost = configFetch.getPreviewHost();
					edgekey = configFetch.getPreviewEdgeKey();
					purgekey = configFetch.getPreviewPurgeKey();
					searchpage = getPreviewHost(searchpage, threadLocalAgentId.get());
					log.debug("For PREVIEW, fastlypublishhost={}, X-Forwarded-Host={}", fastlypublishhost, searchpage);
				}
				threadLocalAgentId.remove();

				HttpHost host = new HttpHost(fastlypublishhost, 443, "https");
				RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(30 * 1000).setSocketTimeout(30 * 1000).build();
				HttpClient httpclient = HttpClientBuilder.create().setDefaultRequestConfig(requestConfig).build();
				BasicHttpRequest purgeRequest = new BasicHttpRequest(methodpurge, path);
				purgeRequest.addHeader("x-aem-purge-key", purgekey);
				purgeRequest.addHeader("x-aem-edge-key", edgekey);
				purgeRequest.addHeader("X-Forwarded-Host", searchpage/* "dev2.globalpointofcare.eifu.abbott" */);

				HttpResponse cdnResponse = httpclient.execute(host, purgeRequest);
				String message = EntityUtils.toString(cdnResponse.getEntity());
				log.debug("Message = {}", message);
				log.debug("Status Line = {}", cdnResponse.getStatusLine());

			}

		} catch (ParseException e) {
			log.error("ParseException in clearCDNCache ", e);
		} catch (IOException e) {
			log.error("IOException in clearCDNCache ", e);
		} catch (RepositoryException e) {
			log.error("RepositoryException in clearCDNCache ", e);
		} catch (LoginException e1) {
			log.error("LoginException in clearCDNCache ", e1);
		}
	}

	private static Map<String, Object> getResolverParams() {
		Map<String, Object> parameters = new HashMap<>();
		parameters.put(ResourceResolverFactory.SUBSERVICE, READ_SERVICE);
		return parameters;
	}

	private String getPreviewHost(String domain, String agentId){
		String env = CloudFrontUtil.getEnvironment(domain);
		log.debug("fromEnv, domain={}, env={}", domain, env);

		String previewDomain = CloudFrontUtil.getPreviewDomain(domain, env, agentId);
		env = CloudFrontUtil.getEnvironment(previewDomain);
		log.debug("toPreviewEnv, domain={}, env={}", previewDomain, env);
		return previewDomain;
	}
}