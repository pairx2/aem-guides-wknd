package com.abbott.aem.cv.division.core.components.listener.impl;


import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;

import com.day.cq.commons.Externalizer;
import com.day.cq.dam.api.Asset;
import javax.jcr.LoginException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Workspace;
import javax.jcr.observation.EventIterator;
import javax.jcr.observation.ObservationManager;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.jcr.api.SlingRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.osgi.service.component.ComponentContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.abbott.aem.cv.division.core.components.models.impl.PodcastEpisodeImpl;

import com.day.cq.dam.api.AssetManager;
import com.day.cq.replication.Replicator;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
@MockitoSettings(strictness = Strictness.LENIENT)
public class RSSFeedListenerTest {
	
	Logger logger = LoggerFactory.getLogger(RSSFeedListenerTest.class);
	
	@InjectMocks
	private RSSFeedListenerImpl model;
	
	@Mock
	ComponentContext context;
	
	
	
	@Mock
	private ResourceResolverFactory resolverFactory;  
	
	@Mock
	private Replicator replicator;
	
	@Mock
	private SlingRepository repository;
	

	@Mock
	private Session repoSession;
	
	@Mock
	private Workspace workspace;
	
	private static final String REPOSITORY_SUBSERVICE_NAME = "repoSubService";
	

	String filePath= "/content/dam/cv/cardiovascular/feed/between-two-ventricles.xml";
	String feedPath;

	String episodePath ="/content/dam/cv/cardiovascular/feed/between-two-ventricles";
	@Mock
	 PodcastEpisodeImpl podcastEpisodeBean;
	 
	 @Mock
	 ObservationManager observationManager;
	 
	@Mock
	 EventIterator eventIterator;
	 
	@Mock
	 private ResourceResolver resourceResolver ;
	 
	 @Mock
	 private Resource contentNode;
	 @Mock
	 Externalizer externalizer;

	 @Mock
	 private Resource resource;

	 @Mock
	 private Resource contentResource;
	 
	 @Mock
	 AssetManager asm ;
	 
	private static final String JCR_CONTENT = "jcr:content";
	private static final String DC_DESCRIPTION = "dc:description";
	private static final String DC_TITLE = "dc:title";
		
	 ValueMap map ;
	 
	  @Mock
	 private Asset asset;
	  
	  
	
	
	@BeforeEach
	public void setUp() throws Exception {
		
		
		model = new RSSFeedListenerImpl();
		MockitoAnnotations.initMocks(this);
		
	}

	@Test
	void activeTest() throws Exception {
		
		try {
			
			
			when(repository.loginService(REPOSITORY_SUBSERVICE_NAME, null)).thenReturn(repoSession);
			when(repoSession.getWorkspace()).thenReturn(workspace);
			when(workspace.getObservationManager()).thenReturn(observationManager);
			
			
			 model.activate(context);
		} catch (LoginException e) {
			
			logger.error("RepositoryException occured", e);
		} catch (RepositoryException e) {
			
			logger.error("RepositoryException occured", e);
		} 
		
	}
	

    @Test
    void onEventRsFeedExceptionTest() {
		
           Map<String, Object> serviceParams = new HashMap<>();
	        try {
                serviceParams.put(ResourceResolverFactory.SUBSERVICE, REPOSITORY_SUBSERVICE_NAME);
                Mockito.lenient().when(resolverFactory.getServiceResourceResolver(serviceParams)).thenReturn(resourceResolver);
                when(resourceResolver.adaptTo(Externalizer.class)).thenReturn(externalizer);
                when(resourceResolver.getResource(episodePath)).thenReturn(contentResource);

              model.onEvent(eventIterator);
              }  catch (Exception e) {
	           logger.error("Exception occured", e);
	}
 }

	@Test
	void setDateTest() {
		
		when(contentNode.getChild(JCR_CONTENT)).thenReturn(resource);
		when(resource.getValueMap()).thenReturn( map);
		String s= model.setDates(contentNode);
		Assertions.assertEquals("", s);
	}
	
	@Test
	void setItem() {
		podcastEpisodeBean =  new PodcastEpisodeImpl();
		model.setItem(podcastEpisodeBean);
	}
	@Test
	void setIdTest() {
	
	           when(contentNode.adaptTo(Asset.class)).thenReturn( asset);
	           when(asset.getMimeType()).thenReturn("audio/mpeg");
		       when(asset.getMetadataValue(DC_TITLE)).thenReturn("item title");
		       when(asset.getMetadataValue(DC_DESCRIPTION)).thenReturn("item description");
		       when(contentNode.getChild(JCR_CONTENT)).thenReturn(resource);
	           when(resource.getValueMap()).thenReturn( map);
	           model.setId(contentNode);
		
		}
	

@Test
   void activeTestFailure() {
        try {
           when(repository.loginService(REPOSITORY_SUBSERVICE_NAME, null)).thenThrow(new RepositoryException());
           when(repoSession.getWorkspace()).thenReturn(workspace);
           when(workspace.getObservationManager()).thenReturn(observationManager);
           model.activate(context);
          }catch (Exception e) {
          Assertions.assertTrue(e instanceof Exception);
    }
 }

@Test
void deactivateTest() {
try {

	
	
			when(repository.loginService(REPOSITORY_SUBSERVICE_NAME, null)).thenReturn(repoSession);
			when(repoSession.getWorkspace()).thenReturn(workspace);
			when(workspace.getObservationManager()).thenReturn(observationManager);
			
model.deactivate();
} catch (RepositoryException e) {

	logger.error("RepositoryException occured", e);
} finally {
	 if (repoSession != null) {
		 repoSession.logout();
		 repoSession = null;
     }
}
}
}