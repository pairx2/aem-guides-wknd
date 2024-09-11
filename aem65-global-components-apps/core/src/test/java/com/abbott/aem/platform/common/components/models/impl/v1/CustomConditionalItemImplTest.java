package com.abbott.aem.platform.common.components.models.impl.v1;

import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.when;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class CustomConditionalItemImplTest {

    @Mock
    Resource resource;

    @Mock
    ValueMap valueMap;

    CustomConditionalItemImpl customConditionalItemImpl;

    @BeforeEach
    private void setup() throws Exception{
        when(resource.getValueMap()).thenReturn(valueMap);
        when(valueMap.get(Mockito.anyString(), Mockito.anyString())).thenReturn("testValue");
        customConditionalItemImpl = new CustomConditionalItemImpl(resource);
    }

    @Test
    void getExpandedField() {
        when(valueMap.get(Mockito.anyString(), Mockito.anyString())).thenReturn("expandField");
        customConditionalItemImpl = new CustomConditionalItemImpl(resource);
        assertEquals("expandField", customConditionalItemImpl.getExpandedField());
    }

    @Test
    void getPreviousField() {
        when(valueMap.get(Mockito.anyString(), Mockito.anyString())).thenReturn("previousField");
        customConditionalItemImpl = new CustomConditionalItemImpl(resource);
        assertEquals("previousField", customConditionalItemImpl.getPreviousField());
    }

    @Test
    void getVariableValue() {
        when(valueMap.get(Mockito.anyString(), Mockito.anyString())).thenReturn("variableValue");
        customConditionalItemImpl = new CustomConditionalItemImpl(resource);
        assertEquals("variableValue", customConditionalItemImpl.getVariableValue());
    }

    @Test
    void valueIsNotBlank() {
        customConditionalItemImpl = new CustomConditionalItemImpl(resource);
        assertNotNull(customConditionalItemImpl.valueIsNotBlank());
    }
}