package com.abbott.aem.cloud.platform.core.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Tag Exporter Service API", description = "Service API configuration details")
public @interface TagExporterServletConfig {

	/**
	 * Gets the tags root path.
	 *
	 * @return the tags root path
	 */
	@AttributeDefinition(name = "Tags root path", description = "Tags Root path")
	String getTagsRootPath() default "/content/cq:tags";

	/**
	 * Gets the tags root path.
	 *
	 * @return the tags root path
	 */
	@AttributeDefinition(name = "Global folder name", description = "Global folder name")
	String getGlobalFolderName() default "global";

}