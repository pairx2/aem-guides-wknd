package com.abbott.aem.an.division.core.services.impl;

import static org.mockito.Mockito.mockConstruction;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.ResourceResolver;
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
import com.adobe.granite.workflow.model.WorkflowModel;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@MockitoSettings(strictness = Strictness.LENIENT)
@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class DeactivatePageServiceImplTest {

	@InjectMocks
	DeactivatePageServiceImpl deactivatePageServiceImpl;
	
	@Mock
	EmailRunJobConfiguration emailJobs;

	@Mock
	ResourceResolver resourceResolver;

	@Mock
	WorkflowSession workFlowSession;

	@Mock
	WorkflowData workFlowData;

	@Mock
	WorkflowModel workFlowModel;

	@Mock
	Route routes;

	@Mock
	Workflow currentWF;

	@Mock
	WorkItem workItem;

	@BeforeEach
	void setUp() throws RepositoryException {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void getDeactivatePages() throws Exception {
		String pdpWorkflowModel = CommonConstants.GLOBAL_WORKFLOW_MODEL;
		Map<String, String> discontinuedProds = new HashMap<>();
		discontinuedProds.put("key", "value");
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.verifyGroup(Mockito.any(), Mockito.any())).thenReturn(true);
		})) {
			try (MockedConstruction<EmailNotificationUtils> mockedEmailNotificationUtils = mockConstruction(EmailNotificationUtils.class, (mockObject, context) -> {
				when(mockObject.sendEmailNotification(Mockito.anyString(), Mockito.any(),Mockito.any())).thenReturn("Email sent successfully");
			})) {
				Mockito.when(resourceResolver.adaptTo(WorkflowSession.class)).thenReturn(workFlowSession);
				Mockito.when(workFlowSession.getModel(pdpWorkflowModel)).thenReturn(workFlowModel);

				Mockito.when(workFlowSession.newWorkflowData("JCR_PATH", "/content/pdp/key")).thenReturn(workFlowData);
				Mockito.when(workFlowSession.startWorkflow(Mockito.any(), Mockito.any(), Mockito.any()))
						.thenReturn(currentWF);
				Mockito.when(currentWF.getWorkItems()).thenReturn(getWorkItemsList());
				Mockito.when(workFlowSession.getRoutes(workItem, false)).thenReturn(getRoutesList());
				deactivatePageServiceImpl.deactivatePages(pdpWorkflowModel, "/content/pdp", discontinuedProds,
						resourceResolver, "test");
				Mockito.verify(resourceResolver, times(1)).adaptTo(WorkflowSession.class);
				Mockito.verify(workFlowSession, times(1)).getModel(pdpWorkflowModel);
				Mockito.verify(workFlowSession, times(1)).newWorkflowData("JCR_PATH", "/content/pdp/key");
				Mockito.verify(currentWF, times(1)).getWorkItems();
				Mockito.verify(workFlowSession, times(1)).getRoutes(workItem, false);
			}
		}
	}
	
	@Test
	void getDeactivatePages_throwsException() throws Exception {
		String pdpWorkflowModel = CommonConstants.GLOBAL_WORKFLOW_MODEL;
		Map<String, String> discontinuedProds = new HashMap<>();
		try (MockedConstruction<Utils> mockedUtils = mockConstruction(Utils.class, (mockObject, context) -> {
			when(mockObject.verifyGroup(Mockito.any(), Mockito.any())).thenReturn(false);
		})) {
				Mockito.when(resourceResolver.adaptTo(WorkflowSession.class)).thenReturn(workFlowSession);
				deactivatePageServiceImpl.deactivatePages(pdpWorkflowModel, "/content/pdp", discontinuedProds,
						resourceResolver, "test");
				Mockito.verify(resourceResolver, times(1)).adaptTo(WorkflowSession.class);
			}
	}

	private List<WorkItem> getWorkItemsList() {
		List<WorkItem> workItemList = new ArrayList<WorkItem>();
		workItemList.add(workItem);
		return workItemList;
	}

	private List<Route> getRoutesList() {
		List<Route> routeList = new ArrayList<Route>();
		routeList.add(routes);
		return routeList;
	}

}
