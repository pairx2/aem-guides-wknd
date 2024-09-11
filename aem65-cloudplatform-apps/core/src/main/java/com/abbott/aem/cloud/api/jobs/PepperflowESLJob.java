package com.abbott.aem.cloud.api.jobs;

import java.io.IOException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.cloud.api.configuration.ApiRunJobConfiguration;
import com.abbott.aem.cloud.api.configuration.ESLDomainURLService;
import com.abbott.aem.cloud.api.jobs.model.Audit;
import com.abbott.aem.cloud.api.jobs.model.Data;
import com.abbott.aem.cloud.api.jobs.model.PFNode;
import com.abbott.aem.cloud.api.jobs.model.PepperflowPayload;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationStatus;
import com.day.cq.replication.Replicator;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.Revision;
import com.day.cq.wcm.api.WCMException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Component(
        immediate = true,
        service = { JobConsumer.class, AbbottJob.class },
        property = {
                JobConsumer.PROPERTY_TOPICS + "=" + PepperflowESLJob.TOPIC
        }
)
public class PepperflowESLJob implements JobConsumer, AbbottJob {

		private static final Logger log = LoggerFactory.getLogger(PepperflowESLJob.class);

        public static final String TOPIC = "pepperflow/esl/job";
        
        public static final String PAYLOADJSON = "data";
        
        /** The Constant ACTION_TYPE. */
        protected static final String ACTION_TYPE = "actionType";

        /** The Constant READ_SERVICE. */
        protected static final String REPLICATE_SERVICE = "replicateService";
        
        protected static final String LIVE = "LIVE";
        
        protected static final String DELETE = "DELETE";
        protected static final String DEACTIVATE = "DEACTIVATE";
        protected static final String EXPIRED = "EXPIRED";
		@SuppressWarnings("squid:S1075")
		// Refactor your code to get this URI from a customizable parameter.
        protected static final String CONTENT_PATH = "/content/add";
        public static final String DOMAIN_NAME = "domainname";
    	private static final String X_APPLICATION_ID = "x-application-id";
    	private static final String X_COUNTRY_CODE = "x-country-code";
    	private static final String X_PREFERRED_LANGUAGE = "x-preferred-language";
    	private static final String X_APPLICATION_ACCESS_KEY = "x-application-access-key";
    	public static final String X_ORIGIN_SECRET = "x-origin-secret";
    	private static final String CONTENT_TYPE="Content-Type";

        @Reference
    	private QueryBuilder builder;
        
        @Reference
    	private Replicator replicator;
        
        @Reference
        ResourceResolverFactory resolverFactory;
        
        @Reference 
        ApiRunJobConfiguration keyConfig;
        
        @Reference
        ESLDomainURLService domainConfig;
        
        @Override
        public JobResult process(Job job) {
        	
        	JobResult result = JobResult.FAILED;

        	try
        	{
        		
        		String payloadInput = job.getProperty(PAYLOADJSON).toString();
        		log.debug(" in process method with payload as ==> {} " , payloadInput);
        		
            	ObjectMapper mapper = new ObjectMapper();
            	PepperflowPayload payload = mapper.readValue(payloadInput, PepperflowPayload.class);
            	List <PFNode> nodes = payload.getData().getAemWebCollection().getNodes();
            	for(PFNode node : nodes) 
            	{
            		List <Audit> auditList = node.getAudit();
					String documentId = node.getSys().getDocumentId();

            		ZoneId zoneId = ZoneId.of("UTC");
					Optional<Audit> latestAudit = auditList.stream().reduce((a, b) -> 
					ZonedDateTime.parse(a.getTimestamp(), DateTimeFormatter.ISO_INSTANT.withZone(zoneId)).isBefore(
					                ZonedDateTime.parse(b.getTimestamp(), DateTimeFormatter.ISO_INSTANT.withZone(zoneId))) ? b : a);
					if(latestAudit.isPresent())
					{Audit newState = latestAudit.get();
					
            		Data dataList = node.getData();
            		String aemUUIDID = dataList.getAemExternalId();
            		log.debug(" Processing for UUID  ==> {} " ,  aemUUIDID);        		
            		String pagePath = searchUUIDPage(aemUUIDID);
            		
					pageAction(pagePath,newState.getData().getNewState(), documentId);
					}
            	}
        		
        		result = JobResult.OK;
                
        	}
        	catch(LoginException | JsonProcessingException e)
        	{
        		String emailNotificationResponse = sendNotification();
        		log.error(" response for email notification  ==> {} " , emailNotificationResponse);
        		log.error("Exception in process method {} " , e.getMessage());
        		
        	}
            return result;
        }
        
        /**
         * 
         * @param pageUUID
         * @param pagePath
         * @throws LoginException 
         */
        private String searchUUIDPage(String pageUUID) throws LoginException 
        {
        	String resultPagePath = null;
        	ResourceResolver resolver = null;
        	try
        	{
        		log.debug(" inside searchUUID  line 132 ==> {} " ,  pageUUID);   
        	    resolver = resolverFactory.getServiceResourceResolver(getResolverParams());
        	    Session  session = resolver.adaptTo(Session.class);
                
                Map<String, String> predicate = new HashMap<>();
                
    			predicate.put("path", CONTENT_PATH);
    			predicate.put("type", NameConstants.NT_PAGE);
    			predicate.put("group.p.or", "true");
    			predicate.put("group.1_fulltext", pageUUID);
    			predicate.put("group.1_fulltext.relPath",JcrConstants.JCR_CONTENT );
    			
    			Query query = builder.createQuery(PredicateGroup.create(predicate), session);
    			
    			query.setStart(0);
    			query.setHitsPerPage(20);
    			
    			SearchResult searchResult = query.getResult();
    			
    			for(Hit hit : searchResult.getHits()) {    				
    				resultPagePath = hit.getPath();
    			}
                
        	}
        	catch(  RepositoryException e )
        	{
        		log.error(" Exception while searching page {} " , e.getMessage());
        
        	}
        	finally
        	{
        		// close session and resource resolver if any 
        		if (resolver != null) {
        			resolver.close();
        		    }        		
        	}
        	
        	return resultPagePath;
        }
        
        /**
         * 
         * @param payload
         * @param action
         * @return
         * @throws org.apache.sling.api.resource.LoginException 
         */
        private void pageAction(String pagePath, String action, String documentId) throws LoginException
        {

        	ReplicationStatus replicationStatus = null;
        	ResourceResolver resolver = null;
        	try
        	{
        		log.debug(" page path and action  line 183 ==> {} " ,  pagePath );
        		resolver = resolverFactory.getServiceResourceResolver(getResolverParams());
				Session session = resolver.adaptTo(Session.class);
				if(LIVE.equalsIgnoreCase(action))
				{
					
					unlockCreateVersion(pagePath, documentId);
					replicator.replicate(session, ReplicationActionType.ACTIVATE, pagePath);
					replicationStatus = replicator.getReplicationStatus(session, pagePath);
					
					log.debug(" The Page {} is {} with status {} " , pagePath , action , replicationStatus);

				}
				else if(DELETE.equalsIgnoreCase(action) || DEACTIVATE.equalsIgnoreCase(action) || EXPIRED.equalsIgnoreCase(action))
				{
					replicator.replicate(session, ReplicationActionType.DEACTIVATE, pagePath);
					replicationStatus = replicator.getReplicationStatus(session, pagePath);	
					log.debug(" The Page {} is {} with status {} " , pagePath , action , replicationStatus);

				}
	        	
        	}
        	catch (ReplicationException e)
        	{
        		log.error(" Exception while publishing page {} " , e.getMessage());
        	}
        	   
        	finally
        	{
        		// close session and resource resolver if any 
        		if (resolver != null) {
        		      resolver.close();
        		    }
        		
        	}
        	
        }

        /**
         * 
         */
        public String getTopic() {
                return TOPIC;
        }
        
	     /**
	      * 
	      * @return
	      */
        private static Map<String, Object> getResolverParams() {
            Map<String, Object> parameters = new HashMap<>();
            parameters.put(ResourceResolverFactory.SUBSERVICE, REPLICATE_SERVICE);
            return parameters;
        }

	/**
         * 
         * @param pagePath
         */
        private void unlockCreateVersion(String pagePath, String documentId)
        {
        	ResourceResolver resourceResolver = null;
        	Session session = null;
        	Revision revision = null; 
        	try 
        	{
        		resourceResolver = resolverFactory.getServiceResourceResolver(getResolverParams());
        		PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
        		session = resourceResolver.adaptTo(Session.class);   
        		
        		Page currentPage = pageManager.getPage(pagePath);
        		
        		
        		if(currentPage.isLocked())
        		{
        			Node node = session.getNode(pagePath + "/" +JcrConstants.JCR_CONTENT);
          		    node.removeMixin(JcrConstants.MIX_LOCKABLE);
					revision = pageManager.createRevision(currentPage, "PepperFlow API Version", documentId);
          		    session.save();
        		}else{
					revision = pageManager.createRevision(currentPage, "PepperFlow API Version", documentId);
          		    session.save();
				}
        		log.debug(" Revision Created {}" , revision);
        		log.debug(" Page uncloked {}" , revision);
        	}
        	catch( RepositoryException | WCMException |  LoginException e )
        	{
        		log.error(" Exception while searching page {} " , e.getMessage());
        
        	}
        	finally
        	{
        		// close session and resource resolver if any 
        		if (resourceResolver != null) {
        			resourceResolver.close();
        		    }
        	}
        	
        }
        
        /**
         * 
         * @param domainname
         * @return
         */
        private String sendNotification() {
        	  try {
        		
          		String domainName = domainConfig.getHostName();
        		
        		String apiKey = keyConfig.getApiKey();
        		String originSecret = keyConfig.getESLOriginSecretKey();
        		String currDate = java.time.LocalDate.now().toString();
        		String currTime = java.time.LocalTime.now().toString();
        		
        		log.debug(" domainName retrieved ======>  {}" , domainName);
        		log.debug(" accessKey retrieved ======>  {}" , apiKey);
        		log.debug(" originSecret retrieved ======>  {}" , originSecret);
        		log.debug(" currDate retrieved ======>  {}" , currDate);
        		log.debug(" currTime retrieved ======>  {}" , currTime);

        		String serviceURL = "/api/system/notification/notification";
        		String requestBody = "{\"notificationChannelList\": [ { \"channelType\": \"EMAIL\", \"channelKey\": "
        				+ "\"dgpepperflowcoredxprocessor@abbott.com\" } ], \"payLoad\": { \"requestMap\": "
        				+ "{ \"requestType\": \"workflow-error-notification\", \"dynamicDateHere\": "
        				+ "\""
        				+ currDate
        				+ "\", \"dynamicTimeHere\":"
        				+ " \""
        				+ currTime
        				+ "\", \"messageHere\": \"AEM Sling Job Failue \" } } "
        				+ ",\"applicationId\": \"pulse\","
        				+ "\"countryCode\": \"US\"}";
        		
        		log.debug(" < ===== requestBody  ====> {}" , requestBody);
        		
        		JsonObject jsonObject = new JsonParser().parse(requestBody).getAsJsonObject();
        		
        		StringBuilder entity = new StringBuilder();
        		String result = "";
                entity.append(jsonObject.toString());
                        	    
        	    HttpPost post = new HttpPost( domainName + serviceURL );

        	    log.debug(" full URL  ======>  {} and {} " , domainName , serviceURL);
        	  
        	    post.addHeader(X_APPLICATION_ID, "pulse");
        	    post.addHeader(X_PREFERRED_LANGUAGE, "en_us");
        	    post.addHeader(X_COUNTRY_CODE, "US");
        	    post.addHeader(X_APPLICATION_ACCESS_KEY, apiKey);
        	    post.addHeader(X_ORIGIN_SECRET, originSecret);
        	    post.addHeader(CONTENT_TYPE, "application/json");
        	    
        	    post.setEntity(new StringEntity(entity.toString()));
        	    
        	    log.debug("URL : {}" , post.getURI());
        	    
               try (CloseableHttpClient httpClient = HttpClients.createDefault();
                        CloseableHttpResponse response = httpClient.execute(post)) {

                	   if (response.getStatusLine().getStatusCode() != 200) {
                 	      log.debug("response code {} ", response.getStatusLine().getStatusCode());
                 	    }
                       result = EntityUtils.toString(response.getEntity());
                   }
        	    
        	    log.debug("JSON Response : {}", result);
        	    return result;
        	  } catch (IllegalStateException |  IOException e) {
        	    log.error("Error in sendNotification ", e);
        	  }
        	  return "";
        	}
}