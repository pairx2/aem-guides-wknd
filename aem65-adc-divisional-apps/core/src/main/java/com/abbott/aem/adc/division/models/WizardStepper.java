package com.abbott.aem.adc.division.models;

import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Setter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class WizardStepper {

  @ChildResource
  @Setter(AccessLevel.NONE)
  public List<Resource> steps;

  public List<Resource> getSteps() {
    return steps;
  }
}
