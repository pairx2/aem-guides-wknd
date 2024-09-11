package com.abbott.aem.cloud.platform.core.mcp;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import com.adobe.acs.commons.mcp.ProcessDefinitionFactory;
import com.day.cq.replication.Replicator;
 
@Component(service = ProcessDefinitionFactory.class, immediate = true)
public class AssetUnpublishFactory extends ProcessDefinitionFactory<AssetUnpublish> {
 
    @Reference
    Replicator replicator;
 
    @Override
    public String getName() {
        return "Abbott Asset Unpublish";
    }
 
    @Override
    protected AssetUnpublish createProcessDefinitionInstance() {
        return new AssetUnpublish(replicator);
    }
}
