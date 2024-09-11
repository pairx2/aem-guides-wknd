package com.abbott.aem.corp.division.core.Listeners;

import com.abbott.aem.corp.division.core.listeners.ArticlePageEventHandler;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import java.util.HashMap;
import java.util.Map;

import javax.script.Bindings;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class})
public class ArticlePageEventHandlerTest {
    private AemContext ctx = new AemContext();
    private static final String ACTION_PATH = "/content/corp/abbott/in/en/corpnewsroom/products-and-innovation/article-test-page";
    private static final String JCR_PATH = "/jcr:content";
    private static final String ROOT = "/root";
    private static final String TEXT = "text";
    private static final String ARTICLECONTAINER = "/rarticle_container";
    private static final String TEXT_TITLE = "/text_title";
    private static final String TEXT_DESCRIPTION = "/text_description";
    private static final String IMAGE = "/image";
    private static final String EXECUTIVE_TEAM = "/us/en/corpnewsroom/utilities/executive-team";
    private static final String OUR_EXPERTS = "/us/en/corpnewsroom/utilities/our-experts";
    private static final String TEXT_RESOURCETYPE = "corp/globals/components/content/text";
    private static final String VIDEOPATH = "/video";
    private static final String IMAGE_RESOURCETYPE = "corp/globals/components/content/image";
    private static final String ARTICLEDATE = "articledate";
    private static final String AUTHOREDDATE = "authoredDate";
    private static final String ARTICLECOLOR = "articlecolor";
    private static final String COLOR = "blue";
    private static final String PROFILE_PATH = "/conf/corp/corporate/settings/wcm/templates/corp-profile-page";
    
    private ArticlePageEventHandler articlePageEventHandler = new ArticlePageEventHandler();

    @Mock
    Event event;
    @Mock
    Resource pageResource;
    @Reference
    ResourceResolverFactory resourceResolverFactory;
    @Mock
    ResourceResolver resourceResolver;
    @Mock
    PageManager pageManager;
    @Mock
    Page page;

    @BeforeEach
    public void setup() throws Exception {
    	ctx.create().page("/content/corp/abbott/latam/es/media-center");
        resourceResolverFactory = mock(ResourceResolverFactory.class);
        articlePageEventHandler.setResourceResolverFactory(resourceResolverFactory);
        Map<String, Object> param = new HashMap<String, Object>();
        param.put(ResourceResolverFactory.SUBSERVICE, "gm-system-user");
        resourceResolver = mock(ResourceResolver.class);
        when(resourceResolverFactory.getServiceResourceResolver(param)).thenReturn(resourceResolver);
        event = mock(Event.class);
        pageResource = mock(Resource.class);
        pageManager = mock(PageManager.class);
        page = mock(Page.class);
    }


    @Test
    public void canHandleEvent() {
    	Resource jcrResource = mock(Resource.class);
        ReplicationAction replicationAction = mock(ReplicationAction.class);
        MockedStatic<ReplicationAction> mocked = Mockito.mockStatic(ReplicationAction.class);
        mocked.when(() -> ReplicationAction.fromEvent(event)).thenReturn(replicationAction);
        when(replicationAction.getType()).thenReturn(ReplicationActionType.ACTIVATE);
        when(replicationAction.getPath()).thenReturn(ACTION_PATH);
        page = ctx.create().page("/content/corp/abbott/latam/es/media-center/press-releases");
		ctx.create().page("/content/corp/abbott/latam/es/media-center/press-releases/pre-release-1");
		ctx.create().page("/content/corp/abbott/latam/es/media-center/press-releases/pre-release-2");
	    Bindings bindings = Mockito.mock(Bindings.class);
	    PageManager pageManager = Mockito.mock(PageManager.class);
	    Mockito.lenient().when(bindings.get("pageManager")).thenReturn(pageManager);
        when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
        when(pageManager.getContainingPage(Mockito.anyString())).thenReturn(page);
        when(resourceResolver.getResource("/content/corp/abbott/latam/es/media-center/press-releases/jcr:content")).thenReturn(jcrResource);
        ValueMap jcrMap = mock(ValueMap.class);
        when(jcrResource.getValueMap()).thenReturn(jcrMap);
        when(jcrMap.get(NameConstants.NN_TEMPLATE, StringUtils.EMPTY)).thenReturn(PROFILE_PATH);
        when(resourceResolver.isLive()).thenReturn(true);
        articlePageEventHandler.handleEvent(event);
        Assert.assertEquals(ReplicationActionType.ACTIVATE, replicationAction.getType());
        
    }

    @Test
    public void canGetArticleContainer() {
        Resource pageRoot = mock(Resource.class);
        Resource titleResource = mock(Resource.class);
        Resource descriptionRes = mock(Resource.class);
        Resource imageResource = mock(Resource.class);
        Resource VideoResource = mock(Resource.class);
        when(resourceResolver.getResource(ACTION_PATH + JCR_PATH + ROOT)).thenReturn(pageRoot);
        when(resourceResolver.getResource(ACTION_PATH + JCR_PATH + ROOT + ARTICLECONTAINER + TEXT_TITLE)).thenReturn(titleResource);
        when(resourceResolver.getResource(ACTION_PATH + JCR_PATH + ROOT + ARTICLECONTAINER + TEXT_DESCRIPTION)).thenReturn(descriptionRes);
        when(resourceResolver.getResource(ACTION_PATH + JCR_PATH + ROOT + ARTICLECONTAINER + IMAGE)).thenReturn(imageResource);       
        when(resourceResolver.getResource(ACTION_PATH + JCR_PATH + ROOT + ARTICLECONTAINER + VIDEOPATH)).thenReturn(VideoResource);
        when(descriptionRes.getResourceType()).thenReturn(TEXT_RESOURCETYPE);
        ValueMap articleMap = mock(ValueMap.class);
        when(descriptionRes.getValueMap()).thenReturn(articleMap);
        when(articleMap.get(TEXT)).thenReturn(true);
        ModifiableValueMap setTitle = mock(ModifiableValueMap.class);
        when(pageResource.adaptTo(ModifiableValueMap.class)).thenReturn(setTitle);
        when(titleResource.getResourceType()).thenReturn(TEXT_RESOURCETYPE);
        ValueMap articleMap1 = mock(ValueMap.class);
        when(titleResource.getValueMap()).thenReturn(articleMap1);
        when(articleMap1.get(TEXT)).thenReturn(true);
        ModifiableValueMap setTitle1 = mock(ModifiableValueMap.class);
        when(pageResource.adaptTo(ModifiableValueMap.class)).thenReturn(setTitle1);
        when(imageResource.getResourceType()).thenReturn(IMAGE_RESOURCETYPE);
        ValueMap articleMap2 = mock(ValueMap.class);
        when(imageResource.getValueMap()).thenReturn(articleMap2);
        when(articleMap2.get("thumbnailImage")).thenReturn(true);
        ModifiableValueMap setTitle2 = mock(ModifiableValueMap.class);
        when(pageResource.adaptTo(ModifiableValueMap.class)).thenReturn(setTitle2);
        articlePageEventHandler.getArticleContainer(ACTION_PATH + JCR_PATH, pageResource, resourceResolver);
        Assert.assertEquals(TEXT_RESOURCETYPE, titleResource.getResourceType());
        Assert.assertEquals(IMAGE_RESOURCETYPE, imageResource.getResourceType());
        Assert.assertFalse(resourceResolver.isLive());
    }

    @Test
    public void canSetExpertInfo() {
        Resource expertResource = mock(Resource.class);
        when(resourceResolver.getResource(OUR_EXPERTS)).thenReturn(expertResource);
        ValueMap articleMap = mock(ValueMap.class);
        when(expertResource.getValueMap()).thenReturn(articleMap);
        when(articleMap.get(AUTHOREDDATE)).thenReturn(true);
        ModifiableValueMap setTitle = mock(ModifiableValueMap.class);
        when(pageResource.adaptTo(ModifiableValueMap.class)).thenReturn(setTitle);
        articlePageEventHandler.setExpertInfo(resourceResolver, pageResource, OUR_EXPERTS, ARTICLEDATE, AUTHOREDDATE);
        articlePageEventHandler.getExpertPageInformation(pageResource, resourceResolver, OUR_EXPERTS);
        articlePageEventHandler.getExecutivePageInformation(pageResource, resourceResolver, EXECUTIVE_TEAM);
        Assert.assertEquals(expertResource, resourceResolver.getResource(OUR_EXPERTS));
        Assert.assertFalse(resourceResolver.isLive());
    }
    
    @Test
    public void GetsetParentPageProperties()  {
    	 ModifiableValueMap valueMap = mock(ModifiableValueMap.class);
         when(pageResource.adaptTo(ModifiableValueMap.class)).thenReturn(valueMap);      
         articlePageEventHandler.setParentPageProperties(pageResource, resourceResolver);
         Assert.assertFalse(valueMap.isEmpty());
         Assert.assertFalse(resourceResolver.isLive());
    	
    	
    }
    
    @Test
    public void GetHeadingColor()  {
    	 ValueMap pageProperties = mock(ValueMap.class);
    	 Page categoryPage = mock(Page.class);
         when(page.getParent()).thenReturn(categoryPage);
         when(categoryPage.getProperties()).thenReturn(pageProperties);
         when(pageProperties.containsKey(ARTICLECOLOR)).thenReturn(true);
         when(pageProperties.get(ARTICLECOLOR)).thenReturn(COLOR);  
         when(articlePageEventHandler.getHeadingColor(page)).thenReturn(COLOR);
         Assert.assertNotNull(articlePageEventHandler.getHeadingColor(page));
    }
    
    @Test
    public void GetFormattedDate()  {
    	 Assert.assertNotNull(articlePageEventHandler.getFormattedDate("2022-06-06"));
    	 Assert.assertNotNull(articlePageEventHandler.getFormattedDate("2022-05-05"));
    	 Assert.assertNotNull(articlePageEventHandler.getFormattedDate("2022-07-07"));
    }
    
    @Test
    public void canSetArticleDate() {
        Resource resource = mock(Resource.class);
        when(resourceResolver.getResource(ACTION_PATH)).thenReturn(resource);
        ValueMap articleMap = mock(ValueMap.class);
        when(resource.getValueMap()).thenReturn(articleMap);
        when(articleMap.get(AUTHOREDDATE)).thenReturn(true);
        ModifiableValueMap setTitle = mock(ModifiableValueMap.class);
        when(pageResource.adaptTo(ModifiableValueMap.class)).thenReturn(setTitle);
        articlePageEventHandler.setArticleDate(resourceResolver, pageResource, ACTION_PATH, ARTICLEDATE, AUTHOREDDATE);
        Assert.assertFalse(resourceResolver.isLive());
    }
    
    @Test
    public void testLoginException() throws LoginException {
        resourceResolverFactory = mock(ResourceResolverFactory.class);
        articlePageEventHandler.setResourceResolverFactory(resourceResolverFactory);
        Map<String, Object> param = new HashMap<String, Object>();
        param.put(ResourceResolverFactory.SUBSERVICE, "gm-system-user");
        resourceResolver = mock(ResourceResolver.class);
        when(resourceResolverFactory.getServiceResourceResolver(param)).thenThrow(LoginException.class);
    }
    
    
}