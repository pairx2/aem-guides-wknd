import React, { useState, useEffect } from 'react'
import { InstrumentCardDash } from './InstrumentCardDash'
import { XFDisplay } from "@abbott/add-platform";
import { LoadingIndicator } from '@abbott/add-platform';
import { useSharedInstrumentFlags } from "../shared/InstrumentFlags";
import { useSharedInstrumentData } from '../shared/InstrumentData'
import { useTranslation } from 'react-i18next';
import { useSharedLabProfiles } from '../shared/LabProfiles'


export const InstrumentDashResults = (props) => {
    const { isLoading, gotInstruments, isError } = useSharedInstrumentFlags();
    const { myInstruments } = useSharedInstrumentData();
    const [pinnedInstruments, setPinnedInstruments] = useState([]);
    const [gotPinnedInstruments, setGotPinnedInstruments] = useState(false);
    const { t, i18n } = useTranslation();
    const { selectedLabProfile } = useSharedLabProfiles();

    useEffect(() => {
        if (myInstruments.myInstruments?.length > 0) {
            let pinned = [];
            myInstruments.myInstruments.map(item => {
                if (item.pinned) {
                    pinned.push(item);
                }
            });
            setPinnedInstruments(pinned);
            setGotPinnedInstruments(true)
        }
    }, [myInstruments]);

    // ***************************************************

    const renderHeader = () => {
        return (
            <div className="header_lab-profile">
                <div className='intrusment-dashboard-title'>
                    <h4>
                        {t('my-pinned-instruments')}
                    </h4>
                    <a href="instruments.html">
                        {t('view-all-instruments')}
                    </a>
                </div>
            </div>
        )
    }

    // if the Axios data has come through...
    if (gotInstruments && !isError) {
        if (myInstruments) {
            // return only the pinned instruments
            return (
                <>
                    {renderHeader()}
                    <div className='labprofile-results-container'>
                        {pinnedInstruments.map(item => (
                            <InstrumentCardDash 
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
                            />
                        )
                        )}
                        {gotPinnedInstruments && pinnedInstruments.length < 1 && (
                            <XFDisplay
                                xfid={'apiError_pinnedInstruments'} />
                        )}
                    </div>
                </>
            )
        }
    } else {
        // render if there are no results, cf the SearchResults
        return (
            <div className={`custom-search-results ${isLoading ? 'loading' : ''}`} >
                {renderHeader()}
                {isLoading && (
                    <div className="custom-search-results-instruments__loading-mask">
                        <LoadingIndicator />
                    </div>
                )}
            </div>
        )

    }
}
