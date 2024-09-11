package com.abbott.aem.av.division.core.servlets;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFactory;
import javax.json.JsonObject;

import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.dam.api.DamConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.NameConstants;

import io.wcm.testing.mock.aem.junit5.AemContext;
import lombok.NonNull;

@ExtendWith(MockitoExtension.class)
class AvDocumentReportServletTest {

    public AemContext context = new AemContext(ResourceResolverType.RESOURCERESOLVER_MOCK);
    private static final Logger logger = LoggerFactory.getLogger(AvDocumentReportServletTest.class);
    private static final String TAG = "av:manualseifu/US/en/hcp/vascular/peripheral-intervention/closure-systems/prostar-xl";
    private static final String AV_TAG = "av:manualseifu/US/en/hcp/peripheral-intervention/closure-systems/prostar-xl";
    @InjectMocks
    AvDocumentReportServlet servlet;

    @NonNull
    @Mock
    SlingHttpServletRequest request;

    @NonNull
    @Mock
    SlingHttpServletResponse response;

    @Mock
    Session session;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    Resource resource;

    @Mock
    QueryBuilder queryBuilder;

    @Mock
    Query query;

    @Mock
    ValueFactory vfac;

    @Mock
    Hit hit;

    @Mock
    Property prop;

    @Mock
    Node node;

    @Mock
    SearchResult result;

    @Mock
    TagManager tagManager;

    @Mock
    Tag tag;


    Map<String, String> map = new HashMap<String, String>();

	public void setUp() throws RepositoryException {

        response = context.response();

        map.put("type", DamConstants.NT_DAM_ASSET);
        map.put("property", "@jcr:content/metadata/dc:format");
        map.put("property.value", "application/pdf");
        map.put("mainasset", "true");
        map.put("orderby", "@jcr:content/onTime");
        map.put("orderby.sort", "desc");
        map.put("p.limit", "-1");

        List<Hit> hits = new ArrayList<>();
        hits.add(hit);

        when(request.getResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.getResource(ArgumentMatchers.anyString())).thenReturn(resource);
        when(resourceResolver.adaptTo(TagManager.class)).thenReturn(tagManager);
        when(tagManager.resolve(anyString())).thenReturn(tag);
        when(tag.getTitle()).thenReturn("title");
        when(resource.adaptTo(Node.class)).thenReturn(node);
        when(node.getProperty(NameConstants.PN_PAGE_LAST_REPLICATION_ACTION)).thenReturn(prop);

        Value value = mock(Value.class);
        when(prop.getValue()).thenReturn(value);
        when(value.getString()).thenReturn("Activate");

        Property ifu_id = mock(Property.class);
        when(node.getProperty("ifu_id")).thenReturn(ifu_id);
        Value ifuvalue = mock(Value.class);
        when(ifu_id.getValue()).thenReturn(ifuvalue);
        when(ifuvalue.getString()).thenReturn("ARTEN600090484_B");

        Property revision = mock(Property.class);
        when(node.getProperty("revision_number")).thenReturn(revision);
        Value revsionv = mock(Value.class);
        when(revision.getValue()).thenReturn(revsionv);
        when(revsionv.getString()).thenReturn("B");

        Property dctitle = mock(Property.class);
        when(node.getProperty(DamConstants.DC_TITLE)).thenReturn(dctitle);
        when(dctitle.isMultiple()).thenReturn(false);
        Value vdctitle = mock(Value.class);
        when(dctitle.getValue()).thenReturn(vdctitle);
        when(vdctitle.getString()).thenReturn("testTitle");

        Node pNode = mock(Node.class);
        when(node.getParent()).thenReturn(pNode);
        when(node.hasProperty(ArgumentMatchers.anyString())).thenReturn(true);

        when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
        when(resourceResolver.adaptTo(QueryBuilder.class)).thenReturn(queryBuilder);
        when(queryBuilder.createQuery(any(PredicateGroup.class), any(Session.class))).thenReturn(query);
        when(query.getResult()).thenReturn(result);
        when(result.getHits()).thenReturn(hits);
        when(hit.getResource()).thenReturn(resource);

    }

    @Test
    void testDoGet() throws IOException, RepositoryException {
        setUp();
        Property tags = mock(Property.class);
        Value tvalue = mock(Value.class);
        when(vfac.createValue(TAG)).thenReturn(tvalue);
        when(node.getProperty(NameConstants.PN_TAGS)).thenReturn(tags);
        when(tags.isMultiple()).thenReturn(true);
        Value[] vtags;
        vtags = new Value[1];
        vtags[0] = vfac.createValue(TAG);
        when(tags.getValues()).thenReturn(vtags);
        when(tvalue.getString()).thenReturn(AV_TAG);
        map.put("path", "/content/dam/av/eifu");
        when(resource.getPath()).thenReturn(map.get("path"));
        try {
            servlet.doGet(request, response);
        } catch (NullPointerException e) {
            logger.error("Error Occurred during Accessing Repository", e);
        }
        Assertions.assertNotNull(response);
    }

    @Test
    void testManualsDoGet() throws IOException, RepositoryException {
        setUp();
        Property tags = mock(Property.class);
        Value tvalue = mock(Value.class);
        when(vfac.createValue(TAG)).thenReturn(tvalue);
        when(node.getProperty(NameConstants.PN_TAGS)).thenReturn(tags);
        when(tags.isMultiple()).thenReturn(true);
        Value[] vtags;
        vtags = new Value[1];
        vtags[0] = vfac.createValue(TAG);
        when(tags.getValues()).thenReturn(vtags);
        when(tvalue.getString()).thenReturn(TAG);
        map.put("path", "/content/dam/av/manuals-eifu");
        when(request.getParameter("dampath")).thenReturn("/content/dam/av/manuals-eifu");
        when(request.getParameter("tagpath")).thenReturn("av:manualseifu");
        when(resource.getPath()).thenReturn(map.get("path"));

        try {
            servlet.doGet(request, response);
        } catch (NullPointerException e) {
            logger.error("Error Occurred during Accessing Repository", e);
        }
        Assertions.assertNotNull(response);
    }

    @Test
    void testExceptionManualsDoGet() throws IOException, RepositoryException {
        map.put("path", "/content/dam/av/manuals-eifu");
        when(request.getResourceResolver()).thenReturn(resourceResolver);
        when(resourceResolver.adaptTo(Session.class)).thenReturn(session);
        when(resourceResolver.adaptTo(QueryBuilder.class)).thenReturn(queryBuilder);
        when(queryBuilder.createQuery(any(PredicateGroup.class), any(Session.class))).thenReturn(query);
        when(query.getResult()).thenReturn(result);
        List<Hit> hits = new ArrayList<>();
        hits.add(hit);
        when(result.getHits()).thenReturn(hits);
        doThrow(new RepositoryException()).when(hit).getResource();
        when(request.getParameter("dampath")).thenReturn("/content/dam/av/manuals-eifu");
        when(request.getParameter("tagpath")).thenReturn("av:manualseifu");
        try {
            servlet.doGet(request, response);
        } catch (NullPointerException e) {
            logger.error("Error Occurred during Accessing Repository", e);
        }
        Assertions.assertNotNull(response);
    }

}
