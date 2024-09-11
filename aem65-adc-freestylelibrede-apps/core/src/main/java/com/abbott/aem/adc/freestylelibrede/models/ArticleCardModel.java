package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.via.ChildResource;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public interface ArticleCardModel {
	@Inject
    String getSectionTitle();
    @Inject
    String getArticleClass();
    @Inject
    @Via(type = ChildResource.class)
    List<CardList> getCardList();


    @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
    interface CardList {

        @Inject
        String getArticleTitle();

        @Inject
        String getArticleDescription();

        @Externalize
        String getArticleLink();
       
    }
}