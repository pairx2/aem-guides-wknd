package com.abbott.aem.platform.common.components.models.navigation.impl.v1;

import com.abbott.aem.platform.common.components.models.navigation.PlatformNavigation;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.experimental.Delegate;
import lombok.extern.slf4j.Slf4j;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode
@ToString
@Slf4j
@Model(adaptables = {SlingHttpServletRequest.class},
        adapters = {PlatformNavigation.class, ComponentExporter.class},
        resourceType = StaticNavigationImpl.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class StaticNavigationImpl implements PlatformNavigation {

    protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/megamenu/v1/megamenuversions";

    @Self
    @Delegate(types = Component.class)
    private Component component;

    @Self
    private SlingHttpServletRequest request;

    @Getter
    @ValueMapValue
    private String megaMenuStyle;

    @Inject
    private Resource resource;

    @ScriptVariable
    private Page currentPage;

    private List<NavigationItem> items;

    @Override
    public List<NavigationItem> getItems() {
        log.debug("Calling Static Navigation getItems" + resource.getPath());

        if (items == null) {
            items = new ArrayList<>();
            PageManager pageManager = currentPage.getPageManager();
            // Add the current node and then manage the child nodes
            NavigationUtil.addStaticPageItems(pageManager, resource, request, component, null, 0, this.items);
        }

        return List.copyOf(items);
    }
}
