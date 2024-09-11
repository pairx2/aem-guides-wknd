package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.ColumnControl;
import com.adobe.cq.export.json.ExporterConstants;
import com.google.common.collect.ImmutableList;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.annotation.PostConstruct;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * This model is used by column container component
 */
@Slf4j
@EqualsAndHashCode
@ToString
@Model(adaptables = Resource.class, adapters = ColumnControl.class, resourceType = ColumnControlImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ColumnControlImpl implements ColumnControl {

    public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/columncontrol/v1/columncontrol";

    private static final Logger LOGGER = LoggerFactory.getLogger(ColumnControlImpl.class);

    private static final String INTEGER_VALUE_PATTERN = "-?\\d{1,9}";

    private static final String COL_COUNT_DEFAULT_VALUE = "1";

    private static final int COL_COUNT_MIN_VALUE = 1;

    private static final int COL_COUNT_MAX_VALUE = 6;

    private static final String ONE = "1";

    private static final String TWO = "2";

    private static final String THREE = "3";

    private static final String FOUR = "4";

    private static final String FIVE = "5";

    private static final String SIX = "6";

    private static final String COMMA = ",";

    @ValueMapValue
    private String colCount;

    @ValueMapValue
    private String twoColumns;

    @ValueMapValue
    private String threeColumns;

    @ValueMapValue
    private String fourColumns;

    @ValueMapValue
    private String fiveColumns;

    @ValueMapValue
    private String sixColumns;

    @Getter
    private List<Integer> columnList;

    @Getter
    private List<String> columnLayout;

    /**
     * Method to define different layouts based on the authoring.
     */
    @PostConstruct
    public void init() {
        if (!isNumericInDefaultRange(colCount)) {
            colCount = COL_COUNT_DEFAULT_VALUE;
            LOGGER.warn(
                    "Column count value {} cannot be parsed to numeric value or is out or range of <{},{}>, default value {} applied",
                    colCount, COL_COUNT_MIN_VALUE, COL_COUNT_MAX_VALUE, COL_COUNT_DEFAULT_VALUE);
        }

        columnList = getList(colCount);
        String[] colArray;
        switch (colCount) {
        case ONE:
            columnLayout = createSingleColumn();
            break;
        case TWO:
            colArray = StringUtils.split(twoColumns, COMMA);
            columnLayout = createColumn(colArray);
            break;
        case THREE:
            colArray = StringUtils.split(threeColumns, COMMA);
            columnLayout = createColumn(colArray);
            break;
        case FOUR:
            colArray = StringUtils.split(fourColumns, COMMA);
            columnLayout = createColumn(colArray);
            break;
        case FIVE:
            colArray = StringUtils.split(fiveColumns, COMMA);
            columnLayout = createColumn(colArray);
            break;
        case SIX:
            colArray = StringUtils.split(sixColumns, COMMA);
            columnLayout = createColumn(colArray);
            break;
        default:
            log.error("Unknown colCount value {}", colCount);
            break;
        }
    }

    private List<Integer> getList(String compCount) {
        List<Integer> countList = new ArrayList<>();
        if (StringUtils.isNotBlank(compCount)) {
            int count = Integer.parseInt(compCount);
            for (int i = 0; i < count; i++) {
                countList.add(i);
            }
        }
        return countList;
    }

    private List<String> createColumn(String[] value) {
        List<String> layoutList = new ArrayList<>();
        if (null != value) {
            layoutList.addAll(Arrays.asList(value));
        }
        return layoutList;
    }

    private List<String> createSingleColumn() {
        return ImmutableList.of(ONE);
    }

    private boolean isNumericInDefaultRange(String input) {
        if (StringUtils.isNotBlank(input) && input.matches(INTEGER_VALUE_PATTERN)) {
            int inputNumeric = Integer.parseInt(input);
            return inputNumeric >= COL_COUNT_MIN_VALUE && inputNumeric <= COL_COUNT_MAX_VALUE;
        }
        return false;
    }
}
