package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface TableCell extends Component {

	public String getCellText();

	public String getCellTextColor();

	public String getApplyCellTextColorToEntireRow();

	public String getApplyCellTextColorToEntireColumn();

	public String getTableCellHeader();

	public String getApplyCellHeaderToEntireRow();

	public String getApplyCellHeaderToEntireColumn();

	public String getCellColor();

	public String getApplyCellColorToEntireRow();

	public String getApplyCellColorToEntireColumn();

	public String getTextAlignment();

	public String getApplyTextAlignmentToEntireRow();

	public String getApplyTextAlignmentToEntireColumn();

	public String getEditTable();

	public String getTableCellTag();

}