package com.abbott.aem.an.abbottstore.scheduler;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.services.NutritionDataService;
import com.abbott.aem.an.abbottstore.services.NutritionFactsConfigurationService;
import com.abbott.aem.an.abbottstore.services.ResResolverBySysUserService;
import com.abbott.aem.an.abbottstore.utils.AbbottUtils;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.NameConstants;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.apache.sling.event.jobs.consumer.JobConsumer.PROPERTY_TOPICS;
import static org.osgi.framework.Constants.SERVICE_DESCRIPTION;
import static org.osgi.service.event.EventConstants.SERVICE_ID;

@Component(immediate = true,
        service = JobConsumer.class,
        property = {PROPERTY_TOPICS + "=" + NutritionalAPIJobConsumer.NUTRITION_IMPORT_JOB_TOPIC,
                SERVICE_ID + "=Nutritional Facts API Job Consumer",
                SERVICE_DESCRIPTION + "=This job updates the nutritional facts info"})
@Designate(ocd = NutritionFactsConfigurationService.class)
public class NutritionalAPIJobConsumer implements JobConsumer {
    private static final Logger log = LoggerFactory.getLogger( NutritionalAPIJobConsumer.class );
    /**
     * The Constant NUTRITION_IMPORT_JOB_TOPIC.
     */
    public static final String NUTRITION_IMPORT_JOB_TOPIC = "an/abbottstore/nutritionimport";
    /**
     * The Constant PATH.
     */
    private static final String PATH = "/content/abbott/en";

    @Reference
    private transient ResResolverBySysUserService resolver;

    @Reference
    private transient NutritionDataService nutritionDataService;

    private boolean updateAll;

    @Override
    public JobResult process(Job job) {
        String topic = job.getTopic();
        log.info( "this message is from NutritionalAPIJobConsumer topic is :: {} ", topic );
        try(ResourceResolver resourceResolver = resolver.getReadAndWriteResourceResolver()){
        Session session = resourceResolver.adaptTo( Session.class );
        SearchResult queryResult = getSearchResult( resourceResolver, session );
        if (null != queryResult) {
            List <Hit> simpleProducts = queryResult.getHits();
            if (null != simpleProducts && !simpleProducts.isEmpty()) {
                for (Hit simpleProduct : simpleProducts) {
                    try {
                        ValueMap vm = simpleProduct.getProperties();
                        String templateName = vm.get( NameConstants.NN_TEMPLATE, String.class );
                        setSkuID(templateName,resourceResolver,simpleProduct.getResource(),vm);
                        log.info( "Setting Nutrition Information for: {}", simpleProduct.getPath() );
                    } catch (RepositoryException re) {
                        log.error( "RepositoryException in setPageProperties for nutritional facts :: {}", re.getMessage() );
                        return JobResult.FAILED;
                    }
                }
            }
        }
        log.info( "NutritionalAPIJobConsumer successfully ended..." );
        return JobResult.OK;
        }
    }

    private void setSkuID(String templateName, ResourceResolver resourceResolver, Resource resource, ValueMap vm){
        if (null != templateName && (templateName.contains( CommonConstants.ABBOTT_PRODUCT_TEMPLATE )
                || (templateName.contains( CommonConstants.GLUCERNA_PRODUCT_TEMPLATE )))
                && vm.containsKey( CommonConstants.SKU )) {
            String skuId = vm.get( CommonConstants.SKU, String.class );
            AbbottUtils.setPageProperties( resourceResolver, resource, skuId, nutritionDataService, updateAll);
        }
    }

    /**
     * This method returns json result.
     *
     * @param resourceResolver the resourceresolver
     * @param session          the session
     * @return SearchResult
     */
    private SearchResult getSearchResult(ResourceResolver resourceResolver, Session session) {
        final Map <String, Object> queryMap = new HashMap <>();
        QueryBuilder queryBuilder = resourceResolver.adaptTo( QueryBuilder.class );
        queryMap.put( "path", PATH );
        queryMap.put( "type", "cq:PageContent" );
        queryMap.put( "property", "type_id" );
        queryMap.put( "property.value", "simple" );
        queryMap.put( "p.limit", "-1" );
        com.day.cq.search.Query query = queryBuilder.createQuery( PredicateGroup.create( queryMap ),
                session );
        return query != null ? query.getResult() : null;
    }

    /**
     * This method invokes on Activate and modified.
     *
     * @param config NutritionFactsConfiguration
     */
    @Activate
    @Modified
    void configure(NutritionFactsConfigurationService config) {
        log.debug( "Nutritional API Job Consumer Configuration changed" );
        updateAll = config.updateAll();
    }
}
