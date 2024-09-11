package com.abbott.aem.bts.cybersecurity.components.model;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Model(adaptables =  Resource.class)
public class ProductCategories  {
    @Inject
    @Optional
    public String numberOfCardsComponents;

    private  List<Integer> cardList;

    @PostConstruct
    protected void init(){
        if (numberOfCardsComponents!=null){
            int numberOfCards = 0;
            numberOfCards = Integer.parseInt(numberOfCardsComponents);
            cardList = new ArrayList<>();
            IntStream.range(0,numberOfCards).forEach(cardList::add);
        }
    }

    public List<Integer> getCardList() {
        return List.copyOf(cardList);
    }


}
