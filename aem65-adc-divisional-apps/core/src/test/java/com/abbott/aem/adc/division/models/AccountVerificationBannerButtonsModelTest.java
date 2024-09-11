package com.abbott.aem.adc.division.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junitx.util.PrivateAccessor;
import org.junit.Assert;
import org.junit.Rule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class})
public class AccountVerificationBannerButtonsModelTest {

  @Rule
  public AemContext context = new AemContext();

  @InjectMocks
  private AccountVerificationBannerButtonsModel model = new AccountVerificationBannerButtonsModel();

  @BeforeEach
  void setup() throws NoSuchFieldException {
    context.load().json("/com/abbott/aem/adc/division/models/AccountVerificationBannerModel.json", "/content");
    PrivateAccessor.setField(model, "ctaTargetSectiontId", context.resourceResolver().getResource("/content/bannerButtons/0").getValueMap().get("ctaTargetSectiontId"));
    PrivateAccessor.setField(model, "ctaSection", context.resourceResolver().getResource("/content/bannerButtons/0").getValueMap().get("ctaSection"));
    context.addModelsForClasses(AccountVerificationBannerButtonsModel.class);
  }

  @Test
  public void getCtaTargetSectiontId() {
    Assert.assertEquals("yes-section", model.getCtaTargetSectiontId());
  }

  @Test
  public void getCtaSection() {
    Assert.assertEquals("<p>RTE for Section for Yes</p>", model.getCtaSection());
  }
  @Test
  public void getCTA() {
    Assert.assertEquals(null,model.getCta());
  }
}
