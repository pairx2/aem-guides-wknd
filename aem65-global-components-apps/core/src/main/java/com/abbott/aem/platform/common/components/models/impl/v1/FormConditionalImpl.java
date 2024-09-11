package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.CustomConditionalItem;
import com.abbott.aem.platform.common.components.models.FormConditional;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.*;
import lombok.experimental.Delegate;
import lombok.extern.slf4j.Slf4j;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Data
@EqualsAndHashCode(callSuper = false)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@Model(adaptables = {SlingHttpServletRequest.class, Resource.class},
        adapters = FormConditional.class,
        resourceType = {FormConditionalImpl.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FormConditionalImpl implements FormConditional {

    public static final String RESOURCE_TYPE = "abbott-platform/components/form/conditional/v1/conditional";
    private static final String OPTION_ITEMS_PATH = "items";
    private static final String VARIABLE_TYPE = "variable";

    @Self
    @Delegate(types = Component.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private Component component;

    @ChildResource(injectionStrategy = InjectionStrategy.OPTIONAL)
    @Named(OPTION_ITEMS_PATH)
    public List<Resource> itemResources;

    @ValueMapValue(name = "type")
    @Setter(AccessLevel.NONE)
    public String conditionalType;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String variableName;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String name;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String value;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String label;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String helpMessage;

    @Setter(AccessLevel.NONE)
    private List<CustomConditionalItem> conditionalItems = new ArrayList<>();

    private void populateConditionalMapping() {
        if (itemResources != null) {
            conditionalItems = new ArrayList<>();
            log.debug("Populating conditional mapping and values: {}", itemResources.size());
            for (Resource itemResource : itemResources) {
                CustomConditionalItem optionItem = new CustomConditionalItemImpl(itemResource);
                conditionalItems.add(optionItem);
            }
        }
    }

    public boolean isDynamic() {
        boolean dynamic = false;
        if (conditionalType.equalsIgnoreCase(VARIABLE_TYPE)) {
            dynamic = true;
        }
        log.debug("Conditional Type {}", conditionalType);
        return dynamic;
    }

    public List<CustomConditionalItem> getConditionalItems() {
        if (conditionalItems.isEmpty()) {
            populateConditionalMapping();
        }
        return Collections.unmodifiableList(conditionalItems);
    }

    @Override
    public String getConditionalJson() {
        if (conditionalItems.isEmpty()) {
            populateConditionalMapping();
        }
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setPrettyPrinting().create();
        return gson.toJson(conditionalItems);
    }

    public String getUniqueId() {
        return "conditional-container_" + System.nanoTime();
    }

    public String getUniqueCheckboxId() {
        return "checkbox_" + System.nanoTime();
    }

}
