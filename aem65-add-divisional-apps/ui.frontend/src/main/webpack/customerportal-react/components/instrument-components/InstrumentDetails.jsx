import React, { useEffect, useMemo } from 'react'
import { InstrumentDetailsHero } from './InstrumentDetailsHero'
import { ReportCardServicePlan } from './ReportCardServicePlan'
import { ReportCardInstrumentMaintenance } from './ReportCardInstrumentMaintenance'
import { ReportCardUptime } from './ReportCardUptime'
import { instrumentDetailsService } from '../services/InstrumentDetailsService'
import { SupportRequestResultsTable } from './SupportRequestResultsTable'
import { useTranslation } from "react-i18next";
import { Tooltip } from "@abbott/add-platform";
import countryList from 'react-select-country-list'

export const InstrumentDetails = () => {
    const { t, i18n } = useTranslation();
    const options = useMemo(() => countryList().getData(), []);
    // Parameters that will be passed down to other components *****
    const urlParams = new URLSearchParams(window.location.search);
    const nickname = decodeURIComponent(urlParams.get('nn'))
    const queryString = window.atob(urlParams.get('vd'))
    const queryParams = new URLSearchParams(queryString)
    
    const billingCountry = queryParams.get('bc')
    const businessSegment = queryParams.get('bs')
    const canSubmitTix = queryParams.get('cst') == 'true' ? true : false
    const canViewTix = queryParams.get('cvt') == 'true' ? true : false
    const customerId = queryParams.get('ci')
    const informatics = queryParams.get('in') == 'true' ? true : false
    const instrumentId = queryParams.get('ii')
    const labName = queryParams.get('ln')
    const labProfile = queryParams.get('lp')
    const productName = queryParams.get('pn')
    const serialNumber = queryParams.get('sn')
    const systemId = queryParams.get('si')
    const todsProductCode = queryParams.get('tpc')
    // *****************************

    const { doReport, doTicketSearch, doSubmitionTimeData } = instrumentDetailsService()

    // Calls the ticket retrieval service within a React Effect. Only called once since the page is only accessed by clicking on an instrument on the My Instruments page
    useEffect(() => {
        doTicketSearch(serialNumber, labProfile)
    }, []);

    useEffect(() => {

        var countryName = JSON.parse(localStorage.getItem('custportalSelectedLabProfile'));
        var countryCode = options.filter(lang => lang.label === countryName.billingCountry);
        
        var data = {
            "action": "getOperatingHours",
            "productIds": [todsProductCode],
            "countryCode": countryCode[0].value
        }
        
        doSubmitionTimeData(data, informatics);

    }, []);

    useEffect(() => {
        doReport(serialNumber, 'servicePlan', instrumentId, labProfile)
    }, [])

    useEffect(() => {
        doReport(serialNumber, 'instrumentMaintenance', instrumentId, labProfile)
    }, [])

    useEffect(() => {
        doReport(serialNumber, 'uptime', instrumentId, labProfile)
    }, [])

    const containerZindex = () => {
        document.querySelector('.a-container').style.zIndex = "auto";
    }

    return (
        <div>
            {containerZindex()}
            <div>
                <InstrumentDetailsHero nickname={nickname} todsProductCode={todsProductCode} productName={productName} serialNumber={serialNumber} custId={customerId} instId={instrumentId} labName={labName} labProfile={labProfile} systemId={systemId} canSubmitTix={canSubmitTix} billingCountry={billingCountry} informatics={informatics} />
            </div>
            <div className='instrument-details-header'>
                <p>{t('instrument-reports')}</p>
            </div>
            <div className='instrument-details-reports'>
                <div className='m-card instrument-report-card'>
                    <div className='instrument-report-card-header'>
                        <div className='instrument-header-tooltip'>
                            <p>{t('service-plan')}</p>
                            <Tooltip placement={"bottom"} title={`<p>${t('service-plan-tooltip')}</p>`}></Tooltip>
                        </div>
                    </div>
                    <ReportCardServicePlan />
                </div>
                <div className='m-card instrument-report-card'>
                    <div className='instrument-report-card-header'>
                        <div className='instrument-header-tooltip'>
                            <p>{t('gsr-score-header')}</p>
                            <Tooltip placement={"bottom"} title={`<p>${t('gsr-score-tooltip')}</p>`}></Tooltip>
                        </div>
                    </div>
                    <ReportCardInstrumentMaintenance />
                </div>
                <div className='m-card instrument-report-card'>
                    <div className='instrument-report-card-header'>
                        <div className='instrument-header-tooltip'>
                            <p>{t('uptime')}</p>
                            <Tooltip placement={"bottom"} title={`<p>${t('uptime-tooltip')}</p>`}></Tooltip>
                        </div>
                    </div>
                    <ReportCardUptime businessSegment={businessSegment}/>
                </div>

            </div>
            {canViewTix ?
                <div>
                    <div className='instrument-details-header'>
                        <p>{t('open-incidents')}</p>
                    </div>
                    <div>
                        <SupportRequestResultsTable productName={productName} informaticsData={informatics} />
                    </div>
                </div>
                : <div></div>}
        </div>
    )
}