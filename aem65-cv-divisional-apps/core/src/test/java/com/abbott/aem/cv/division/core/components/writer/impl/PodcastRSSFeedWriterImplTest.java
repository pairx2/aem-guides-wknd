package com.abbott.aem.cv.division.core.components.writer.impl;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.xml.stream.XMLStreamException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.abbott.aem.cv.division.core.components.models.impl.PodcastImpl;
import com.abbott.aem.cv.division.core.components.models.impl.PodcastEpisodeImpl;



import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class PodcastRSSFeedWriterImplTest {
	
	
	
	Logger logger = LoggerFactory.getLogger(PodcastRSSFeedWriterImplTest.class);
	@InjectMocks
	private PodcastRSSFeedWriterImpl model;
	@BeforeEach 
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	PodcastImpl podcast = new PodcastImpl();
	private String feedPath = "abcfdgtyjgdhkkkjhffhkkhfdfuijh";
	  private ByteArrayOutputStream baos = new ByteArrayOutputStream();
	
	
	
	@Test
	void writeTest() {
		try {
			List<PodcastEpisodeImpl> list = new ArrayList<PodcastEpisodeImpl>();
			PodcastEpisodeImpl e1 = new PodcastEpisodeImpl();
			e1.setType("type1");
			e1.setUrl("abc/dfr/ery");
			list.add(e1);
			podcast.setEntries(list);
			podcast.setCategory("category1,category2,category3");
			model = new PodcastRSSFeedWriterImpl(podcast, baos, feedPath);
			model.write();
			Assertions.assertTrue(list.size()>0);
		} catch (XMLStreamException e) {
			// TODO Auto-generated catch block
			logger.error("XMLStreamException" , e);
		}
		
		
		
	}
	

}