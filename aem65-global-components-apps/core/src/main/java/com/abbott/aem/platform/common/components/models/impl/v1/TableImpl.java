package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.LegendListItem;
import com.abbott.aem.platform.common.components.models.Table;
import com.abbott.aem.platform.common.components.pojo.TableButton;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { Table.class,
		ComponentExporter.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class TableImpl extends ComponentProxyImpl implements Table {

	@ChildResource
	@Setter(AccessLevel.NONE)
	private List<LegendListItem> tableLegends = Collections.emptyList();

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String tableCaption;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String id;

	@Setter(AccessLevel.NONE)

	@ValueMapValue
	public String numberofColumns;

	@Setter(AccessLevel.NONE)

	@ValueMapValue
	public String numberofRows;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String addCopyHtmlButton;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String tableWidth;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String cssClass;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String columnWidth;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	public String borderTheme;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String startColor;
		
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String startColorPosition;

	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String endColor;
		
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private String endColorPosition;

	private List<String> columnWidthList = Collections.emptyList();

	private Map<Integer, List<String>> tableMap;

	private List<Integer> columnNumbers = Collections.emptyList();

	public static final String TABLE_CELL_FORMAT = "tableCell-%s%s";

	private long colWidth;

	@PostConstruct
	private void init() {

		if (StringUtils.isNotBlank(numberofColumns) && StringUtils.isNotBlank(numberofRows) && Integer.parseInt(numberofColumns) != 0) {			
			
				tableMap = new HashMap<>();
				columnNumbers = new ArrayList<>();
				for (int col = 0; col < (Integer.parseInt(numberofColumns)); col++) {
					columnNumbers.add(col);
				}
				for (int row = 0; row < (Integer.parseInt(numberofRows)); row++) {
					List<String> cell = new ArrayList<>();
					for (int column = 0; column < (Integer.parseInt(numberofColumns)); column++) {
						cell.add(String.format(TABLE_CELL_FORMAT, row, column));
					}
					tableMap.put(row, cell);
				}				
				colWidth = 100 / (Integer.parseInt(numberofColumns));
			
		}

	}
	
	@Override
	public String getTableWidth() {
		if (StringUtils.isNotBlank(numberofColumns) && StringUtils.isNotBlank(numberofRows) && StringUtils.isNotBlank(tableWidth)) {			
				return tableWidth;		
		}
		return null;
	}
	
	@Override
	public List<String> getColumnWidthList(){
		if (StringUtils.isNotBlank(numberofColumns) && StringUtils.isNotBlank(numberofRows) && StringUtils.isNotBlank(columnWidth)) {
				double[] array = Stream.of(columnWidth.split(",")).limit(Integer.parseInt(numberofColumns))
						.mapToDouble(Double::parseDouble).toArray();
				int sum = (int) Arrays.stream(array).sum();
				columnWidthList = Arrays.stream(array).map(i -> Math.round((i / sum) * 100)).mapToObj(num -> num + "%")
						.collect(Collectors.toList());		
		}
		return Collections.unmodifiableList(columnWidthList);
	}

	@Override
	public Map<Integer, List<String>> getTableMap() {
		return tableMap;
	}

	@Override
	public List<Integer> getColumnNumbers() {
		return Collections.unmodifiableList(columnNumbers);
	}

	@Override
	public long getColWidth() {
		return colWidth;
	}

	@Override
	public String getTableCaption() {
		return tableCaption;
	}

	@Override
	public String getNumberofColumns() {
		return numberofColumns;
	}

	@Override
	public String getNumberofRows() {
		return numberofRows;
	}

	@Override
	public String getAddCopyHtmlButton() {
		return addCopyHtmlButton;
	}

	@Override
	public String getCssClass() {
		return cssClass;
	}

	@Override
	public String getColumnWidth() {
		return columnWidth;
	}

	@Override
	public String getBorderTheme() {
		return borderTheme;
	}

	@Override
	public List<LegendListItem> getTableLegends() {
		return Collections.unmodifiableList(tableLegends);
	}

	@Override
	public String getID() {
		return id;
	}

	@Override
	public String getStartColor() {
		return startColor;
	}

	@Override
	public String getStartColorPosition() {
		return startColorPosition;
	}

	@Override
	public String getEndColor() {
		return endColor;
	}

	@Override
	public String getEndColorPosition() {
		return endColorPosition;
	}

	@Override
	public TableButton getCopyHtmlButton() {
		return TableButton.ButtonBuilder.aButton().withTextHoverColor("colorPalette_PrimaryBlue")
				.withTextColor("colorPalette_Black").withButtonHoverColor("colorPalette_Black")
				.withButtonColor("colorPalette_PrimaryBlue").withContextUnsafeRequired(Boolean.TRUE)
				.withTitle("Copy Table Html").withTarget(StringUtils.EMPTY).withUrl("javascript:void(0)").build();
	}

}