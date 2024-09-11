import { i18nLabels } from './translationUtils';

export const ADOBE_ANALYTICS_EVENTS = {
	ADD_TO_CART: 'addToCart',
	REMOVE_FROM_CART: 'removeFromCart',
	VIEW_PRODUCT: 'viewProduct',
	CHECKOUT_STEP_ONE: 'checkoutStep1',
	CHECKOUT_STEP_TWO: 'checkoutStep2',
	TRANSACTION: 'transaction',
	APPLY_COUPON: 'applyCoupon'
};

export const ADOBE_LAUNCH_EVENTS = {
	ADD_TO_CART: 'addToCart',
	REMOVE_FROM_CART: 'removeFromCart',
	VIEW_PRODUCT: 'productDetailView',
	CHECKOUT_STEPS: 'checkout',
	APPLY_COUPON: 'applyCoupon',
	PURCHASE: 'purchase'
}

export const KEY_VARIABLE_VALUES = {
	BRAND: 'Freestyle Libre',
	CHECKOUT_STEP_ONE: "Shipping",
	CHECKOUT_STEP_TWO: 'Payment Method'
}

export const RETURN_ELIGIBLE_STATUSES = ['Delivered', 'Order left with a neighbour'];

export const SHIPPING_TYPES = {
	STANDARD_SHIPPING: 'standard shipping',
	EXPRESS_SHIPPING: 'express shipping'
};

export const DELIVERY_STATUSES = {
	SCHEDULED: 'Scheduled',
	CREATED: 'Created',
	CREATED_ON_HOLD: 'Order blocked. Please call Customer Service.',
	CREATED_ON_HOLD_1: 'Created - On Hold',
	CREATED_DENIED_PARTY: 'Order blocked. Please call Customer Service.',
	IN_PREPARATION: 'In Preparation',
	IN_PROGRESS: 'In Progress',
	ORDER_SHIPPED: 'Order shipped',
	OUT_FOR_DELIVERY: 'On the way',
	DELIVERED: 'Delivered',
	DELIVERED_TO_3RD_PARTY: 'Order left with a neighbour',
	RETURN_DECLARED: 'Order has been sent back',
	CARRIER_RETURN: 'Order could not be delivered',
	CARRIER_RETURN_ACCEPTANCE: 'Order could not be delivered - Acceptance refused',
	CARRIER_RETURN_NOT_COLLECTED: 'Order could not be delivered - Informed but not collected',
	CARRIER_RETURN_NOT_REACHED: 'Order could not be delivered - Recipient not reached',
	CARRIER_RETURN_RECIPIENT_UNKNOWN: 'Order could not be delivered - Recipient unknown',
	CARRIER_RETURN_DAMAGE: 'Order could not be delivered - Notification of damage by carrier',
	CANCELLED: 'Order cancelled',
	PAYMENT_COMPLETED: 'Payment Completed',
	PAYMENT_PENDING: 'New: Payment pending',
	PAYMENT_METHOD_ACCEPTED: 'Payment method accepted',
	DEACTIVATED: 'Deactivated',
	INACTIVE: 'Inactive',
	RX_CANCELLED: 'Cancelled'
};

export const PAYMENT_TYPES = {
	CREDIT_CARD: 'credit_card',
	OPEN_INVOICE: 'open_invoice',
	PAYPAL: 'paypal',
	SOFORT: 'sofort',
	DIRECT_DEBIT: 'direct_debit',
	AMAZON_PAY: 'amazon_pay',
	FREE: 'free'
};

export const RETURN_STATUSES = {
	PENDING: 'pending',
	CONSISTENT: 'consistent',
	INCONSISTENT: 'inconsistent'
};

export const COMMUNICATION_CHANNEL_TYPES = {
	NEWS: 'NEWS',
	PROACTIVE: 'PROACTIVE',
	SMS: 'SMS',
	EMAIL: 'EMAIL',
	POST: 'POST'
};

export const CONTACT_DETAILS_CHANNEL_TYPES = {
	EMAIL: 'E-MAIL',
	TELEFON: 'TELEFON',
	PHONE: 'PHONE',
	MAIL: 'MAIL',
	POST: 'POST'
};

export const UNDEFINED = 'undefined';
export const WCM_MODE_EDIT = 'EDIT';

export const ErrorCode = {
	Lambda_ErrorCode_4001: 'Lambda_ErrorCode_4001'
};

export const MAGENTO_PAYMENT_TYPES = {
	CREDIT_CARD: 'payon_credit_card',
	OPEN_INVOICE: 'open_invoice',
	PAYPAL: 'payon_paypal',
	SOFORT: 'payon_sofort',
	SAVED_PAYMENTS_ORDER_UPDATE: 'saved_payments_order_update',
	PAYON_SAVED_TOKEN: 'payon_saved_token',
	FREE: 'free'
};

export const GHOST_ORDER_STATUS = {
	ACTIVE: 'active',
	OPEN: 'open',
	COMPLETED: 'completed'
};

export const eslErrorCode = {
	LGN_USER_1003: 'LGN-USER-1003',
	LGN_USER_1002: 'LGN-USER-1002',
	LGN_USER_1001: 'LGN-USER-1001',
	PM_1020: 'PM-1020'
};

export const GHOST_ORDER_TYPE = {
	ACTIVE_ORDER: 'active_order',
	OPEN_ORDER: 'open_order',
	COMPLETED_ORDER: 'completed_order'
};

export const SOCIAL_ACCOUNT = {
	GOOGLE: 'google',
	FACEBOOK: 'facebook'
};

export const INSURANCE_KEY_TYPES = {
	PUBLIC: 'public',
	PRIVATE: 'private',
	CASHPAYER: 'cashpayer'
};

export const RETURN_TYPE = {
	CARRIER_RETURN: 'carrier return',
	COMMERCIAL_RETURN: 'commercial return',
};

export const PAYMENT_ICONS = {
	BASE_PATH: '/etc.clientlibs/adc/freestylelibrede/clientlibs/clientlib-site/resources/icon/',
	PAYPAL: 'paypal.svg',
	SOFORT: 'sofort.svg',
	CC: 'visa_mc_amex.png',
	OPEN_INVOICE: 'Rechnung_blue.svg'
};

export const ORDER_TYPES = {
	CP: 'CashPay',
	CPS: 'Cash Pay Subscription',
	RX: 'Reimbursement',
	WEBRX: 'WebRx',
	CPO: 'Cash Pay'
};
export const ORDER_TYPES_STATUS = {
	CP: 'CP',
	CPS: 'CPS',
	RX: 'RX',
	WEBRX: 'WEBRX',
	CPO: 'CPO'
};
export const ORDER_SUB_TYPES = {
	REPLACEMENT: 'Replacement'
};
export const PANEL_TYPE = {
	VERTICAL: 'vertical',
	HORIZONTAL: 'horizontal'
};
export const CTA_LAYOUT = {
	VERTICAL: 'vertical',
	HORIZONTAL: 'horizontal'
};
export const POSITION_TYPES = {
	TOP: 'top',
	BOTTOM: 'bottom'
};
export const ERROR_TYPES = {
	PAYMENT_ERROR: 'payment-error'
};
export const USER_SALUTATION = {
	MAN_LABEL: 'MR',
	WOMAN_LABEL: 'MS',
	OTHER_LABEL: 'DR'
};
export const USER_PREFIX = {
	HERR: 'herr',
	FRAU: 'frau',
	DIVERS: 'divers',
	HYPHEN: '-'
};
export const DELIVERY_TYPE = {
	NORMAL: 'normal',
	EXPRESS: 'express',
};
export const RSP_NAME_OPTIONS = {
	CC: 'ContraCare',
	HMM: 'HMM',
};
export const GENERIC_ERROR_CODES = [
	5000
];
export const CARRIER_CODE = {
	FLATRATE: 'flatrate',
	EXPRESS_SHIPPING: 'expressshipping',
};

export const COUNTRY_ISD_CODE_COMBINATIONS_PLUS = ['+43', '+44', '+32', '+359', '+385', '+357', '+420', '+45', '+372', '+358', '+33', '+49', '+30', '+36', '+354', '+353', '+39', '+371', '+423', '+370', '+352', '+356', '+31', '+47', '+48', '+351', '+40', '+421', '+386', '+34', '+46'];

export const MOBILE_AND_LANDLINE_NUMBER_MAXLENGTH = '15';
export const ZERO = '0';
export const SINGLE_EMPTY_SPACE = ' ';

export const COUNTRY_OPTIONS = [
	{
		label: 'Österreich',
		value: 'AT',
		code: '+43'
	},
	{
		label: 'Großbritannien & Nordirland',
		value: 'GB',
		code: '+44'
	},
	{
		label: 'Belgien',
		value: 'BE',
		code: '+32'
	},
	{
		label: 'Bulgarien',
		value: 'BG',
		code: '+359'
	},
	{
		label: 'Kroatien',
		value: 'HR',
		code: '+385'
	},
	{
		label: 'Zypern',
		value: 'CY',
		code: '+357'
	},
	{
		label: 'Tschechien',
		value: 'CZ',
		code: '+420'
	},
	{
		label: 'Dänemark',
		value: 'DK',
		code: '+45'
	},
	{
		label: 'Estland',
		value: 'EE',
		code: '+372'
	},
	{
		label: 'Finnland',
		value: 'FI',
		code: '+358'
	},
	{
		label: 'Frankreich',
		value: 'FR',
		code: '+33'
	},
	{
		label: 'Deutschland',
		value: 'DE',
		code: '+49'
	},
	{
		label: 'Griechenland',
		value: 'GR',
		code: '+30'
	},
	{
		label: 'Ungarn',
		value: 'HU',
		code: '+36'
	},
	{
		label: 'Island',
		value: 'IS',
		code: '+354'
	},
	{
		label: 'Irland',
		value: 'IE',
		code: '+353'
	},
	{
		label: 'Italien',
		value: 'IT',
		code: '+39'
	},
	{
		label: 'Lettland',
		value: 'LV',
		code: '+371'
	},
	{
		label: 'Liechtenstein',
		value: 'LI',
		code: '+423'
	},
	{
		label: 'Litauen',
		value: 'LT',
		code: '+370'
	},
	{
		label: 'Luxemburg',
		value: 'LU',
		code: '+352'
	},
	{
		label: 'Malta',
		value: 'MT',
		code: '+356'
	},
	{
		label: 'Niederlande',
		value: 'NL',
		code: '+31'
	},
	{
		label: 'Norwegen',
		value: 'NO',
		code: '+47'
	},
	{
		label: 'Polen',
		value: 'PL',
		code: '+48'
	},
	{
		label: 'Portugal',
		value: 'PT',
		code: '+351'
	},
	{
		label: 'Rumänien',
		value: 'RO',
		code: '+40'
	},
	{
		label: 'Slowakei',
		value: 'SK',
		code: '+421'
	},
	{
		label: 'Slowenien',
		value: 'SI',
		code: '+386'
	},
	{
		label: 'Spanien',
		value: 'ES',
		code: '+34'
	},
	{
		label: 'Schweden',
		value: 'SE',
		code: '+46'
	},
];

export const DEFAULT_COUNTRY_OPTIONS = [{
	label: 'Deutschland',
	value: 'DE',
	country_code: 'de',
	mobile_code: '+49'
}];

export const ADDRESS_TYPE = {
	BILLING: 'billing',
	SHIPPING: 'shipping'
};

export const BOOLEAN_STRING = {
	TRUE: 'true',
	FALSE: 'false'
};

export const SUBSCRIPTION_STATUS = {
	CANCELLED: 'Cancelled',
	INACTIVE: 'Inactive',
	ACTIVE: 'Active',
	SCHEDULED: 'Scheduled',
	DEACTIVATED: 'Deactivated'
};

export const PRODUCT_DELIVERABLE_DURATION = "3";

export const STATUS_CODE = {
	50:50
}

export const MEASUREMENT_OPTIONS = {
	'99': 'measurement_1',
	'101': 'measurement_2'
};

export const PRODUCT_PREFERENCE_OPTIONS = {
	'FreeStyleLibre v.3': 'FreeStyle Libre 3'
};

export const BANNER_STATUS = {
	INVOICE: [
		'Dunning status 1 reached',
		'Dunning status 2 reached',
		'Dunning status 3 reached'
	],
	INVOICE_FORWARD_AGENCY: 'Invoice forwarded to collection agency',
	PAYMENT_PENDING: 'New: Payment pending',
	CARRIER_RETURN: [
		'Order could not be delivered',
		'Order could not be delivered - Acceptance refused',
		'Order could not be delivered - Informed but not collected',
		'Order could not be delivered - Recipient not reached',
		'Order could not be delivered - Recipient unknown',
		'Order could not be delivered - Notification of damage by the carrier'
	],
	GHOST_STATUS: {
		10: 'rx_expected',
		25: 'measurement_missing',
		31: 'expired_receipt',
		33: 'rx_m16',
		90: 'reimbursement_deactivated'
	}
};

export const SUBSCRIPTION_OPTIONS = [
	{
		label: i18nLabels?.QUATERLY_SUBSCRIPTION,
		value: 1
	}
];

export const BANNER_TYPE = {
	IMAGE: 'image',
	PRODUCT: 'product',
	VIDEO: 'video'
};

export const MESSAGE_BANNER_TYPE = {
	DEFAULT: 'default',
	NEWSLETTER: 'newsletter',
	RX_NOT_SUPPORTED: 'rx_not_supported',
	INVOICE_STATUS: 'invoice_status',
	GHOST_ORDER: 'ghost_order_status',
	REAL_ORDER: 'real_order_status',
	PRESCRIPTION_REMINDER: 'prescription_reminder'
};

export const TEXT_ALIGNMENT = {
	RIGHT: 'right',
	LEFT: 'left'
};

export const DOWNLOAD_OPTIONS = {
	RMA: 'rma',
	RX_PDF: 'rx-pdf',
	INVOICE: 'invoice',
	CREDIT_NOTE: 'credit-note'
};

export const BANNER_IMAGE_TYPE = {
	FULL_BLEED: 'fullBleed',
	HALF_WIDTH: 'halfWidth',
};

export const VIDEO_PLAY_OPTION = {
	DISPLAY_ON_MODAL: 'display-on-modal',
	DISPLAY_INLINE: 'dispaly-inline'
};

export const TAB_NAMES = {
	PLUS_SERVICE: 'plusservice',
	REIMBURSEMENT: 'kostenuebernahme',
	MY_ORDERS: 'meine_bestellungen',
	DATA_AND_SETTINGS: 'daten_&_einstellungen'
};

export const PAYMENT_ID = {
	CC: 'CC',
	EP: 'EP',
	FREE: 'free'
};
export const COGNITO_ERROR = {
	MESSAGE_ACCESS_TOKEN: 'Access Token has been revoked'
};

export const DEFAULT_QUERY = 'freestyle';

export const NO_OF_PAGES_TO_DISPLAY = 4;

export const COPAY_EXEMPTION_STATUS = {
	YES: 'yes',
	NO: 'no',
	NULL: null
};
export const PRODUCT_ATTRIBUTES = {
	SKU: 'sku',
	LABEL: 'label'
};

export const PREFERRED_PRODUCT_OPTIONS = [
	{
		label: 'FreeStyle Libre 3',
		value: 'FreeStyleLibre v.3'
	}
]

export const PRODUCT_DELIVERABLE_STATUS = {
	CANCELLED: 'Cancelled'
};

export const FSL3_PRODUCT_PREFERENCE_VALUE = "FreeStyleLibre v.3";

export const PRODUCT_SKUS = {
	FSL_3_SENSOR: '72114-01'
};

export const GERMANY_LANGUAGE = {
	DE: 'de',
	DE_DE:'de_DE'
};
export const FSL3_BANNER_ICON = '--fsl3-banner-icon';
export const FSL3_BANNER_BUTTON = '--fsl3-banner-button';
export const FSL3_BANNER_PREFERENCE_YES = '--fsl3-banner-prference-yes';
export const FSL3_BANNER_PREFERENCE_NO = '--fsl3-banner-prference-no';
export const FSL3_NONE = 'none';
export const FSL3_BLOCK = 'block';
export const ENVIRONMENT_VARIABLE = {
	DEV : 'dev',
	QA: 'qa',
	STAGE: 'stage',
	PRODUCTION: 'prod'
}

export const PRESCRIPTION_REMINDER_DATE_TYPE = {
	DOT: 'dot',
	UNIX: 'unix'
}
export const RETURN_STATUS_WITH_DASH = 'returnstatus-';
export const ARVATO_SESSION_ID = 'arvato_session_id';
export const CARRIER_RETURNED = 'carrier returned';

export const INVOICE_PREFIX = {
	INVOICE: 'DEI',
	CREDIT_NOTE:'DEC'
}
export const ARVATO_TRACE_TRACK_QUERY_PARAM_KEY = {
	ORDER_ID: 'orderId',
	ZIP_CODE: 'zip'
}
export	const ORDER_DOCUMENT_LIST = {
	INVOICE: 'DEI',
	CREDIT: 'DEC',
	FILTER: 'Filter',
	RECHNUNG: 'Rechnung',
	GUTSCHRIFT: 'Gutschrift',
	DOC: 'document',
	PLACEHOLDER: 'Suchbegriff eingeben...'
}
export const REFUND_WIDGET_MIN_DATE = 1698969600000;

export const INVISIBLE_RECAPTCHA_SIZE= 'invisible';
export const RECAPTCHA_SITE_KEY_ENUM ='reCaptchaSiteKey';
export const RECAPTCHA_SITE_SRC_ENUM ='reCaptchaScriptsrc';
export const SUCCESS_CODE = "successCode";
export const RECAPTCHA_VALIDATION_ERROR_CODE = 5000;