package com.abbott.aem.cv.division.core.components.models;

import com.abbott.aem.cv.division.core.components.models.impl.PodcastEpisodeImpl;
import java.util.List;

public interface Podcast {
	
	
	public String getTitle();	
	
	public String getDescription();
	
	public String getLanguage();
	
	public String getAuthor();
	
	public String getImage();
	
	public String getExplicit();
	
	public String getCategory();
	
	public String getComplete();
	
	public String getType();
	
	public String getCountryOfOrigin();
	
	public List<PodcastEpisodeImpl> getEntries();	
	
	public String getLink();
	
	
}