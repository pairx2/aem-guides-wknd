package com.abbott.aem.bts.cybersecurity.core;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Abbott Cybersecurity Archer API Job Consumer Configuration")
public @interface ArcherAPIJobConsumerConfiguration {

    @AttributeDefinition(name = "Properties part of CF content", description = "This set of properties will be extracted from Json and updated accordingly.The order should be followed", type = AttributeType.STRING)
    String[] propsInFragmentContent() default {"productName", "productType","publishToPortal", "productUrl"};

    @AttributeDefinition(name = "Properties part of CF Metadata", description = "This set of properties will be extracted from Json and updated on metadata of Content Fragment accordingly", type = AttributeType.STRING)
    String[] propsInFragmentMetadata() default {"description", "lastUpdatedOn"};

    @AttributeDefinition(name = "Properties part of CF Tags", description = "This set of properties will be extracted from Json and updated as Content Fragment tags", type = AttributeType.STRING)
    String[] tagsOnCF() default {"category", "productType", "productName", "versionId"};

    @AttributeDefinition(name = "Content Fragment template path", description = "Content Fragment template path", type = AttributeType.STRING)
    String fragmentTemplatePath() default "/conf/bts/cybersecurity/settings/dam/cfm/models/cybersecurity-fragment-model/jcr:content";

    @AttributeDefinition(name = "Path to create CF's", description = "This is where the CF's would be created", type = AttributeType.STRING)
    String fragmentCreationPath() default "/content/dam/bts/cybersecurity/us/en/content-fragments/";

    @AttributeDefinition(name = "Taxonomy Path", description = "This specifies the tags path in repository", type = AttributeType.STRING)
    String taxonomyPath() default "/bts/cybersecurity/product/";

    @AttributeDefinition(name = "Date Format", description = "Date format to be used for comparision", type = AttributeType.STRING)
    String dateFormat() default "MMddyyyy";

    @AttributeDefinition(name = "Template path", description = "Provide tempalte path to create the page", type = AttributeType.STRING)
    String templatePath() default "/conf/bts/cybersecurity/settings/wcm/templates/cybersecurity-postlogin-page-template";

    @AttributeDefinition(name = "Path to create product types", description = "Path to create the product types", type = AttributeType.STRING)
    String productTypesCreationPath() default "/content/dam/bts/cybersecurity/us/en/";

    @AttributeDefinition(name = "Product Category Mapping Path", description = "This is path of Product Category Mapping Content Fragment", type = AttributeType.STRING)
    String categoryMappingPath() default "/content/dam/bts/cybersecurity/us/en/cybersecurity-product-category-mapping";

}