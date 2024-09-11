import React from 'react';
import ColorBox from './ColorBox';
import { useSharedInstrumentFlags } from '../shared/InstrumentFlags'
import { LoadingIndicator } from '@abbott/add-platform';
import { XFDisplay } from "@abbott/add-platform";
import { useSharedInstrumentData } from '../shared/InstrumentData'
import { useTranslation } from 'react-i18next';

// This instrument detail report card displays the 'days since last activity', the maintenance score, and maintenance score legend.

export function ReportCardInstrumentMaintenance(props) {

    const { gotMaintenanceReport, isInstrumentMaintenanceError, instrumentMaintenanceIsLoading,  instrumentMaintenanceErrorCode } = useSharedInstrumentFlags()
    const { instrumentMaintenanceReport } = useSharedInstrumentData()
    const { t, i18n } = useTranslation();

    // The colorPicker function determines which color to display for the instrument maintenance metric based on the value of the metric
    const colorPicker = (num) => {
        let numNum = parseInt(num)
        if (numNum >= 0 && numNum <= 35) {
            return 'red'
        } else if (numNum >= 36 && numNum <= 70) {
            return 'yellow'
        } else {
            return 'green'
        }
    }

    const lastActivity = instrumentMaintenanceReport.last_contact_days
    const daily = instrumentMaintenanceReport.daily_score
    const weekly = instrumentMaintenanceReport.weekly_score
    const quarterly = instrumentMaintenanceReport.quarterly_score
    const overall = instrumentMaintenanceReport.overall_score

    const renderError = (errorCode) => {
        return (
            <div className={'instrument-report-card-error'}>
                <p>{t('instrument-maintenance-error')}</p>
            </div>
        )
    }

    if (gotMaintenanceReport && !isInstrumentMaintenanceError) {
        if (instrumentMaintenanceReport) {
            return (
                <div>
                    <p style={{ fontSize: '.8em', paddingBottom: '2%', marginTop: '-10%' }}>{t('days-since-last-activity')} <b>{lastActivity}</b></p>
                    <div className='instrument-report-card-maintenance-data'>
                        <div className='instrument-reports-maintenance'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><p style={{textTransform: 'uppercase'}}><b>{t('daily')}</b></p></td>
                                        <td><p style={{textTransform: 'uppercase'}}><b>{t('weekly')}</b></p></td>
                                        <td><p style={{textTransform: 'uppercase'}}><b>{t('quarterly')}</b></p></td>
                                        <td><p style={{textTransform: 'uppercase'}}><b>{t('overall')}</b></p></td>
                                    </tr>
                                    <tr>
                                        <ColorBox color={colorPicker(daily)} number={daily} />
                                        <ColorBox color={colorPicker(weekly)} number={weekly} />
                                        <ColorBox color={colorPicker(quarterly)} number={quarterly} />
                                        <ColorBox color={colorPicker(overall)} number={overall} />
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='instrument-report-card-maintenance-legend'>
                            <img alt={t('instrument-maintenance-legend')} src='/etc.clientlibs/add/customerportal/clientlibs/clientlib-customerportal/resources/images/MntLegend.png' />
                        </div>
                    </div>
                </div>
            );
        }
    } else if (isInstrumentMaintenanceError) {
        // Below allows for more fine-tuning of the error message if desired
        if (instrumentMaintenanceErrorCode) {
            return (
                <div>
                    {renderError(instrumentMaintenanceErrorCode)}
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
            <div className={`custom-search-results ${instrumentMaintenanceIsLoading ? 'loading' : ''}`}>
                {instrumentMaintenanceIsLoading && (
                    <LoadingIndicator />
                )}

            </div>
        )
    }
}

export default ReportCardInstrumentMaintenance;
