package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import java.util.List;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collections;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PlusServiceCancellationFormFieldModel extends BaseComponentPropertiesImpl{

    @Inject
    private String fieldId;

    @Inject
    private String fieldName;

    @Inject
    private String fieldplaceholder;

    @Inject
    private boolean required;

    @Inject
    private Integer textLimit;

    @Inject
    private String validationmessage;

    @Inject
    private String fieldType;

    @ChildResource
    private List<PlusServiceCancellationFormFieldModelOptions> options = new ArrayList<>();

    public String getFieldId(){
        return this.fieldId;
    }

    public String getFieldName(){
        return this.fieldName;
    }

    public String getFieldplaceholder(){
        return this.fieldplaceholder;
    }

    public boolean isRequired(){
        return this.required;
    }

    public Integer getTextLimit(){
        return this.textLimit;
    }

    public String getValidationmessage(){
        return this.validationmessage;
    }

    public String getFieldType(){
        return this.fieldType;
    }

    public List<PlusServiceCancellationFormFieldModelOptions> getOptions(){
        return Collections.unmodifiableList(new ArrayList<>(this.options));
    }
 
}