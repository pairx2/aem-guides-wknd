package com.abbott.aem.platform.common.components.models;

import java.util.List;
import java.util.Map;
import com.abbott.aem.platform.common.components.pojo.TableButton;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface Table extends Component {

	public String getTableCaption();

	public String getNumberofColumns();

	public String getNumberofRows();

	public String getAddCopyHtmlButton();

	public String getTableWidth();

	public String getCssClass();

	public String getColumnWidth();

	public String getBorderTheme();

	public String getID();

	Map<Integer, List<String>> getTableMap();

	List<Integer> getColumnNumbers();

	List<String> getColumnWidthList();

	public long getColWidth();

	public TableButton getCopyHtmlButton();

	List<LegendListItem> getTableLegends();

	public String getStartColor();
	
	public String getStartColorPosition();
   
	public String getEndColor();
   
	public String getEndColorPosition();

}
