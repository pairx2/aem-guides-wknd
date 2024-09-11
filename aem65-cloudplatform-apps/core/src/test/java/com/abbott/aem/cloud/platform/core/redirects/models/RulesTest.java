package com.abbott.aem.cloud.platform.core.redirects.models;

import com.day.cq.commons.jcr.JcrConstants;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import lombok.NonNull;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.lenient;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class RulesTest {

    private final AemContext aemContext = new AemContext();

    @InjectMocks
    Rules rules;

    @Mock
    @NonNull
    SlingHttpServletRequest request;

    @Mock
    Resource resource;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    RequestPathInfo requestPathInfo;

    @Mock
    ValueMap valueMap;

    @BeforeEach
    public void setUp() {
        aemContext.addModelsForClasses(Rules.class);
    }

    @Test
    public void simpleLoadTest() {
        Assertions.assertNotNull(rules);
    }

    @Test
    void init() {
        lenient().when(request.getParameter("path")).thenReturn("/test");
        lenient().when(request.getParameter("q")).thenReturn("search");
        lenient().when(request.getResource()).thenReturn(resource);
        lenient().when(request.getResourceResolver()).thenReturn(resourceResolver);
        lenient().when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
        lenient().when(resource.getChild(JcrConstants.JCR_CONTENT)).thenReturn(resource);
        lenient().when(resource.getChild(JcrConstants.JCR_CONTENT).adaptTo(ValueMap.class)).thenReturn(valueMap);
        lenient().when(resource.getChild("jcr:content/mappings")).thenReturn(resource);
        List<Resource> resources = new ArrayList<>();
        resources.add(resource);
        lenient().when(resourceResolver.findResources(Mockito.any(), Mockito.any())).thenReturn(resources.iterator());
        lenient().when(resource.isResourceType(Rule.RESOURCE_TYPE)).thenReturn(true);
        lenient().when(request.getRequestPathInfo().getSuffixResource()).thenReturn(resource);
        rules.init();
    }

    @Test
    void initNoSearch() {
        lenient().when(request.getParameter("path")).thenReturn("/test");
        lenient().when(request.getResource()).thenReturn(resource);
        lenient().when(request.getResourceResolver()).thenReturn(resourceResolver);
        lenient().when(request.getRequestPathInfo()).thenReturn(requestPathInfo);
        lenient().when(resource.getChild(JcrConstants.JCR_CONTENT)).thenReturn(resource);
        lenient().when(resource.getChild(JcrConstants.JCR_CONTENT).adaptTo(ValueMap.class)).thenReturn(valueMap);
        lenient().when(resource.getChild("jcr:content/mappings")).thenReturn(resource);
        List<Resource> resources = new ArrayList<>();
        resources.add(resource);
        lenient().when(resource.listChildren()).thenReturn(resources.iterator());
        lenient().when(resource.isResourceType(Rule.RESOURCE_TYPE)).thenReturn(true);
        lenient().when(request.getRequestPathInfo().getSuffixResource()).thenReturn(resource);
        rules.init();
    }

    @Test
    void getPageNumber() {
        int expected = 1;
        int actual = rules.getPageNumber();
        assertEquals(expected, actual);
    }

    @Test
    void getPageSize() {
        int expected = 100;
        int actual = rules.getPageSize();
        assertEquals(expected, actual);
    }

    @Test
    void disableSaveButton() {
        assertFalse(rules.disableSaveButton());
    }

    @Test
    void disableApplyButton() {
        assertFalse(rules.disableApplyButton());
    }

    @Test
    void disablePromoteButton() {
        assertFalse(rules.disablePromoteButton());
    }

    @Test
    void getState() {
        assertNotEquals("NEW", rules.getState());
    }

    @Test
    void getVersion() {
        assertNotEquals("0", rules.getVersion());
    }
    @Test
    void getTitle() {
        assertNotEquals("", rules.getTitle());
    }


}