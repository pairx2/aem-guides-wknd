package com.abbott.aem.cloud.api.jobs;

import java.io.StringReader;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.json.Json;
import javax.json.JsonException;
import javax.json.JsonObject;
import javax.json.JsonReader;
import org.apache.sling.api.resource.LoginException;
import com.day.cq.wcm.api.WCMException;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

/**
 * @author BALAKKX6 AEM Job is to be consumed by ESL for creating the Product
 * page which will be updated or used by cybersecurity Admin.
 *
 */

@Component(
immediate = true,
service = { JobConsumer.class, AbbottJob.class },
property = {
        JobConsumer.PROPERTY_TOPICS + "=" +BTSCyberSecurityProductCreationJob.TOPIC})
public class BTSCyberSecurityProductCreationJob implements JobConsumer, AbbottJob {
public static final String CONF_BTS_TEMPLATE = "/conf/bts/cybersecurity/settings/wcm/templates/cybersecurity-product-page-template";
@Reference
ResourceResolverFactory resolverFactory;
private static final Logger log = LoggerFactory.getLogger(BTSCyberSecurityProductCreationJob.class);
public static final String TOPIC = "admincybersecurity/createproductpage/esl/job";
protected static final String BTS_SERVICE = "bts-cybersecurity-system-user";
public static final String PAYLOAD_JSON = "data";
public static final String PAYLOAD = "payload";
private String payObj="";
Page newPage = null;
private String name ="";
private String title ="";
private String prodId="";
private String prodPath=""; 
private String navTitle="";
private String jcrContent = JcrConstants.JCR_CONTENT;
private String cqPage="cq:PageContent";

@Override
public JobResult process(Job job) {
        JobResult result = JobResult.OK;
         payObj = job.getProperty(PAYLOAD_JSON).toString();
        log.debug("in process method with payload as ==> {} ", payObj);
        try (JsonReader jsonReader = Json.createReader(new StringReader(payObj));
		ResourceResolver resolver = resolverFactory.getServiceResourceResolver(getResolverParams())){
                JsonObject object = jsonReader.readObject();
                log.info("JSON content {}", object.toString());
                name= object.getString("productName");
                title= object.getString("pageTitle");
                prodId = object.getString("productId");
                prodPath = object.getString("productPath");
                navTitle = object.getString("navigationTitle");
                String[] parts = prodPath.split("/");
                String prodPageName = parts[parts.length-1];
                @SuppressWarnings("java:S2184")
                String basePath = Arrays.stream(parts)
                                        .limit(parts.length-1)
                                        .collect(Collectors.joining("/", "","/"));
                log.debug("basepath value {}",basePath);
                log.debug("prodPage name is  {} ",prodPageName);   
                String pagePath =basePath;
                String templatePath = CONF_BTS_TEMPLATE;
                String pageTitle = title;
                String pageName = prodPageName;
                String productPagePath = pagePath + prodPageName;
                log.debug("Path of the page is {} ",productPagePath);
                Resource resource = resolver.getResource(productPagePath);
                if(resource == null){
                        PageManager pageManager = resolver.adaptTo(PageManager.class);
                        newPage = pageManager.create(pagePath, pageName, templatePath, pageTitle);
                        log.debug("page value {} ",newPage);
                        Resource resources = resolver.getResource(newPage.getPath());
                        log.debug("resources value {}",resources);
                        Node pageNode = resources.adaptTo(Node.class);
                        Node jcrNode = null;
                        Session session = resolver.adaptTo(Session.class);
                        if(newPage.hasContent()){
                                jcrNode = newPage.getContentResource().adaptTo(Node.class);
                        }
                        else{
                                jcrNode = pageNode.addNode(jcrContent,cqPage);
                        }
                        jcrNode.setProperty("productId",prodId);
                        jcrNode.setProperty("navTitle",navTitle);
                        jcrNode.setProperty("pageTitle",title);
                        session.save();
               }
                else{
                        result = JobResult.CANCEL;
                        log.debug("page is already there");
                }
        }catch (JsonException | LoginException | WCMException | RepositoryException e) {
                         log.error("Error is process {}",e);
	}
        return result;
}


public String getTopic() {
        return TOPIC;
}

public String getServiceUser() {
        return BTS_SERVICE;
}

@JsonProperty("productId")
public String getProductId(){
        return prodId;
}

public void setProductId(String id){
        this.prodId = id;
}

@JsonProperty("productName")
public String getProductName(){
        return name;
}

public void setProductName(String name){
        this.name = name;
}
@JsonProperty("pageTitle")
public String getTitle(){
        return title;
}

public void setTitle(String title){
        this.title = title;
}
@JsonProperty("productPath")
public String getProductPath(){
        return prodPath;
}

public void setProductPath(String prodPath){
        this.prodPath = prodPath;
}
@JsonProperty("navigationTitle")
public String getNavigationTitle(){
        return navTitle;
}

public void setNavigationTitle(String navTitle){
        this.navTitle = navTitle;
}
public BTSCyberSecurityProductCreationJob(){
        this.name= "";
        this.prodId= "";
        this.title="";
        this.navTitle="";
        this.prodPath="";
}
public String getPayload(){
        return payObj;
}

public void setPayload(String payload){
        this.payObj = payload;
}
public BTSCyberSecurityProductCreationJob(Node node) {
         this.jcrContent = navTitle;
}


private static Map<String, Object> getResolverParams() {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(ResourceResolverFactory.SUBSERVICE, BTS_SERVICE);
        return parameters;
}

}
