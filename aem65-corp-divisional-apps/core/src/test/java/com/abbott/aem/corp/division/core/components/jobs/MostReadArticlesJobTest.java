package com.abbott.aem.corp.division.core.components.jobs;

import com.abbott.aem.corp.division.core.components.services.MostReadArticlesJobConsumerConfiguration;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.day.cq.replication.Replicator;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.sling.api.resource.*;
import org.apache.sling.event.jobs.Job;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.osgi.service.component.annotations.Reference;

import javax.jcr.Session;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;

import static com.adobe.fontengine.inlineformatting.ElementAttribute.locale;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class MostReadArticlesJobTest {

    @Mock
    Job job;

    MostReadArticlesJob jobImpl = new MostReadArticlesJob();

    @Mock
    Resource resource;

    @Mock
    ResourceResolverFactory resolverFactory;

    @Mock
    Iterator<Resource> countriesList;

    @Mock
    Resource countryResource;

    @Mock
    Resource childResource;

    @Mock
    Iterator<Resource> countryNode;

    @Mock
    APILookupService apiLookupService;

    HttpPost post;

    @Mock
    Session session;

    @Mock
    ModifiableValueMap modifiableValueMap;

    @Mock
    Replicator replicator;

    @Mock
    Page page;

    @Mock
    Page articlePage;

    @Mock
    Page articleParentPage;

    @Mock
    ValueMap pageProperties;

    @Mock
    PageManager pageManager;

    @Mock
    Resource pageResource;

    @Mock
    ValueMap valueMap;

    @Reference
    ResourceResolverFactory resourceResolverFactory;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    MostReadArticlesJobConsumerConfiguration config;

    @Mock
    CloseableHttpClient httpClient;

    @Mock
    CloseableHttpResponse postResponse;

    AemContext ctx = new AemContext();

    @BeforeEach
    public void setup() throws Exception {
        pageManager = mock(PageManager.class);
        page = mock(Page.class);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(ResourceResolverFactory.SUBSERVICE, "gm-system-user");
        jobImpl.resolverFactory = resolverFactory;
        jobImpl.replicator = replicator;
        apiLookupService = Mockito.mock(APILookupService.class);
        jobImpl.apiLookupService = apiLookupService;
        Mockito.lenient().when(apiLookupService.getRequestEndpoint("")).thenReturn("domainName");
        Mockito.lenient().when(apiLookupService.getSecretKey()).thenReturn("secretKey");
        replicator = mock(Replicator.class);
        httpClient = mock(CloseableHttpClient.class);
        postResponse = mock(CloseableHttpResponse.class);
        post = new HttpPost("https://dev2.services.abbott");
        Mockito.lenient().when(resolverFactory.getServiceResourceResolver(parameters)).thenReturn(resourceResolver);
        Mockito.lenient().when(resourceResolver.getResource("/content/corp/abbott")).thenReturn(resource);
        Mockito.lenient().when(countryResource.listChildren()).thenReturn(countryNode);
        Mockito.lenient().when(countryNode.hasNext()).thenReturn(true);
        Mockito.lenient().when(countryNode.next()).thenReturn(childResource);
        Mockito.lenient().when(childResource.getPath()).thenReturn("/content/corp/abbott/in/en");
        Mockito.lenient().when(apiLookupService.getRequestEndpoint("")).thenReturn("https://services.com");
    }

    @Test
    void testProcess() {
        Mockito.lenient().when(resourceResolver.getResource("/content/corp/abbott")).
                thenReturn(pageResource);
        Mockito.lenient().when(pageResource.listChildren()).thenReturn(countriesList);
        jobImpl.process(job);
    }

    @Test
    void testProcessError() throws LoginException {
        Mockito.lenient().when(jobImpl.getResourceResolver()).
                thenThrow(LoginException.class);
        jobImpl.process(job);
    }

    @Test
    void testGetTopic() {
        assertEquals("corp/content/mostreadarticles", jobImpl.getTopic());
    }

    @Test
    void testGetResourceResolver() throws LoginException {
        assertNotNull(jobImpl.getResourceResolver());
    }

    @Test
    void testGetDate() {
        assertNotNull(jobImpl.getDate());
    }

    @Test
    void testUpdateCntTrendingContentFragment() {
        String imagePath = "image";
        String subHeading = "subHeading";
        String parentPageTitle = "parentPageTitle";
        String detailDescription = "detailDescription";
        String cntPath = "/content/corp/abbott/us/en/cntrending";
        String articlePagePath = "articlePagePath";
        String articleDate = "articleDate";
        Mockito.lenient().when(resourceResolver.getResource(cntPath)).
                thenReturn(resource);
        Mockito.lenient().when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(modifiableValueMap);
        jobImpl.updatecntTrendingContentFragment(cntPath, imagePath, articleDate, subHeading, detailDescription, articlePagePath, parentPageTitle, resourceResolver, session);

    }

    @Test
    void testUpdateCntTrendingPath() {
        String[] pageURL = "/content/corp/abbott/us/en/cntrending/page".split("//", 2);
        String[] articlePagePath = "/content/corp/abbott/us/en/cntrending/article".split("//", 2);
        String[] cntRendingPath = "/content/corp/abbott/us/en/cntrending/cf".split("//", 2);
        jobImpl.updatecntTrendingPath(cntRendingPath, pageURL, articlePagePath, resourceResolver, session);
    }

    @Test
    void testGetArticlePageData() {
        String pageURL = page.getPath() + "/jcr:content";
        String[] articlePagePath = "/content/corp/abbott/us/en/cntrending/article".split("//", 2);
        String[] cntRendingPath = "/content/corp/abbott/us/en/cntrending/cf".split("//", 2);
        int cntNodeCount = 0;

        Mockito.lenient().when(resourceResolver.getResource(pageURL)).thenReturn(pageResource);
        Mockito.lenient().when(pageResource.getValueMap()).thenReturn(valueMap);
        Mockito.lenient().when(valueMap.get("articleimage", "")).thenReturn("articleimage");
        Mockito.lenient().when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
        Mockito.lenient().when(pageManager.getContainingPage(pageURL)).thenReturn(articlePage);
        Mockito.lenient().when(articlePage.getParent()).thenReturn(articleParentPage);
        Mockito.lenient().when(articleParentPage.getProperties()).thenReturn(pageProperties);
        Mockito.lenient().when(resourceResolver.getResource(Mockito.anyString())).thenReturn(resource);
        Mockito.lenient().when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(modifiableValueMap);
        jobImpl.getArticlePageData(pageResource, cntRendingPath, cntNodeCount, articlePagePath, pageURL, resourceResolver, session);

    }


    @Test
    void testFetchResponseFromESLService() throws IOException {
        Mockito.lenient().when(httpClient.execute(any(HttpPost.class))).thenReturn(postResponse);
        jobImpl.fetchResponseFromESLService(post, resourceResolver, session);
    }

    @Test
    void testGetCountryResource() {
        countriesList = Mockito.mock(Iterator.class);
        Resource countryResource = ctx.create().resource("/content/countries/country1");
        Resource childResource1 = ctx.create().resource(countryResource, "child1");
        when(countriesList.next()).thenReturn(countryResource, null);
        when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
        jobImpl.getCountryResource(countriesList, resourceResolver, session);
    }

    @Test
    void testGetArticleList() {
        JsonObject responseObject = new JsonObject();
        JsonArray responseArray = new JsonArray();
        JsonObject obj1 = new JsonObject();
        obj1.addProperty("pageUrl", "/content/corp/abbott/es/es/cntrending/corpnewsroom/my-article/article");
        responseArray.add(obj1);
        responseObject.add("response", responseArray);
        jobImpl.getArticleList(responseObject, resourceResolver, session);
    }

    @Test
    void testConfigure() {
        Mockito.lenient().when(config.serviceUrl()).thenReturn("/content/corp/abbott/service/url");
        assertEquals("/content/corp/abbott/service/url", config.serviceUrl());
        jobImpl.configure(config);
    }

    @Test
    void testGetInheritanceValueMap() {
        jobImpl.getInheritanceValueMap(pageResource);
    }

    @Test
    void fetchTopFiveArticles() {
        Page mockPage = mock(Page.class);
        Locale locale = new Locale("en", "AR");
        String path = "/content/countries/country1/child1/corpnewsroom";
        jobImpl.serviceUrl ="/content/corp/abbott/service/url";
        //Mockito.lenient().when(config.serviceUrl()).thenReturn("/content/corp/abbott/service/url");
        Mockito.lenient().when(resourceResolver.adaptTo(PageManager.class)).thenReturn(pageManager);
        Mockito.lenient().when(pageManager.getPage(any())).thenReturn(mockPage);
        when(mockPage.getLanguage()).thenReturn(locale);
        jobImpl.fetchTopFiveArticles(path,resourceResolver,session);
    }
}
