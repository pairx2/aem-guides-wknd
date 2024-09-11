package com.abbott.magento.identity.models;

import com.abbott.magento.identity.MagentoIdentityProvider;
import org.apache.jackrabbit.oak.spi.security.authentication.external.ExternalIdentity;
import org.apache.jackrabbit.oak.spi.security.authentication.external.ExternalIdentityException;
import org.apache.jackrabbit.oak.spi.security.authentication.external.ExternalIdentityRef;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;


public class ExternalIdentityImpl implements ExternalIdentity {

    protected final String providerName;

    private static final Logger log = LoggerFactory.getLogger(ExternalIdentityImpl.class);

    protected final ExternalIdentityRef ref;

    protected final String id;

    private Set<ExternalIdentityRef> groups = Collections.emptySet();

    protected final Map<String, Object> properties;

    protected ExternalIdentityImpl(String providerName, ExternalIdentityRef ref, String id, Map<String, Object> properties) {
        this.providerName = providerName;
        this.ref = ref;
        this.id = id;
        this.properties = properties;
    }

    public ExternalIdentityRef getExternalId() {
        return ref;
    }

    public String getId() {
        return id;
    }

    public String getPrincipalName() {
        return ref.getId();
    }

    public String getIntermediatePath() {
        return null;
    }

    public Iterable<ExternalIdentityRef> getDeclaredGroups() throws ExternalIdentityException {
        log.debug("GET DECLARED GROUPS");
        if (groups == null) {
            groups = new HashSet<>();

            List<String> gs = (List) properties.get(MagentoIdentityProvider.PN_GROUPS);
            if (gs != null) {
                for (int i = 0; i<gs.size(); i++) {
                    String gid = gs.get(i);
                    if (gid != null) {
                        groups.add(new ExternalIdentityRef(gid, providerName));
                    }
                }
            }
        }
        return Collections.unmodifiableSet(groups);
    }


    public Map<String,Object> getProperties() {
        return properties;
    }

    @Override
    public String toString() {
        return "ExternalIdentityImpl{" + "ref=" + ref + ", id='" + id + '\'' + '}';
    }

}
