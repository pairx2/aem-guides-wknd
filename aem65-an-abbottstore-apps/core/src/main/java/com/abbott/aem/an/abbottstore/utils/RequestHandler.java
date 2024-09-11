package com.abbott.aem.an.abbottstore.utils;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

public class RequestHandler {

    private final static String USER_AGENT = "Mozilla/5.0";
    static Logger logger = LoggerFactory.getLogger( RequestHandler.class );

    protected RequestHandler()  {
        throw new UnsupportedOperationException("Utility class");
    }

    public static boolean VerifyResponse(String url, String postParams) {
        logger.debug( "Inside Verify Response Method" );
        try {

            URL obj = new URL( url );
            HttpsURLConnection httpConnection = (HttpsURLConnection) obj.openConnection();
            httpConnection.setRequestMethod( "POST" );
            httpConnection.setRequestProperty( "User-Agent", USER_AGENT );
            httpConnection.setDoOutput( true );
			httpConnection.setConnectTimeout(5000);
            httpConnection.setReadTimeout(5000);
            DataOutputStream wr = new DataOutputStream( httpConnection.getOutputStream() );
            wr.writeBytes( postParams );
            wr.flush();
            wr.close();

            BufferedReader inputReader = new BufferedReader( new InputStreamReader(
                    httpConnection.getInputStream() ) );
            String inputLine;
            StringBuilder response = new StringBuilder();

            while ((inputLine = inputReader.readLine()) != null) {
                response.append( inputLine );
            }
            inputReader.close();
            JsonObject jsonObject = new JsonParser().parse(response.toString()).getAsJsonObject();
            logger.debug( "Json Object success value:::::{}", jsonObject.get( "success" ).getAsBoolean() );
            return jsonObject.get( "success" ).getAsBoolean();

        } catch (IOException e) {
            logger.error( "Exception occured in request handler because of:{}", e.getMessage() );
            return false;
        }
    }


    public static String PostResponse(String url, String data) {
        logger.debug( "Inside PostResponse Method of Request Handler" );
        String redirectingUrl = null;
        try {
            URL obj = new URL( url );
            HttpsURLConnection httpConnection = (HttpsURLConnection) obj.openConnection();
            httpConnection.setInstanceFollowRedirects( true );
            httpConnection.setRequestMethod( "POST" );
            httpConnection.setRequestProperty( "User-Agent", USER_AGENT );
            httpConnection.setDoOutput( true );
			httpConnection.setConnectTimeout(5000);
            httpConnection.setReadTimeout(5000);
            DataOutputStream wr = new DataOutputStream( httpConnection.getOutputStream() );
            wr.writeBytes( data );
            wr.flush();
            wr.close();
            httpConnection.getContent();

            if (httpConnection.getInstanceFollowRedirects()) {
                redirectingUrl = httpConnection.getURL().toString();
            }
            logger.debug( "RedirectingUrl in RequestHandler:::::{}", redirectingUrl );
        } catch (IOException e) {
            logger.error( "Exception occured in request handler because of:{}", e.getMessage() );

        } 
        return redirectingUrl;
    }
}