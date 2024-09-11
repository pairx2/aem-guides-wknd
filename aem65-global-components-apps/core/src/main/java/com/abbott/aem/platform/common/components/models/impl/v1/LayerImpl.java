package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.Layer;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * Model used by Scroll Interactions to get the image layers
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@Model(adaptables = Resource.class,
	   adapters = { Layer.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LayerImpl implements Layer {

	@ValueMapValue
	@Setter
	@Getter
	private String fileReference;
}
