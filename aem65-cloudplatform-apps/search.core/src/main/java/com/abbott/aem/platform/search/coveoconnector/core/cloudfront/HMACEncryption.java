package com.abbott.aem.platform.search.coveoconnector.core.cloudfront;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HMACEncryption {
    private static final Logger logger = LoggerFactory.getLogger(HMACEncryption.class);

    private static final String HMAC_SHA1_ALGORITHM = "HmacSHA1";

    /**
     * 
     * @return
     */
    public String getCallReference() 
    {
        SimpleDateFormat dateFormat = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss");
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        String date = dateFormat.format(new Date());
        return date + " GMT";
    }

    /**
     * 
     * @param date
     * @param key
     * @return
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeyException
     */
    private static String calculateRFC2104HMAC(String date, String key)
    throws NoSuchAlgorithmException, InvalidKeyException 
    {
        SecretKeySpec signingKey = new SecretKeySpec(key.getBytes(), HMAC_SHA1_ALGORITHM);
        Mac mac = Mac.getInstance(HMAC_SHA1_ALGORITHM);
        mac.init(signingKey);
        return new String(java.util.Base64.getEncoder().encode(mac.doFinal(date.getBytes())));
    }

    /**
     * 
     * @param secretKey
     * @param accessKey
     * @return
     */
    public String getAuth(final String secretKey,final String accessKey) 
    {
        String authorization = StringUtils.EMPTY;
       
			try {
				String signature = calculateRFC2104HMAC(this.getCallReference(), secretKey);
				authorization = "AWS " + accessKey + ":" + signature;
			} catch (InvalidKeyException e) {
				logger.error("InvalidKeyException ",e);
			} catch (NoSuchAlgorithmException e) {
				logger.error("NoSuchAlgorithmException ",e);
			}
            

       
        return authorization;
    }
}