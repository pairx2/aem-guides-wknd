package com.abbott.aem.cloud.platform.core.mcp;
 
import java.io.IOException;
import java.util.*;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
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
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationOptions;
import com.day.cq.replication.Replicator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
public class AssetUnpublish extends ProcessDefinition {
 
    private static final Logger LOGGER = LoggerFactory.getLogger(AssetUnpublish.class);
    private static final String DESTINATION_PATH = "destination";
    private final GenericReport unpublishReport = new GenericReport();
    private static final String REPORT_NAME = "TreeReplication-report";
    private static final String RUNNING = "Running "; 
    private static final String EXECUTING_KEYWORD = " Tree Replication";
 
    protected enum QueueMethod {
         USE_MCP_QUEUE
    }
 
    protected enum ReplicationAction {
         UNPUBLISH
    }
 
    Replicator replicatorSer;
 
    @FormField(name = "Replication Excel", component = FileUploadComponent.class)
    private RequestParameter replicationPathExcel;
    private Spreadsheet spreadSheet;
 
    @FormField(name = "Queueing Method for unpublish",
            component = SelectComponent.EnumerationSelector.class,
            description = "For small publishing tasks, standard is sufficient. For large folder trees, MCP is recommended.",
            options = "default=USE_MCP_QUEUE")
    QueueMethod queMethod = QueueMethod.USE_MCP_QUEUE;
 
    @FormField(name = "Agents for Unpublish",
            component = TextfieldComponent.class,
            hint = "(leave this blank for default agents)",
            description = "Publish agents to use, if blank then all default agents will be used. Multiple agents can be listed using commas or regex.")
    private String agentsNew;
    List<String> agentsList = new ArrayList<>();
    AgentFilter replicationsAgentFilter;
 
    @FormField(name = "Action",
            component = SelectComponent.EnumerationSelector.class,
            description = "Unpublish?",
            options = "default=UNPUBLISH")
    ReplicationAction repAction = ReplicationAction.UNPUBLISH;
 
    public AssetUnpublish(Replicator replicator) {
        replicatorSer = replicator;
    }
 
    @Override
    public void init() throws RepositoryException {
        try {
            // Read spreadSheet
            spreadSheet = new Spreadsheet(replicationPathExcel, DESTINATION_PATH).buildSpreadsheet();
        } catch (IOException e) {
            throw new RepositoryException("Unable to process spreadSheet", e);
        }
    }
 
    @Override
    public void buildProcess(ProcessInstance inst, ResourceResolver resResolver) throws LoginException, RepositoryException {                
        unpublishReport.setName(REPORT_NAME);                
        inst.getInfo().setDescription(RUNNING + repAction + EXECUTING_KEYWORD);    
         if (repAction == ReplicationAction.UNPUBLISH) {
            inst.defineCriticalAction("Deactivate tree structure", resResolver, this::deactivateTreeStruct);
        } 
    }
 
    public enum RepColumns {
        PATH, ACTION, DESCRIPTION
    }
 
    List<EnumMap<RepColumns, String>> repData = Collections.synchronizedList(new ArrayList<>());
 
    private void recAction(String path, String action, String description) {
        EnumMap<RepColumns, String> row = new EnumMap<>(RepColumns.class);
        row.put(RepColumns.PATH, path);
        row.put(RepColumns.ACTION, action);
        row.put(RepColumns.DESCRIPTION, description);
        repData.add(row);
    }
 
    @Override
    public void storeReport(ProcessInstance inst, ResourceResolver resResolver) throws RepositoryException, PersistenceException {       
        unpublishReport.setRows(repData, RepColumns.class);
        unpublishReport.persist(resResolver, inst.getPath() + "/jcr:content/report");
    }
 
    private void deactivateTreeStruct(ActionManager action) {
        spreadSheet.getDataRowsAsCompositeVariants().forEach(row -> performAsyncReplication(action, getString(row, DESTINATION_PATH)));
    }
     
    private void performAsyncReplication(ActionManager action, String path) {
        ReplicationOptions option = buildOptions();
        option.setSynchronous(false);
        schReplication(action, option, path);
        recAction(path, repAction == ReplicationAction.UNPUBLISH ? "Unpublish" : "Publish", "Asynchronous replication");
    }
 
    private ReplicationOptions buildOptions() {
        ReplicationOptions option = new ReplicationOptions();
        option.setFilter(replicationsAgentFilter);
        return option;
    }
 
    private void schReplication(ActionManager action, ReplicationOptions option, String path) {
            action.deferredWithResolver(resResolver -> {
            	LOGGER.info("inside schReplication");
                Session session = resResolver.adaptTo(Session.class);
                replicatorSer.replicate(session, repAction == ReplicationAction.UNPUBLISH ? ReplicationActionType.DEACTIVATE : ReplicationActionType.ACTIVATE, path, option);
            }); 
    }
 
    @SuppressWarnings({"rawtypes", "unchecked"})
    private String getString(Map<String, CompositeVariant> rows, String path) {
        CompositeVariant variant = rows.get(path.toLowerCase(Locale.ENGLISH));
        if (variant != null) {
            return (String) variant.getValueAs(String.class);
        } else {
            return null;
        }
    }
}