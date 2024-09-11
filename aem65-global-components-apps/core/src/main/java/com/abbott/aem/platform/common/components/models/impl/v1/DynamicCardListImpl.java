package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.DynamicCardList;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;


import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import lombok.extern.slf4j.Slf4j;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceNotFoundException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.*;

import java.util.*;


@Data
@Slf4j

@Model(adaptables = { SlingHttpServletRequest.class },
        adapters = { DynamicCardList.class, ComponentExporter.class },
        resourceType = { SearchResultsImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class DynamicCardListImpl implements DynamicCardList {
    public static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/dynamiccardlist/v1/dynamiccardlist";
    private static final long serialVersionUID = -256425619548399065L;

    @Self
    @Delegate(types = Component.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private Component component;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String noOfResults;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String componentType;
    
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String imageDefault;
    
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String logoImage;
    
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String centerMode;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String variableWidth;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String arrows;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String dateFormat;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String title;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String filePath;


    @Getter
    @Setter
    private List<Page>listOfCards;

    @ScriptVariable
    @JsonIgnore
    protected ResourceResolver resolver;

    @ScriptVariable
    protected Page currentPage;

    @Getter
    @Setter
    private Resource res;

    public List<Page> getListOfCards() {
        listOfCards=new ArrayList<>();
        
        try {
            List<String> tags = new ArrayList<>();
            TagManager tagManager = resolver.adaptTo(TagManager.class);
            Tag[] tagCurrentResource={};
            if(null != currentPage) {
                tagCurrentResource = currentPage.getTags();
            }
            for (Tag tag : tagCurrentResource) {
                String tagstr = String.valueOf(tagManager.resolve(tag.getTagID()));
                tags.add(tagstr);
            }
            Resource filePathResource=resolver.getResource(filePath);
            Page filePathPage=null;
            Iterator<Page> chilrenResource= null;
            if(null != filePathResource){
            	
                filePathPage=filePathResource.adaptTo(Page.class);
                chilrenResource= filePathPage.listChildren();
            }
            while(chilrenResource!=null && chilrenResource.hasNext()){
                    Page childPage=chilrenResource.next();
                    int count=0;
                    Tag[] childPageTags=childPage.getTags();
                    for(Tag childTag:childPageTags){
                        String  childTagStr=String.valueOf(tagManager.resolve(childTag.getTagID()));
                        if(tags.contains(childTagStr)){
                            count++;
                        }
                    }
                    if(count>0 && !listOfCards.contains(childPage)){
                        listOfCards.add(childPage);
                    }
                }
				if(listOfCards.contains(currentPage)){
                    listOfCards.remove(currentPage);
                }
            

        }
        catch(ResourceNotFoundException  e){
            log.error("Exception", e.getMessage());

        }
        return Collections.unmodifiableList(listOfCards);
    }

    public String getFilePath() {

        return filePath;
    }

    public Resource getRes() {
        res=resolver.getResource(filePath);

        return res;
    }

}
