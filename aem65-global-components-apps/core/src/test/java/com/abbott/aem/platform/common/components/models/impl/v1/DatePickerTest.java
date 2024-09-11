package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.DatePicker;

@ExtendWith(AemContextExtension.class)
class DatePickerTest {

	private final AemContext ctx = new AemContext();

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(DatePickerImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/DatePickerTest.json", "/content");
	}

	@Test
	void testGetDatePickerType() {
		final String expected = "single";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getDatePickerType();
		assertEquals(expected, actual);
	}

	@Test
	void testGetDateFormat() {
		final String expected = "MM/DD/YYYY";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getDateFormat();
		assertEquals(expected, actual);
	}

	@Test
	void testGetLabelSingleDatePicker() {
		final String expected = "Birth Date";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getLabelSingleDatePicker();
		assertEquals(expected, actual);
	}

	@Test
	void testGetlabelFromDate() {
		final String expected = "From";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getLabelFromDate();
		assertEquals(expected, actual);
	}

	@Test
	void testGetLabelToDate() {
		final String expected = "To";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getLabelToDate();
		assertEquals(expected, actual);
	}

	@Test
	void testGetInvalidRangeError() {
		final String expected = "invalid range";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getInvalidRangeError();
		assertEquals(expected, actual);
	}

	@Test
	void testGetInvalidDateError() {
		final String expected = "invalid date";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getInvalidDateError();
		assertEquals(expected, actual);
	}

	@Test
	void testGetWrongFormatError() {
		final String expected = "wrong format";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getWrongFormatError();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetNameFromDate() {
		final String expected = "start date";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getNameFromDate();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetNameToDate() {
		final String expected = "end date";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getNameToDate();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetNameSingleDatePicker() {
		final String expected = "birth date";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getNameSingleDatePicker();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetHelpMessage() {
		final String expected = "Please choose your birth date";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getHelpMessage();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetPlaceholderFromDate() {
		final String expected = "03/12/2021";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getPlaceholderFromDate();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetPlaceholderToDate() {
		final String expected = "04/01/2021";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getPlaceholderToDate();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetPlaceholderSingleDatePicker() {
		final String expected = "03/06/1990";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getPlaceholderSingleDatePicker();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetRequired() {
		final boolean expected = true;
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		boolean actual = datePicker.isRequired();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetRequiredMessage() {
		final String expected = "This is a required field";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getRequiredMessage();
		assertEquals(expected, actual);
	}	
	
	@Test
	void testGetDisableDateRequired() {
		final boolean expected = true;
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		boolean actual = datePicker.isDisableDateRequired();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetDisabledDate() {
		final String expected = "future";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getDisabledDate();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetDisableWeekend() {
		final String expected = "false";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getDisableWeekend();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetDisabledAfterMonths() {
		final int expected = 2;
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		int actual = datePicker.getDisabledAfterMonths();
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetDisablePastinFutureCal() {
		final String expected = "true";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getDisablePastinFutureCal();
		assertEquals(expected, actual);
	}

	@Test
 	void testGetDisabledAfterDays() {
		final int expected = 5;
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		int actual = datePicker.getDisabledAfterDays();
		assertEquals(expected, actual);
 	}

 	@Test
 	void testGetDisablePastAndFutureDays() {
		final String expected = "true";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getDisablePastAndFutureDays();
		assertEquals(expected, actual);
 	}

	@Test
	void testIsDisableMonthsDropdown() {
		final boolean expected = true;
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		boolean actual = datePicker.isDisableMonthsDropdown();
		assertEquals(expected, actual);
	}
	
	@Test
	void testIsDisableYearsDropdown() {
		final boolean expected = true;
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		boolean actual = datePicker.isDisableYearsDropdown();
		assertEquals(expected, actual);
	}
	@Test
	void testGetDisabledDays() {
		final String expected = "Before";
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		String actual = datePicker.getDisabledDays();
		assertEquals(expected, actual);
	}
	
	@Test
 	void testGetDisableBeforeDates() {
		final int expected = 5;
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		int actual = datePicker.getDisabledBeforeDays();
		assertEquals(expected, actual);
 	}

	@Test
	void testIsDynamicDateRange() {
		final boolean expected = false;
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		boolean actual = datePicker.isDynamicDateRange();
		assertEquals(expected, actual);
	}
	@Test
	void testGetDisabledYears() {
		final int expected = 2;
		ctx.currentResource("/content/datepicker");
		DatePicker datePicker = ctx.request().adaptTo(DatePicker.class);
		int actual = datePicker.getDisabledYears();
		assertEquals(expected, actual);
	}
}
