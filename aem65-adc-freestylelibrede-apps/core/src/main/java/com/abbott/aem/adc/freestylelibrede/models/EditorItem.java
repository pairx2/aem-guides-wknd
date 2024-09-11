/**
 * 
 */
package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;

import com.adobe.cq.wcm.core.components.commons.editor.dialog.childreneditor.Item;

/**
 * @author rumalik
 *
 */
public class EditorItem extends Item {

	protected String iconClass;
	protected String accountNavEvent;

	public EditorItem(SlingHttpServletRequest request, Resource resource) {
		super(request, resource);
		if (resource != null) {
			ValueMap vm = resource.adaptTo(ValueMap.class);
			if (vm != null) {
				iconClass = vm.get("iconClass", String.class);
				accountNavEvent = vm.get("accountNavEvent",String.class);
			}
		}
	}

	/**
	 * @return the iconClass
	 */
	public String getIconClass() {
		return iconClass;
	}

	/**
	 *  @return the accountNavEvent
	 */
	public String getAccountNavEvent() {
		return accountNavEvent;
	}

}
