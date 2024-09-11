package com.abbott.aem.platform.search.core.jobs;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import javax.jcr.RepositoryException;
import javax.servlet.ServletException;

import com.day.cq.commons.Externalizer;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.platform.search.coveoconnector.core.cloudfront.CloudFrontUtil;
import com.abbott.aem.platform.search.coveoconnector.core.cloudfront.HMACEncryption;
import com.abbott.aem.platform.search.coveoconnector.core.constants.CommonConstants;
import com.abbott.aem.platform.search.coveoconnector.core.service.CacheClearService;
import com.day.cq.replication.AgentManager;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationResult;
import com.google.common.base.CharMatcher;

import static com.abbott.aem.platform.search.coveoconnector.core.constants.CommonConstants.AGENT_ID;

/**
 * A JobConsumer Service implementation.
 */
@Component(service = JobConsumer.class, immediate = true, configurationPolicy = ConfigurationPolicy.REQUIRE, property = {
		Constants.SERVICE_DESCRIPTION + "=Demo to listen on changes in the resource tree",
		JobConsumer.PROPERTY_TOPICS + "=" + CommonConstants.ABBOTT_CLOUDFRONT_CACHECLEAR })
/***
 * Sample OSGi component which works only in specific run mode. When we make
 * component 'policy' to 'REQUIRE', OSGi container expects corresponding
 * configuration object (osgi:Config node) to become satisfied. If we define the
 * sling:OsgiConfig node under 'config.author' folder, we could get this
 * component active in 'author' only run mode and 'unsatisfied' in all other run
 * modes.
 */

public class CloudFrontCacheClearJobConsumer implements JobConsumer {

	/** The Constant ACTION_PATH. */
	protected static final String ACTION_PATH = "actionPath";

	/** The Constant ACTION_TYPE. */
	protected static final String ACTION_TYPE = "actionType";

	/** The Constant READ_SERVICE. */
	protected static final String READ_SERVICE = "readService";

	/** The Constant TRUE. */
	protected static final String TRUE = "true";

	/** The Constant OK. */
	protected static final String OK = "ok";
	
	/** The Constant HTML. */
    protected static final String HTML = ".html";

	/** The log. */
	protected final Logger log = LoggerFactory.getLogger(CloudFrontCacheClearJobConsumer.class);
	
	/** The Constant VAR_DOMAINMAPPING. */
	private static final String VAR_DOMAINMAPPINGS = "/var/cacheflushconfig/domainmappings";
	
	
	
	/** The config fetch. */
	@Reference
	CacheClearService configFetch;

	/**
	 * The Agent Manager
	 */
	protected AgentManager agentManager;
	
	/** The resolver factory. */
	@Reference
	protected ResourceResolverFactory resolverFactory;

	private final ThreadLocal<String> threadLocalAgentId = ThreadLocal.withInitial(() -> Externalizer.PUBLISH);

	@Override
	public JobResult process(Job job) {
		log.debug("Processing the JOB *******");
		String type = (String) job.getProperty(ACTION_TYPE);
		String path = (String) job.getProperty(ACTION_PATH);
		String agentId = (String) job.getProperty(AGENT_ID);
		threadLocalAgentId.set(agentId);

		log.debug("CloudFrontCache clear details for ({}) and action type:: {} and agentId : {}", path, type, agentId);

		try {
					processJob(type, path);
				} catch (ReplicationException e) {
					log.error("Replication Exception in Job Process");
				}
			
			
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
	 * @param action     the action
	 * @param actionPath the action path
	 * @throws ReplicationException 
	 * @throws LoginException
	 * @throws ServletException
	 * @throws IOException
	 * @throws RepositoryException
	 * @throws Exception           the exception
	 */
	private void processJob(String action, String actionPath) throws ReplicationException
			{
		

		if (StringUtils.isEmpty(actionPath)) {
			log.debug("---->Empty Path, nothing to invalidate");
			return;
		}
		if (StringUtils.isNotBlank(actionPath)) {
			
			
				if (action.equalsIgnoreCase("activate")
						|| action.equalsIgnoreCase("deactivate")
						|| action.equalsIgnoreCase("delete")) {
					if (!StringUtils.isBlank(actionPath)){
					     doActivateMultiple( actionPath);
					}
					

				} else {
					throw new ReplicationException(
							"Replication action type not supported.");
				}
			
		} else {
			log.warn("content string is blank");
		}
			}

		
			private ReplicationResult doActivateMultiple(String content) {
				String url = "https://cloudfront.amazonaws.com/2010-11-01/distribution";
				doActivate(content, url);
				return ReplicationResult.OK;
			}
		
		private void doActivate(final String content,  String url) {

			try (ResourceResolver resolver = resolverFactory.getServiceResourceResolver(CloudFrontUtil.getResolverParams())) {
	        	String domain = CloudFrontUtil.getDomain(content,resolver);
	        	if(StringUtils.isNotBlank(domain)) {
	        	String env = CloudFrontUtil.getEnvironment(domain);

				log.debug("before preview-check, domain={}, env={}", domain, env);

				domain = CloudFrontUtil.getPreviewDomain(domain, env, threadLocalAgentId.get());
				env = CloudFrontUtil.getEnvironment(domain);
				threadLocalAgentId.remove();

				log.debug("after preview-check, domain={}, env={}", domain, env);

	        	Map<String,String> varMap = CloudFrontUtil.getMapping(VAR_DOMAINMAPPINGS,env,resolver);
	            String distributionID = null!=varMap?varMap.get(domain):"";
	            log.debug("distributionID - "+distributionID);
	            if(!StringUtils.isEmpty(distributionID)) {
	            	String endpointURL = CloudFrontUtil.getEndPointURL(distributionID, url);
		            final HttpPost request = new HttpPost(endpointURL);

		            createRequestBody(request, content,domain,resolver);

		            final HttpResponse response = sendRequest(request);

		            if (response != null) {
		                response.getStatusLine().getStatusCode();
		                HttpEntity entity = response.getEntity();
		                String responseString = EntityUtils.toString(entity, StandardCharsets.UTF_8);
		                
		                log.debug("Response String----"+response.toString());
		                log.debug("Response String----{}",responseString);

		                
		            }
	            }else {
	            	log.debug("DistributionID not found, please check config at /var/cacheflushconfig/domainmappings");
	            }
	        	}
	        } catch (ReplicationException | ParseException | IOException | LoginException ex) {
	            log.error("Error in Do Activate Method", ex);
	        }
	    }
		
		

		

		private void createRequestBody(final HttpPost request, final String contentPath, String domain, ResourceResolver resolver) {
			String path=contentPath.contains("/content/dam")?contentPath:contentPath.concat(HTML);
			try {
	        	
	         if(!contentPath.contains("/content/dam") && !contentPath.contains("/content/experience-fragments")) {
	        		path = CloudFrontUtil.getShortURL(path,domain,resolver);
	        		log.debug("Short url "+path);
	        	}
	         if(path.contains("cacheflush") ||path.contains("flushcdncache") ) {
               	 path = path.substring(0,path.lastIndexOf("/"));
               	 path = path.concat("/*");
               	log.debug("clearFullCDNCache for path "+path);
   			}
	         if(path.contains("/content/an/similac/us")) {
	        	 path = path.replace("/content/an/similac/us", "");
	         }
	            boolean isAscii = CharMatcher.ASCII.matchesAllOf(path);
	            if(!isAscii) {
	            	path = CloudFrontUtil.resolveNonAsciiPath(path);
	            }
	            if(path.contains(" ")) {
	            	path=path.substring(0, path.indexOf(" ")).concat("*");
	            }
	            log.debug("clearCDNCache for path "+path);
	            StringBuilder bodyString = new StringBuilder();
	            bodyString.append(CommonConstants.INVALIDATION_BATCH_START);
	            bodyString.append(CommonConstants.CALLER_REFERENCE_START.concat(CommonConstants.BATCH)).append(new Date().getTime());
	            bodyString.append(CommonConstants.CALLER_REFERENCE_END);
                bodyString.append(CommonConstants.PATH_START);
                bodyString.append(path);
                bodyString.append(CommonConstants.PATH_END);
	            bodyString.append(CommonConstants.INVALIDATION_BATCH_END);
				log.debug("Request String--{}", bodyString.toString());
	            final StringEntity entity = new StringEntity(bodyString.toString());
	            request.setEntity(entity);
	        } catch (UnsupportedEncodingException e) {
				log.error("Error in Create request body method ", e);
			}
	       
	    }

		

		

		private HttpResponse sendRequest(final HttpPost request) throws ReplicationException {
	        final String accessKey = configFetch.getAccessKey();
	        final String secretKey = configFetch.getSecretKey();
	        HMACEncryption encryption = new HMACEncryption();
	        request.setHeader(HttpHeaders.AUTHORIZATION, encryption.getAuth(secretKey, accessKey));
	        request.addHeader(CommonConstants.AWS_DATE_HEADER, encryption.getCallReference());
	        request.setHeader(HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_XML.getMimeType());
	        log.debug("Cloudfront request -"+request);
	        RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(30 * 1000).setSocketTimeout(30 * 1000).build();
	        HttpClient client = HttpClientBuilder.create().setDefaultRequestConfig(requestConfig).build();
	        HttpResponse response = null;
	        
	            try {
					response = client.execute(request);
				} catch (ClientProtocolException e) {
					log.error("ClientProtocolException",e);
				} catch (IOException e) {
					log.error("IOException",e);
				}
	        
	        log.debug("Cloudfront response -"+response);
	        return response;
	    }



}