package com.abbott.aem.adc.division.models;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account-verification-banner")
public class AccountVerificationBannerModel {

  @Getter
  @Inject
  String heading;

  @Getter
  @Inject
  String bannerDescription;

  @Getter
  @Inject
  String subHeading;

  @Getter
  @Inject
  String bannerSubHeadingInfoText;

  @Getter
  @Inject
  String subDescription;

  @Getter
  @Inject
  String hmmUrl;

  @Getter
  @ChildResource
  List<AccountVerificationBannerButtonsModel> bannerButtons;

}
