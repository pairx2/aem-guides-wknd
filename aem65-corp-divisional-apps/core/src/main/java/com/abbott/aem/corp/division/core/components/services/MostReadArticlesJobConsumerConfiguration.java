package com.abbott.aem.corp.division.core.components.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = " MostReadArticlesConsumerConfiguration Consumer Configuration")
public @interface MostReadArticlesJobConsumerConfiguration {

  
    @AttributeDefinition(name = "MostReadArticlesServiceUrl", description = "MostReadArticles ServiceUrl", type = AttributeType.STRING)
    String serviceUrl() default "/api/public/content/feed";
}