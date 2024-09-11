package com.abbott.aem.an.similac.integration.nutrition;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Objects;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class TestFooterNote {

	FootNote footNote;
	
	@BeforeEach
	void setUp() {
		footNote = new FootNote();
		footNote.setFootnoteSymbol("symbol");
		footNote.setFootnoteValue("value");
		footNote.setLineNumber(1);
	}
	
	@Test
	void testPOJO() {
		FootNote newObj = new FootNote();
		FootNote newObj2 = new FootNote();
		newObj2.setFootnoteSymbol("symbol");
		newObj2.setFootnoteValue("value");
		newObj2.setLineNumber(1);
		FootNote newObj3 = new FootNote();
		newObj3.setFootnoteSymbol("symbol");
		newObj3.setFootnoteValue("value2");
		newObj3.setLineNumber(1);
		FootNote newObj4 = new FootNote();
		newObj4.setFootnoteSymbol("symbol");
		newObj4.setFootnoteValue("value");
		newObj4.setLineNumber(2);
		assertEquals("symbol", footNote.getFootnoteSymbol());
		assertEquals("value", footNote.getFootnoteValue());
		assertEquals(1, footNote.getLineNumber());
		assertEquals("FootNote [lineNumber=1, footnoteSymbol=symbol, footnoteValue=value]", footNote.toString());
		assertEquals(Objects.hash("symbol","value",1), footNote.hashCode());
		assertTrue(footNote.equals(footNote));
		assertFalse(footNote.equals(newObj));
		assertTrue(footNote.equals(newObj2));
		assertFalse(footNote.equals(newObj3));
		assertFalse(footNote.equals(newObj4));
	}
}
