package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.ColumnControl;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(AemContextExtension.class)
class ColumnControlTest {

    private final AemContext context = new AemContext();
    private ColumnControl columnControl;
    private ColumnControl columnControl1;
    private ColumnControl columnControl2;
    private ColumnControl columnControl4;
    private ColumnControl columnControl5;
    private ColumnControl columnControl6;
    private ColumnControl columnControl12;
    private ColumnControl columnControlEmpty;
    private ColumnControl columnControl7;


    @BeforeEach
    void setup() {
        context.addModelsForClasses(ColumnControlImpl.class);
        context.load().json(
                "/com/abbott/aem/platform/common/components/models/impl/v1/ColumnControlImplTest.json",
                "/content");
                columnControl = context.currentResource("/content/columncontrol").adaptTo(ColumnControl.class);
        columnControl1 = context.currentResource("/content/columncontrol1").adaptTo(ColumnControl.class);
        columnControl2 = context.currentResource("/content/columncontrol2").adaptTo(ColumnControl.class);
        columnControl4 = context.currentResource("/content/columncontrol4").adaptTo(ColumnControl.class);
        columnControl5 = context.currentResource("/content/columncontrol5").adaptTo(ColumnControl.class);
        columnControl6 = context.currentResource("/content/columncontrol6").adaptTo(ColumnControl.class);
        columnControl12 =context.currentResource("/content/columncontrol12").adaptTo(ColumnControl.class);
        columnControlEmpty = context.currentResource("/content/columncontrolEmpty").adaptTo(ColumnControl.class);
        columnControl7 = context.currentResource("/content/columncontrol7").adaptTo(ColumnControl.class);
    }

    @Test
    void testDefault()
    {
        Assertions.assertNotNull(columnControl7.getColumnList());
    }

    @Test
    void checkOutOfRange()
    {
        Assertions.assertNotNull(columnControl12.getColumnList());
    }

    @Test
    void testEmptyColumnCount()
    {
        Assertions.assertEquals(List.of(0),columnControlEmpty.getColumnList());
    }

    @Test
    void singleColumnTest() {
        Assertions.assertEquals(List.of(0), columnControl1.getColumnList());
        Assertions.assertEquals(Arrays.asList(0,1), columnControl2.getColumnList());
        Assertions.assertEquals(Arrays.asList(0,1,2,3,4,5), columnControl6.getColumnList());


    }

    @Test
    void isAdaptedFromResourceType() {

        Assertions.assertNotNull(columnControl);

    }

    @Test
    void returnsListOfColumns() {
        Assertions.assertEquals(Arrays.asList(0, 1, 2), columnControl.getColumnList());

    }

    @Test
    void returnsColumnLayout() {
        Assertions.assertEquals(Arrays.asList("6", "3", "3"), columnControl.getColumnLayout());
        Assertions.assertEquals(Arrays.asList("1"), columnControl1.getColumnLayout());
    }
}