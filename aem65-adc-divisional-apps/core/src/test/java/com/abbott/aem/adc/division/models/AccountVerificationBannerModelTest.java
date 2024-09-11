package com.abbott.aem.adc.division.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import junitx.util.PrivateAccessor;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.junit.Assert;
import org.junit.Rule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Iterator;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class})
public class AccountVerificationBannerModelTest {

  @Rule
  public AemContext context = new AemContext();

  @InjectMocks
  private AccountVerificationBannerModel model = new AccountVerificationBannerModel();

  @BeforeEach
  void setup() throws NoSuchFieldException {
    context.load().json("/com/abbott/aem/adc/division/models/AccountVerificationBannerModel.json", "/content");
    PrivateAccessor.setField(model, "heading", context.resourceResolver().getResource("/content").getValueMap().get("heading"));
    PrivateAccessor.setField(model, "subHeading", context.resourceResolver().getResource("/content").getValueMap().get("subHeading"));
    PrivateAccessor.setField(model, "bannerDescription", context.resourceResolver().getResource("/content").getValueMap().get("bannerDescription"));
    PrivateAccessor.setField(model, "hmmUrl", context.resourceResolver().getResource("/content").getValueMap().get("hmmUrl"));
    PrivateAccessor.setField(model, "subDescription", context.resourceResolver().getResource("/content").getValueMap().get("subDescription"));
    PrivateAccessor.setField(model, "bannerSubHeadingInfoText", context.resourceResolver().getResource("/content").getValueMap().get("bannerSubHeadingInfoText"));
    context.addModelsForClasses(AccountVerificationBannerModel.class);
  }

  @Test
  public void getHeading() {
    Assert.assertEquals("Registrierung erfolgreich", model.getHeading());
  }

  @Test
  public void getSubHeading() {
    Assert.assertEquals("Haben Sie schon die Technische Einweisung erhalten?", model.getSubHeading());
  }

  @Test
  public void getBannerDescription() {
    Assert.assertEquals("Vielen Dank für die Bestätigung Ihrer E-Mail-Adresse.<br>  Sie können sich nun in Ihrem Benutzerkonto anmelden.", model.getBannerDescription());
  }

  @Test
  public void getBannerSubHeadingInfoText() {
    Assert.assertEquals("Info Text", model.getBannerSubHeadingInfoText());
  }

  @Test
  public void getSubDescription() {
    Assert.assertEquals("Die Technische Einweisung ist gesetzliche Voraussetzung für die Anwendung und Erstattung des Messsystems durch Ihre gesetzliche Krankenversicherung.", model.getSubDescription());
  }

  @Test
  public void getHmmUrl() {
    Assert.assertEquals("https://technische-einweisung.freestylelibre.de/traininginfocapture?customerid=", model.getHmmUrl());
  }

  @Test
  public void getBannerButtons() {
    Assert.assertEquals(null, model.getBannerButtons());
  }

  @Test
  public void getCTASection() {

    Resource resource = context.resourceResolver().getResource("/content/bannerButtons");
    Iterator<Resource> itr = resource.listChildren();
    while (itr.hasNext()) {
      Resource bannerResource = itr.next();
      ValueMap vm = bannerResource.getValueMap();
      Assert.assertEquals("<p>RTE for Section for Yes</p>", vm.get("ctaSection"));
      Assert.assertEquals("yes-section", vm.get("ctaTargetSectiontId"));
      Assert.assertEquals("primary", bannerResource.getChild("cta").getValueMap().get("type"));
      Assert.assertEquals("Ja", bannerResource.getChild("cta").getValueMap().get("text"));
      break;
    }
  }
}
