import React, { useState } from 'react';
import { useSharedInstrumentFlags } from '../shared/InstrumentFlags';
import { LoadingIndicator } from '@abbott/add-platform';
import { XFDisplay } from "@abbott/add-platform";
import { useSharedInstrumentData } from '../shared/InstrumentData'
import { useTranslation } from 'react-i18next';

// This instrument detail report card displays the uptime percentage for the past three months

export function ReportCardUptime(props) {

    const { gotUptimeReport, isUptimeError, uptimeIsLoading, uptimeErrorCode } = useSharedInstrumentFlags()
    const { uptimeReport } = useSharedInstrumentData()
    const { t, i18n } = useTranslation();
    const { businessSegment } = props

    const friendlyDate = (date) => {
        let year = date.slice(0, 4)
        let monthNum = date.slice(4)
        let newDate = year + '-' + monthNum
        return newDate
    }

    // This function rounds the uptime metrics to one decimal place if the number is a float
    const roundUptime = (number) => {
        if (Number.isInteger(number)) {
            return number
        } else {
            const round = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
            });
            return (round.format(number))
        }
    }

    // Note that these assume the report months come in order
    const [uptimeMonth1, uptimeMonth2, uptimeMonth3] = Object.keys(uptimeReport)
    const [uptimeMonthNum1, uptimeMonthNum2, uptimeMonthNum3] = Object.values(uptimeReport)

    const renderError = (errorCode) => {

        return (
            <div className={'instrument-report-card-error'}>
                <p>{t('uptime-error')}</p>
            </div>
        )
    }



    if (gotUptimeReport && !isUptimeError) {
        if (uptimeReport) {
            if (businessSegment == 'Transfusion') {
                return (
                    <div className='instrument-report-card-uptime'>
                        {renderError('Error')}
                    </div>
                )
            } else {
                return (
                    <div className='instrument-report-card-uptime'>
                        {/* If all three metrics are returned as NaN, we display the 'no uptime report' message */}
                        {uptimeMonthNum1 == 'NaN' && uptimeMonthNum2 == 'NaN' && uptimeMonthNum3 == 'NaN' ?
                            renderError('Error')
                            :
                            <table>
                                <tbody>
                                    <tr>
                                        <td><p><b>{friendlyDate(uptimeMonth1)}</b></p></td>
                                        <td><p><b>{friendlyDate(uptimeMonth2)}</b></p></td>
                                        <td><p><b>{friendlyDate(uptimeMonth3)}</b></p></td>
                                    </tr>
                                    <tr>

                                        <td><h4>{uptimeMonthNum1 == 'NaN' ? '-' : `${roundUptime(uptimeMonthNum1)}%`}</h4></td>
                                        <td><h4>{uptimeMonthNum2 == 'NaN' ? '-' : `${roundUptime(uptimeMonthNum2)}%`}</h4></td>
                                        <td><h4>{uptimeMonthNum3 == 'NaN' ? '-' : `${roundUptime(uptimeMonthNum3)}%`}</h4></td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    </div>
                );
            }
        }
    }
    else if (isUptimeError) {
        // Below allows for more fine-tuning of the error message if desired
        if (uptimeErrorCode) {
            return (
                <div>
                    {renderError(uptimeErrorCode)}
                </div>
            )
        } else {
            return (
                <div>
                    {renderError('Error')}
                </div>
            )
        }
    } else {
        return (
            <div className={`custom-search-results ${uptimeIsLoading ? 'loading' : ''}`}>
                {uptimeIsLoading && (
                    <LoadingIndicator />
                )}
            </div>
        )
    }
}

export default ReportCardUptime;
