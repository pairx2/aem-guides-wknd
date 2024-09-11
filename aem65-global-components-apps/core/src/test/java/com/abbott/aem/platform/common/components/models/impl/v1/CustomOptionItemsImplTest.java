package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CustomOptionItemsImplTest {

	@Mock
	Resource resource;

	@Mock
	ValueMap valueMap;

	CustomOptionItemsImpl customOptionItemsImpl;

	@BeforeEach
	public void setUp() throws Exception {
		when(resource.getValueMap()).thenReturn(valueMap);
		when(valueMap.get(Mockito.anyString(), Mockito.anyString())).thenReturn("testValue");
		customOptionItemsImpl = new CustomOptionItemsImpl(resource);
	}

	@Test
	void testIsIndeterminate() {
		assertEquals(Boolean.FALSE, customOptionItemsImpl.isIndeterminate());
		lenient().when(valueMap.get(Mockito.anyString(), Mockito.anyString())).thenReturn("indeterminate");
		lenient().when(valueMap.get(Mockito.anyString(), Mockito.anyString())).thenReturn("indeterminate");
		customOptionItemsImpl = new CustomOptionItemsImpl(resource);
		assertEquals(Boolean.TRUE, customOptionItemsImpl.isIndeterminate());
	}

	@Test
	void testIsError() {
		assertEquals(Boolean.FALSE, customOptionItemsImpl.isError());
		lenient().when(valueMap.get(Mockito.anyString(), Mockito.anyString())).thenReturn("error");
		customOptionItemsImpl = new CustomOptionItemsImpl(resource);
		assertEquals(Boolean.TRUE, customOptionItemsImpl.isError());
	}

	@Test
	void testGetInitialState() {
		when(valueMap.get(Mockito.anyString(), Mockito.anyString())).thenReturn("initialValue");
		customOptionItemsImpl = new CustomOptionItemsImpl(resource);
		assertEquals("initialValue", customOptionItemsImpl.getInitialState());
	}

	@Test
	void testGetText() {
		when(valueMap.get(Mockito.anyString(), Mockito.any())).thenReturn("test");
		customOptionItemsImpl = new CustomOptionItemsImpl(resource);
		assertEquals("test", customOptionItemsImpl.getText());
	}

	@Test
	void testIsSelected() {
		assertEquals(Boolean.FALSE, customOptionItemsImpl.isSelected());
		lenient().when(valueMap.get(Mockito.anyString(), Mockito.anyString())).thenReturn("selected");
		customOptionItemsImpl = new CustomOptionItemsImpl(resource);
		assertEquals(Boolean.TRUE, customOptionItemsImpl.isSelected());
	}

	@Test
	void testIsDisabled() {
		assertEquals(Boolean.FALSE, customOptionItemsImpl.isDisabled());
		lenient().when(valueMap.get(Mockito.anyString(), Mockito.anyString())).thenReturn("disabled");
		customOptionItemsImpl = new CustomOptionItemsImpl(resource);
		assertEquals(Boolean.TRUE, customOptionItemsImpl.isDisabled());
	}

	@Test
	void testGetValue() {
		when(valueMap.get(Mockito.anyString(), Mockito.any())).thenReturn("testValue");
		customOptionItemsImpl = new CustomOptionItemsImpl(resource);
		assertEquals("testValue", customOptionItemsImpl.getValue());
	}

	@Test
	void testGetUniqueId() {
		assertNotNull(customOptionItemsImpl.getUniqueId());
	}

	@Test
	void testGetDropdownIcon() {
		when(valueMap.get(Mockito.anyString(), Mockito.any())).thenReturn("dropdownicon");
		customOptionItemsImpl = new CustomOptionItemsImpl(resource);
		assertEquals("dropdownicon", customOptionItemsImpl.getDropdownIcon());
	}

	@Test
	void testGetproperties() {
		customOptionItemsImpl = new CustomOptionItemsImpl(resource);
		assertTrue(customOptionItemsImpl.getProperties() != null);
	}

}
