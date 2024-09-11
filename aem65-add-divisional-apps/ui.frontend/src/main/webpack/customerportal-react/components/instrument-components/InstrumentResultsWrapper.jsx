import React, { useState } from 'react'
import { LoadingIndicator } from '@abbott/add-platform';
import { useSharedInstrumentData } from '../shared/InstrumentData'
import { InstrumentPagination } from './InstrumentPagination'
import { InstrumentResults } from './InstrumentResults'
import { useSharedInstrumentFlags } from '../shared/InstrumentFlags'
import { useTranslation } from 'react-i18next';

// This component is the penultimate instrument component. It creates the functions that handle the pagination buttons. 

export const InstrumentResultsWrapper = (props) => {
    const { pageCount, currentPage, setCurrentPage } = useSharedInstrumentData()
    const { isLoading } = useSharedInstrumentFlags()
    const { instruments, error } = props
    const { t, i18n } = useTranslation();

    const goToPage = (newPage) => {
        setCurrentPage(newPage)
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1)
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    if (!error) {
        if (instruments) {
            return (
                <div>
                    <InstrumentResults instruments={instruments} page={currentPage} />
                    <div className='instrument-details-paginaton'>
                        <InstrumentPagination pageCount={pageCount} previousPage={previousPage} nextPage={nextPage} canPreviousPage={currentPage == 0 ? false : true} canNextPage={currentPage == (pageCount - 1) ? false : true} goToPage={goToPage} currentPage={currentPage} />
                    </div>
                </div>
            )
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
    } else {
        // Below allows for more fine-tuning of the error message if desired
        return (
            <p>{t('generic-service-error')}</p>
        )
    }
}