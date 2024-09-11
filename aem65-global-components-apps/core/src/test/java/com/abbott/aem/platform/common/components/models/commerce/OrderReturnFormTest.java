package com.abbott.aem.platform.common.components.models.commerce;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;


public class OrderReturnFormTest implements OrderReturnForm{
	
	@Test
    void testGetId() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderReturnForm.super.getId());
    }
	
	@Test
    void testGetItemsLabel() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderReturnForm.super.getItemsLabel());
    }
	
	@Test
    void testGetItemsQtyLabel() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderReturnForm.super.getItemsQtyLabel());
    }
	
	@Test
    void testGetCommentLabel() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderReturnForm.super.getCommentLabel());
    }
	
	@Test
    void testGetCommentPlaceholder() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderReturnForm.super.getCommentPlaceholder());
    }
	
	@Test
    void testGetSuccessPagePath() {
        assertThrows(UnsupportedOperationException.class, () ->  OrderReturnForm.super.getSuccessPagePath());
    }
}
