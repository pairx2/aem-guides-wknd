/*
 * #%L
 * ACS AEM Commons Bundle
 * %%
 * Copyright (C) 2013 - 2015 Adobe
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
package com.abbott.aem.cloud.platform.core.dispatcher.ttl;


import java.util.Dictionary;

import javax.servlet.Filter;
import javax.servlet.http.HttpServletRequest;


import org.osgi.service.cm.ConfigurationException;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;


@Component(immediate = true, service = { Filter.class })
@Designate(ocd = DispatcherMaxAgeHeaderFilter.Config.class, factory = true)
public class DispatcherMaxAgeHeaderFilter extends AbstractDispatcherCacheHeaderFilter {

    protected static final String PROP_MAX_AGE = "max.age";

    protected static final String CACHE_CONTROL_NAME = "Cache-Control";

    protected static final String HEADER_PREFIX = "max-age=";

    private long maxage;

    @Override
    protected String getHeaderName() {
        return CACHE_CONTROL_NAME;
    }

    @Override
    protected String getHeaderValue(HttpServletRequest request) {
        return HEADER_PREFIX + maxage;
    }

    @Override
    protected void doActivate(ComponentContext context) throws  ConfigurationException {
        Dictionary<?, ?> properties = context.getProperties();
        if(null != properties.get(PROP_MAX_AGE)) {
        	maxage = (long) properties.get(PROP_MAX_AGE);
        }else {
        	maxage = -1;
        }
        if (maxage < 0) {
            throw new ConfigurationException(PROP_MAX_AGE, "Max Age must be specified and greater than 0.");
        }
    }

    public String toString() {
        return this.getClass().getName() + "[" + getHeaderValue(null) + "]";
    }

    @ObjectClassDefinition(name = "ACS AEM Commons - Dispacher Cache Control Header - Max Age Configuration")
    public @interface Config {
        @AttributeDefinition(name = "Filter pattern", description = "patterns to use", type = AttributeType.STRING)
        String[] filter_pattern() default "";

        @AttributeDefinition(name = "Cache-Control Max Age", description = "Max age value (in seconds) to put in Cache Control header.", type = AttributeType.LONG)
        long max_age() default 60;
    }
}
