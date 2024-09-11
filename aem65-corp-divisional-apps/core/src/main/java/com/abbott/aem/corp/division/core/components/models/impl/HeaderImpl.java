package com.abbott.aem.corp.division.core.components.models.impl;
import com.abbott.aem.corp.division.core.components.models.Header;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { Resource.class, SlingHttpServletRequest.class},
        adapters = {Header.class},
        resourceType = {HeaderImpl.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class HeaderImpl implements Header {

    public static final String RESOURCE_TYPE = "corp/division/component/content/header";

    @ValueMapValue
    @Setter
    public int linkStackCount;

    @Override
    public int getLinkStackCount() {
        return linkStackCount;
    }

    /**
     *
     * @return list of link stacks
     */
    @Override
    public List<String> getListOfLinkStack() {
        final int count = getLinkStackCount();
        List<String> listOfStacks = new ArrayList<>();
        for (int i = 1; i <= count; i++) {
            listOfStacks.add("linkstack-" + i);
        }
        return listOfStacks;
    }
}
