package com.abbott.aem.an.similac.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.an.similac.core.utils.SimilacUtils;

/**
 * 
 *  Disruptor Model is the SlingModel to hold the details of individual product disruptor component
 * 
 */
@Model(adaptables = {
 Resource.class,
 SlingHttpServletRequest.class
}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = { @ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class DisruptorModel {

 private static final String JCR_CONTENT_RENDITIONS_CQ5DAM_THUMBNAIL_48_48_PNG = "/jcr:content/renditions/cq5dam.thumbnail.48.48.png";

 @SlingObject
 private SlingHttpServletRequest request;

 @ValueMapValue
 private String drawerText;

 @ValueMapValue
 private String disruptorTitle;

 @ValueMapValue
 private String altText;

 @ValueMapValue
 private String ctaLabel;

 @ValueMapValue
 private String termsText;

 @ValueMapValue
 private String ctaURL;

 @ValueMapValue
 private String imagePathTab;

 @ValueMapValue
 private String imagePathMob;

 @ValueMapValue
 private String imagePath;

 public String getImagePathTab() {
  return imagePathTab;
 }

 public String getImagePathMob() {
  return imagePathMob;
 }

 public String getImagePath() {
  return imagePath;
 }
 /** The external link builder service. */


 String imageBase;

 @PostConstruct
 public void activate() {
  imageBase = imagePath + JCR_CONTENT_RENDITIONS_CQ5DAM_THUMBNAIL_48_48_PNG;
  ctaURL=SimilacUtils.linkChecker(ctaURL);
  
 }

 public String getImageBase() {
  return imageBase;
 }

 public String getDrawerText() {
  return drawerText;
 }

 public String getDisruptorTitle() {
  return disruptorTitle;
 }

 public String getCtaLabel() {
  return ctaLabel;
 }

 public String getTermsText() {
  return termsText;
 }

 public String getCtaURL() {
	 
  return ctaURL;
 }
 
 public String getAltText() {
  return altText;
 }

}