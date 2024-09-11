package com.abbott.aem.platform.common.components.services;

import org.apache.sling.api.resource.Resource;

/**
 * The interface Update table cell resource service.
 */
public interface UpdateTableCellResourceService {

	/**
	 * Update table rows.
	 *
	 * @param cellResource  the cell resource
	 * @param propertyName  the property name
	 * @param propertyValue the property value
	 * @param flagName      the flag name
	 */
	void updateTableRows(Resource cellResource, String propertyName, String propertyValue, String flagName);

	/**
	 * Update table columns.
	 *
	 * @param cellResource  the cell resource
	 * @param propertyName  the property name
	 * @param propertyValue the property value
	 * @param flagName      the flag name
	 */
	void updateTableColumns(Resource cellResource, String propertyName, String propertyValue, String flagName);

	/**
	 * Add row.
	 *
	 * @param cellResource the cell resource
	 * @param position     the position
	 */
	void addRow(Resource cellResource, String position);

	/**
	 * Delete current row.
	 *
	 * @param cellResource the cell resource
	 */
	void deleteCurrentRow(Resource cellResource);

	/**
	 * Add column.
	 *
	 * @param cellResource the cell resource
	 * @param position     the position
	 */
	void addColumn(Resource cellResource, String position);

	/**
	 * Delete current column.
	 *
	 * @param cellResource the cell resource
	 */
	void deleteCurrentColumn(Resource cellResource);
}
