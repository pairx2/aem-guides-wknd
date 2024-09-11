/*
 * Copyright (c) Abbott
 */
package com.abbott.aem.platform.common.components.servlets;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.osgi.service.metatype.annotations.Option;

@ObjectClassDefinition(name = "FaqSiteMapServletConfiguration", description = "SiteMap Servlet Configuration")
public @interface FaqSiteMapServletConfiguration {

    @AttributeDefinition(name = "Domain", description = "Must correspond to a configuration used to pick the domain.", options = {
            @Option(label = "Use Externalizer", value = "externalizer"),
            @Option(label = "Use Etc Maps", value = "maps") })
    public String domain() default "maps";

    @AttributeDefinition(name = "Include Last Modified", description = "If true, the last modified value will be included in the sitemap.", type = AttributeType.BOOLEAN)
    public boolean includeLastmod() default true;

    @AttributeDefinition(name = "Extensionless URLs", description = "If true, page links included in sitemap are generated without .html extension and the path is included with a trailing slash, e.g. /content/geometrixx/en/.", type = AttributeType.BOOLEAN)
    public boolean extensionlessUrls() default false;

    @AttributeDefinition(name = "Remove Trailing Slash from Extensionless URLs", description = "Only relevant if Extensionless URLs is selected.  If true, the trailing slash is removed from extensionless page links, e.g. /content/geometrixx/en.", type = AttributeType.BOOLEAN)
    public boolean removeSlash() default false;

    @AttributeDefinition(name = "Character Encoding", description = "If not set, the container's default is used (ISO-8859-1 for Jetty)", type = AttributeType.STRING)
    public String characterEncoding() default "UTF-8";
}
