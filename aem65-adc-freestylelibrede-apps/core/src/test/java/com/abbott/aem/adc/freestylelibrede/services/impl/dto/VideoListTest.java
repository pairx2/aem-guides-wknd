package com.abbott.aem.adc.freestylelibrede.services.impl.dto;

import java.io.IOException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;

import com.abbott.aem.adc.freestylelibrede.dto.VideoList;

import junitx.framework.Assert;

public class VideoListTest {

	@InjectMocks
	VideoList videoList;

	@BeforeEach
	void setup() throws IOException {
		videoList = new VideoList();
		videoList.setThumbnailImage("thumbnailImage");
		videoList.setVideoId("videoId");
	}

	@Test
	void testThumbnailImage() {
		Assert.assertEquals("thumbnailImage", videoList.getThumbnailImage());	
	}
	@Test
	void testVideoId() {
		Assert.assertEquals("videoId", videoList.getVideoId());
	}
		
}
