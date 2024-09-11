package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NexGenCarouselCardsModel{

    @Inject
    private String cardTitle;

    @Inject
    private String cardImage;

    @Inject
    private String htmlText;

    @ChildResource
    private BaseCTAModel cta;

    public String getCardTitle(){
        return this.cardTitle;
    }

    public String getCardImage(){
        return this.cardImage;
    }

    public String getHtmlText(){
        return this.htmlText;
    }

    public BaseCTAModel getCta(){
        return this.cta;
    }

}
