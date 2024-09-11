package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.via.ChildResource;

import javax.inject.Inject;
import java.util.List;


@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/contact-boxes")
public interface ContactBoxesModel extends BaseComponentProperties{

    @Inject
    String getTitle();


    @Inject
    String getOrderStatusLabel();


    @Inject
    String getNewsAndActionLabel();


    @Inject
    String getReminderLabel();


    @Inject
    String getEditLinkLabel();


    @Inject
    String getSaveButtonLabel();

    @Inject
    String getCancelButtonLabel();

    @Inject
    @Via(type = ChildResource.class)
    List<Mappings> getMappings();

    @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
    interface Mappings {

        @Inject
        String getKey();

        @Inject
        String getLabel();

        @Inject
        String getIconPath();
    }

}
