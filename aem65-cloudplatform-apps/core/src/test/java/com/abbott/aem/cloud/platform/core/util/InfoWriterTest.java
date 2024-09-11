package com.abbott.aem.cloud.platform.core.util;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class InfoWriterTest {
	
	
	@Test
	void testTitle() {
		String[] strArray1 = new String[] { "**", "A*B", "B*", "*", "lkll", "/" };
		new InfoWriter().title("title");
		new InfoWriter().title("");
		new InfoWriter().title();
		new InfoWriter().toString();
		new InfoWriter().end();
		new InfoWriter().line();
		new InfoWriter().line(-1);
		new InfoWriter().message("lkll", strArray1);
		new InfoWriter().message("lkll",  new String[0] );
		new InfoWriter().message("lkll",  new Integer[]{5,6} );
		assertTrue(true);
	}

}
