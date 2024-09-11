/*
* Copyright (c) Abbott
*/
package com.abbott.aem.cloud.platform.core.wcm.impl;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.osgi.service.metatype.annotations.Option;

/**
 * @author GUPTAMX35 This is the configuration class that takes properties for a
 *         Sitemap servlet to run
 */
@ObjectClassDefinition(name = "SiteMapServletConfiguration", description = "SiteMap Servlet Configuration")
public @interface SiteMapServletConfiguration {

	@AttributeDefinition(name = "Sling Resource Type", description = "Sling Resource Type for the Home Page component or components.", type = AttributeType.STRING)
	public String[] sling_servlet_resourceTypes() default { "abbott-platform/components/structure/page/v1/page" };

	@AttributeDefinition(name = "Domain", description = "Must correspond to a configuration used to pick the domain.", options = {
			@Option(label = "Use Externalizer", value = "externalizer"),
			@Option(label = "Use Etc Maps", value = "maps") })
	public String domain() default "maps";

	@AttributeDefinition(name = "Include Last Modified", description = "If true, the last modified value will be included in the sitemap.", type = AttributeType.BOOLEAN)
	public boolean include_lastmod() default true;

	@AttributeDefinition(name = "Change Frequency Properties", description = "The set of JCR property names which will contain the change frequency value.", type = AttributeType.STRING)
	public String[] changefreq_properties() default { "changeFrequency" };

	@AttributeDefinition(name = "Priority Properties", description = "The set of JCR property names which will contain the priority value.", type = AttributeType.STRING)
	public String[] priority_properties() default { "priority" };

	@AttributeDefinition(name = "DAM Folder Property", description = "The JCR property name which will contain DAM folders to include in the sitemap.", type = AttributeType.STRING)
	public String damassets_property() default "";

	@AttributeDefinition(name = "DAM Asset MIME Types", description = "MIME types allowed for DAM assets.", type = AttributeType.STRING)
	public String[] damassets_types() default {};

	@AttributeDefinition(name = "Exclude Pages (by properties of boolean values) from Sitemap Property", description = "The boolean [cq:Page]/jcr:content property name which indicates if the Page should be hidden from the Sitemap.", type = AttributeType.STRING)
	public String exclude_property() default "hideInSitemap";

	@AttributeDefinition(name = "Extensionless URLs", description = "If true, page links included in sitemap are generated without .html extension and the path is included with a trailing slash, e.g. /content/geometrixx/en/.", type = AttributeType.BOOLEAN)
	public boolean extensionless_urls() default false;

	@AttributeDefinition(name = "Remove Trailing Slash from Extensionless URLs", description = "Only relevant if Extensionless URLs is selected.  If true, the trailing slash is removed from extensionless page links, e.g. /content/geometrixx/en.", type = AttributeType.BOOLEAN)
	public boolean remove_slash() default false;

	@AttributeDefinition(name = "Include Inherit Value", description = "If true searches for the frequency and priority attribute in the current page if null looks in the parent.", type = AttributeType.BOOLEAN)
	public boolean include_inherit() default true;

	@AttributeDefinition(name = "Character Encoding", description = "If not set, the container's default is used (ISO-8859-1 for Jetty)", type = AttributeType.STRING)
	public String character_encoding() default "UTF-8";

	@AttributeDefinition(name = "Exclude Pages (by Template) from Sitemap", description = "Excludes pages that have a matching value at [cq:Page]/jcr:content@cq:Template", type = AttributeType.STRING)
	public String[] exclude_templates() default {};

	@AttributeDefinition(name = "URL Rewrites", description = "Colon separated URL rewrites to adjust the <loc> to match your dispatcher's apache rewrites", type = AttributeType.STRING)
	public String[] url_rewrites() default {};

	@AttributeDefinition(name = "DAM Asset Folder", description = "Folder that holds DAM URLs.", type = AttributeType.STRING)
	public String[] assetFoldersList() default {};
}
