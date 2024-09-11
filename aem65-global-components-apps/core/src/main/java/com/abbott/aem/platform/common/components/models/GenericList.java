package com.abbott.aem.platform.common.components.models;

import java.util.List;
import java.util.Locale;

import javax.annotation.CheckForNull;
import javax.annotation.Nonnull;

import org.osgi.annotation.versioning.ProviderType;

import com.adobe.cq.wcm.core.components.models.Component;

@ProviderType
public interface GenericList extends Component {

	/**
	 * Return an ordered list of text/value pairs.
	 * 
	 * @return the item list
	 */
	@Nonnull
	List<Item> getItems();

	/**
	 * Get an item's text by its value.
	 * 
	 * @param value the list item's value
	 * @return the text or null
	 */
	@CheckForNull
	String lookupText(String value);

	/**
	 * Get an item's localized text by its value.
	 * 
	 * @param value  the list item's value
	 * @param locale the locale for localization
	 * @return the text or null
	 */
	@CheckForNull
	String lookupText(String value, Locale locale);

	/**
	 * A generic item/value pair within a list.
	 *
	 */
	interface Item {

		/**
		 * Get the item's text.
		 * 
		 * @return the text
		 */
		@Nonnull
		String getText();

		/**
		 * Get the item's localized text.
		 * 
		 * @param locale the locale for localization
		 * 
		 * @return the text
		 */
		@Nonnull
		String getText(Locale locale);

		/**
		 * Get the item's value.
		 * 
		 * @return the value
		 */
		@Nonnull
		String getValue();
	}
}
