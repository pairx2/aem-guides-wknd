import React, { useState, useEffect, useMemo } from 'react'
import { LoadingIndicator } from '@abbott/add-platform';
import { InstrumentCard } from './InstrumentCard'
import { useSharedLabProfiles } from '../shared/LabProfiles'
import { useSharedInstrumentFlags } from '../shared/InstrumentFlags'

// This component is the final instrument results component. It handles the actual displaying of the instruments on the current page

export const InstrumentResults = (props) => {
    const { selectedLabProfile } = useSharedLabProfiles()
    const { isLoading } = useSharedInstrumentFlags()
    const { instruments, page } = props
    // instrumentsToDisplay uses the useMemo hook to prevent race conditions resulting in a page trying to display before the instrument pagination has been prepared
    const instrumentsToDisplay = useMemo(() => {
        if (instruments[page]) {
            const instArr = instruments[page]
            let instArrToDisplay = instArr.map(item => <InstrumentCard
                businessSegment={selectedLabProfile.businessSegment}
                billingCountry={item.billingCountry}
                canViewTix={item.canViewIncidentReports}
                canSubmitTix={item.canSubmitIncidentReports}
                cardId={item.serialNumber}
                custId={item.cmsNextCustomerId}
                informatics={item.informatics}
                instId={item.cmsNextInstrumentId}
                key={item.serialNumber}
                labId={selectedLabProfile.labProfileId}
                labName={selectedLabProfile.labName}
                nickname={item.nickname ? item.nickname : item.productFilterName}
                pinClass={item.pinned ? 'pinned' : 'unpinned'}
                pinned={item.pinned}
                productFilterName={item.productFilterName}
                productName={item.productName}
                todsProductCode={item.todsProductCode}
                serialNumber={item.serialNumber}
                systemId={item.addComSystemId}
            />)
            return instArrToDisplay
        } else {
            return null
        }
    }, [instruments, page])

    if (instruments) {
        if (instruments.length) {
            return (
                <div className='instrument-results-container'>
                    {instrumentsToDisplay}
                </div>
            )
        } else {
            return <p>{'generic-service-error'}</p>
        }
    } else {
        return (
            <div className={`custom-search-results ${isLoading ? 'loading' : ''}`}>
                {isLoading && (
                    <div className="custom-search-results-instruments__loading-mask">
                        <LoadingIndicator />
                    </div>
                )}
            </div>
        )
    }
}