package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.extension.ExtendWith;


public abstract class BaseModelTest<T> {

    private static final String modelsForPackage = "com.abbott.aem.adc.freestylelibrede.models";

    public final AemContext context = new AemContext();


    protected final T loadModel(String resourcePath,Class<T> t){
        return loadResource(t, resourcePath).adaptTo(t);
    }

    protected final T loadModel(Class<T> t){
        return loadResource(t).adaptTo(t);
    }

    protected final Resource loadResource(Class<T> t){
        return this.loadResource(t,"/content/page/component");
    }

    protected final Resource loadResource(Class<T> t,String path){
        return loadResource("/"+ t.getName()+".json",path);
    }

    protected final Resource loadResource(String resourcePath,String path){
        return getContext().load().json(resourcePath,path);
    }

    protected  AemContext getContext(){
        return  this.context;
    }
}
