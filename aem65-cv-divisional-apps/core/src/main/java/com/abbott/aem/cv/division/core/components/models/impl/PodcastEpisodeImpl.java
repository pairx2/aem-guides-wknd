package com.abbott.aem.cv.division.core.components.models.impl;


import org.apache.commons.lang3.StringUtils;
import com.abbott.aem.cv.division.core.components.models.PodcastEpisode;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Model(adaptables = { SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PodcastEpisodeImpl implements PodcastEpisode{

	String guid;
	String url;
	String type = "audio/mpeg";
	String length;
	String pubDate;
	String title;
	String description;
	String mediaContent;
	String duration;
	String explicit = "clean";
	String keywords;
	String restricionType ="country";
	String relationshipType="allow";
	
	public String getRestricionType() {
		return restricionType;
	}

	public void setRestricionType(String restricionType) {
		this.restricionType = restricionType;
	}

	public String getRelationshipType() {
		return relationshipType;
	}

	public void setRelationshipType(String relationshipType) {
		this.relationshipType = relationshipType;
	}

	public String getGuid(){
		return guid;
	}
	
	public void setGuid(String guid){
		this.guid=guid;
	}
	
	public String getUrl(){
		return url;
	}
	
	public void setUrl(String url){
		this.url=url;
	}
	
	public String getLength(){
		return length;
	}
	
	public void setLength(String length){
		this.length=length;
	}
	
	public String getPubDate(){
		return pubDate;
	}
	
	public void setPubDate(String pubDate){
		this.pubDate=pubDate;
	}
	
	public String getTitle(){
		return title;
	}
	
	public void setTitle(String title){
		this.title=title;
	}
	
	public String getType(){
		return type;
	}
	
	public void setType(String type){
		this.type=type;
	}
	
	public String getDescription(){
		if(StringUtils.isNotBlank(description) && description.contains("|"))
			return description.substring(0, description.indexOf("|")-1);
		else
			return description;
	}
	
	public void setDescription(String description){
		
		if(StringUtils.isNotBlank(description) && description.contains("|")){	
			String descValue = description.substring(0, description.indexOf("|"));
			this.description=descValue;
		}	
		else
			this.description=description;
	}
	
	public String getMediaContent(){
		return mediaContent;
	}
	
	public void setMediaContent(String mediaContent){
		this.mediaContent=mediaContent;
	}
	
	public String getExplicit(){
		return explicit;
	}
	
	public void setExplicit(String explicit){
		this.explicit=explicit;
	}
	
	public String getDuration(){		
			return duration;
	}
	
	public void setDuration(String duration){
		if(StringUtils.isNotBlank(duration) && duration.contains("|")) {	
		this.duration=duration.substring(duration.indexOf("|")+1);
		}
		else {
		this.duration=StringUtils.EMPTY;
		}
}
	
	public String getKeywords(){
		return keywords;
	}
	
	public void setKeywords(String keywords){
		this.keywords=keywords;
	}
}