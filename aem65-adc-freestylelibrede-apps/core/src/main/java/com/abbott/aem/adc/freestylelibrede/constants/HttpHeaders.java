package com.abbott.aem.adc.freestylelibrede.constants;

import org.apache.http.Header;
import org.apache.http.message.BasicHeader;

import static com.adobe.granite.rest.Constants.CT_JSON;
import static com.google.common.net.HttpHeaders.CONTENT_TYPE;

public class HttpHeaders {

    public static final Header PRETTY_PRINT_HEADER = new PrettyPrintHeader();
    private static final String AUTHORIZATION = "Authorization";

    private HttpHeaders() {
    }

    public static class PrettyPrintHeader extends BasicHeader {

        PrettyPrintHeader() {
            super("X-PrettyPrint", "1");
        }
    }


    public static class OAuthAuthorizationHeader extends BasicHeader {

        public OAuthAuthorizationHeader(String token) {
            super(AUTHORIZATION, "OAuth " + token);
        }
    }


    public static class BearerAuthorizationHeader extends BasicHeader {
        private static final String BEARER = "Bearer ";

        public BearerAuthorizationHeader(String token) {
            super(AUTHORIZATION, BEARER + token);
        }
    }

    public static class JsonContentTypeHeader extends BasicHeader {

        public JsonContentTypeHeader() {
            super(CONTENT_TYPE, CT_JSON);
        }
    }
}
