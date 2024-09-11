package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/nexgen-carousel")
public class NexGenCarouselModel extends BaseComponentPropertiesImpl{

    @ChildResource
    public List<NexGenCarouselCardsModel>  cards = new ArrayList<>();

    public List<NexGenCarouselCardsModel> getCards(){
        return Collections.unmodifiableList(new ArrayList<>(this.cards));
    }

}
