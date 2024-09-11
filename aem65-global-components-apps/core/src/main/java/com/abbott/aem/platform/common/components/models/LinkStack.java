package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * @author neeraj.chaudhary This model is used for link-stack component
 */
@ConsumerType
public interface LinkStack extends Component {

	/**
	 * @return the title of the link stack.
	 */
	default String getStackTitle() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @return the link to which stack title .
	 */
	default String getStackLink() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @return the whether stack link is external or not.
	 */
	default boolean isStackExternal() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @return the whether redirect confirmation popup is used for external links.
	 */
	default boolean isRedirectConfirm() {
		throw new UnsupportedOperationException();
	}

	/**
	 *
	 * @return the link action type
	 */
	default String getAction() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @return the list of links under Stack title field.
	 */
	default List<LinkStackItem> getLinks() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @return the list of links under Site Select Sub Sites.
	 */
	default List<LinkStackItem> getSites() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @return the type of the Dialog (Link Stack or Site Select)
	 */
	default String getLinkStackType() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @return the Site List Default Text
	 */
	default String getSiteListDefault() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @return the Site List Title Text
	 */
	default String getSiteListTitle() {
		throw new UnsupportedOperationException();
	}
	
	/**
	 * @return the Link Stack aria-describedby attribute
	 */
	default String getAriaDescribedBy() {
		throw new UnsupportedOperationException();
	}

	/**
	 * @return the Link Stack enableButton attribute
	 */
	default String getEnableButton() {
		return Boolean.FALSE.toString();
	}

	/**
	 * @return the Link Stack enableStickyList attribute
	 */
	default String getEnableStickyList() {
		return Boolean.FALSE.toString();
	}
}
