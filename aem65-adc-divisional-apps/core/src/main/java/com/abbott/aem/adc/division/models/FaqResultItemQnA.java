package com.abbott.aem.adc.division.models;

import com.abbott.aem.adc.division.utils.CommonConstants;
import com.adobe.cq.dam.cfm.ContentFragment;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.RequestAttribute;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.Objects;
import java.util.Optional;

@Data
@Model(adaptables = {SlingHttpServletRequest.class, Resource.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FaqResultItemQnA {

  private static final Logger LOGGER = LoggerFactory.getLogger(FaqResultItemQnA.class);
  @Setter(AccessLevel.NONE)
  private String faqTitle;

  @Setter(AccessLevel.NONE)
  private String faqDescription;

  @ValueMapValue
  @Setter(AccessLevel.NONE)
  private String faqParentFolderPath;

  @ValueMapValue
  @Setter(AccessLevel.NONE)
  private String noFaqText;

  @RequestAttribute
  private String faqPath;

  @Self
  private SlingHttpServletRequest slingHttpServletRequest;

  @PostConstruct
  protected void getFaqDetails() {

    faqPath = faqPath != null ? faqPath : StringUtils.EMPTY;
    faqParentFolderPath = faqParentFolderPath != null ? faqParentFolderPath : faqPath;

    String cfValue = slingHttpServletRequest.getParameter(CommonConstants.CF) != null ? slingHttpServletRequest.getParameter(CommonConstants.CF) : StringUtils.EMPTY;
    LOGGER.debug("getParameter:{}", slingHttpServletRequest.getParameter(CommonConstants.CF));
    ResourceResolver resourceResolver = slingHttpServletRequest.getResourceResolver();
    LOGGER.debug("faqparent:{}", resourceResolver.getResource(faqParentFolderPath + CommonConstants.SLASH + cfValue));
    ContentFragment cf = Optional.ofNullable(resourceResolver.getResource(faqParentFolderPath + CommonConstants.SLASH + cfValue)).map(e -> e.adaptTo(ContentFragment.class)).orElse(null);

    if (cf != null && !faqPath.equals(StringUtils.EMPTY)) {
      this.faqTitle = Objects.requireNonNull(cf.getElement(CommonConstants.QUESTION).getValue().getValue()).toString().replaceAll("<[^>]*>", "");
      this.faqDescription = Objects.requireNonNull(cf.getElement(CommonConstants.ANSWER).getValue().getValue()).toString().replaceAll("<[^>]*>", "");
    }
    else if(cf != null) {
      this.faqTitle = Objects.requireNonNull(cf.getElement(CommonConstants.QUESTION).getValue().getValue()).toString();
      this.faqDescription = Objects.requireNonNull(cf.getElement(CommonConstants.ANSWER).getValue().getValue()).toString();
    }

  }
}
