package com.abbott.aem.an.abbottstore.servlets;

import com.abbott.aem.an.abbottstore.services.UrlConfigService;
import com.abbott.aem.an.abbottstore.utils.RequestHandler;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.google.gson.JsonObject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import javax.servlet.Servlet;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_PATHS;

@org.osgi.service.component.annotations.Component(service = Servlet.class, immediate = true, property = {SLING_SERVLET_PATHS + "=/bin/verifyRecaptcha",
        SLING_SERVLET_METHODS + "=" + HttpConstants.METHOD_POST})
public class RecaptchaServlet extends SlingAllMethodsServlet {

    private static final long serialVersionUID = -6087689053766658045L;
    public static final String SITE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
    private static final Logger log = LoggerFactory.getLogger( RecaptchaServlet.class );
    @Reference
    private transient UrlConfigService urlConfigService;

    @Reference
    private transient QueryBuilder queryBuilder;
    @Override
    protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) {
        doGet( request, response );
    }

    @Override
    protected void doGet(final SlingHttpServletRequest req, final SlingHttpServletResponse resp) {
        log.debug( "Inside doGet method of RecaptchaServlet" );
        String currentPage = req.getParameter( "currentPage" );
        String gRecaptchaResponse = req.getParameter( "g-recaptcha-response" );
        String msgSource = req.getParameter( "msgSource" );
        String frhForm = req.getParameter( "frhForm" );
        String storeName = req.getParameter( "storeName" );
        String email = req.getParameter( "email" );
        String veryfyEmail = req.getParameter( "veryfyEmail" );
        String firstName = req.getParameter( "firstName" );
        String lastName = req.getParameter( "lastName" );
        String streetAddress = req.getParameter( "streetAddress" );
        String addressLineTwo = req.getParameter( "addressLineTwo" );
        String city = req.getParameter( "city" );
        String state = req.getParameter( "state" );
        String country = req.getParameter( "country" );
        String zipCode = req.getParameter( "zipCode" );
        String phone = req.getParameter( "phone" );
        String subject = req.getParameter( "subject" );
        String orderRef = req.getParameter( "orderRef" );
        String query = req.getParameter( "query" );
        ResourceResolver resolver = req.getResourceResolver();
        Resource currentRes = resolver.getResource( currentPage + "/jcr:content" );
        SearchResult queryResults = createQuery( resolver, currentRes.getPath() );
        Iterator <Resource> resourceList = queryResults.getResources();
        String contactusUrl = null;
        PrintWriter out = null;
        JsonObject object = new JsonObject();
        if (resourceList != null) {
            while (resourceList.hasNext()) {
                Resource contactRes = resourceList.next();
                contactusUrl = contactRes.getValueMap().get( "contactUsUrl", String.class );
            }
        }
        try {
            resp.setContentType( "application/json" );
            out = resp.getWriter();
            String dataString = "msgSource=" + msgSource + "&frh.form=" + frhForm + "&store_name=" + storeName + "&EmailAddress=" + email + "&ConfirmEmailAddress=" + veryfyEmail + "&FirstName=" + firstName + "&LastName=" + lastName + "&StreetAddress=" + streetAddress + "&StreetAddress2=" + addressLineTwo + "&City=" + city + "&State=" + state + "&Country=" + country + "&ZipCode=" + zipCode + "&PhoneNumber=" + phone + "&Subject=" + subject + "&OrderReferenceNumber=" + orderRef 
            		+ "&QuestionsComments=" + URLEncoder.encode(query, StandardCharsets.UTF_8);
            if (gRecaptchaResponse == null || "".equals( gRecaptchaResponse )) {
                log.debug( "Inside if when gRecaptchaResponse is null" );
                object.addProperty( "status", "failure" );
            } else {
                String postParams = "secret=" + urlConfigService.getSecretKey() + "&response=" + gRecaptchaResponse;
                Boolean response = RequestHandler.VerifyResponse( SITE_VERIFY_URL, postParams );
                if (response) {
                    log.debug( "Inside if when gRecaptchaResponse is true:::{}",contactusUrl);
                    String redirectUrl = RequestHandler.PostResponse( contactusUrl, dataString );
                    log.debug( "RedirectUrl in servlet:::{}", redirectUrl );
                    object.addProperty( "url", redirectUrl);
                } else {
                    object.addProperty( "status", "failure" );
                }

            }
        } catch (IOException e) {
            log.error( "Exception in RecaptchaServlet :{}", e.getMessage() );
        }
        if (null != out) {
            out.print( object.toString() );
        }
    }

    /**
     * this method createQuery
     *
     * @param resolver
     * @param path
     * @return
     */
    private SearchResult createQuery(ResourceResolver resolver, String path) {
        Map <String, String> map = new HashMap <>();
        map.put( "path", path );
        map.put( "type", "nt;unstructured" );
        map.put( "property", JcrResourceConstants.SLING_RESOURCE_TYPE_PROPERTY );
        map.put( "property.value", "abbott/components/content/contact-us" );
        Query query = queryBuilder.createQuery( PredicateGroup.create( map ), resolver.adaptTo( Session.class ) );
        return query.getResult();
    }

}