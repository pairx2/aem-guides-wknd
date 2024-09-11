package  com.abbott.aem.an.similac.core.models;


import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.utils.CommonConstants;
import com.day.cq.wcm.api.Page;

/**
 * The Class HeaderModel.
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeaderModel {

	/** The Constant LOGGER. */
	private static final Logger LOGGER = LoggerFactory.getLogger(HeaderModel.class);
	

	/** The current page. */
	@ScriptVariable
	public Page currentPage;
	
	/** The header resource path. */
	@Inject
	public String headerResourcePath;
	
	/**
	 * Activate.
	 */
	@PostConstruct
	public void activate() {
		if(LOGGER.isDebugEnabled()) {
			LOGGER.debug("Header Model Pagepath {}", headerResourcePath);
		}
	}
	
	/**
	 * Returns the path relative to header resource 
	 *
	 * @return the relative header path
	 */
	public String getRelativeHeaderPath() {
		return headerResourcePath + CommonConstants.HEADER_RESOURCE_PATH;
	}

}