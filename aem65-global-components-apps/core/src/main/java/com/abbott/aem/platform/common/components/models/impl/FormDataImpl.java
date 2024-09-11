package com.abbott.aem.platform.common.components.models.impl;

import com.abbott.aem.platform.common.components.models.FormData;
import com.abbott.aem.platform.common.components.models.impl.v1.ComponentProxyImpl;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.List;

@Data
@Model(adaptables = SlingHttpServletRequest.class, adapters = FormData.class, resourceType = FormDataImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FormDataImpl extends ComponentProxyImpl implements FormData {
    public static final String RESOURCE_TYPE = "abbott-platform/components/form/formdata/v1/formdata";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String dataSource;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String displayOutput;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String targetDataSource;

    @ValueMapValue
    @Default(intValues = 0)
    private Integer numberOfButtons;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String title;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String buttonPosition;

    @Override
    public List<String> getListOfButtons() {
        List<String> buttonsList = new ArrayList<>();

        for (int i = 0; i < numberOfButtons; i++) {
            buttonsList.add("btn-" + i);
        }

        return buttonsList;
    }
}
