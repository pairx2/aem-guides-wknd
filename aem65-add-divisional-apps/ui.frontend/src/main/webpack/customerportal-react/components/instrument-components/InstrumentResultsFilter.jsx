import React, { useState, useEffect } from 'react'
import { useSharedInstrumentFlags } from "../shared/InstrumentFlags";
import { LoadingIndicator } from '@abbott/add-platform';
import { useSharedInstrumentData } from '../shared/InstrumentData'
import { InstrumentResultsWrapper } from './InstrumentResultsWrapper';
import { useTranslation } from 'react-i18next';

// This component, the next level down from Instruments, filters the full instrument results object based on the user's choice of product name and serial number and whether they want to sort by pinned first or not. This component also includes a pagination function that divides the subset of instruments into an array of arrays (each sub-array is a page with max 12 instruments)

export const InstrumentResultsFilter = () => {
    const { myInstruments, setPageCount } = useSharedInstrumentData()
    const { isLoading, isError, gotInstruments, instType, instName, hasSearchedProdType, hasSearchedProdName, pinnedFirst, instrumentErrorCode } = useSharedInstrumentFlags();
    const { t, i18n } = useTranslation();

    // The createPaginationGroups function takes an array of instruments and splits it into an array of arrays, each interior array containing the instruments for one individual page. It assumes that each page will contain 12 instruments. It also sets the shared pageCount state, so that the child components can access it when constructing the pagination component.
    const createPaginationGroups = (instruments) => {
        let numberOfInstruments = instruments.length
        let numberOfPages = (Math.floor(numberOfInstruments / 12)) + (instruments.length % 12 == 0 ? 0 : 1)
        setPageCount(numberOfPages)
        let pages = []
        let pageContents = []
        let counter = 1
        for (let i = 0; i < instruments.length; i++) {
            if (pageContents.length == 12) {
                if (counter < numberOfPages) {
                    pages.push(pageContents)
                    pageContents = []
                    counter++
                    pageContents.push(instruments[i])
                    // Below handles the case where there is just one instrument on the last page - the final instrument needs to be pushed as its own paged content
                    if (instruments.length % 12 == 1) {
                        pages.push(pageContents)
                    }
                }
            } else if (counter == numberOfPages) {
                pageContents.push(instruments[i])
                if (i == instruments.length - 1) {
                    pages.push(pageContents)
                }
            }
            else {
                pageContents.push(instruments[i])
            }
        }
        return pages
    }

    // ***************************************************

    // *************** 
    // This function sorts the provided data with the pinned instruments first
    const sortByPinned = (arr) => {
        let sortedArr = []
        let pinnedArr = []
        let unpinnedArr = []
        arr.forEach(item => item.pinned ? pinnedArr.push(item) : unpinnedArr.push(item))
        sortedArr = pinnedArr.concat(unpinnedArr)
        return sortedArr
    }

    // if the Axios data has come through...
    if (gotInstruments && !isError) {
        // and if they haven't done any filters...
        if (myInstruments && !hasSearchedProdType) {
            // return all the results sans filtering
            if (pinnedFirst == 'default' || pinnedFirst == true) {
                let sortedInstruments = sortByPinned(myInstruments.myInstruments)
                let paginatedInstruments = createPaginationGroups(sortedInstruments)
                return (
                    <InstrumentResultsWrapper instruments={paginatedInstruments} />
                )
            } else {
                let paginatedInstruments = createPaginationGroups(myInstruments.myInstruments)
                return (
                    <InstrumentResultsWrapper instruments={paginatedInstruments} />
                )
            }
        } else if (myInstruments && hasSearchedProdType) {
            // they have only filtered the type
            let newFilterType = myInstruments.myInstruments.filter(item => item.productFilterName == instType)
            if (!hasSearchedProdName) {
                if (pinnedFirst == 'default' || pinnedFirst == true) {
                    let sortedInstruments = sortByPinned(newFilterType)
                    let paginatedInstruments = createPaginationGroups(sortedInstruments)
                    return (
                        <InstrumentResultsWrapper instruments={paginatedInstruments} />
                    )
                } else {
                    let paginatedInstruments = createPaginationGroups(newFilterType)
                    return (
                        <InstrumentResultsWrapper instruments={paginatedInstruments} />
                    )
                }
            } else {
                // user filterd the name and the type
                // Note : sometimes the instrument name or serial number comes through like 'name / serial number', but other times it comes in as just the serial number
                let instNickname = ''
                let instSerialNumber = ''
                if (instName.includes('/')) {
                    [instNickname, instSerialNumber] = instName.split(' / ')
                } else {
                    instSerialNumber = instName
                }
                let returningOneInst = newFilterType.filter(item => item.serialNumber == instSerialNumber)
                let paginatedInstruments = createPaginationGroups(returningOneInst)
                return (
                    <InstrumentResultsWrapper instruments={paginatedInstruments} />
                )
            }
        } else {

            return (
                <div className={`custom-search-results ${isLoading ? 'loading' : ''}`} >
                    {isLoading && (
                        <div className="custom-search-results-instruments__loading-mask">
                            <LoadingIndicator />
                        </div>
                    )}

                </div>
            )
        }
    } else if (isError) {
        if (instrumentErrorCode) {
            return (
                <InstrumentResultsWrapper instruments={{}} error={instrumentErrorCode} />
            )
        } else {
            return (
                <p>{t('instrument-error-refresh')}</p>
            )
        }
    } else {
        return (
            <div>
                <div className={`custom-search-results ${isLoading ? 'loading' : ''}`}>
                    {isLoading && (
                        <div className="custom-search-results-instruments__loading-mask">
                            <LoadingIndicator />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}













