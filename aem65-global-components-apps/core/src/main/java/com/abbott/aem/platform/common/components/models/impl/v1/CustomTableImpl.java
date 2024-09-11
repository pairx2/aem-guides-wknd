package com.abbott.aem.platform.common.components.models.impl.v1;
import com.abbott.aem.platform.common.components.models.CustomTable;

import java.util.List;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import javax.annotation.PostConstruct;

import static org.apache.sling.api.servlets.HttpConstants.METHOD_POST;

@Data
@Model(adaptables ={ SlingHttpServletRequest.class,Resource.class}  ,
	   adapters = { CustomTable.class, ComponentExporter.class }, 
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CustomTableImpl extends ComponentProxyImpl implements CustomTable {

	private static final String DELIMITER = "::";

	@ValueMapValue
	private int colIndex=1;

	@ValueMapValue
	private int rangeFilterColIndex=1;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean enablePrimaryButton;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean enableLink;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean enableDownloadButton;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String downloadDataSource;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean enableSearch;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String searchLabelText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String tableRowCount;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean enablePagination;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean editTableRowResult;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean deleteTableRowResult;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String tableDataSource;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String noTableDataFoundText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String invalidCoulumnKeyText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String columnKey;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String columnLabel;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String dataSourceType;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String jsonPath;
	
	@ChildResource(name = "tableColumnlist")
    @Setter(AccessLevel.NONE)
	public List<Resource> tableColumnlist;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean enableColFilter;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String filterLabelText;


	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean enableHiddenColFilter;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean enableRangeFilter;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String rangeFilterLabelText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String minRangeLabelText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String maxRangeLabelText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String closeText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String rangeFilterType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean enableReset;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String resetText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String updateCreatedRow;
 
    @ValueMapValue
	@Setter(AccessLevel.NONE)
	private String updateRequest;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean disableDefaultSorting;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String updateResponse;

	@Setter(AccessLevel.NONE)
	private String eslDataSourceMethodAction = METHOD_POST;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private Boolean enableBulkSelect;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String bulkSelectLabelText;

	public void incrementColIndex() {
		colIndex++;
	}

	public void incrementColIndexForRangeFilter() {
		rangeFilterColIndex++;
	}
	@PostConstruct
	protected void customTableKeyValue() {
		if (StringUtils.contains(tableDataSource, DELIMITER)) {
			String[] formTypeWithAction = StringUtils.split(tableDataSource, DELIMITER);
			this.tableDataSource = formTypeWithAction[0];
			this.eslDataSourceMethodAction = formTypeWithAction[1];
		}
	}



}
