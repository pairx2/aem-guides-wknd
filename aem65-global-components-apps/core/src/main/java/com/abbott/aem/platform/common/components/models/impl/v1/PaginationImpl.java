package com.abbott.aem.platform.common.components.models.impl.v1;
import com.abbott.aem.platform.common.components.models.Pagination;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import lombok.*;
import lombok.experimental.Delegate;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = {SlingHttpServletRequest.class},
        adapters = {Pagination.class, ComponentExporter.class},
        resourceType = {PaginationImpl.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PaginationImpl extends ComponentProxyImpl implements Pagination {

    protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/pagination/v1/pagination";

    @Self
    @Delegate(types = Component.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private Component component;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String paginationType;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    boolean hidePrevious;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    boolean hideNext;

    @ValueMapValue
    @Default(intValues = 0)
    @Setter(AccessLevel.NONE)
    int pageSize;

    @Override
    public String getPaginationType() {
        return paginationType;
    }

    @Override
    public boolean isHidePrevious() {
        return hidePrevious;
    }

    @Override
    public boolean isHideNext() {
        return hideNext;
    }

    @Override
    public int getPageSize() {
        return pageSize;
    }
}