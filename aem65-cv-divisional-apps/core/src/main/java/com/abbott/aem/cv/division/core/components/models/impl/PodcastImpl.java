package com.abbott.aem.cv.division.core.components.models.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import com.abbott.aem.cv.division.core.components.models.Podcast;

import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.ArrayList;

@Slf4j
@Model(adaptables = { SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PodcastImpl implements Podcast{
	String title = "Between Two Ventricles";
	private static final String DESCRIPTION1= "as our host, Phil Adamson MD, interviews leading specialists in the field of heart failure; highlighting the most up ";
	private static final String DESCRIPTION2= "to date innovations, products and technologies for patient management and optimizing cardiac hemodynamics. <br><br> For more ";
	private static final String DESCRIPTION3= "educational content on Abbott's life-changing medical device technologies and resources, please visit cardiovascular.abbott ";
	private static final String DESCRIPTION4= "Between Two Ventricles&#x2122 is the new cardiology podcast series brought to you by Abbott. Join us every month ";
	String description= DESCRIPTION4.concat((DESCRIPTION1).concat((DESCRIPTION2).concat((DESCRIPTION3))));
	String language = "en";
	String author="Abbott";
	String image="https://www.cardiovascular.abbott/content/dam/cv/cardiovascular/root/43600_HF_BTV-Podcast-ART_FNL.png";
	String explicit="clean";
	String category = "Health,Technology";
	String complete="no";
	String type = "episodic";
	String countryOfOrigin = "us";
	String link="https://cardiovascular.abbott/us/en/hcp/education-training/heart-failure-education/between-two-ventricles-podcast-feed.html ";
	
	List<PodcastEpisodeImpl> entries = new ArrayList<>();
	
	public String getTitle(){
		return title;
	}
	
	public void setTitle(String title){
		this.title=title;
	}
	
	public String getDescription(){
		return description;
	}
	
	public void setDescription(String description){
		this.description=description;
	}	
	
	
	public String getLanguage(){
		return language;
	}
	
	public void setLanguage(String language){
		this.language=language;
	}
	
	public String getAuthor(){
		return author;
	}
	
	public void setAuthor(String author){
		this.author=author;
	}
	
	public String getImage(){
		return image;
	}
	
	public void setImage(String image){
		this.image=image;
	}
	
	public String getExplicit(){
		return explicit;
	}
	
	public void setExplicit(String explicit){
		this.explicit=explicit;
	}
	
	public String getCategory(){
		return category;
	}
	
	public void setCategory(String category){
		this.category=category;
	}
	
	public String getComplete(){
		return complete;
	}
	
	public void setComplete(String complete){
		this.complete=complete;
	}
	
	public String getType(){
		return type;
	}
	
	public void setType(String type){
		this.type=type;
	}
	
	public String getCountryOfOrigin(){
		return countryOfOrigin;
	}
	
	public void setCountryOfOrigin(String countryOfOrigin){
		this.countryOfOrigin=countryOfOrigin;
	}
	
	public List<PodcastEpisodeImpl> getEntries(){

		return entries;
	}
	
	public void setEntries(List<PodcastEpisodeImpl> entries){
		this.entries=entries;
	}
	
	public String getLink(){
		return link;
	}
	
	public void setLink(String link){
		this.link=link;
	}		
		
}