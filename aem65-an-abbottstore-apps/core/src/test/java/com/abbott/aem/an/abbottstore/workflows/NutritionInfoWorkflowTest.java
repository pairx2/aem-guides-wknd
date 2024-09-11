package com.abbott.aem.an.abbottstore.workflows;

import com.abbott.aem.an.abbottstore.services.NutritionDataService;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.jcr.Node;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class NutritionInfoWorkflowTest {

    @Mock
    NutritionDataService nutritionDataService;

    @Mock
    WorkItem workItem;

    @Mock
    WorkflowSession workflowSession;

    @Mock
    MetaDataMap metaDataMap;

    @Mock
    WorkflowData workflowData;

    @Mock
    ResourceResolver resourceResolver;

    @Mock
    Node node;

    @Mock
    Resource resource;

    @InjectMocks
    NutritionInfoWorkflow nutritionInfoWorkflow;

    AemContext aemContext = new AemContext();

    @Test
    void execute() throws WorkflowException {
        String Info_Resource_type = "/content/abbott/en/info";
        aemContext.load().json("/workflow/NutritionalWorkflowData-CqPage.json", Info_Resource_type);
        Resource infoResource = aemContext.resourceResolver().getResource(Info_Resource_type);

        lenient().when(workflowSession.adaptTo(ResourceResolver.class)).thenReturn(resourceResolver);
        lenient().when(resourceResolver.getResource("/content/abbott/en/metabolic")).thenReturn(infoResource);
        when(workItem.getWorkflowData()).thenReturn(workflowData);
        when(workItem.getWorkflowData().getPayload()).thenReturn("/content/abbott/en/metabolic");

        Page infoPage = infoResource.adaptTo(Page.class);
        infoResource = infoPage.getContentResource();
        when(resourceResolver.getResource(Info_Resource_type + "/" + JcrConstants.JCR_CONTENT)).thenReturn(infoResource);
        when(nutritionDataService.getNutritionWebServiceUrl()).thenReturn("https://an-api-tridion.abbottnutrition.com/api/ProductBySku/");

        nutritionInfoWorkflow.execute(workItem, workflowSession, metaDataMap);
    }

    @Test
    void executeWithJcrContent() throws WorkflowException {
        String Info_Resource_type = "/content/abbott/en/info/jcr:content";
        aemContext.load().json("/workflow/NutritionalWorkflowData_JcrContent.json", Info_Resource_type);
        Resource infoResource = aemContext.resourceResolver().getResource(Info_Resource_type);

        lenient().when(workflowSession.adaptTo(ResourceResolver.class)).thenReturn(resourceResolver);
        lenient().when(resourceResolver.getResource(Info_Resource_type)).thenReturn(infoResource);
        when(workItem.getWorkflowData()).thenReturn(workflowData);
        when(workItem.getWorkflowData().getPayload()).thenReturn(Info_Resource_type);
        when(resourceResolver.getResource(Info_Resource_type)).thenReturn(infoResource);
        when(nutritionDataService.getNutritionWebServiceUrl()).thenReturn("https://an-api-tridion.abbottnutrition.com/api/ProductBySku/");

        nutritionInfoWorkflow.execute(workItem, workflowSession, metaDataMap);

    }
}