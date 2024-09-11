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


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.osgi.service.cm.ConfigurationException;
import org.osgi.service.component.ComponentContext;

import javax.servlet.http.HttpServletRequest;
import java.util.*;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class DispatcherMaxAgeHeaderFilterTest {

    DispatcherMaxAgeHeaderFilter filter;

    Dictionary<String, Object> properties = null;

    private final long maxage = 2000;

    Set<String> agents = null;
    Set<String> cachecontrol = null;

    @SuppressWarnings("rawtypes")
    Map params = null;

    @Mock
    ComponentContext componentContext;

    @Mock
    HttpServletRequest request;

    @BeforeEach
    @SuppressWarnings("rawtypes")
    public void setup() {
        properties = new Hashtable<>();
        properties.put(DispatcherMaxAgeHeaderFilter.PROP_MAX_AGE, maxage);

        agents = new HashSet<>();
        cachecontrol = new HashSet<>();
        params = new HashMap();

        filter = new DispatcherMaxAgeHeaderFilter();

        when(request.getMethod()).thenReturn("GET");
        when(request.getParameterMap()).thenReturn(params);
        agents.add(AbstractDispatcherCacheHeaderFilter.DISPATCHER_AGENT_HEADER_VALUE);
        when(request.getHeaders(AbstractDispatcherCacheHeaderFilter.SERVER_AGENT_NAME))
                .thenReturn(Collections.enumeration(agents));

    }

    @AfterEach
    public void tearDown() {
        properties = null;
        agents = null;
        cachecontrol = null;
        params = null;
        reset(componentContext, request);
    }

    @Test
    public void testGetHeaderName() {
        assertEquals(DispatcherMaxAgeHeaderFilter.CACHE_CONTROL_NAME, filter.getHeaderName());
    }

    @Test
    public void testGetHeaderValue() throws Exception {

        when(componentContext.getProperties()).thenReturn(properties);

        filter.doActivate(componentContext);
        assertEquals("max-age=" + maxage, filter.getHeaderValue(request));
    }

    @Test()
    public void testActivateNoMaxAge() {
        properties.remove(DispatcherMaxAgeHeaderFilter.PROP_MAX_AGE);
        when(componentContext.getProperties()).thenReturn(properties);
        assertThrows(ConfigurationException.class, () -> filter.activate(componentContext));
    }

    @Test
    public void testDoActivateSuccess() throws Exception {

        when(componentContext.getProperties()).thenReturn(properties);

        filter.doActivate(componentContext);
        assertEquals("max-age=" + maxage, filter.getHeaderValue(request));
        verify(componentContext).getProperties();
        verifyNoMoreInteractions(componentContext);

    }

}
