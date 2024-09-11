package com.abbott.aem.cv.division.core.components.models.impl;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertTrue;



@ExtendWith(MockitoExtension.class)
class PodcastEpisodeTest {
	PodcastEpisodeImpl podcastEpisode = new PodcastEpisodeImpl();
	@Test
	 public void TestGetRestricionType() {
		
		
		podcastEpisode.setRestricionType("country");
        assertTrue(podcastEpisode.getRestricionType() =="country");
    }
	
	@Test
	 public void TestGetRelationshipType() {
		
		
		podcastEpisode.setRelationshipType("allow");
       assertTrue(podcastEpisode.getRelationshipType() =="allow");
   }
	
	@Test
	 public void TestGetGuid() {
		
		
		podcastEpisode.setGuid("1234");
      assertTrue(podcastEpisode.getGuid() =="1234");
  }
	@Test
	 public void TestGetUrl() {
		
		
		podcastEpisode.setUrl("/content/cv/cardiovascular/");
      assertTrue(podcastEpisode.getUrl() =="/content/cv/cardiovascular/");
  }
	@Test
	 public void TestGetLength() {
		
		
		podcastEpisode.setLength("length");
      assertTrue(podcastEpisode.getLength() =="length");
  }
	@Test
	 public void TestGetPubDate() {
		
		
		podcastEpisode.setPubDate("date");
      assertTrue(podcastEpisode.getPubDate() =="date");
  }
	@Test
	 public void TestGetTitle() {
		
		
		podcastEpisode.setTitle("title");
      assertTrue(podcastEpisode.getTitle() =="title");
  }
	@Test
	 public void TestGetType() {
		
		
		podcastEpisode.setType("audio/mpeg");
     assertTrue(podcastEpisode.getType() =="audio/mpeg");
 }
	@Test
	 public void TestGetDescription() {
		
		
		podcastEpisode.setDescription("description");
     assertTrue(podcastEpisode.getDescription() =="description");
 }
	@Test
	 public void TestGetMediaContent() {
		
		
		podcastEpisode.setMediaContent("media content");
     assertTrue(podcastEpisode.getMediaContent() =="media content");
 }
	@Test
	 public void TestGetExplicit() {
		
		
		podcastEpisode.setExplicit("explicit");
     assertTrue(podcastEpisode.getExplicit() =="explicit");
 }
	@Test
	 public void TestGetDuration() {
		
		
		podcastEpisode.setDuration("");
        assertTrue(podcastEpisode.getDuration() =="");
 }
	@Test
	 public void TestGetKeywords() {
		
		
		podcastEpisode.setKeywords("keywords");
     assertTrue(podcastEpisode.getKeywords() =="keywords");
 }


}