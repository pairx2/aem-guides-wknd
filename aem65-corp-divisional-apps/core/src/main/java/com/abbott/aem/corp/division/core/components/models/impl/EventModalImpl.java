package com.abbott.aem.corp.division.core.components.models.impl;
import com.abbott.aem.corp.division.core.components.models.EventModal;
import com.abbott.aem.corp.division.core.components.models.LinkModal;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import java.util.List;


@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {EventModal.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class EventModalImpl  implements EventModal{

	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String eventDate;

	@Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String title;

    @ChildResource
    @Setter(AccessLevel.NONE)
    @Getter
    public List<LinkModal> links;
}
