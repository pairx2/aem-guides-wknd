package com.abbott.aem.platform.common.components.models.impl.v1;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.TableCell;
import com.abbott.aem.platform.common.components.services.UpdateTableCellResourceService;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { TableCell.class,
		ComponentExporter.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class TableCellImpl implements TableCell {

	public static final String ADD_ROW_BELOW = "add-row-below";

	public static final String ADD_ROW_ABOVE = "add-row-above";

	public static final String DELETE_CURRENT_ROW = "delete-current-row";

	public static final String ADD_COLUMN_LEFT = "add-column-left";

	public static final String ADD_COLUMN_RIGHT = "add-column-right";

	public static final String DELETE_CURRENT_COLUMN = "delete-current-column";

	@SlingObject
	private Resource resource;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String cellText;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String cellTextColor;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String applyCellTextColorToEntireRow;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String applyCellTextColorToEntireColumn;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String tableCellHeader;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String applyCellHeaderToEntireRow;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String applyCellHeaderToEntireColumn;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String cellColor;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String applyCellColorToEntireRow;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String applyCellColorToEntireColumn;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String textAlignment;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String applyTextAlignmentToEntireRow;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String applyTextAlignmentToEntireColumn;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String editTable;

	

	@OSGiService
	private UpdateTableCellResourceService updateTableCellResourceService;

	@PostConstruct
	private void init() {
		
		if (Boolean.parseBoolean(applyCellColorToEntireRow)) {
			updateTableCellResourceService.updateTableRows(resource, "cellColor", cellColor,
					"applyCellColorToEntireRow");
		}
		if (Boolean.parseBoolean(applyCellColorToEntireColumn)) {
			updateTableCellResourceService.updateTableColumns(resource, "cellColor", cellColor,
					"applyCellColorToEntireColumn");
		}
		if (Boolean.parseBoolean(applyTextAlignmentToEntireRow)) {
			updateTableCellResourceService.updateTableRows(resource, "textAlignment", textAlignment,
					"applyTextAlignmentToEntireRow");
		}
		if (Boolean.parseBoolean(applyTextAlignmentToEntireColumn)) {
			updateTableCellResourceService.updateTableColumns(resource, "textAlignment", textAlignment,
					"applyTextAlignmentToEntireColumn");
		}
		if (Boolean.parseBoolean(applyCellHeaderToEntireRow)) {
			updateTableCellResourceService.updateTableRows(resource, "tableCellHeader", tableCellHeader,
					"applyCellHeaderToEntireRow");
		}
		if (Boolean.parseBoolean(applyCellHeaderToEntireColumn)) {
			updateTableCellResourceService.updateTableColumns(resource, "tableCellHeader", tableCellHeader,
					"applyCellHeaderToEntireColumn");
		}
		if (Boolean.parseBoolean(applyCellTextColorToEntireRow)) {
			updateTableCellResourceService.updateTableRows(resource, "cellTextColor", cellTextColor,
					"applyCellTextColorToEntireRow");
		}
		if (Boolean.parseBoolean(applyCellTextColorToEntireColumn)) {
			updateTableCellResourceService.updateTableColumns(resource, "cellTextColor", cellTextColor,
					"applyCellTextColorToEntireColumn");
		}
		
		if (ADD_ROW_BELOW.equals(editTable)) {
			updateTableCellResourceService.addRow(resource, ADD_ROW_BELOW);
		} else if (ADD_ROW_ABOVE.equals(editTable)) {
			updateTableCellResourceService.addRow(resource, ADD_ROW_ABOVE);
		} else if (DELETE_CURRENT_ROW.equals(editTable)) {
			updateTableCellResourceService.deleteCurrentRow(resource);
		} else if (DELETE_CURRENT_COLUMN.equals(editTable)) {
			updateTableCellResourceService.deleteCurrentColumn(resource);
		} else if (ADD_COLUMN_LEFT.equals(editTable)) {
			updateTableCellResourceService.addColumn(resource, ADD_COLUMN_LEFT);
		} else if (ADD_COLUMN_RIGHT.equals(editTable)) {
			updateTableCellResourceService.addColumn(resource, ADD_COLUMN_RIGHT);
		}
	}

	@Override
	public String getCellText() {
		return cellText;
	}

	@Override
	public String getCellTextColor() {
		return cellTextColor;
	}

	@Override
	public String getApplyCellTextColorToEntireRow() {
		return applyCellTextColorToEntireRow;
	}

	@Override
	public String getApplyCellTextColorToEntireColumn() {
		return applyCellTextColorToEntireColumn;
	}

	public String getTableCellHeader() {
		return tableCellHeader;
	}

	@Override
	public String getApplyCellHeaderToEntireRow() {
		return applyCellHeaderToEntireRow;
	}

	@Override
	public String getApplyCellHeaderToEntireColumn() {
		return applyCellHeaderToEntireColumn;
	}

	@Override
	public String getCellColor() {
		return cellColor;
	}

	@Override
	public String getApplyCellColorToEntireRow() {
		return applyCellColorToEntireRow;
	}

	@Override
	public String getApplyCellColorToEntireColumn() {
		return applyCellColorToEntireColumn;
	}

	@Override
	public String getTableCellTag() {
		return (tableCellHeader != null && tableCellHeader.equals("yes")) ? "th" : "td";

	}

	@Override
	public String getTextAlignment() {
		return textAlignment;
	}

	@Override
	public String getApplyTextAlignmentToEntireRow() {
		return applyTextAlignmentToEntireRow;
	}

	@Override
	public String getApplyTextAlignmentToEntireColumn() {
		return applyTextAlignmentToEntireColumn;
	}

	@Override
	public String getEditTable() {
		return editTable;
	}

}