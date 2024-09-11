package com.abbott.aem.cv.division.core.components.listener.impl;

import com.abbott.aem.cv.division.core.components.writer.impl.PodcastRSSFeedWriterImpl;
import com.abbott.aem.cv.division.core.components.models.impl.PodcastImpl;
import com.abbott.aem.cv.division.core.components.models.impl.PodcastEpisodeImpl;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.GregorianCalendar;
import java.util.TimeZone;
import javax.jcr.Binary;
import javax.jcr.ValueFactory;
import org.apache.commons.text.StringEscapeUtils;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.observation.Event;
import javax.jcr.observation.EventIterator;
import javax.jcr.observation.EventListener;
import javax.jcr.observation.ObservationManager;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.jcr.api.SlingRepository;

import javax.xml.stream.XMLStreamException;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.AssetManager;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.abbott.aem.cv.division.core.components.listener.RSSFeedListener;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.commons.Externalizer;



@Component(immediate=true,
service= EventListener.class)
public class RSSFeedListenerImpl implements EventListener, RSSFeedListener{

	private static final Logger logger = LoggerFactory.getLogger(RSSFeedListenerImpl.class);

	private static final String REPOSITORY_SUBSERVICE_NAME = "repoSubService";

	@Reference
	private ResourceResolverFactory resolverFactory;
	
	@SuppressWarnings("AEM Rules:AEM-3")
	
	private Session repoSession;
	
	private ObservationManager observationManager;

	@Reference
	private SlingRepository repository;

	@Reference
	private Replicator replicator;
   
	private static final String CONTENT = "/content";
	private static final String DAM = "/dam";
	private static final String CARDIOVASCULAR ="/cardiovascular";
	private static final String CV ="/cv";
	private static final String FEED = "/feed";
	private String rootPath = CONTENT.concat((DAM).concat((CV).concat((CARDIOVASCULAR).concat((FEED)))));
	
	private String episodePath = rootPath + "/between-two-ventricles";

	private PodcastImpl podcastBean;
	
	private String itemDesc="";
	private String itemTitle="";
	private String itemPubDate="";
	private String publishUrl="";
	private String itemKeyword="";
	String url="";
	private static final String EXTERNAL_DOMAIN="cv_cardiovascular_abbott";


	@Activate
	public void activate(ComponentContext context) {
     
		try {
			
			repoSession = repository.loginService(REPOSITORY_SUBSERVICE_NAME, null);
			observationManager = repoSession.getWorkspace().getObservationManager();
			observationManager.addEventListener (
					this, //handler
					Event.NODE_REMOVED | Event.NODE_ADDED | Event.NODE_MOVED | Event.PROPERTY_ADDED | Event.PROPERTY_CHANGED | Event.PROPERTY_REMOVED,
					episodePath,
					true,
					null,
					null,
					true);
			
		} catch (RepositoryException e){
			logger.error("Unable to register session for RSS Feed Listener", e);
			
		} 
		}

	
	@Deactivate
	protected void deactivate(){
	    try {
	        if (observationManager != null) {
	            observationManager.removeEventListener(this);
	        }
	    } catch (RepositoryException e) {
	        logger.error("Error deactivating JCR event listener", e);
	    } finally {
	        if (repoSession != null) {
	        	repoSession.logout();
	        	repoSession = null;
	        }
	    }
	 }
	public void setItem(PodcastEpisodeImpl podcastEpisodeBean) {
	
		podcastEpisodeBean.setTitle(itemTitle);
		
		podcastEpisodeBean.setDescription(itemDesc);
		
		podcastEpisodeBean.setPubDate(itemPubDate);

		podcastEpisodeBean.setDuration(itemDesc);

		podcastEpisodeBean.setKeywords(itemKeyword);

		podcastEpisodeBean.setUrl(publishUrl);

		podcastEpisodeBean.setGuid(publishUrl);
		

	}

	public String setDates(Resource contentNode){

		SimpleDateFormat sdf = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z");
		sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
		
		if(contentNode != null) {
			ValueMap jcrValues = contentNode.getChild(JcrConstants.JCR_CONTENT).getValueMap();
			if(jcrValues != null ) {
		
				for(Map.Entry<String, Object> jcrValue : jcrValues.entrySet()){
		
					if(jcrValue.getKey().equals(NameConstants.PN_ON_TIME) && jcrValue.getValue()!=null){

						GregorianCalendar dt = (GregorianCalendar) jcrValue.getValue();
		

						return sdf.format(dt.getTime());

					}
				}
			}
		}
		return "";
	}


	public void setId(Resource contentNode) {

		Asset damAsset = contentNode.adaptTo(Asset.class);

		if(damAsset.getMimeType().equals("audio/mpeg")){

			itemTitle = damAsset.getMetadataValue(DamConstants.DC_TITLE);

			itemDesc = damAsset.getMetadataValue(DamConstants.DC_DESCRIPTION);
			if(itemDesc!=null && !itemDesc.equals("")) {
				itemDesc = StringEscapeUtils.escapeJava(itemDesc);
				
		
				itemPubDate = setDates(contentNode);
			}
			}
		



		itemKeyword = damAsset.getMetadataValue("xmpRights:UsageTerms");
		url = damAsset.getPath();

	}

	@Override
	public void onEvent(EventIterator eventIterator) {

		String filePath = rootPath + "/between-two-ventricles.xml";
		String feedPath;
		

		try{
			 PodcastRSSFeedWriterImpl feedWriter;
			 PodcastEpisodeImpl podcastEpisodeBean;
			 
			ByteArrayOutputStream baos = new ByteArrayOutputStream();

			Map<String, Object> serviceParams = new HashMap<>();

			serviceParams.put(ResourceResolverFactory.SUBSERVICE, REPOSITORY_SUBSERVICE_NAME);

			ResourceResolver resourceResolver = resolverFactory.getServiceResourceResolver(serviceParams);
			
			AssetManager asm = resourceResolver.adaptTo(AssetManager.class);
			Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);

		    feedPath = externalizer.externalLink(resourceResolver, EXTERNAL_DOMAIN, filePath);

			Resource contentResource = resourceResolver.getResource(episodePath);

			if(contentResource.hasChildren()){
				Iterator<Resource> contentNodes = contentResource.listChildren();
				podcastBean = new PodcastImpl(); 
				List <PodcastEpisodeImpl> entries= new ArrayList<>(); 
				while(contentNodes.hasNext()){
					Resource contentNode = contentNodes.next();
					podcastEpisodeBean = new PodcastEpisodeImpl();
					if(contentNode.isResourceType(DamConstants.NT_DAM_ASSET)){

						setId(contentNode);	

						publishUrl = externalizer.externalLink(resourceResolver, EXTERNAL_DOMAIN, url);
						 if (publishUrl.startsWith(CONTENT))  {
	        	            publishUrl="https://www.cardiovascular.abbott"+url;
	        	 
	                       }

						setItem(podcastEpisodeBean);
						entries.add(podcastEpisodeBean);


					}
				}

				podcastBean.setEntries(entries);

			}
			feedWriter = new PodcastRSSFeedWriterImpl(podcastBean,baos,feedPath);			
			feedWriter.write();

			InputStream is = new ByteArrayInputStream(baos.toByteArray());
			final ValueFactory valueFactory = repoSession.getValueFactory();
			final Binary binary = valueFactory.createBinary(is);
			
			
			asm.createOrReplaceAsset(filePath, binary, "text/xml", true);
			
			replicator.replicate(resourceResolver.adaptTo(Session.class), ReplicationActionType.ACTIVATE, filePath);

		} catch (LoginException |ReplicationException e) {
			logger.error("LoginException in RSSFeedListener : ", e);
		} catch (DateTimeException | XMLStreamException e) {
			logger.error("DateTimeException and XMLStreamException in RSSFeedListener : ", e);
		} catch (RepositoryException e) {
			logger.error("RepositoryException in RSSFeedListener : ", e);
		} 
		}

	 
	}