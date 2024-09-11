package com.abbott.aem.an.abbottstore.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Nutritional Facts Configuration", description = "Nutritional Facts Configuration for Scheduler")
public @interface NutritionFactsConfigurationService {
    /**
     * schedulerName
     * @return String name
     */
    @AttributeDefinition(name = "Scheduler name", description = "Scheduler name", type = AttributeType.STRING)
    public String schedulerName() default "Nutritional Facts Scheduler";
    /**
     * schedulerConcurrent
     * @return schedulerConcurrent
     */
    @AttributeDefinition(name = "Concurrent", description = "Schedule task concurrently", type = AttributeType.BOOLEAN)
    boolean schedulerConcurrent() default true;
    /**
     * serviceEnabled
     * @return serviceEnabled
     */
    @AttributeDefinition(name = "Enabled", description = "Enable Scheduler", type = AttributeType.BOOLEAN)
    boolean serviceEnabled() default true;
	
	/**
     * updateAll
     * @return updateAll
     */
    @AttributeDefinition(name = "Update All", description = "Update For All Sku", type = AttributeType.BOOLEAN)
    boolean updateAll() default true;
    /**
     * schedulerExpression
     * @return schedulerExpression
     */
    @AttributeDefinition(name = "Expression", description = "Cron-job expression. Default: run every 24th hour.", type = AttributeType.STRING)
    String schedulerExpression() default "0 0 23 * * ?";
}
