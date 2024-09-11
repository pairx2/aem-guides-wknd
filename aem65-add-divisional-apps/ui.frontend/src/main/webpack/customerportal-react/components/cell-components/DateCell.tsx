import React from 'react';
import Moment from 'moment';
import {useSharedOUS} from "../shared/OutsideUS";

export const DateCell = (props) => {

    const {preferredLanguage} = useSharedOUS();
    const fallbackDateFormat = 'MMM DD, yyyy';
    const {value, dateFormat} = props;

    const moment = Moment(value);
    if (moment.isValid()) {
        if (preferredLanguage) {
            moment.locale(preferredLanguage);
        }
        const formattedDate = moment.format(dateFormat != 'date-format' ? dateFormat : fallbackDateFormat); // add a fallback for when the i18next fails
        return (<>{formattedDate}</>)
    } else {
        return (<>{value}</>)
    }
}