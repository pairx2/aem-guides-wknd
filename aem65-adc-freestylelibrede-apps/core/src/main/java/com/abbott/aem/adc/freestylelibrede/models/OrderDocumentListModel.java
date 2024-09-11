package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/account/order-document-list")
public class OrderDocumentListModel extends BaseComponentPropertiesImpl{

    @Inject
    private String heading;

    @Inject
    private String subHeading;

    @Inject
    @Default(intValues = 10)
	private int numberOfResults;

    public String getHeading(){
        return this.heading;
    }

    public String getSubHeading(){
        return this.subHeading;
    }

	public int getNumberOfResults(){
        return this.numberOfResults;
    }
}
