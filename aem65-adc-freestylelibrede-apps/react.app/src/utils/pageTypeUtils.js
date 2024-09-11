import {getSiteData} from './endpointUrl';

const PAGE_TYPE = {
	CONTENT: 'content',
	CHECKOUT: 'checkout',
	RX_CHECKOUT: 'rx-checkout',
};

const getPageType = () => getSiteData()?.['pageType'];

export const isRxCheckoutPageType = () => PAGE_TYPE.RX_CHECKOUT === getPageType();
export const isCheckoutPageType = () => PAGE_TYPE.CHECKOUT === getPageType();