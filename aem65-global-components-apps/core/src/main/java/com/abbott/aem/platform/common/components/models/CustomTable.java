package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.apache.sling.api.resource.Resource;
import org.osgi.annotation.versioning.ConsumerType;

import java.util.List;

/**
 * The Interface CustomTable.
 */
@ConsumerType
public interface CustomTable extends Component {
    default Boolean getEnablePrimaryButton() {
        throw new UnsupportedOperationException();
    }

    default Boolean getEnableLink() {
        throw new UnsupportedOperationException();
    }

    default Boolean getEnableDownloadButton() {
        throw new UnsupportedOperationException();
    }

    default String getDownloadDataSource() {
        throw new UnsupportedOperationException();
    }

    default Boolean getEnableSearch() {
        throw new UnsupportedOperationException();
    }

    default String getSearchLabelText() {
        throw new UnsupportedOperationException();
    }

    default String getTableRowCount() {
        throw new UnsupportedOperationException();
    }

    default Boolean getEnablePagination() {
        throw new UnsupportedOperationException();
    }

    default Boolean getEditTableRowResult() {
        throw new UnsupportedOperationException();
    }

    default Boolean getDeleteTableRowResult() {
        throw new UnsupportedOperationException();
    }

    default String getTableDataSource() {
        throw new UnsupportedOperationException();
    }

    default String getNoTableDataFoundText() {
        throw new UnsupportedOperationException();
    }

    default String getInvalidCoulumnKeyText() {
        throw new UnsupportedOperationException();
    }

    default List<Resource> getTableColumnlist() {
        throw new UnsupportedOperationException();
    }

    default String getColumnKey() {
        throw new UnsupportedOperationException();
    }

    default String getColumnLabel() {
        throw new UnsupportedOperationException();
    }

    default String getDataSourceType() {
        throw new UnsupportedOperationException();
    }

    default String getJsonPath() {
        throw new UnsupportedOperationException();
    }

    default Boolean getEnableColFilter() {
        throw new UnsupportedOperationException();
    }

    default String getFilterLabelText() {
        throw new UnsupportedOperationException();
    }

    default Boolean getEnableHiddenColFilter() {
        throw new UnsupportedOperationException();
    }

    default Boolean getEnableRangeFilter() {
        throw new UnsupportedOperationException();
    }

    default String getRangeFilterLabelText() {
        throw new UnsupportedOperationException();
    }

    default String getMinRangeLabelText() {
        throw new UnsupportedOperationException();
    }

    default String getMaxRangeLabelText() {
        throw new UnsupportedOperationException();
    }

    default String getCloseText() {
        throw new UnsupportedOperationException();
    }

    default String getRangeFilterType() {
        throw new UnsupportedOperationException();
    }

    default Boolean getEnableReset() {
        throw new UnsupportedOperationException();
    }

    default String getResetText() {
        throw new UnsupportedOperationException();
    }

    default String getUpdateCreatedRow() {
        throw new UnsupportedOperationException();
    }

    default String getUpdateRequest() {
        throw new UnsupportedOperationException();
    }

    default String getEslDataSourceMethodAction() {
        throw new UnsupportedOperationException();
    }

    default String getUpdateResponse() {
        throw new UnsupportedOperationException();
    }

    default Boolean getDisableDefaultSorting() {
        throw new UnsupportedOperationException();
    }

	default Boolean getEnableBulkSelect() { throw new UnsupportedOperationException();}

	default String getBulkSelectLabelText() { throw new UnsupportedOperationException();}

    void incrementColIndexForRangeFilter();

    void incrementColIndex();

    int getColIndex();

    int getRangeFilterColIndex();
}
