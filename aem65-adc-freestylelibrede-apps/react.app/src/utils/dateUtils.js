import {i18nLabels} from './translationUtils';
import I18n from '../modules/Translation/components/I18n.jsx';
import React from 'react';
import {matchRegexes} from './regexUtils';

export const getFormattedDate = (iso) => {
	return iso ? new Intl.DateTimeFormat('de-DE', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(new Date(iso)) : <I18n text={i18nLabels.UNKNOWN_DELIVERY_DATE}/>;
};

export const getMagentoFormattedDate = (iso) => {
	const year = new Date(iso).getFullYear();
	const month = new Date(iso).getMonth() + 1;
	const day = new Date(iso).getDate();
	return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
};

export const dashedToDotted = (dashedFormatString) => dashedFormatString ? dashedFormatString.replace(matchRegexes.dateDashed(), '$3.$2.$1') : null;
export const dottedToDashed = (dottedFormatString) => dottedFormatString ? dottedFormatString.replace(matchRegexes.dateDotted(), '$3-$2-$1') : null;

export const secondsInMinute = 60;
export const millisecondsInSecond = 1000;


export const formateDateWithDotSeprator = (dateObj) => {

    let newDate = dateObj
    let date = newDate?.getDate();
    let month = newDate?.getMonth() + 1;
    let year = newDate?.getFullYear();
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    return date + "." + month + "." + year;

}