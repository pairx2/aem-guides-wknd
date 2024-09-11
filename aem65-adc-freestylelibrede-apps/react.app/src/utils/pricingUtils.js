import {getLocale} from './translationUtils';

export const formatPrice = price => price?.toLocaleString(getLocale(), {style: 'currency', currency: 'EUR'}) || (0).toLocaleString(getLocale(), {style: 'currency', currency: 'EUR'});