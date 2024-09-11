package com.abbott.aem.platform.common.components.services.impl;

import static com.abbott.aem.platform.common.components.models.impl.v1.TableImpl.TABLE_CELL_FORMAT;

import java.util.Optional;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.platform.common.components.models.impl.v1.TableCellImpl;
import com.abbott.aem.platform.common.components.services.ResourceHelper;
import com.abbott.aem.platform.common.components.services.UpdateTableCellResourceService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component(service = UpdateTableCellResourceService.class)
public class UpdateTableCellResourceServiceImpl implements UpdateTableCellResourceService {

	public static final String NUMBER_OF_COLUMNS = "numberofColumns";

	public static final String NUMBER_OF_ROWS = "numberofRows";

	public static final String EDIT_TABLE_PROPERTY = "editTable"; 

	private static final Logger LOG = LoggerFactory.getLogger(UpdateTableCellResourceServiceImpl.class);

	/**
	 * Gets resource helper.
	 *
	 * @param resource the resource
	 * @return the resource helper
	 */
	public static ResourceHelper getResourceHelper(Resource resource) {
		return ResourceHelper.ResourceHelperBuilder.aResourceHelper(resource).build();
	}

	private static final String PARENT_RESOURCE_NULL_ERROR = "Parent resource is null for cell resource: {}";
	@Override
	public void updateTableRows(Resource cellResource, String propertyName, String propertyValue, String flagName) {
		Resource parentResource = cellResource.getParent();
		if (parentResource == null) {
			LOG.error(PARENT_RESOURCE_NULL_ERROR, cellResource.getPath());
			return;
		}

		String tableCellName = cellResource.getName();
		getResourceHelper(cellResource).addOrChangeProperty(flagName, "false");

		ValueMap parentValueMap = parentResource.getValueMap();
		long columns = Optional.ofNullable(parentValueMap)
				.map(valueMap -> valueMap.get(NUMBER_OF_COLUMNS, 0L))
				.orElse(0L);

		String rowNumber = tableCellName.split("-")[1].split("")[0];
		if (columns != 0) {
			for (int i = 0; i < columns; i++) {
				updateCellProperties(parentResource, propertyName, propertyValue,
						String.format(TABLE_CELL_FORMAT, rowNumber, i));
			}
		} else {
			LOG.error("Value map not found for the table component");
		}
	}

	@Override
	public void addRow(Resource cellResource, String position) {
		Resource parentResource = cellResource.getParent();
		String tableCellName = cellResource.getName();
		getResourceHelper(cellResource).removeProp(EDIT_TABLE_PROPERTY);
		long columns = Optional.ofNullable(parentResource).map(Resource::getValueMap)
				.map(valueMap1 -> Long.valueOf(valueMap1.get(NUMBER_OF_COLUMNS, 0))).orElse(0L);
		long rows = Optional.ofNullable(parentResource).map(Resource::getValueMap)
				.map(valueMap1 -> Long.valueOf(valueMap1.get(NUMBER_OF_ROWS, 0))).orElse(0L);
		int currentRow = Integer.parseInt(tableCellName.split("-")[1].split("")[0]);
		int rowCount = 0;
		if (TableCellImpl.ADD_ROW_BELOW.equals(position)) {
			rowCount = currentRow;
		} else if (TableCellImpl.ADD_ROW_ABOVE.equals(position)) {
			rowCount = currentRow - 1;
		}
		for (int i = (int) rows - 1; i > rowCount; i--) {
			moveRowCellResource(parentResource, i, columns, true);
		}
		getResourceHelper(parentResource).addOrChangeProperty(NUMBER_OF_ROWS, String.valueOf(rows + 1));
	}

	@Override
	public void deleteCurrentRow(Resource cellResource) {
		Resource parentResource = cellResource.getParent();
		if (parentResource == null) {
			LOG.error(PARENT_RESOURCE_NULL_ERROR, cellResource.getPath());
			return;
		}

		String tableCellName = cellResource.getName();
		getResourceHelper(cellResource).removeProp(EDIT_TABLE_PROPERTY);

		ValueMap parentValueMap = parentResource.getValueMap();
		long columns = Optional.of(parentValueMap)
				.map(valueMap -> valueMap.get(NUMBER_OF_COLUMNS, 0L))
				.orElse(0L);
		long rows = Optional.of(parentValueMap)
				.map(valueMap -> valueMap.get(NUMBER_OF_ROWS, 0L))
				.orElse(0L);

		int currentRow = Integer.parseInt(tableCellName.split("-")[1].split("")[0]);
		for (int i = 0; i < columns; i++) {
			deleteCellResource(parentResource, currentRow, i);
		}
		for (int i = currentRow + 1; i < rows; i++) {
			moveRowCellResource(parentResource, i, columns, false);
		}
		getResourceHelper(parentResource).addOrChangeProperty(NUMBER_OF_ROWS, String.valueOf(rows - 1));
	}

	@Override
	public void addColumn(Resource cellResource, String position) {
		Resource parentResource = cellResource.getParent();
		String tableCellName = cellResource.getName();
		getResourceHelper(cellResource).removeProp(EDIT_TABLE_PROPERTY);
		long columns = Optional.ofNullable(parentResource).map(Resource::getValueMap)
				.map(valueMap1 -> Long.valueOf(valueMap1.get(NUMBER_OF_COLUMNS, 0))).orElse(0L);
		long rows = Optional.ofNullable(parentResource).map(Resource::getValueMap)
				.map(valueMap1 -> Long.valueOf(valueMap1.get(NUMBER_OF_ROWS, 0))).orElse(0L);
		int currentColumn = Integer.parseInt(tableCellName.split("-")[1].split("")[1]);
		int colCount = 0;
		if (TableCellImpl.ADD_COLUMN_RIGHT.equals(position)) {
			colCount = currentColumn;
		} else if (TableCellImpl.ADD_COLUMN_LEFT.equals(position)) {
			colCount = currentColumn - 1;
		}
		for (int i = (int) columns - 1; i > colCount; i--) {
			moveColumnCellResource(parentResource, rows, i, true);
		}
		getResourceHelper(parentResource).addOrChangeProperty(NUMBER_OF_COLUMNS, String.valueOf(columns + 1));
	}

	@Override
	public void deleteCurrentColumn(Resource cellResource) {
		Resource parentResource = cellResource.getParent();
		if (parentResource == null) {
			LOG.error(PARENT_RESOURCE_NULL_ERROR, cellResource.getPath());
			return;
		}

		String tableCellName = cellResource.getName();
		getResourceHelper(cellResource).removeProp(EDIT_TABLE_PROPERTY);

		long columns = Optional.of(parentResource.getValueMap())
				.map(valueMap -> valueMap.get(NUMBER_OF_COLUMNS, 0L))
				.orElse(0L);
		long rows = Optional.of(parentResource.getValueMap())
				.map(valueMap -> valueMap.get(NUMBER_OF_ROWS, 0L))
				.orElse(0L);

		int currentColumn = Integer.parseInt(tableCellName.split("-")[1].split("")[1]);
		for (int i = 0; i < rows; i++) {
			deleteCellResource(parentResource, i, currentColumn);
		}
		for (int i = currentColumn + 1; i < columns; i++) {
			moveColumnCellResource(parentResource, rows, i, false);
		}
		getResourceHelper(parentResource).addOrChangeProperty(NUMBER_OF_COLUMNS, String.valueOf(columns - 1));
	}

	@Override
	public void updateTableColumns(Resource cellResource, String propertyName, String propertyValue, String flagName) {
		Resource parentResource = cellResource.getParent();
		if (parentResource == null) {
			LOG.error(PARENT_RESOURCE_NULL_ERROR, cellResource.getPath());
			return;
		}

		String tableCellName = cellResource.getName();
		getResourceHelper(cellResource).addOrChangeProperty(flagName, "false");

		long rows = Optional.of(parentResource.getValueMap())
				.map(valueMap -> valueMap.get(NUMBER_OF_ROWS, 0L))
				.orElse(0L);

		String[] parts = tableCellName.split("-");
		if (parts.length < 2) {
			LOG.error("Invalid table cell name format: {}", tableCellName);
			return;
		}

		String columnNumber = parts[1];
		if (columnNumber.length() < 2) {
			LOG.error("Invalid column number format in table cell name: {}", tableCellName);
			return;
		}

		columnNumber = columnNumber.substring(1); // Extracting the numeric part

		if (rows != 0) {
			for (int i = 0; i < rows; i++) {
				String cellName = String.format(TABLE_CELL_FORMAT, i, columnNumber);
				updateCellProperties(parentResource, propertyName, propertyValue, cellName);
			}
		} else {
			LOG.error("Value map not found for the table component");
		}
	}

	private void updateCellProperties(Resource parentResource, String propertyName, String propertyValue, String cellName) {
		Resource resource = parentResource.getChild(cellName);
		if (resource == null) {
			LOG.error(PARENT_RESOURCE_NULL_ERROR, cellName, parentResource.getPath());
			return;
		}

		getResourceHelper(resource).addOrChangeProperty(propertyName, propertyValue);
	}

	private void moveRowCellResource(Resource parentResource, int rowNumber, long columns, boolean moveCellDown) {
		for (int col = 0; col < columns; col++) {
			Resource resource = parentResource.getChild(String.format(TABLE_CELL_FORMAT, rowNumber, col));
			if (moveCellDown) {
				getResourceHelper(resource).renameResource(String.format(TABLE_CELL_FORMAT, rowNumber + 1, col));
			} else {
				getResourceHelper(resource).renameResource(String.format(TABLE_CELL_FORMAT, rowNumber - 1, col));
			}
		}
	}

	private void deleteCellResource(Resource parentResource, int rowNumber, int column) {
		String commitFlag = "true";
		Resource resource = parentResource.getChild(String.format(TABLE_CELL_FORMAT, rowNumber, column));
		if (resource != null) {
			getResourceHelper(resource).deleteResource(commitFlag);
		}
	}

	private void moveColumnCellResource(Resource parentResource, long rows, int columnNumber, boolean moveCellRight) {
		for (int row = 0; row < rows; row++) {
			Resource resource = parentResource.getChild(String.format(TABLE_CELL_FORMAT, row, columnNumber));
			if (moveCellRight) {
				getResourceHelper(resource).renameResource(String.format(TABLE_CELL_FORMAT, row, columnNumber + 1));
			} else {
				getResourceHelper(resource).renameResource(String.format(TABLE_CELL_FORMAT, row, columnNumber - 1));
			}
		}
	}

}
