package com.abbott.aem.adc.freestylelibrede.models;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.inject.Inject;

import lombok.Getter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.adc.freestylelibrede.services.EditorItemFactory;
import com.abbott.aem.platform.common.components.models.GenericList;
import com.day.cq.wcm.api.components.Component;
import com.day.cq.wcm.api.components.ComponentManager;

@Model(adaptables = { SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class EditorModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(EditorModel.class);
	@SuppressWarnings("CQRules:CQBP-71")
	private static final String ABBOTT_ICONS_DS_PATH ="/apps/adc/freestylelibrede/authoring/datasources/abbott-icons";
	
	@Self
	private SlingHttpServletRequest request;
	private Resource container;
	@Inject
	private EditorItemFactory editorItemFactory;
	@Getter
	private List<EditorItem> items;
	private GenericList genericList;

	/**
	 * @return the genericList
	 */
	public GenericList getGenericList() {
		return genericList;
	}

	@PostConstruct
	private void initModel() {
		readChildren();
        iconslist();
	}

	private void readChildren() {
		items = new ArrayList<>();
		container = request.getRequestPathInfo().getSuffixResource();
		if (container != null) {
			LOGGER.debug("suffixResource={}", container.getPath());
			for (Resource resource : container.getChildren()) {
				if (resource != null) {
					ComponentManager componentManager = request.getResourceResolver().adaptTo(ComponentManager.class);
					if (componentManager != null) {
						Component component = componentManager.getComponentOfResource(resource);
						if (component != null) {
							LOGGER.debug("Adding component {} to items", component.getPath());
							items.add(editorItemFactory.build(request, resource));
						}
					}
				}
			}
		}
	}


	/**
	 * Retrieves the container resource associated with this children editor.
	 *
	 * @return the container resource, or {@code null} if no container can be found
	 */
	public Resource getContainer() {
		return container;
	}

    public void iconslist() {
		Resource genericListResource = request.getResourceResolver().getResource(ABBOTT_ICONS_DS_PATH);
		if (genericListResource != null) {
			LOGGER.debug("Resource found for path={}", ABBOTT_ICONS_DS_PATH);
			this.genericList = genericListResource.adaptTo(GenericList.class);
			
			if(this.genericList == null) {
				LOGGER.warn("Generic List ({}) is NULL", ABBOTT_ICONS_DS_PATH);
			}
		} else {
			LOGGER.warn("Resource NOT found for path={}", ABBOTT_ICONS_DS_PATH);
		}
    }

}