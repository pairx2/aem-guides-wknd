package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.DatePicker;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { DatePicker.class, ComponentExporter.class },
	   resourceType = { DatePickerImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class DatePickerImpl implements DatePicker {

	public static final String RESOURCE_TYPE = "abbott-platform/components/form/datepicker/v1/datepicker";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String datePickerType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String dateFormat;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String labelSingleDatePicker;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String labelFromDate;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String labelToDate;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String invalidRangeError;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String invalidDateError;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String wrongFormatError;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String nameFromDate;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String nameToDate;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String nameSingleDatePicker;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String helpMessage;	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String placeholderFromDate;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String placeholderToDate;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String placeholderSingleDatePicker;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean required;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String requiredMessage;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean disableDateRequired;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String disabledDate;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private int disabledYears;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String disableWeekend;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private int disabledAfterMonths;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String disablePastinFutureCal;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private int disabledAfterDays;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String disablePastAndFutureDays;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean disableMonthsDropdown;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean disableYearsDropdown;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String disabledDays;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private int disabledBeforeDays;


	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean dynamicDateRange;
}