package com.abbott.aem.cv.division.core.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

public interface VideoCarousel extends Component {

    public String getTitle();
    public String getDescription();
    public String getCardsPerScroll();
	public String getId();	
    public String getIconRight();	
	public String getIconLeft();
    public String getAccessibilityLabel();   
    public List<VideoCarouselItem> getChapterlist();
}

