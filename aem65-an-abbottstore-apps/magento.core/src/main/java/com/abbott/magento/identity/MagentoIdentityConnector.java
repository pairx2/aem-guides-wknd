package com.abbott.magento.identity;

import com.abbott.magento.identity.models.AuthCredentials;
import com.abbott.magento.identity.models.MagentoCustomer;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;

public class MagentoIdentityConnector {

    private static String server = "http://localhost:8000";
    public static final String AUTHORIZATION = "Authorization";

    private static HashMap<Long, String> groups = new HashMap<>();

    private static final Logger log = LoggerFactory.getLogger(MagentoIdentityConnector.class);

    public  static String getServer() {
        return server;
    }

    public static final String JSON = "application/json";

    public static void setServer(String server) {
    	MagentoIdentityConnector.server = server;
    }


    private static ObjectMapper mapper = new ObjectMapper();


    public MagentoIdentityConnector() {
        mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
    }

    public static String getAdminToken(String username, String password) throws IOException{
        AuthCredentials authCredentials = new AuthCredentials(username, password);
        String token = Request.Post(server + "/rest/V1/integration/admin/token")
                .bodyString(mapper.writeValueAsString(authCredentials), ContentType.APPLICATION_JSON)
                .execute().returnContent().asString();
        return "Bearer " + token.replace("\"", "");
    }


    public String getToken(String username, String password) throws IOException {
        AuthCredentials authCredentials = new AuthCredentials(username, password);
        String token = Request.Post(server + "/rest/V1/integration/customer/token")
                .bodyString(mapper.writeValueAsString(authCredentials), ContentType.APPLICATION_JSON)
                .execute().returnContent().asString();
        log.info("token------> {}",token);
        return "Bearer " + token.replace("\"", "");
    }


    public MagentoCustomer getCustomer(String authToken) throws IOException {
        String customerString = Request.Get(server+"/rest/V1/customers/me")
                .addHeader(AUTHORIZATION, authToken)
                .execute().returnContent().asString();
        return mapper.readValue(customerString, MagentoCustomer.class);
    }

    public MagentoCustomer getCustomerById(String id, String authToken) throws IOException {
        String customerString = Request.Get(server+ "/rest/V1/customers/" + id)
                .addHeader(AUTHORIZATION, authToken)
                .execute().returnContent().asString();
        return mapper.readValue(customerString, MagentoCustomer.class);
    }


    public String getGroupName(long groupId, String authToken) throws IOException {
        if(groups.containsKey(groupId)){
            return groups.get(groupId);
        }else {
           HashMap<String, String> groupMap = getGroupMap(groupId, authToken);
            if(groupMap.containsKey("code")){
                groups.put(groupId, groupMap.get("code"));
                return groupMap.get("code");
            }else{
                return groupId + "";
            }
        }
    }


    private HashMap<String,String> getGroupMap(long groupId, String authToken) throws IOException {
        String groupString = Request.Get(server+ "/rest/V1/customerGroups/" + groupId)
                .addHeader(AUTHORIZATION, authToken)
                .execute().returnContent().asString();
        return mapper.readValue(groupString, HashMap.class);
    }

    public MagentoCustomer createCustomer(String simpleCustomer) throws IOException  {

        String customerString = Request.Post(server + "/rest/V1/customers")
                .bodyString(simpleCustomer, ContentType.APPLICATION_JSON)
                .execute().returnContent().asString();
        return  mapper.readValue(customerString, MagentoCustomer.class);
    }



}
