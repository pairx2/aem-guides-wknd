package com.abbott.aem.cloud.platform.core.util;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Pattern;

import org.junit.jupiter.api.Test;

public class ParameterUtilTest {

	@Test
	void test() {
		String[] strArray1 = new String[] { "**", "A*B", "B*", "*", "lkll", "*a" };

		Map<String, String> p = ParameterUtil.toMap(strArray1, "*", false, "");
		assertNotNull(p);
	}

	@Test
	void test1() {

		Map<String, String> p = ParameterUtil.toMap(new String[0], ",", false, "", true);
		assertNotNull(p);
	}

	@Test
	void test2() {
		Map<String, String> p = ParameterUtil.toMap(null, ",", true, "", true);
		assertNotNull(p);
	}

	@Test
	void test3() {
		String[] strArray1 = new String[] { "*", "*A", "A*B", "B", "*", "", "asdfc", "b*", " * ", "* ", " ", " *" };
		Map<String, String> p = ParameterUtil.toMap(strArray1, "*", true, "", true);
		assertNotNull(p);
	}

	@Test
	void test4() {
		String[] strArray1 = new String[] { "*", "*A", "A*B", "B", "*", "", "asdfc", "b*", " * ", "* ", " ", " *" };
		Map<String, String[]> p = ParameterUtil.toMap(strArray1, "*", "*");
		assertNotNull(p);
	}

	@Test
	void test5() {
		String[] strArray1 = new String[] { "*", "*A", "A*B", "B", "*", "", "asdfc", "b*", " * ", "* ", " ", " *" };
		Map<String, String> p = ParameterUtil.toMap(strArray1, "*");
		assertNotNull(p);
	}

	@Test
	void test6() {
		Entry<String, String> p = ParameterUtil.toMapEntry("abcdef*", "*");
		assertNull(p);
	}

	@Test
	void test7() {
		Entry<String, String> p = ParameterUtil.toMapEntry("*abcd", "*");
		assertNull(p);
	}

	@Test
	void test8() {
		Entry<String, String> p = ParameterUtil.toMapEntry("abc*der*dfcfd", "*");
		assertNotNull(p);
	}

	@Test
	void test9() {
		Entry<String, String> p = ParameterUtil.toMapEntry(" *", "*");
		assertNull(p);
	}

	@Test
	void test10() {
		Entry<String, String> p = ParameterUtil.toMapEntry(null, "*");
		assertNull(p);
	}

	@Test
	void test11() {
		Entry<String, String> p = ParameterUtil.toMapEntryWithOptionalValue("abcd*", "*");
		assertNotNull(p);
	}

	@Test
	void test12() {
		String[] strArray1 = new String[] { "", "A", "AB", "B", "", "", "asdfc", "b" };
		List<Pattern> p = ParameterUtil.toPatterns(strArray1);
		assertNotNull(p);
	}

	@Test
	void test13() {
		List<Pattern> p = ParameterUtil.toPatterns(null);
		assertNotNull(p);
	}

}
