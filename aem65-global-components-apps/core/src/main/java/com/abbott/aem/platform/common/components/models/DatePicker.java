package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface DatePicker extends Component {

	default String getDatePickerType() {
		throw new UnsupportedOperationException();
	}

	default String getDateFormat() {
		throw new UnsupportedOperationException();
	}

	default String getLabelSingleDatePicker() {
		throw new UnsupportedOperationException();
	}

	default String getLabelFromDate() {
		throw new UnsupportedOperationException();
	}

	default String getLabelToDate() {
		throw new UnsupportedOperationException();
	}

	default String getWrongFormatError() {
		throw new UnsupportedOperationException();
	}
	
	default String getInvalidRangeError() {
		throw new UnsupportedOperationException();
	}

	default String getInvalidDateError() {
		throw new UnsupportedOperationException();
	}

	default String getNameFromDate() {
		throw new UnsupportedOperationException();
	}
	
	default String getNameToDate() {
		throw new UnsupportedOperationException();
	}
	
	default String getNameSingleDatePicker() {
		throw new UnsupportedOperationException();
	}
	
	default String getHelpMessage() {
		throw new UnsupportedOperationException();
	}
	
	default String getPlaceholderFromDate() {
		throw new UnsupportedOperationException();
	}
	
	default String getPlaceholderToDate() {
		throw new UnsupportedOperationException();
	}
	
	default String getPlaceholderSingleDatePicker() {
		throw new UnsupportedOperationException();
	}
	
	default boolean isRequired() {
		throw new UnsupportedOperationException();
	}
	
	default String getRequiredMessage() {
		throw new UnsupportedOperationException();
	}
	
	default boolean isDisableDateRequired() {
		throw new UnsupportedOperationException();
	}
	
	default String getDisabledDate() {
		throw new UnsupportedOperationException();
	}
	
	default String getDisableWeekend() {
		throw new UnsupportedOperationException();
	}
	
	default int getDisabledAfterMonths() {
		throw new UnsupportedOperationException();
	}
	default String getDisablePastinFutureCal() {
		throw new UnsupportedOperationException();
	}
	
	default int getDisabledAfterDays() {
		throw new UnsupportedOperationException();
	}			
	default String getDisablePastAndFutureDays() {
		throw new UnsupportedOperationException();	
	}
	
	default boolean isDisableMonthsDropdown() {
		throw new UnsupportedOperationException();
	}

	default boolean isDisableYearsDropdown() {
		throw new UnsupportedOperationException();
	}
	default int getDisabledBeforeDays() {
		throw new UnsupportedOperationException();
	}
	
	default String getDisabledDays() {
		throw new UnsupportedOperationException();
	}


	default boolean isDynamicDateRange() {
		throw new UnsupportedOperationException();
	}

	default int getDisabledYears() {
		throw new UnsupportedOperationException();
	}
}
