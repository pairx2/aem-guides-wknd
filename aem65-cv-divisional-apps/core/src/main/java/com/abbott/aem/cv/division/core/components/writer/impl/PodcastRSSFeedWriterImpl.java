package com.abbott.aem.cv.division.core.components.writer.impl;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.xml.stream.XMLEventFactory;
import javax.xml.stream.XMLEventWriter;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.Characters;
import javax.xml.stream.events.EndElement;
import javax.xml.stream.events.StartDocument;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;

import com.abbott.aem.cv.division.core.components.models.Podcast;
import com.abbott.aem.cv.division.core.components.models.PodcastEpisode;



public class PodcastRSSFeedWriterImpl {
	private static final Logger logger = LoggerFactory.getLogger(PodcastRSSFeedWriterImpl.class);
	
	String actual = StringUtils.EMPTY;
	private String feedPath;
	private ByteArrayOutputStream baos;
    private Podcast podcastBean;
    HashMap<String, String> episodeMap = new HashMap<>();
    HashMap<String, String> podCastMap = new HashMap<>();
    HashMap<String, String> mediaRestrictionMap = new HashMap<>();

	

    public PodcastRSSFeedWriterImpl(Podcast podcastBean, ByteArrayOutputStream baos, String feedPath) {
        this.podcastBean = podcastBean;
        this.baos = baos;
        this.feedPath = feedPath;
    }


    public void write() throws XMLStreamException {
    	
        // create a XMLOutputFactory
        XMLOutputFactory outputFactory = XMLOutputFactory.newInstance();

        // create XMLEventWriter
        XMLEventWriter eventWriter = outputFactory.createXMLEventWriter(baos);
     

        // create a EventFactory

        XMLEventFactory eventFactory = XMLEventFactory.newInstance();
        XMLEvent end = eventFactory.createDTD("\n");

        // create and write Start Tag

        StartDocument startDocument = eventFactory.createStartDocument();

        eventWriter.add(startDocument);

        // create open tag
        eventWriter.add(end);

        StartElement rssStart = eventFactory.createStartElement(actual, actual, "rss");
        eventWriter.add(rssStart);
        eventWriter.add(eventFactory.createAttribute("xmlns:itunes", "http://www.itunes.com/dtds/podcast-1.0.dtd"));
        eventWriter.add(eventFactory.createAttribute("xmlns:media", "http://www.itunes.com/dtds/podcast-1.0.dtd"));
        eventWriter.add(eventFactory.createAttribute("xmlns:atom", "http://www.w3.org/2005/Atom"));
        eventWriter.add(eventFactory.createAttribute("xmlns:spotify", "http://www.spotify.com/ns/rss"));
        eventWriter.add(eventFactory.createAttribute("version", "2.0"));
        eventWriter.add(end);

        eventWriter.add(eventFactory.createStartElement(actual, actual, "channel"));
        eventWriter.add(end);

        // Write the different nodes
       
        createNode(eventWriter, "title", podcastBean.getTitle(), null);
        
       
        podCastMap.put("href", feedPath);
       
        podCastMap.put("rel", "self");
        podCastMap.put("type", "application/rss+xml");
        createNode(eventWriter, "atom:link", actual, podCastMap); 
       
        createNode(eventWriter, "link", podcastBean.getLink(), null);
        createNode(eventWriter, "description", podcastBean.getDescription(), null);
        
        eventWriter.add(eventFactory.createStartElement(actual, actual, "itunes:owner"));
        eventWriter.add(end);
        createNode(eventWriter, "itunes:name", "Abbott", null);
        createNode(eventWriter, "itunes:email", "hfprofed@abbott.com", null);
        createNode(eventWriter, "itunes:block", "yes", null);
        eventWriter.add(end);
        eventWriter.add(eventFactory.createEndElement(actual, actual, "itunes:owner"));
        eventWriter.add(end);
       

        createNode(eventWriter, "language", podcastBean.getLanguage(), null);
        
        createNode(eventWriter, "itunes:author", podcastBean.getAuthor(), null);
        
        podCastMap.clear();
        podCastMap.put("href", podcastBean.getImage());
        
        createNode(eventWriter, "itunes:image",actual,podCastMap);
        
        createNode(eventWriter, "itunes:explicit", podcastBean.getExplicit(), null);
        
        String podcastCategory = podcastBean.getCategory();
        if(podcastCategory!=null && podcastCategory.contains(",")){
        	podCastMap.clear();
        	String[] categories = podcastCategory.split(",");        	
        	for(int i=0;i<categories.length;i++){
        		podCastMap.put("text", categories[i]);
        		createNode(eventWriter, "itunes:category", actual, podCastMap);
        		
        	}	
        	
        }
       
        createNode(eventWriter, "itunes:complete", podcastBean.getComplete(), null);
        createNode(eventWriter, "itunes:type", podcastBean.getType(), null);
        
        createNode(eventWriter, "spotify:countryoforigin", podcastBean.getCountryOfOrigin(), null);

     

        for (PodcastEpisode entry : podcastBean.getEntries()) {
        	
            eventWriter.add(eventFactory.createStartElement(actual, actual, "item"));
            eventWriter.add(end);
            createNode(eventWriter, "guid", entry.getGuid(), null);
            createNode(eventWriter, "title", entry.getTitle(), null);
            createNode(eventWriter, "description", entry.getDescription(), null);
           
            
            
            createNode(eventWriter, "pubDate", entry.getPubDate(),null);
            createNode(eventWriter, "itunes:keywords", entry.getKeywords(),null);
            episodeMap.put("type", entry.getType());
            episodeMap.put("url", entry.getUrl());
            mediaRestrictionMap.put("relationship", entry.getRelationshipType());
            mediaRestrictionMap.put("type", entry.getRestricionType());

            /** Replacing media:content element with enclosure as per CVNM_191-1380 **/
           
            createNode(eventWriter, "enclosure", actual,episodeMap);
            createNode(eventWriter, "itunes:duration", entry.getDuration(),null);
            createNode(eventWriter, "media:restriction", podcastBean.getCountryOfOrigin() ,mediaRestrictionMap);
           
            
            eventWriter.add(end);
            eventWriter.add(eventFactory.createEndElement(actual, actual, "item"));
            eventWriter.add(end);

        }

        eventWriter.add(end);
        eventWriter.add(eventFactory.createEndElement(actual, actual, "channel"));
        eventWriter.add(end);
        eventWriter.add(eventFactory.createEndElement(actual, actual, "rss"));
       

        eventWriter.add(end);

        eventWriter.add(eventFactory.createEndDocument());

        eventWriter.close();
        
    }

    private void createNode(XMLEventWriter eventWriter, String name, String value, HashMap<String, String> attributes)  {
        XMLEventFactory eventFactory = XMLEventFactory.newInstance();
        XMLEvent end = eventFactory.createDTD("\n");
        XMLEvent tab = eventFactory.createDTD("\t");
        try {
        // create Start node
        StartElement sElement = eventFactory.createStartElement(actual, actual, name);
        eventWriter.add(tab);
        eventWriter.add(sElement);
       
     // create attributes
        if(attributes!=null){
        	for (Map.Entry<String,String> entry : attributes.entrySet()) {
        		eventWriter.add(eventFactory.createAttribute(entry.getKey(), entry.getValue()));
        	}
        }
        	
        // create Content
        Characters characters = eventFactory.createCharacters(value);
        
        eventWriter.add(characters);
        // create End node
        EndElement eElement = eventFactory.createEndElement(actual, actual, name);
        eventWriter.add(eElement);
        
        eventWriter.add(end);
        } catch (XMLStreamException e) {
        	logger.error("Error in XMLStreamException", e);
        }

    }
    }
