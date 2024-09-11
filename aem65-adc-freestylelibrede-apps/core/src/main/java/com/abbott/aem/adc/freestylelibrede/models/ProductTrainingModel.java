package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import javax.inject.Inject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ProductTrainingModel{
    
        @Inject
        private String heading;

        @Inject
        private String productVersion;
    
        @Inject
        private String technicalTrainingDoneMessage;
    
        @Inject
        private String technicalTrainingNotDoneMessage;
    
        @ChildResource
        private BaseCTAModel cta;

        @Inject
        private String hmmProductVersion;

        public String getHeading(){
            return this.heading;
        }

        public String getProductVersion(){
            return this.productVersion;
        }
    
        public String getTechnicalTrainingDoneMessage(){
            return this.technicalTrainingDoneMessage;
        }
    
        public String getTechnicalTrainingNotDoneMessage(){
            return this.technicalTrainingNotDoneMessage;
        }
    
        public BaseCTAModel getCta(){
            return this.cta;
        }

        public String getHmmProductVersion(){
            return this.hmmProductVersion;
        }

}
