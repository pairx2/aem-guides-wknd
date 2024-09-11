package com.abbott.aem.cv.division.core.components.listener;

import com.abbott.aem.cv.division.core.components.models.impl.PodcastEpisodeImpl;
import org.apache.sling.api.resource.Resource;

public interface RSSFeedListener {
	
	
	public void setItem(PodcastEpisodeImpl podcastEpisodeBean); 
	public String setDates(Resource contentNode);
	public void setId(Resource contentNode);
		
	}