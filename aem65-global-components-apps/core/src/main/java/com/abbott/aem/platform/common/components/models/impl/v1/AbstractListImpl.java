package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.AbstractList;
import com.abbott.aem.platform.common.components.models.AbstractListItem;
import com.adobe.cq.wcm.core.components.models.Component;
import com.google.gson.Gson;
import lombok.*;
import lombok.experimental.Delegate;
import org.apache.commons.collections4.ListUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.List;

@Data
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
	   adapters = { AbstractList.class },
	   resourceType = { AbstractListImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AbstractListImpl implements AbstractList {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/abstractlist/v1/abstractlist";

	private static final Gson gson = new Gson();

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	private String dataSourceUrl;

	@ValueMapValue
	private String functionToCall;

	@Default(values = StringUtils.EMPTY)
	@ValueMapValue
	private String headingTitle;

	@Default(values = StringUtils.EMPTY)
	@ValueMapValue
	private String noneLabel;

	@ChildResource
	private List<AbstractListItem> manualData;

	@Override
	public String getManualData() {
		return gson.toJson(manualData);
	}

	@Override
	public String getFunctionToCall() {
		if (this.functionToCall != null) {
			return this.functionToCall;
		}
		return StringUtils.EMPTY;
	}

	@PostConstruct
	private void postConstruct() {
		manualData = ListUtils.emptyIfNull(manualData);
	}

}