package com.abbott.aem.an.division.core.services.impl;

import static org.mockito.Mockito.mockConstruction;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedConstruction;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import com.abbott.aem.an.division.api.jobs.EmailRunJobConfiguration;
import com.abbott.aem.an.division.core.utils.EmailNotificationUtils;
import com.abbott.aem.an.division.core.utils.Utils;
import com.abbott.aem.cloud.platform.core.constants.CommonConstants;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.Route;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.Workflow;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.adobe.granite.workflow.model.WorkflowModel;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class PublishPageServiceImplTest {

	@InjectMocks
	PublishPageServiceImpl publishPageServiceImpl;
	
	@Mock
	EmailRunJobConfiguration emailJobs;

	@Mock
	ResourceResolver resourceResolver;

	@Mock
	Resource instanceWorkFlowDataResource;

	@Mock
	WorkflowSession workFlowSession;

	@Mock
	WorkflowData newWorkFlowData, instanceWorkFlowData;

	@Mock
	WorkflowModel globalWorkFlowModel, workFlowModelArrayItem1, workFlowModelArrayItem2;

	@Mock
	Route routes;

	@Mock
	Workflow currentWF, workFlowArrayItem1, workFlowArrayItem2;

	@Mock
	WorkItem currentWorkItem;

	@Mock
	ValueMap instanceResourceValueMap;

	@Mock
	MetaDataMap metaDataMap;

	@BeforeEach
	void setUp() throws RepositoryException {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void getPublishPages() throws Exception {
		Map<String, String> activeProds = new HashMap<>();
		activeProds.put("brandkey", "prod3");
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.verifyGroup(Mockito.any(), Mockito.any())).thenReturn(true);
		})) {
			try (MockedConstruction<EmailNotificationUtils> mockedEmailNotificationUtils = mockConstruction(
					EmailNotificationUtils.class, (mockObject, context) -> {
						when(mockObject.sendEmailNotification(Mockito.anyString(), Mockito.any(), Mockito.any()))
								.thenReturn("Email sent successfully");
					})) {
				Mockito.when(resourceResolver.adaptTo(WorkflowSession.class)).thenReturn(workFlowSession);
				Mockito.when(workFlowSession.getModel(CommonConstants.GLOBAL_WORKFLOW_MODEL))
						.thenReturn(globalWorkFlowModel);

				Mockito.when(workFlowSession.newWorkflowData("JCR_PATH", "/content/pdp/brandkey"))
						.thenReturn(newWorkFlowData);
				Mockito.when(workFlowSession.startWorkflow(Mockito.any(), Mockito.any(), Mockito.any()))
						.thenReturn(currentWF);
				Mockito.when(workFlowArrayItem1.getWorkflowModel()).thenReturn(workFlowModelArrayItem1);
				Mockito.when(workFlowModelArrayItem1.getTitle()).thenReturn("title");
				Mockito.when(workFlowArrayItem2.getWorkflowModel()).thenReturn(workFlowModelArrayItem2);
				Mockito.when(workFlowModelArrayItem2.getTitle()).thenReturn("Abbott Global Workflow");
				Mockito.when(workFlowArrayItem2.getWorkflowData()).thenReturn(instanceWorkFlowData);
				Mockito.when(workFlowArrayItem2.getMetaDataMap()).thenReturn(metaDataMap);
				Mockito.when(metaDataMap.containsKey("currentStep")).thenReturn(true);
				Mockito.when(instanceWorkFlowData.getPayload()).thenReturn("payload");
				Mockito.when(resourceResolver.getResource("payload/jcr:content"))
						.thenReturn(instanceWorkFlowDataResource);
				Mockito.when(instanceWorkFlowDataResource.getValueMap()).thenReturn(instanceResourceValueMap);
				Mockito.when(instanceResourceValueMap.get("productId", String.class)).thenReturn("prod3");
				Mockito.when(workFlowSession.getWorkflows(new String[] { "RUNNING" })).thenReturn(getWorkFlowArray());
				Mockito.when(currentWF.getWorkItems()).thenReturn(getWorkItemsList());
				Mockito.when(workFlowSession.getRoutes(currentWorkItem, false)).thenReturn(getRoutesList());

				publishPageServiceImpl.publishPages(CommonConstants.GLOBAL_WORKFLOW_MODEL, "/content/pdp", activeProds,
						resourceResolver, "test");

				Mockito.verify(workFlowSession, times(1)).getModel("/var/workflow/models/abbott-global-workflow");
				Mockito.verify(workFlowSession, times(1)).newWorkflowData("JCR_PATH", "/content/pdp/brandkey");
				Mockito.verify(currentWF, times(1)).getWorkItems();
				Mockito.verify(workFlowSession, times(1)).getRoutes(currentWorkItem, false);
				Mockito.verify(workFlowArrayItem1, times(1)).getWorkflowModel();
				Mockito.verify(workFlowModelArrayItem1, times(1)).getTitle();
				Mockito.verify(workFlowArrayItem2, times(1)).getWorkflowModel();
				Mockito.verify(workFlowModelArrayItem2, times(1)).getTitle();
				Mockito.verify(workFlowArrayItem2, times(1)).getWorkflowData();
				Mockito.verify(workFlowArrayItem2, times(1)).getMetaDataMap();
				Mockito.verify(metaDataMap, times(1)).containsKey("currentStep");
				Mockito.verify(instanceWorkFlowData, times(1)).getPayload();
				Mockito.verify(resourceResolver, times(1)).getResource("payload/jcr:content");
				Mockito.verify(instanceWorkFlowDataResource, times(1)).getValueMap();
				Mockito.verify(instanceResourceValueMap, times(1)).get("productId", String.class);
			}
		}
	}

	@Test
	void testPublishPages_throwsWorkFlowException() {
		Map<String, String> activeProds = new HashMap<>();
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.verifyGroup(Mockito.any(), Mockito.any())).thenReturn(false);
		})) {
			publishPageServiceImpl.publishPages(CommonConstants.GLOBAL_WORKFLOW_MODEL, "/content/pdp", activeProds,
					resourceResolver, "test");
			Mockito.verify(resourceResolver, times(1)).adaptTo(WorkflowSession.class);
		}
	}

	private List<WorkItem> getWorkItemsList() {
		List<WorkItem> workItemList = new ArrayList<WorkItem>();
		workItemList.add(currentWorkItem);
		return workItemList;
	}

	private Workflow[] getWorkFlowArray() {
		Workflow[] workFlowArray = new Workflow[] { workFlowArrayItem1, workFlowArrayItem2 };
		return workFlowArray;
	}

	private List<Route> getRoutesList() {
		List<Route> routeList = new ArrayList<Route>();
		routeList.add(routes);
		return routeList;
	}

}