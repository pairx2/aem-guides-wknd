package com.abbott.aem.adc.freestylelibrede.utils;

import com.day.cq.commons.inherit.ComponentInheritanceValueMap;
import org.apache.sling.api.resource.Resource;

public class AuthenticationUtils {

    private AuthenticationUtils(){}

    private static final String LOGIN_PATH_PROPERTY = "granite:loginPath";

    public static String getAuthenticationRedirectPath(Resource resource) {
        return new ComponentInheritanceValueMap(resource.getParent()).getInherited(LOGIN_PATH_PROPERTY, "");
    }
}
