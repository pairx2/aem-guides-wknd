import React from 'react';
import { useSharedInstrumentFlags } from '../shared/InstrumentFlags'
import { LoadingIndicator } from '@abbott/add-platform';
import { useSharedInstrumentData } from '../shared/InstrumentData';
import { useTranslation } from 'react-i18next';
import { DateCell } from '../cell-components/DateCell'

// This instrument detail report card displays the service plan information, e.g. contract start and end.

export function ReportCardServicePlan(props) {

    const { gotServicePlanReport, isServicePlanError, servicePlanIsLoading, servicePlanErrorCode } = useSharedInstrumentFlags()
    const { servicePlanReport } = useSharedInstrumentData()
    const { t, i18n } = useTranslation();

    const contractStart = servicePlanReport.contractStart
    const contractEnd = servicePlanReport.contractEnd
    const responseTime = servicePlanReport.responseTime
    const hoursOfCoverage = servicePlanReport.serviceHRs

    const renderError = (errorCode) => {
            return (
                <div className={'instrument-report-card-error'}>
                    <p>{t('service-plan-error')}</p>
                </div>
            )
    }

    if (gotServicePlanReport && !isServicePlanError) {
        if (servicePlanReport) {
            return (
                <div className='instrument-report-card-service'>
                    <table className='instrument-report-card-service-column'>
                        <tbody>
                            <tr>
                                <td><p style={{textTransform: 'uppercase'}}><b>{t('contract-start')}: </b></p></td>
                                <td className='instrument-report-card-service-data'><DateCell value={contractStart} dateFormat={'DD MMM yyyy'}/></td>
                            </tr>
                            <tr>
                                <td><p style={{textTransform: 'uppercase'}}><b>{t('contract-end')}: </b></p></td>
                                <td className='instrument-report-card-service-data'><DateCell value={contractEnd} dateFormat={'DD MMM yyyy'}/></td>
                            </tr>
                                <tr>
                                    <td><p style={{textTransform: 'uppercase'}}><b>{t('response-time')}: </b></p></td>
                                    <td className='instrument-report-card-service-data'><p>{responseTime ?? '-'}</p></td>
                                </tr>
                                <tr>
                                    <td><p style={{textTransform: 'uppercase'}}><b>{t('hours-of-coverage')}: </b></p></td>
                                    <td className='instrument-report-card-service-data'><p>{hoursOfCoverage ?? '-'}</p></td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            )
                            }
        } else if (isServicePlanError) {
            // Below allows for more fine-tuning of the error message if desired
            if (servicePlanErrorCode) {
                return (
                    <div>
                        {renderError(servicePlanErrorCode)}
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
                <div className={`custom-search-results ${servicePlanIsLoading ? 'loading' : ''}`}>
                    {servicePlanIsLoading && (
                        <LoadingIndicator />
                    )}

                </div>
            )
        }
    }



export default ReportCardServicePlan;
