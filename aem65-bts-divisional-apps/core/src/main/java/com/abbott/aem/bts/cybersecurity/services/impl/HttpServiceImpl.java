package com.abbott.aem.bts.cybersecurity.services.impl;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.net.ssl.HttpsURLConnection;

import com.abbott.aem.platform.common.components.services.ApiResponse;
import com.abbott.aem.platform.common.components.services.HttpService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class HttpServiceImpl implements HttpService {

    private static final int CONNECTION_TIME_OUT = 15000;

    private static final int READ_TIME_OUT = 20000;

    @NonNull
    private String requestEndpoint;

    private HttpMethod httpMethod;

    private Map<String, String> requestHeaders;

    private String requestBody;

    protected static String toString(InputStream inputStream) throws IOException {

        try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {

            String inputLine;
            StringBuilder stringBuilder = new StringBuilder();
            while ((inputLine = bufferedReader.readLine()) != null) {
                stringBuilder.append(inputLine);
            }
            return stringBuilder.toString();
        }
    }

    @Override
    public ApiResponse executeHTTPRequest() throws IOException {
        URL url = getAPIEndPoint(requestEndpoint);

        URLConnection urlConnection = url.openConnection();
        setHTTPMethod(urlConnection);
        if (requestHeaders != null && !requestHeaders.isEmpty() && requestHeaders.size() > 0) {
            setHeaderParameters(urlConnection);
        }

        if (requestBody != null && !requestBody.isEmpty()) {
            setRequestBody(urlConnection);
        }
        urlConnection.setReadTimeout(READ_TIME_OUT);
        urlConnection.setConnectTimeout(CONNECTION_TIME_OUT);
        return getResponseData(urlConnection);
    }

    private ApiResponse getResponseData(URLConnection urlConnection) throws IOException {
        InputStream is = null;
        String response;

        int responseCode = getResponseCode(urlConnection);
        try {
            is = urlConnection.getInputStream();
            response = toString(is);
        } finally {
            if (is != null) {
                is.close();
            }
        }
        return (new ApiResponse(responseCode, response));
    }

    private void setHTTPMethod(URLConnection urlConnection) throws ProtocolException {
        if (urlConnection instanceof HttpsURLConnection) {
            ((HttpsURLConnection) urlConnection).setRequestMethod(httpMethod.toString());
        } else {
            ((HttpURLConnection) urlConnection).setRequestMethod(httpMethod.toString());
        }
    }

    protected int getResponseCode(URLConnection urlConnection) throws IOException {
        int responseCode;
        if (urlConnection instanceof HttpsURLConnection) {
            responseCode = ((HttpsURLConnection) urlConnection).getResponseCode();
        } else {
            responseCode = ((HttpURLConnection) urlConnection).getResponseCode();
        }
        return responseCode;
    }

    public URL getAPIEndPoint(String requestEndpoint) throws MalformedURLException {
        return new URL(requestEndpoint);
    }

    protected void setRequestBody(URLConnection urlConnection) throws IOException {

        int i;
        // read byte by byte until end of stream
        try (BufferedOutputStream bos = new BufferedOutputStream(urlConnection.getOutputStream()); BufferedInputStream bis = new BufferedInputStream(new ByteArrayInputStream(requestBody.getBytes(StandardCharsets.UTF_8)))) {
            while ((i = bis.read()) >= 0) {
                bos.write(i);
            }
        }
    }

    private void setHeaderParameters(URLConnection urlConnection) {
        Iterator<Entry<String, String>> it = requestHeaders.entrySet().iterator();
        while (it.hasNext()) {
            Entry<String, String> pair = it.next();
            urlConnection.setRequestProperty(pair.getKey(), pair.getValue());
        }
    }

    public enum HttpMethod {
        GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS, TRACE;
    }
}