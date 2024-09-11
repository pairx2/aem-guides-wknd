package com.abbott.aem.cv.division.core.components.models.impl;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertTrue;


@ExtendWith(MockitoExtension.class)
class PodcastTest {
	PodcastImpl podcast = new PodcastImpl();
	
	@Test
	 public void TestGetLanguage() {
		
		
		podcast.setLanguage("/content/cv/cardiovascular/");
      assertTrue(podcast.getLanguage() =="/content/cv/cardiovascular/");
  }
	@Test
	 public void TestGetAuthor() {
		
		
		podcast.setAuthor("length");
      assertTrue(podcast.getAuthor() =="length");
  }
	@Test 
	 public void TestGetImage() {
		
		
		podcast.setImage("date");
      assertTrue(podcast.getImage() =="date");
  }
	@Test
	 public void TestGetTitle() {
		
		
		podcast.setTitle("title");
      assertTrue(podcast.getTitle() =="title");
  }
	@Test
	 public void TestGetType() {
		
		
		podcast.setType("audio/mpeg");
     assertTrue(podcast.getType() =="audio/mpeg");
 }
	@Test
	 public void TestGetDescription() {
		
		
		podcast.setDescription("description");
     assertTrue(podcast.getDescription() =="description");
 }
	@Test
	 public void TestGetCategory() {
		
		
		podcast.setCategory("media content");
     assertTrue(podcast.getCategory() =="media content");
 }
	@Test
	 public void TestGetExplicit() {
		
		
		podcast.setExplicit("explicit");
     assertTrue(podcast.getExplicit() =="explicit");
 }
	@Test
	 public void TestGetComplete() {
		
		
		podcast.setComplete("duration");
     assertTrue(podcast.getComplete() =="duration");
 }
	@Test
	 public void TestGetCountryOfOrigin() {
		
		
		podcast.setCountryOfOrigin("keywords");
     assertTrue(podcast.getCountryOfOrigin() =="keywords");
 }
	@Test
	 public void TestGetLink() {
		
		
		podcast.setLink("keywords");
    assertTrue(podcast.getLink() =="keywords");

}
	
}