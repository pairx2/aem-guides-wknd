package com.abbott.aem.cloud.platform.core.mcp;

import com.adobe.acs.commons.data.CompositeVariant;
import com.adobe.acs.commons.data.Spreadsheet;
import com.adobe.acs.commons.data.Variant;
import com.adobe.acs.commons.fam.ActionManager;
import com.adobe.acs.commons.fam.ActionManagerFactory;
import com.adobe.acs.commons.fam.impl.ActionManagerFactoryImpl;
import com.adobe.acs.commons.mcp.ControlledProcessManager;
import com.adobe.acs.commons.mcp.ProcessDefinition;
import com.adobe.acs.commons.mcp.ProcessInstance;
import com.adobe.acs.commons.mcp.impl.ProcessInstanceImpl;
import com.day.cq.commons.jcr.JcrUtil;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedConstruction;
import org.mockito.MockedStatic;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.anyInt;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockConstruction;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AssetDeleteTest {

	AssetDeleteFactory factory = new AssetDeleteFactory();
	AssetDelete assetTool;
	ProcessInstance processInstance;
	ResourceResolver resResolver;
	Replicator replicator;

	Spreadsheet spreadsheet;

	@BeforeEach
	public void setup() throws RepositoryException, PersistenceException, IllegalAccessException, LoginException,
			ReplicationException {
		replicator = mock(Replicator.class);
		factory.replicator = replicator;
		assetTool = prepareProcessDefinition(factory.createProcessDefinition(), null);

		resResolver = mock(ResourceResolver.class);
		spreadsheet = mock(Spreadsheet.class);
	}

	@Test
	void testFactory() {
		AssetDelete replicationProcess = factory.createProcessDefinition();
		assertEquals(replicationProcess.replicatorService, replicator);
	}

	@Test
	void testInit() throws RepositoryException, IOException {
		MockedConstruction<Spreadsheet> mockedConstruction = mockConstruction(Spreadsheet.class, (mocked, context) ->{
			when(mocked.buildSpreadsheet()).thenReturn(spreadsheet);
		});

		assetTool.init();
		verify(spreadsheet, times(0)).buildSpreadsheet();

		mockedConstruction.close();
	}

	@Test
	void testInitException() throws IOException {
		MockedConstruction<Spreadsheet> mockedConstruction = mockConstruction(Spreadsheet.class,
				(mocked, context) -> {
			when(mocked.buildSpreadsheet()).thenThrow(new IOException("IO Exception"));
		});

		assertThrows(RepositoryException.class, () -> assetTool.init());
		mockedConstruction.close();
	}

	@Test
	void testBuildProcess() throws LoginException, RepositoryException {
		ControlledProcessManager cpm = mock(ControlledProcessManager.class);
		ProcessDefinition process = mock(ProcessDefinition.class);

		processInstance = new ProcessInstanceImpl(cpm, process, "Asset Delete");

		ActionManagerFactory amf = mock(ActionManagerFactoryImpl.class);
		when(cpm.getActionManagerFactory()).thenReturn(amf);

		ActionManager am = mock(ActionManager.class);
		when(amf.createTaskManager(anyString(), any(), anyInt())).thenReturn(am);

		MockedConstruction<Spreadsheet> mockedConstruction = mockConstruction(Spreadsheet.class, (mocked, context) ->{
			when(mocked.buildSpreadsheet()).thenReturn(spreadsheet);
		});

		assetTool.init();
		mockedConstruction.close();

		assetTool.buildProcess(processInstance, resResolver);
		verify(cpm, times(1)).getActionManagerFactory();
	}

	@Test
	void testStoreReport() throws PersistenceException, RepositoryException {
		ControlledProcessManager cpm = mock(ControlledProcessManager.class);
		ProcessDefinition process = mock(ProcessDefinition.class);

		processInstance = new ProcessInstanceImpl(cpm, process, "Asset Delete");

		Resource resource = mock(Resource.class);
		ModifiableValueMap valueMap = mock(ModifiableValueMap.class);
		Session session = mock(Session.class);
		MockedStatic<JcrUtil> mockedStatic = mockStatic(JcrUtil.class);

		when(resResolver.getResource("/var")).thenReturn(resource);
		when(resResolver.getResource(any(), any())).thenReturn(resource);
		when(resResolver.create(any(), anyString(), any())).thenReturn(resource);
		when(resource.getName()).thenReturn("acs-commons");

		when(resource.adaptTo(ModifiableValueMap.class)).thenReturn(valueMap);
		when(resResolver.adaptTo(Session.class)).thenReturn(session);

		assetTool.storeReport(processInstance, resResolver);
		verify(resource, times(6)).getName();
		mockedStatic.close();
	}

	@Test
	void testStoreReportException() {
		assertThrows(NullPointerException.class,
				() -> assetTool.storeReport(processInstance, resResolver));
	}

	@Test
	void testDeleteTreeStructure() throws RepositoryException, NoSuchMethodException, InvocationTargetException, IllegalAccessException {
		MockedConstruction<Spreadsheet> mockedConstruction = mockConstruction(Spreadsheet.class, (mocked, context) ->{
			when(mocked.buildSpreadsheet()).thenReturn(spreadsheet);
		});

		assetTool.init();
		mockedConstruction.close();

		ActionManager actionManager = mock(ActionManager.class);

		Map<String, CompositeVariant> composite = new HashMap<>();
		composite.put("a", new CompositeVariant(new Variant()));

		List<Map<String, CompositeVariant>> compositeList = new ArrayList<>();
		compositeList.add(composite);

		when(spreadsheet.getDataRowsAsCompositeVariants()).thenReturn(compositeList);

		Method method = assetTool.getClass().getDeclaredMethod("deleteTreeStructure", ActionManager.class);
		method.setAccessible(true);

		method.invoke(assetTool,actionManager);

		verify(actionManager, times(1)).deferredWithResolver(any());
	}

	@Test
	void testDeleteAsset() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException, RepositoryException {
		String destinationPath = "/content/dam/abbott/";

		Resource resource = mock(Resource.class);
		Node node = mock(Node.class);
		Session session = mock(Session.class);

		when(resResolver.resolve(destinationPath)).thenReturn(resource);
		when(resource.adaptTo(Node.class)).thenReturn(node);
		when(node.getSession()).thenReturn(session);

		Method method = assetTool.getClass().getDeclaredMethod("deleteAsset", ResourceResolver.class, String.class);
		method.setAccessible(true);

		method.invoke(assetTool,resResolver,destinationPath);
		assertEquals("Synchronous delete", assetTool.reportData.get(0).get(AssetDelete.ReportColumns.DESCRIPTION));
	}

	@Test
	void testDeleteAssetException() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException, RepositoryException {
		String destinationPath = "/content/dam/abbott/";

		Resource resource = mock(Resource.class);
		Node node = mock(Node.class);

		when(resResolver.resolve(destinationPath)).thenReturn(resource);
		when(resource.adaptTo(Node.class)).thenReturn(node);
		when(node.getSession()).thenThrow(new RepositoryException("RE"));

		Method method = assetTool.getClass().getDeclaredMethod("deleteAsset", ResourceResolver.class, String.class);
		method.setAccessible(true);

		method.invoke(assetTool,resResolver,destinationPath);
		assertEquals(0, assetTool.reportData.size());
	}

	@Test
	void testGetString() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
		String path = "/content/dam/abbott";
		CompositeVariant compositeVariant = mock(CompositeVariant.class);
		when(compositeVariant.getValueAs(String.class)).thenReturn("composite");

		Map<String, CompositeVariant> row = new HashMap<>();
		row.put(path, compositeVariant);

		Method method = assetTool.getClass().getDeclaredMethod("getString", Map.class, String.class);
		method.setAccessible(true);

		String result = (String) method.invoke(assetTool,row, path);
		assertEquals("composite", result);
	}

	@Test
	void testGetStringNull() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
		String path = "/content/dam/abbott";
		Method method = assetTool.getClass().getDeclaredMethod("getString", Map.class, String.class);
		method.setAccessible(true);

		String result = (String) method.invoke(assetTool,new HashMap<>(), path);
		assertNull(result);
	}

	private AssetDelete prepareProcessDefinition(AssetDelete assetDelete, Function<String, List<String>> refFunction) {
		AssetDelete definition = spy(assetDelete);
		return definition;
	}
}