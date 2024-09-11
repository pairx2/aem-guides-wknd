package com.abbott.aem.platform.common.components.models.impl.v1;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.platform.common.components.models.TableCell;
import com.abbott.aem.platform.common.components.services.UpdateTableCellResourceService;
import com.abbott.aem.platform.common.components.services.impl.UpdateTableCellResourceServiceImpl;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
public class TableCellImplTest {

	private final AemContext ctx = new AemContext();

	public Resource resource;

	public UpdateTableCellResourceService updateTableCellResourceService = new UpdateTableCellResourceServiceImpl();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(TableCell.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TableCellImplTest.json", "/content");
		ctx.registerInjectActivateService(updateTableCellResourceService); 
	}

	@Test
	void testTableCellComponentApplyCellColorToEntireRow() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-11");
		ModifiableValueMap modifiableValueMap = resource.adaptTo(ModifiableValueMap.class);
		modifiableValueMap.put("applyCellColorToEntireRow", true);
		ctx.currentResource(resource);
		TableCell model = ctx.request().adaptTo(TableCell.class);
		Resource tableCell10 = ctx.resourceResolver().getResource("/content/table/tableCell-10");
		Resource tableCell12 = ctx.resourceResolver().getResource("/content/table/tableCell-12");
		assertAll(() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellColor()),
				() -> assertEquals("11", model.getCellText()),
		
				() -> assertEquals("right", model.getTextAlignment()),
				() -> assertEquals("th", model.getTableCellTag()),
				() -> assertEquals("false", resource.getValueMap().get("applyCellColorToEntireRow")),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", tableCell10.getValueMap().get("cellColor")),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", tableCell12.getValueMap().get("cellColor")),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellTextColor()));
	}

	
	@Test
	void testTableCellComponentApplyCellColorToEntireColumn() { 
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-11");
		ModifiableValueMap modifiableValueMap = resource.adaptTo(ModifiableValueMap.class);
		modifiableValueMap.put("applyCellColorToEntireColumn", true);
		ctx.currentResource(resource);
		TableCell model = ctx.request().adaptTo(TableCell.class);
		Resource tableCell01 = ctx.resourceResolver().getResource("/content/table/tableCell-01");
		
		assertAll(() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellColor()),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellTextColor()),
				() -> assertEquals("11", model.getCellText()), //
				
				() -> assertEquals("right", model.getTextAlignment()),
				() -> assertEquals("th", model.getTableCellTag()),
				() -> assertEquals("false", resource.getValueMap().get("applyCellColorToEntireColumn")),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", tableCell01.getValueMap().get("cellColor")));
				
	}
	 

	@Test
	void testTableCellComponentApplyTextAlignmentToEntireColumn() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-11");
		ModifiableValueMap modifiableValueMap = resource.adaptTo(ModifiableValueMap.class);
		modifiableValueMap.put("applyTextAlignmentToEntireColumn", true);
		ctx.currentResource(resource);
		TableCell model = ctx.request().adaptTo(TableCell.class);
		Resource tableCell01 = ctx.resourceResolver().getResource("/content/table/tableCell-01");
		
		assertAll(() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellColor()),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellTextColor()),
				() -> assertEquals("11", model.getCellText()),
				// () -> assertEquals("tableCell-11", model.getTableCellName()),
				() -> assertEquals("right", model.getTextAlignment()),
				() -> assertEquals("th", model.getTableCellTag()),
				() -> assertEquals("false", resource.getValueMap().get("applyTextAlignmentToEntireColumn")),
				() -> assertEquals("right", tableCell01.getValueMap().get("textAlignment")));
				
	}

	@Test
	void testTableCellComponentApplyTextAlignmentToEntireRow() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-11");
		ModifiableValueMap modifiableValueMap = resource.adaptTo(ModifiableValueMap.class);
		modifiableValueMap.put("applyTextAlignmentToEntireRow", true);
		ctx.currentResource(resource);
		TableCell model = ctx.request().adaptTo(TableCell.class);
		Resource tableCell10 = ctx.resourceResolver().getResource("/content/table/tableCell-10");
		Resource tableCell12 = ctx.resourceResolver().getResource("/content/table/tableCell-12");
		assertAll(() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellColor()),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellTextColor()),
				() -> assertEquals("11", model.getCellText()),
				
				() -> assertEquals("right", model.getTextAlignment()),
				() -> assertEquals("th", model.getTableCellTag()),
				() -> assertEquals("false", resource.getValueMap().get("applyTextAlignmentToEntireRow")),
				() -> assertEquals("right", tableCell10.getValueMap().get("textAlignment")),
				() -> assertEquals("right", tableCell12.getValueMap().get("textAlignment")));
	}

	@Test
	void testTableCellComponentApplyCellHeaderToEntireColumn() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-11");
		ModifiableValueMap modifiableValueMap = resource.adaptTo(ModifiableValueMap.class);
		modifiableValueMap.put("applyCellHeaderToEntireColumn", true);
		ctx.currentResource(resource);
		TableCell model = ctx.request().adaptTo(TableCell.class);
		Resource tableCell01 = ctx.resourceResolver().getResource("/content/table/tableCell-01");
		
		assertAll(() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellColor()),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellTextColor()),
				() -> assertEquals("11", model.getCellText()),
				
				() -> assertEquals("right", model.getTextAlignment()),
				() -> assertEquals("th", model.getTableCellTag()),
				() -> assertEquals("false", resource.getValueMap().get("applyCellHeaderToEntireColumn")),
				() -> assertEquals("yes", tableCell01.getValueMap().get("tableCellHeader")));
				
	}

	@Test
	void testTableCellComponentApplyCellHeaderToEntireRow() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-11");
		ModifiableValueMap modifiableValueMap = resource.adaptTo(ModifiableValueMap.class);
		modifiableValueMap.put("applyCellHeaderToEntireRow", true);
		ctx.currentResource(resource); 
		TableCell model = ctx.request().adaptTo(TableCell.class);
		Resource tableCell10 = ctx.resourceResolver().getResource("/content/table/tableCell-10");
		Resource tableCell12 = ctx.resourceResolver().getResource("/content/table/tableCell-12");
		assertAll(() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellColor()),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellTextColor()),
				() -> assertEquals("11", model.getCellText()),
				
				() -> assertEquals("right", model.getTextAlignment()),
				() -> assertEquals("th", model.getTableCellTag()),
				() -> assertEquals("false", resource.getValueMap().get("applyCellHeaderToEntireRow")),
				() -> assertEquals("yes", tableCell10.getValueMap().get("tableCellHeader")),
				() -> assertEquals("yes", tableCell12.getValueMap().get("tableCellHeader")));
	}

	@Test
	void testTableCellComponentApplyCellTextColorToEntireRow() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-11");
		ModifiableValueMap modifiableValueMap = resource.adaptTo(ModifiableValueMap.class);
		modifiableValueMap.put("applyCellTextColorToEntireRow", true);
		ctx.currentResource(resource);
		TableCell model = ctx.request().adaptTo(TableCell.class);
		Resource tableCell10 = ctx.resourceResolver().getResource("/content/table/tableCell-10");
		Resource tableCell12 = ctx.resourceResolver().getResource("/content/table/tableCell-12");
		assertAll(() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellColor()),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellTextColor()),
				() -> assertEquals("11", model.getCellText()),
				// () -> assertEquals("tableCell-11", model.getTableCellName()),
				() -> assertEquals("right", model.getTextAlignment()),
				() -> assertEquals("th", model.getTableCellTag()),
				() -> assertEquals("false", resource.getValueMap().get("applyCellTextColorToEntireRow")),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", tableCell10.getValueMap().get("cellTextColor")),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", tableCell12.getValueMap().get("cellTextColor")));
	}

	
	@Test
	void testTableCellComponentApplyCellTextColorToEntireColumn() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-11");
		ModifiableValueMap modifiableValueMap = resource.adaptTo(ModifiableValueMap.class);
		modifiableValueMap.put("applyCellTextColorToEntireColumn", true);
		ctx.currentResource(resource);
		TableCell model = ctx.request().adaptTo(TableCell.class);

		Resource tableCell01 = ctx.resourceResolver().getResource("/content/table/tableCell-01");
		
		assertAll(() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellColor()),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", model.getCellTextColor()),
				() -> assertEquals("11", model.getCellText()), 
				
				() -> assertEquals("right", model.getTextAlignment()),
				() -> assertEquals("th", model.getTableCellTag()),
				() -> assertEquals("false", resource.getValueMap().get("applyCellTextColorToEntireColumn")),
				() -> assertEquals("colorPalette_Abbott-Primary-Blue", tableCell01.getValueMap().get("cellTextColor")));
				
	} 
	 

	@Test
	void testTableCellComponentAddRowBelow() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-11");
		ctx.currentResource(resource);

		assertAll(() -> assertEquals("3", resource.getParent().getValueMap().get("numberofRows")),
				() -> assertEquals("3", resource.getParent().getValueMap().get("numberofColumns"))
		);
	}

	@Test
	void testTableCellComponentAddRowAbove() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-11");
		ModifiableValueMap modifiableValueMap = resource.adaptTo(ModifiableValueMap.class);
		modifiableValueMap.put("editTable", "add-row-above");
		ctx.currentResource(resource);

		Resource resource1 = ctx.resourceResolver().getResource("/content/table/tableCell-21");
		assertAll(() -> assertEquals("3", resource1.getParent().getValueMap().get("numberofRows")),
				() -> assertEquals("3", resource1.getParent().getValueMap().get("numberofColumns")),
				() -> assertEquals("tableCell-31", resource1.getParent().getChild("tableCell-31").getName()));
	}

	@Test
	void testTableCellComponentAddColumnLeft() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-21");	
		ctx.currentResource(resource);
		 
		Resource resource1 = ctx.resourceResolver().getResource("/content/table/tableCell-12");
		TableCell model = ctx.request().adaptTo(TableCell.class);
		assertAll(() -> assertEquals("3", resource.getParent().getValueMap().get("numberofRows")),
				() -> assertEquals("4", resource.getParent().getValueMap().get("numberofColumns"))
		
		);
	}

	@Test
	void testTableCellComponentAddColumnRight() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-21");
		ctx.currentResource(resource);
		
		TableCell model = ctx.request().adaptTo(TableCell.class);
		assertAll(() -> assertEquals("3", resource.getParent().getValueMap().get("numberofRows")),
				() -> assertEquals("4", resource.getParent().getValueMap().get("numberofColumns"))
		);
	}

	@Test
	void testTableCellComponentDeleteCurrentRow() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-11");
		ModifiableValueMap modifiableValueMap = resource.adaptTo(ModifiableValueMap.class);
		modifiableValueMap.put("editTable", "delete-current-row");
		ctx.currentResource(resource);
		TableCell model = ctx.request().adaptTo(TableCell.class);
		Resource resource1 = ctx.resourceResolver().getResource("/content/table/tableCell-01");
		assertAll(() -> assertEquals("2", resource1.getParent().getValueMap().get("numberofRows")),
				() -> assertEquals("3", resource1.getParent().getValueMap().get("numberofColumns"))
		);
	}
	
	@Test
	void testTableCellComponentDeleteCurrentColumn() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-11");
		ModifiableValueMap modifiableValueMap = resource.adaptTo(ModifiableValueMap.class);
		modifiableValueMap.put("editTable", "delete-current-column");
		ctx.currentResource(resource);
		TableCell model = ctx.request().adaptTo(TableCell.class);
		Resource resource1 = ctx.resourceResolver().getResource("/content/table/tableCell-01");
		assertAll(() -> assertEquals("3", resource1.getParent().getValueMap().get("numberofRows")),
				() -> assertEquals("2", resource1.getParent().getValueMap().get("numberofColumns"))
		
		);
	}

	@Test
	void testTableCellComponentUnedited() {
		resource = ctx.resourceResolver().getResource("/content/table/tableCell-unedited");
		ctx.currentResource(resource);
		TableCell model = ctx.request().adaptTo(TableCell.class);
		assertAll(() -> assertNull(model.getCellColor()), () -> assertNull(model.getCellText()),
		
				() -> assertNull(model.getTextAlignment()), () -> assertEquals("td", model.getTableCellTag()),
				() -> assertNull(model.getCellTextColor()));
	}

}
