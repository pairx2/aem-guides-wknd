package com.abbott.aem.platform.common.components.pojo;

import com.abbott.aem.platform.common.components.models.ScrollInteractions;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * ScrollInteractionsDetails POJO class that is used to provide the mapping of ScrollInteractions Model.
 */
@Data
@AllArgsConstructor
public class ScrollInteractionsDetails {

	/**
	 * The panel Id will provide an unique id for the each scroll interaction component.
	 */
	// suppressing sonarcube as this is using lombak and is used in the code
	@java.lang.SuppressWarnings("squid:S1068")
	private String panelId;
	// suppressing sonarcube as this is using lombak and is used in the code
	@java.lang.SuppressWarnings("squid:S1068")
	private ScrollInteractions scrollInteractions;
	
}
