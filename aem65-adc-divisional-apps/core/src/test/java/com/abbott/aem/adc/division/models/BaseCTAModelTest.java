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
public class BaseCTAModelTest {

  @Rule
  public AemContext context = new AemContext();

  @InjectMocks
  private BaseCTAModel model = new BaseCTAModel();

  @BeforeEach
  void setup() throws NoSuchFieldException {
    context.load().json("/com/abbott/aem/adc/division/models/AccountVerificationBannerModel.json", "/content");
    PrivateAccessor.setField(model, "type", context.resourceResolver().getResource("/content/bannerButtons/0/cta").getValueMap().get("type"));
    PrivateAccessor.setField(model, "text", context.resourceResolver().getResource("/content/bannerButtons/0/cta").getValueMap().get("text"));
    context.addModelsForClasses(BaseCTAModel.class);
  }

  @Test
  public void getType() {
    Assert.assertEquals("primary", model.getType());
  }

  @Test
  public void getText() {
    Assert.assertEquals("Ja", model.getText());
  }

  @Test
  public void getLink() {
    Assert.assertEquals(null, model.getLink());
  }

  @Test
  public void getDisclaimer() {
    Assert.assertEquals(null, model.getDisclaimer());
  }

  @Test
  public void getAssetPath() {
    Assert.assertEquals(null, model.getAssetPath());
  }

  @Test
  public void getAction() {
    Assert.assertEquals(null, model.getAction());
  }

}
