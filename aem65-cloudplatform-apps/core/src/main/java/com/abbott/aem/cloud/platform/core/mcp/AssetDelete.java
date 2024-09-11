package com.abbott.aem.cloud.platform.core.mcp;
 
import java.io.IOException;
import java.util.*;
import javax.jcr.RepositoryException;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.ResourceResolver;
import com.adobe.acs.commons.data.CompositeVariant;
import com.adobe.acs.commons.data.Spreadsheet;
import com.adobe.acs.commons.fam.ActionManager;
import com.adobe.acs.commons.mcp.ProcessDefinition;
import com.adobe.acs.commons.mcp.ProcessInstance;
import com.adobe.acs.commons.mcp.form.FileUploadComponent;
import com.adobe.acs.commons.mcp.form.FormField;
import com.adobe.acs.commons.mcp.form.SelectComponent;
import com.adobe.acs.commons.mcp.form.TextfieldComponent;
import com.adobe.acs.commons.mcp.model.GenericReport;
import com.day.cq.replication.AgentFilter;
import com.day.cq.replication.Replicator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.jcr.Node;
 
public class AssetDelete extends ProcessDefinition {
 
    private static final Logger LOGGER = LoggerFactory.getLogger(AssetDelete.class);
    private static final String DESTINATION_PATH = "destination";
    private final GenericReport report = new GenericReport();
    private static final String REPORT_NAME = "TreeReplication-report";
    private static final String RUNNING = "Running "; 
    private static final String EXECUTING_KEYWORD = " Tree Replication";
 
    protected enum QueueMethod {
         USE_MCP_QUEUE
    }
 
    protected enum ReplicationAction {
          DELETE
    }
 
 
    Replicator replicatorService;
 
    @FormField(name = "Replication Excel", component = FileUploadComponent.class)
    private RequestParameter repPathExcel;
    private Spreadsheet spreadsheet;
 
    @FormField(name = "Queueing Method",
            component = SelectComponent.EnumerationSelector.class,
            description = "For small publishing tasks, standard is sufficient.  For large folder trees, MCP is recommended.",
            options = "default=USE_MCP_QUEUE")
    QueueMethod queueMethod = QueueMethod.USE_MCP_QUEUE;
 
    @FormField(name = "Agents",
            component = TextfieldComponent.class,
            hint = "(leave blank for default agents)",
            description = "Publish agents to use, if blank then all default agents will be used. Multiple agents can be listed using commas or regex.")
    private String agents;
    List<String> agentList = new ArrayList<>();
    AgentFilter replicationAgentFilter;
 
    @FormField(name = "Action",
            component = SelectComponent.EnumerationSelector.class,
            description = "Delete?",
            options = "default=DELETE")
    ReplicationAction reAction = ReplicationAction.DELETE;

    public AssetDelete(Replicator replicator) {
        replicatorService = replicator;
    }
 
    @Override
    public void init() throws RepositoryException {
        try {
            // Read spreadsheet
            spreadsheet = new Spreadsheet(repPathExcel, DESTINATION_PATH).buildSpreadsheet();
        } catch (IOException e) {
            throw new RepositoryException("Unable to process spreadsheet", e);
        }
    }
 
    @Override
    public void buildProcess(ProcessInstance instance, ResourceResolver rr) throws LoginException, RepositoryException {                
        report.setName(REPORT_NAME);                
        instance.getInfo().setDescription(RUNNING + reAction + EXECUTING_KEYWORD);    
        instance.defineCriticalAction("Delete tree structure", rr, this::deleteTreeStructure);
    }
 
    public enum ReportColumns {
        PATH, ACTION, DESCRIPTION
    }
 
    List<EnumMap<ReportColumns, String>> reportData = Collections.synchronizedList(new ArrayList<>());
 
    private void recordAction(String path, String action, String description) {
        EnumMap<ReportColumns, String> row = new EnumMap<>(ReportColumns.class);
        row.put(ReportColumns.PATH, path);
        row.put(ReportColumns.ACTION, action);
        row.put(ReportColumns.DESCRIPTION, description);
        reportData.add(row);
    }
 
    @Override
    public void storeReport(ProcessInstance instance, ResourceResolver rr) throws RepositoryException, PersistenceException {       
        report.setRows(reportData, ReportColumns.class);
        report.persist(rr, instance.getPath() + "/jcr:content/report");
    }

     
    private void deleteTreeStructure(ActionManager t) {
        spreadsheet.getDataRowsAsCompositeVariants().forEach(row -> t.deferredWithResolver(r -> deleteAsset(r, getString(row, DESTINATION_PATH))));
    }

	
	private void deleteAsset(ResourceResolver resourceResolver, String destinationPath) {        
        try {
            final Node asset = resourceResolver.resolve(destinationPath).adaptTo(Node.class);
			asset.remove();
			asset.getSession().save();
            recordAction(destinationPath, "Deletion", "Synchronous delete");
        } catch (RepositoryException e) {
            LOGGER.error("unable to delete page {}", e.getMessage());
        }
    }
     
 
	
 
    @SuppressWarnings({"rawtypes", "unchecked"})
    private String getString(Map<String, CompositeVariant> row, String path) {
        CompositeVariant v = row.get(path.toLowerCase(Locale.ENGLISH));
        if (v != null) {
            return (String) v.getValueAs(String.class);
        } else {
            return null;
        }
    }
}