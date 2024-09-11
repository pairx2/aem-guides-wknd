package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.Table;
import com.abbott.aem.platform.common.components.pojo.TableButton;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
public class TableImplTest {
	
	private final AemContext ctx = new AemContext();
	
	private ProxyComponentService proxyComponentService;
	private Component component;
	
	@BeforeEach
	void setUp() throws Exception {
		
		component = Mockito.mock(Component.class);
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		
		ctx.addModelsForClasses(Table.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TableImplTest.json", "/content");
		ctx.currentResource("/content/table_tableCell");
	}
	
	@Test
	void testGetTableCaption() {		
		Table model = ctx.request().adaptTo(Table.class);
		String actual = model.getTableCaption();
		assertEquals("caption", actual);
		assertEquals(null, model.getID());
	}
	
	@Test
	void testGetNumberofColumns() {		
		Table model = ctx.request().adaptTo(Table.class);
		String actual = model.getNumberofColumns();
		assertEquals("2", actual);
	}
    
	@Test
	void testGetNumberofRows() {		
		Table model = ctx.request().adaptTo(Table.class);
		String actual = model.getNumberofRows();
		assertEquals("1", actual);
	}
	
	@Test
	void testGetAddCopyHtmlButton() {		
		Table model = ctx.request().adaptTo(Table.class);
		String actual = model.getAddCopyHtmlButton();
		TableButton tableButton = model.getCopyHtmlButton();
		assertEquals("colorPalette_PrimaryBlue", tableButton.getButtonColor());
		assertEquals("colorPalette_Black", tableButton.getButtonHoverColor());
		assertEquals("colorPalette_Black", tableButton.getTextColor());
		assertEquals("colorPalette_PrimaryBlue", tableButton.getTextHoverColor());
		assertEquals(true, tableButton.getContextUnsafeRequired());
		assertEquals("Copy Table Html", tableButton.getTitle());
		assertEquals("javascript:void(0)", tableButton.getUrl());
		tableButton.setButtonColor("colorPalette_PrimaryBlue");
		tableButton.setButtonHoverColor("colorPalette_Black");
		tableButton.setTextColor("colorPalette_Black");
		tableButton.setTarget("target");;
		assertEquals("true", actual);
		assertEquals("target", tableButton.getTarget());
	}
	
	@Test
	void testGetTableWidth() {		
		Table model = ctx.request().adaptTo(Table.class);
		String actual = model.getTableWidth();
		assertEquals("900", actual);
	}
	
	@Test
	void testGetCssClass() {		
		Table model = ctx.request().adaptTo(Table.class);
		String actual = model.getCssClass();
		assertEquals("poc-table-component", actual);
	}
	
	@Test
	void testGetColumnWidth() {		
		Table model = ctx.request().adaptTo(Table.class);
		String actual = model.getColumnWidth();
		assertEquals("5,6,7,8", actual);
	}
	
	@Test
	void testGetBorderTheme() {		
		Table model = ctx.request().adaptTo(Table.class);
		String actual = model.getBorderTheme();
		assertEquals("colorPalette_DarkGray", actual);
	}
	
	@Test
	void testGetColWidth() {		
		Table model = ctx.request().adaptTo(Table.class);
		long actual = model.getColWidth();
		assertEquals(50, actual);
	}
	
	@Test
	void testGetTableLegends() {		
		Table model = ctx.request().adaptTo(Table.class);
		String legendText = model.getTableLegends().get(0).getLegendText();
		String legendColor = model.getTableLegends().get(0).getLegendColor();
		assertEquals("legend text", legendText);
		assertEquals("colorPalette_Magenta", legendColor);
	}
	
	@Test
	void testGetColumnNumbers() {		
		Table model = ctx.request().adaptTo(Table.class);
		int actual = model.getColumnNumbers().get(0).intValue();
		assertEquals(0, actual);
	}
	
	@Test
	void testGetColumnWidthList() {		
		Table model = ctx.request().adaptTo(Table.class);
		int actual = model.getColumnWidthList().get(0).length();
		assertEquals(5, actual);
	}
	
	@Test
	void testGetTableMap() {		
		Table model = ctx.request().adaptTo(Table.class);
		boolean actual = model.getTableMap().isEmpty();
		assertEquals(false, actual);
	}

	@Test
	void testGetStartColor() {		
		Table model = ctx.request().adaptTo(Table.class);
		String actual = model.getStartColor();
		assertEquals("rgba(127,239,127,0.55)", actual);
	}

	@Test
	void testGetStartColorPosition() {		
		Table model = ctx.request().adaptTo(Table.class);
		String actual = model.getStartColorPosition();
		assertEquals("0", actual);
	}

	@Test
	void testGetEndColor() {		
		Table model = ctx.request().adaptTo(Table.class);
		String actual = model.getEndColor();
		assertEquals("rgba(127,239,127,0.55)", actual);
	}

	@Test
	void testGetEndColorPosition() {		
		Table model = ctx.request().adaptTo(Table.class);
		String actual = model.getEndColorPosition();
		assertEquals("100", actual);
	}
}
