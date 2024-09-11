package com.abbott.magento.identity.models;

import org.apache.jackrabbit.oak.spi.security.authentication.external.ExternalIdentityRef;
import org.apache.jackrabbit.oak.spi.security.authentication.external.ExternalUser;

import java.util.Map;

/**
 * {@code ExternalUserImpl} implements an external user based on properties
 */
public class ExternalUserImpl extends ExternalIdentityImpl implements ExternalUser {

    public ExternalUserImpl(String providerName, ExternalIdentityRef ref, String id, Map<String, Object> properties) {
        super(providerName, ref, id, properties);
    }

    @Override
    public String toString() {
        return "ExternalUserImpl{} Id:" + id + ", props: " + properties +"  ref:" + ref + " - providername: " + providerName;
    }
}
