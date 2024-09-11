package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.LinkStack;
import com.abbott.aem.platform.common.components.models.LinkStackItem;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import lombok.*;
import lombok.experimental.Delegate;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { LinkStack.class, ComponentExporter.class },
	   resourceType = { LinkStackV1Impl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class LinkStackV1Impl extends ComponentProxyImpl implements LinkStack {

	
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/linkstack/v1/linkstack";
	@Self
	private SlingHttpServletRequest request;
	@ScriptVariable
	private PageManager pageManager;
	/**
	 * The button.
	 */
	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String stackTitle;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String stackLink;

	@ValueMapValue
	@Default(values = "_blank")
	@Setter(AccessLevel.NONE)
	private String action;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String linkStackType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private boolean stackExternal;

	@ValueMapValue
	@Default(booleanValues = true)
	@Setter(AccessLevel.NONE)
	private boolean redirectConfirm;

	@ChildResource
	@Setter(AccessLevel.NONE)
	private List<LinkStackItem> links;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String siteListDefault;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String siteListTitle;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String ariaDescribedBy;

	@ChildResource
	@Setter(AccessLevel.NONE)
	private List<LinkStackItem> sites;

	@Override
	public String getStackLink() {
		if (stackLink == null) {
			Page targetPage = pageManager.getPage(stackLink);
			if (targetPage != null) {
				stackLink = PlatformUtil.getURL(request, targetPage);
			}
		}
		return PlatformUtil.addHttpsIfRequired(stackLink);
	}

}
