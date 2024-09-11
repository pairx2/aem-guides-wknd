package com.abbott.aem.platform.common.components.impl.servlets.megamenu;

import static com.day.cq.wcm.foundation.forms.FormsConstants.COMPONENT_PROPERTY_ENABLED;
import static com.day.cq.wcm.foundation.forms.FormsConstants.COMPONENT_PROPERTY_ORDER;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import lombok.NonNull;

import com.day.cq.wcm.api.designer.Designer;
import com.day.cq.wcm.api.policies.ContentPolicy;
import com.day.cq.wcm.api.policies.ContentPolicyManager;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class VersionsDataSourceServletTest {

    @InjectMocks
    VersionsDataSourceServlet versionsDataSourceServlet;

    @NonNull
    @Mock
    SlingHttpServletRequest request;

    @NonNull
    @Mock
    SlingHttpServletResponse response;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    ValueMap valueMap;

    @Mock
    Designer designer;

    @Mock
    ContentPolicyManager policyManager;

    @Mock
    ContentPolicy policy;

    @Mock
    VersionsDataSourceServlet.VersionsDescription object1;
    @Mock
    VersionsDataSourceServlet.VersionsDescription object2;

    @BeforeEach
    public void setup() {
        resourceResolver = mock(ResourceResolver.class);
        Resource resource = mock(Resource.class);
        request = mock(SlingHttpServletRequest.class);
        response = mock(SlingHttpServletResponse.class);
        valueMap = mock(ValueMap.class);
        policyManager = mock(ContentPolicyManager.class);
        policy = mock(ContentPolicy.class);
        valueMap.put("enabled", true);
        versionsDataSourceServlet = Mockito.spy(new VersionsDataSourceServlet());
        designer = mock(Designer.class);
        when(request.getResourceResolver()).thenReturn(resourceResolver);

        String[] arr = new String[1];
        arr[0] = "/content/abbott/bluebird";
        when(resourceResolver.getSearchPath()).thenReturn(arr);
        List<Resource> resources = new ArrayList<>();
        resources.add(resource);
        when(resourceResolver.findResources(Mockito.any(), Mockito.any())).thenReturn(resources.iterator());
        when(resource.adaptTo(ValueMap.class)).thenReturn(valueMap);
        when(resource.getPath()).thenReturn("/content/abbott/bluebird");
        lenient().when(valueMap.get(Mockito.any(), Mockito.any())).thenReturn(true);
        doReturn(true).when(valueMap).get(COMPONENT_PROPERTY_ENABLED, Boolean.TRUE);
        lenient().doReturn(1).when(valueMap).get(COMPONENT_PROPERTY_ORDER, 0);
    }

    @Test
    public void testDoGet() {
        versionsDataSourceServlet.doGet(request, response);
        assert !object1.equals(object2);
		assertTrue(object1.compareTo(object2) > 0);
    }

}