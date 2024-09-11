import {UNDEFINED} from './enums';

export const get_time_diff =(datetime)=>{
	let lastUpdated = typeof datetime !== UNDEFINED && datetime;
	lastUpdated = new Date(lastUpdated).getTime();
	const now = new Date().getTime();
	if( isNaN(lastUpdated)) {
		return '';
	}
	let milisec_diff;
	if (lastUpdated < now) {
		milisec_diff = now - lastUpdated;
	}else{
		milisec_diff = lastUpdated - now;
	}
	const days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
	const date_diff = new Date( milisec_diff );
	return days + 'd '+ (date_diff.getHours() - 5) + 'h ' + (date_diff.getMinutes() - 30) + 'm';
};