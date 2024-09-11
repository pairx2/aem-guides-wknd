package com.abbott.aem.platform.common.components.models.commerce.impl.v1;

import junitx.util.PrivateAccessor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class OrderReturnFormImplTest {

    @InjectMocks
    private OrderReturnFormImpl orderReturnForm;

    @BeforeEach
    void setUp() throws Exception {
        PrivateAccessor.setField(orderReturnForm, "id", "1");
        PrivateAccessor.setField(orderReturnForm, "itemsLabel", "label");
        PrivateAccessor.setField(orderReturnForm, "itemsQtyLabel", "label2");
        PrivateAccessor.setField(orderReturnForm, "commentLabel", "commentLabel");
        PrivateAccessor.setField(orderReturnForm, "commentPlaceholder", "commentPlaceholder");
        PrivateAccessor.setField(orderReturnForm, "successPagePath", "successPagePath");
    }

    @Test
    void testGetId() {
        final String expected = "1";
        String  actual = orderReturnForm.getId();
        assertEquals(expected, actual);
    }

    @Test
    void testGetItemsLabel() {
        final String expected = "label";
        String  actual = orderReturnForm.getItemsLabel();
        assertEquals(expected, actual);
    }

    @Test
    void testGetItemsQtyLabel() {
        final String expected = "label2";
        String  actual = orderReturnForm.getItemsQtyLabel();
        assertEquals(expected, actual);
    }

    @Test
    void testGetSuccessPagePath() {
        final String expected = "successPagePath";
        String  actual = orderReturnForm.getSuccessPagePath();
        assertEquals(expected, actual);
    }

    @Test
    void testGetCommentPlaceholder() {
        final String expected = "commentPlaceholder";
        String  actual = orderReturnForm.getCommentPlaceholder();
        assertEquals(expected, actual);
    }

    @Test
    void testGetCommentLabel() {
        final String expected = "commentLabel";
        String  actual = orderReturnForm.getCommentLabel();
        assertEquals(expected, actual);
    }
}
