package com.abbott.aem.ardx.division.core.servlet;

import io.wcm.testing.mock.aem.junit5.AemContext;
import lombok.NonNull;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFormatException;
import javax.servlet.ServletException;

import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class ArdxDocumentReportServletTest {

    private static final String DAMPATH = "/content/dam/ardx/eifu";
    private static final String TAGPATH = "ardx:eifu";
    private static final String RESOURCE_PATH = "/test";
    public static final String SLASH = "/";
    private static final String DEFAULT = "default";
    
    public AemContext context = new AemContext(ResourceResolverType.RESOURCERESOLVER_MOCK);
    private static final Logger logger = LoggerFactory.getLogger(ArdxDocumentReportServletTest.class);
    @InjectMocks
    ArdxDocumentReportServlet servlet;

    @NonNull
    @Mock
    SlingHttpServletRequest request;

    @NonNull
    @Mock
    SlingHttpServletResponse response;

    @Mock
    Session session;

    @Mock
    Resource resource;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    QueryBuilder queryBuilder;
    
    @Mock
    TagManager tagManager;

    @Mock
    Query query;
    
    @Mock
    SearchResult result;
    
    @Mock
    List<Hit> hits;
    
    @Mock
	Hit hit;
    
    @Mock
    SimpleDateFormat dateFormat;
    Map<String, String> map = new HashMap<String, String>();
    @BeforeEach
    public void setUp() {
        response = context.response();
		map.put("path", "/content/dam/ardx/eifu");
		map.put("type", DamConstants.NT_DAM_ASSET );
		map.put("property", "@jcr:content/metadata/dc:format");
		map.put("property.value", "application/pdf");
		map.put("mainasset", "true");
		map.put("orderby", "@jcr:content/metadata/onTime");
		map.put("orderby.sort", "desc");
		map.put("p.limit", "-1");
        
        when(request.getResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(resourceResolver.adaptTo(QueryBuilder.class)).thenReturn(queryBuilder);
        Mockito.lenient().when(queryBuilder.createQuery(PredicateGroup.create(map), session)).thenReturn(query);
        when(query.getResult()).thenReturn(result);

    }

    @Test
    void testDoGet() throws ServletException, IOException, RepositoryException, ParseException {
   
    	Hit mockHit = mock(Hit.class);
    	List<Hit> hits = Arrays.asList(mockHit,mockHit);
    	when(result.getHits()).thenReturn(hits);
    	Resource assetResource = mock(Resource.class);
    	when(mockHit.getResource()).thenReturn(assetResource);
    	String assetPath= "/content/dam/ardx/eifu/test.pdf";
    	String hiddenPath =SLASH.concat("content/ardx/eifu/report/jcr:content/root/hidden");
    	Mockito.lenient().when(resourceResolver.getResource(hiddenPath)).thenReturn(assetResource);
    	when(assetResource.getPath()).thenReturn(assetPath);
    	Node jcrNode = mock(Node.class);
    	Node metaNode = mock(Node.class);
    	Resource jcrNodeRes = mock(Resource.class);
    	Resource metaNodeRes = mock(Resource.class);
    	Mockito.lenient().when(resourceResolver.getResource(assetPath .concat(SLASH).concat(JcrConstants.JCR_CONTENT))).thenReturn(jcrNodeRes);
    	when(jcrNodeRes.adaptTo(Node.class)).thenReturn(jcrNode);
        when(resourceResolver.getResource(assetPath.concat(SLASH).concat(JcrConstants.JCR_CONTENT).concat("/metadata"))).thenReturn(metaNodeRes);
        when(metaNodeRes.adaptTo(Node.class)).thenReturn(metaNode);
        when(metaNode.hasProperty(NameConstants.PN_ON_TIME)).thenReturn(true);
    	Property dateProp = mock(Property.class);
    	Calendar cal = mock(Calendar.class);
    	when(metaNode.getProperty(NameConstants.PN_ON_TIME)).thenReturn(dateProp);
    	when(metaNode.getProperty(NameConstants.PN_ON_TIME).getDate()).thenReturn(cal);
    	SimpleDateFormat dateFormat = mock(SimpleDateFormat.class);
    	Date d3 = new Date();
    	String date = "2023-05-26";
    	Mockito.lenient().when(dateFormat.parse(date)).thenReturn(d3);

    	// test putDatainJson
    	when(jcrNode.hasProperty(NameConstants.PN_PAGE_LAST_REPLICATION_ACTION)).thenReturn(true);
    	Property replProp = mock(Property.class);
    	when(jcrNode.getProperty(NameConstants.PN_PAGE_LAST_REPLICATION_ACTION)).thenReturn(replProp);
    	Value[] replValue = new Value[1];
    	replValue[0] = mock(Value.class);
    	when(replProp.getValue()).thenReturn(replValue[0]);
    	when(replValue[0].getString()).thenReturn("Activate");
    	Mockito.lenient().when(metaNode.hasProperty(NameConstants.PN_TAGS)).thenReturn(true);
        Property tags = mock(Property.class);
        when(metaNode.hasProperty(DamConstants.DC_TITLE)).thenReturn(true);
        Property productT=mock(Property.class);
        when(metaNode.getProperty(DamConstants.DC_TITLE)).thenReturn(productT);
        when(productT.isMultiple()).thenReturn(true);
        Value[] titleValues = new Value[1];
        titleValues[0] = mock(Value.class);
        Mockito.lenient().when(productT.getValues()).thenReturn(titleValues);
        Mockito.lenient().when(titleValues[0].getString()).thenReturn("dc:title");
        Value[] tagValues = new Value[4];
		for(int i=0; i<4; i++) {
			tagValues[i] = mock(Value.class);
		}

        Mockito.lenient().when(metaNode.getProperty(NameConstants.PN_TAGS)).thenReturn(tags);
        Mockito.lenient().when(tags.isMultiple()).thenReturn(true);
		when(tags.getValues()).thenReturn(tagValues);
        
		Mockito.lenient().when(tagValues[0].getString()).thenReturn("ardx:eifu/products/test-product");
		Mockito.lenient().when(tagValues[1].getString()).thenReturn("ardx:eifu/categories/subcategory/test-category");
		Mockito.lenient().when(tagValues[2].getString()).thenReturn("ardx:eifu/user-role/hcp");
		Mockito.lenient().when(tagValues[3].getString()).thenReturn("ardx:eifu/languages/English/US");
		
		String productTitle = "Product-Title";
		Tag producttag = mock(Tag.class);
		when(tagManager.resolve("ardx:eifu/products/test-product")).thenReturn(producttag);
		when(producttag.getTitle()).thenReturn(productTitle);
        
		String roleTitle = "hcp";
		Tag roletag = mock(Tag.class);
		Mockito.lenient().when(tagManager.resolve("ardx:eifu/user-role/hcp")).thenReturn(roletag);
		Mockito.lenient().when(roletag.getTitle()).thenReturn(roleTitle);
		
		String categoryTitle = "category-Title";
		Tag categorytag = mock(Tag.class);
		Mockito.lenient().when(tagManager.resolve("ardx:eifu/categories/subcategory/test-category")).thenReturn(categorytag);
		Mockito.lenient().when(categorytag.getTitle()).thenReturn(categoryTitle);
		
		String countryTitle = "US";
		Tag countrytag = mock(Tag.class);
		Mockito.lenient().when(tagManager.resolve("ardx:eifu/languages/English/US")).thenReturn(countrytag);
		Mockito.lenient().when(countrytag.getTitle()).thenReturn(countryTitle);
		
		String languageTitle = "English";
		Tag languagetag = mock(Tag.class);
		Mockito.lenient().when(tagManager.resolve("ardx:eifu/languages/English")).thenReturn(languagetag);
		Mockito.lenient().when(languagetag.getTitle()).thenReturn(languageTitle);

		String subTagTitles="subcategory title";
		when(tagManager.resolve("ardx:eifu/categories/subcategory")).thenReturn(categorytag);
		Map<Locale, String> localizedTitles = new HashMap<Locale, String>();
		localizedTitles.put(new Locale(DEFAULT), categoryTitle);
		when(categorytag.getLocalizedTitles()).thenReturn(localizedTitles);
		when(categorytag.getTitle()).thenReturn(subTagTitles);
        
		servlet.doGet(request, response);
        Assertions.assertNotNull(response);
        verify(metaNode, times(2)).hasProperty(NameConstants.PN_TAGS);
		verify(metaNode, times(2)).getProperty(NameConstants.PN_TAGS);
		verify(languagetag, times(2)).getTitle();
		verify(countrytag, times(4)).getTitle();
		verify(roletag, times(2)).getTitle();
    }
    
    @Test
	void testExceptionDoGet() throws IOException, RepositoryException {
		List<Hit> hits = new ArrayList<>();
		hits.add(hit);
		when(result.getHits()).thenReturn(hits);
		doThrow(new RepositoryException()).when(hit).getResource();
		when(request.getParameter("dampath")).thenReturn("/content/dam/ardx/eifu");
		when(request.getParameter("tagpath")).thenReturn("ardx:eifu");
		servlet.doGet(request, response);
		Assertions.assertNotNull(response);
	}
    
    @Test
   	void valueExceptionDoGet() throws IOException, RepositoryException {
   		List<Hit> hits = new ArrayList<>();
   		hits.add(hit);
   		when(result.getHits()).thenReturn(hits);
   		doThrow(new ValueFormatException()).when(hit).getResource();
   		when(request.getParameter("dampath")).thenReturn("/content/dam/ardx/eifu");
   		when(request.getParameter("tagpath")).thenReturn("ardx:eifu");
   		servlet.doGet(request, response);
   		Assertions.assertNotNull(response);
   	}
   @Test
   void elseTestDoGet() throws ServletException, IOException, RepositoryException, ParseException {
       	Hit mockHit = mock(Hit.class);
       	List<Hit> hits = Arrays.asList(mockHit,mockHit);
       	when(result.getHits()).thenReturn(hits);
       	Resource assetResource = mock(Resource.class);
       	when(mockHit.getResource()).thenReturn(assetResource);
       	String assetPath= "/content/dam/ardx/eifu/test.pdf";
       	String hiddenPath =SLASH.concat("content/ardx/eifu/report/jcr:content/root/hidden");
       	Mockito.lenient().when(resourceResolver.getResource(hiddenPath)).thenReturn(assetResource);
       	when(assetResource.getPath()).thenReturn(assetPath);
       	Node jcrNode = mock(Node.class);
       	Node metaNode = mock(Node.class);
       	Resource jcrNodeRes = mock(Resource.class);
       	Resource metaNodeRes = mock(Resource.class);
   		
   		Mockito.lenient().when(resourceResolver.getResource(assetPath.concat(SLASH).concat(JcrConstants.JCR_CONTENT))).thenReturn(jcrNodeRes);
   		when(jcrNodeRes.adaptTo(Node.class)).thenReturn(jcrNode);
   		when(resourceResolver.getResource(assetPath.concat(SLASH).concat(JcrConstants.JCR_CONTENT).concat("/metadata"))).thenReturn(metaNodeRes);
   		when(metaNodeRes.adaptTo(Node.class)).thenReturn(metaNode);
   		when(metaNode.hasProperty(NameConstants.PN_ON_TIME)).thenReturn(true);
   		Property dateProp = mock(Property.class);
   		Calendar cal = mock(Calendar.class);
   		when(metaNode.getProperty(NameConstants.PN_ON_TIME)).thenReturn(dateProp);
   		when(metaNode.getProperty(NameConstants.PN_ON_TIME).getDate()).thenReturn(cal);
   		SimpleDateFormat dateFormat = mock(SimpleDateFormat.class);
   		Date d3 = new Date();
   		String date = "2023-05-26";
   		Mockito.lenient().when(dateFormat.parse(date)).thenReturn(d3);
       	
       	// test putDatainJson
       	when(jcrNode.hasProperty(NameConstants.PN_PAGE_LAST_REPLICATION_ACTION)).thenReturn(true);
       	Property replProp = mock(Property.class);
       	when(jcrNode.getProperty(NameConstants.PN_PAGE_LAST_REPLICATION_ACTION)).thenReturn(replProp);
       	Value[] replValue = new Value[1];
       	replValue[0] = mock(Value.class);
       	when(replProp.getValue()).thenReturn(replValue[0]);
       	when(replValue[0].getString()).thenReturn("Activate");
       	Mockito.lenient().when(metaNode.hasProperty(NameConstants.PN_TAGS)).thenReturn(true);
        Property tags = mock(Property.class);
		when(metaNode.hasProperty(DamConstants.DC_TITLE)).thenReturn(false);
		Property productT = mock(Property.class);
		Mockito.lenient().when(metaNode.getProperty(DamConstants.DC_TITLE)).thenReturn(productT);
		Mockito.lenient().when(productT.isMultiple()).thenReturn(true);
		Value[] titleValues = new Value[1];
		titleValues[0] = mock(Value.class);
    
		Mockito.lenient().when(productT.getValues()).thenReturn(titleValues);
		Mockito.lenient().when(titleValues[0].getString()).thenReturn("dc:title");

		Value[] tagValues = new Value[4];
   		for(int i=0; i<4; i++) {
   			tagValues[i] = mock(Value.class);
   		}
   		
		Mockito.lenient().when(metaNode.getProperty(NameConstants.PN_TAGS)).thenReturn(tags);
		Mockito.lenient().when(tags.isMultiple()).thenReturn(true);
		when(tags.getValues()).thenReturn(tagValues);
           
   		Mockito.lenient().when(tagValues[0].getString()).thenReturn("ardx:eifu/products/test-product");
   		Mockito.lenient().when(tagValues[1].getString()).thenReturn("ardx:eifu/categories/subcategory");
   		Mockito.lenient().when(tagValues[2].getString()).thenReturn("ardx:eifu/user-role/hcp");
   		Mockito.lenient().when(tagValues[3].getString()).thenReturn("ardx:eifu/languages/English/US");
   		
   		String productTitle = "Product-Title";
   		Tag producttag = mock(Tag.class);
   		when(tagManager.resolve("ardx:eifu/products/test-product")).thenReturn(producttag);
   		when(producttag.getTitle()).thenReturn(productTitle);
           
   		String roleTitle = "hcp";
   		Tag roletag = mock(Tag.class);
   		Mockito.lenient().when(tagManager.resolve("ardx:eifu/user-role/hcp")).thenReturn(roletag);
   		Mockito.lenient().when(roletag.getTitle()).thenReturn(roleTitle);
   		
   		String categoryTitle = "category-Title";
   		Tag categorytag = mock(Tag.class);
   		Mockito.lenient().when(tagManager.resolve("ardx:eifu/categories")).thenReturn(categorytag);
   		Mockito.lenient().when(categorytag.getTitle()).thenReturn(categoryTitle);
   		
   		String countryTitle = "US";
   		Tag countrytag = mock(Tag.class);
   		Mockito.lenient().when(tagManager.resolve("ardx:eifu/languages/English/US")).thenReturn(countrytag);
   		Mockito.lenient().when(countrytag.getTitle()).thenReturn(countryTitle);
   		
   		String languageTitle = "English::::";
   		Tag languagetag = mock(Tag.class);
   		Mockito.lenient().when(tagManager.resolve("ardx:eifu/languages/English")).thenReturn(languagetag);
   		Mockito.lenient().when(languagetag.getTitle()).thenReturn(languageTitle);
   		
   		String subTagTitles="subcategory title";
   		when(tagManager.resolve("ardx:eifu/categories/subcategory")).thenReturn(categorytag);
   		Map<Locale, String> localizedTitles = new HashMap<Locale, String>();
   		localizedTitles.put(new Locale(DEFAULT), categoryTitle);
   		when(categorytag.getLocalizedTitles()).thenReturn(localizedTitles);
   		when(categorytag.getTitle()).thenReturn(subTagTitles);
   		
   		servlet.doGet(request, response);
   		Assertions.assertNotNull(response);
   		verify(metaNode, times(2)).hasProperty(NameConstants.PN_TAGS);
   		verify(metaNode, times(2)).getProperty(NameConstants.PN_TAGS);
   		verify(languagetag, times(2)).getTitle();
   		verify(countrytag, times(4)).getTitle();
   		verify(roletag, times(2)).getTitle();
       }
}
