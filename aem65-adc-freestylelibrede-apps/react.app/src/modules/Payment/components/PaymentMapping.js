import {PAYMENT_ICONS} from '../../../utils/enums';

export const paymentMapping = [
	{
		id: 'MASTER VISA AMEX PAYPAL',
		magentoId: 'payon_saved_token',
		rsId: null,
		icon: null,
		canBeSaved: false,
		showRedirectNotice: false,
		title: 'saved_payments',
		payon: true,
		orderUpdateOnly: true
	},
	{
		id: 'MASTER VISA AMEX PAYPAL',
		magentoId: 'payon_saved_token',
		rsId: null,
		icon: null,
		canBeSaved: false,
		showRedirectNotice: false,
		title: 'saved_payments',
		payon: true,
		checkoutOnly: true
	},
	{
		id: 'PAYPAL',
		magentoId: 'payon_paypal',
		rsId: 'EP',
		icon: PAYMENT_ICONS.PAYPAL,
		canBeSaved: false,
		showRedirectNotice: true,
		title: 'paypal',
		payon: true
	},
	{
		id: 'MASTER VISA AMEX',
		magentoId: 'payon_credit_card',
		rsId: 'CC',
		icon: PAYMENT_ICONS.CC,
		canBeSaved: true,
		showRedirectNotice: false,
		title: 'credit_card',
		payon: true
	},
	{
		id: 'SOFORTUEBERWEISUNG',
		magentoId: 'payon_sofort',
		rsId: 'SUE',
		icon: PAYMENT_ICONS.SOFORT,
		canBeSaved: false,
		showRedirectNotice: true,
		title: 'sofort',
		payon: true,
		hideAddEdit: true
	},
	{
		id: '',
		magentoId: 'open_invoice',
		rsId: 'OI',
		icon: PAYMENT_ICONS.OPEN_INVOICE,
		canBeSaved: false,
		showRedirectNotice: false,
		title: 'open_invoice_payment',
		payon: false
	},
	{
		id: '',
		magentoId: 'free',
		rsId: null,
		icon: null,
		canBeSaved: false,
		showRedirectNotice: false,
		title: 'free_payment',
		payon: false,
	}
];