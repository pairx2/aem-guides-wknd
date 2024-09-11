package com.abbott.aem.an.abbottstore.integration.nutrition;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
class FootNoteTest {
    private static final String FOOT_NOTE_SYMBOL = "foot note";
    private static final String FOOT_NOTE_VALUE = "foot note value";

    @InjectMocks
    FootNote footNote;

    @BeforeEach
    void setUp() {
        footNote.setFootnoteSymbol(FOOT_NOTE_SYMBOL);
        footNote.setFootnoteValue(FOOT_NOTE_VALUE);
        footNote.setLineNumber(1);
    }

    @Test
    void getLineNumber() {
        assertEquals(1, footNote.getLineNumber());
    }

    @Test
    void getFootnoteSymbol() {
        assertEquals(FOOT_NOTE_SYMBOL, footNote.getFootnoteSymbol());
    }

    @Test
    void getFootnoteValue() {
        assertEquals(FOOT_NOTE_VALUE, footNote.getFootnoteValue());
    }

    @Test
    void getToString() {
        assertTrue(footNote.toString().contains(FOOT_NOTE_SYMBOL));
    }
}