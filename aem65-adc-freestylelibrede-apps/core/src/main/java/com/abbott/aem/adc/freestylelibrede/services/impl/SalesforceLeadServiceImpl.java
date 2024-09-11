package com.abbott.aem.adc.freestylelibrede.services.impl;

import com.abbott.aem.adc.freestylelibrede.constants.HttpHeaders;
import com.abbott.aem.adc.freestylelibrede.constants.SalesforceConstants;
import com.abbott.aem.adc.freestylelibrede.models.SalesforceLeadRequest;
import com.abbott.aem.adc.freestylelibrede.services.SalesforceLeadService;
import com.abbott.aem.adc.freestylelibrede.services.impl.dto.AuthResult;
import com.abbott.aem.adc.freestylelibrede.services.impl.dto.SalesforceLeadResponse;
import com.adobe.granite.rest.Constants;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;


@Component(
        service = SalesforceLeadService.class,
        immediate = true,
        configurationPolicy = ConfigurationPolicy.REQUIRE,
        configurationPid = "com.abbott.aem.adc.freestylelibrede.services.impl.SalesforceLeadServiceImpl"
)
@Designate(ocd = SalesforceLeadServiceImpl.Configuration.class)
public class SalesforceLeadServiceImpl implements SalesforceLeadService {
    private static final long serialVersionUID = 3740604896291802237L;
    private static final Logger logger = LoggerFactory.getLogger(SalesforceLeadServiceImpl.class);
    private String restEndpoint;
    private String apiName;
    private String loginAccessToken;
    private String loginInstanceUrl;
    private String authenticationUrl;
    int timeout = SalesforceConstants.SOCKET_TIME_MILLI_SEC;

    @Activate
    protected void activate(final Configuration config) {
        logger.debug("activated");

        this.restEndpoint = config.service_restendpoint();
        this.apiName = config.service_apiname();
        this.loginInstanceUrl = config.service_logininstanceurl();

        this.authenticationUrl = new StringBuilder().append(config.service_loginurl())
                .append(config.service_grantservice())
                .append("&client_id=").append(config.service_clientid())
                .append("&client_secret=").append(config.service_clientsecret())
                .append("&username=").append(config.service_username())
                .append("&password=").append(config.service_password())
                .append(config.service_securitytoken()).toString();

    }

    @Deactivate
    protected void deactivate() {
        logger.debug("deactivated");
    }

    public String createLead(SalesforceLeadRequest request) {
        try {
            final String jsonString = new ObjectMapper().writeValueAsString(request);

            HttpResponse httpResponse = createLead(jsonString, true);

            if (httpResponse.getStatusLine().getStatusCode() == HttpStatus.SC_UNAUTHORIZED) {
                logger.info("User Token Expired");

                httpResponse = createLead(jsonString, false);
            }
            return parseResponse(httpResponse);

        } catch (RuntimeException | IOException e) {
            if (logger.isErrorEnabled()) {
                logger.error("Exception Occured ",e);
                logger.error(
                        "***************Please check the salesforce Connectivity To Fix the issue******************");
                logger.error("***************Corrective Action Required Immediately To Fix******************");
            }
        }
        return "";
    }


    public HttpResponse createLead(String jsonString, boolean isTokenValid) throws IOException {
        logger.debug("createLead()");
        RequestConfig config = RequestConfig.custom()
                .setConnectTimeout(timeout)
                .setConnectionRequestTimeout(timeout)
                .setSocketTimeout(timeout).build();
        final HttpClient client = HttpClientBuilder.create().setDefaultRequestConfig(config).build();
        final HttpPost httpPost = buildPostRequest(jsonString, getAuthToken(isTokenValid));
        final HttpResponse response = client.execute(httpPost);
        httpPost.releaseConnection();

        return response;
    }


    private String parseResponse(HttpResponse response) throws IOException {


        String responseString = EntityUtils.toString(response.getEntity());
        if (response.getStatusLine().getStatusCode() == HttpStatus.SC_CREATED) {
            if (logger.isDebugEnabled()) {
                logger.debug("Lead Created Successfully");
            }
        } else {

            SalesforceLeadResponse[] responseArray = new ObjectMapper().readValue(responseString, SalesforceLeadResponse[].class);
            mapResponse(responseArray);

            if (logger.isDebugEnabled()) {
                logger.debug("Failure Response");
            }
        }
        return responseString;
    }

    private void mapResponse(SalesforceLeadResponse[] responseArray) {
        if (responseArray.length > 0) {
            SalesforceLeadResponse resp = responseArray[0];
            if (resp != null) {
                for (int i = 0; i < resp.getFields().length; ++i) {
                    String field = resp.getFields()[i];
                    if (SalesforceConstants.hasMappingKey(field)) {
                        resp.getFields()[i] = SalesforceConstants.getMappingValue(field);
                    }
                }
            }
        }
    }

    private String getAuthToken(boolean isTokenValid) throws IOException {

        boolean isAvailableToken = isTokenValid && StringUtils.isNotEmpty(loginAccessToken);

        if (!isAvailableToken) {
            RequestConfig config = RequestConfig.custom()
                    .setConnectTimeout(timeout)
                    .setConnectionRequestTimeout(timeout)
                    .setSocketTimeout(timeout).build();
            HttpClient httpclient = HttpClientBuilder.create().setDefaultRequestConfig(config).build();

            // Assemble the login request URL

            // Login requests must be POSTs
            HttpPost httpPost = new HttpPost(this.authenticationUrl);

            // Execute the login POST request
            HttpResponse response = httpclient.execute(httpPost);
            // verify response is HTTP OK
            final int statusCode = response.getStatusLine().getStatusCode();
            logger.debug("AuthToken API statusCode:{} ", statusCode);

            if (statusCode != HttpStatus.SC_OK) {
                return "Error authenticating";
            }


            final String resultString = EntityUtils.toString(response.getEntity());

            AuthResult authResult = new ObjectMapper().readValue(resultString, AuthResult.class);

            if (StringUtils.isNotBlank(authResult.getAccessToken())) {
                this.loginAccessToken = authResult.getAccessToken();
            }
            if (StringUtils.isNotBlank(authResult.getInstanceUrl())) {
                this.loginInstanceUrl = authResult.getInstanceUrl();
            }

            httpPost.releaseConnection();
        }

        return loginAccessToken;
    }


    private HttpPost buildPostRequest(String jsonString, String loginAccessToken) throws IOException {
        final HttpPost httpPost = new HttpPost(this.loginInstanceUrl + this.restEndpoint + this.apiName);
        httpPost.addHeader(new HttpHeaders.OAuthAuthorizationHeader(loginAccessToken));
        httpPost.addHeader(HttpHeaders.PRETTY_PRINT_HEADER);
        StringEntity body = new StringEntity(jsonString);
        body.setContentType(Constants.CT_JSON);
        httpPost.setEntity(body);
        return httpPost;
    }


    @SuppressWarnings("squid:S00100")
    @ObjectClassDefinition(name = "ADC Freestyle Libre DE - Salesforce Lead Service")
    protected static @interface Configuration {
        @AttributeDefinition(
                name = "Username"
        )
        String service_username() default "";

        @AttributeDefinition(
                name = "Password",
                type = AttributeType.PASSWORD
        )
        String service_password() default "";

        @AttributeDefinition(
                name = "Security Token"
        )
        String service_securitytoken() default "";

        @AttributeDefinition(
                name = "Login URL"
        )
        String service_loginurl() default "";

        @AttributeDefinition(
                name = "Grant Service"
        )
        String service_grantservice() default "";

        @AttributeDefinition(
                name = "Client ID"
        )
        String service_clientid() default "";

        @AttributeDefinition(
                name = "Client secret"
        )
        String service_clientsecret() default "";

        @AttributeDefinition(
                name = "Rest endpoint"
        )
        String service_restendpoint() default "";


        @AttributeDefinition(
                name = "API Name"
        )
        String service_apiname() default "";


        @AttributeDefinition(
                name = "Login Instance URL"
        )
        String service_logininstanceurl() default "";
    }


}
