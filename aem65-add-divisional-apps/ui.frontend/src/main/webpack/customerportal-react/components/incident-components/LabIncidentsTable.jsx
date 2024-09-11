
import React, { useState, useEffect, useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { useSharedInstrumentData } from '../shared/InstrumentData'
import { useSharedInstrumentFlags } from '../shared/InstrumentFlags'
import { LoadingIndicator, Modal, InputField } from '@abbott/add-platform';
import { Button } from "@abbott/add-platform";
import { instrumentDetailsService } from '../services/InstrumentDetailsService'
import { RTPagination } from '../react-table-components/RT-Pagination';
import { commentService } from '../services/CommentService';
import { useSharedLabIncidentsData } from '../shared/LabIncidentsData'
import { useSharedLabIncidentsFlags } from '../shared/LabIncidentsFlags'
import { TicketModalInputField } from '../instrument-components/TicketModalInputField'
import { useTranslation } from "react-i18next";
import { Translate } from '../shared/Translate';
import { DateCell } from '../cell-components/DateCell'
import countryList from 'react-select-country-list'

// The GlobalFilter function/component is adapted per react-table requirements
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
    placeholderText
}) {
    const [value, setValue] = useState(globalFilter)
    const onChange = (value) => {
        setGlobalFilter(value || undefined)
    }

    return (
        <tr id='incident-global-search' className='instrument-support-request-global-search-row'>
            <th colSpan='9' className='instrument-support-request-global-search'>
                <span>
                    <input
                        value={value || ""}
                        onChange={e => {
                            setValue(e.target.value);
                            onChange(e.target.value);
                        }}
                        placeholder={placeholderText}
                    />
                </span>
            </th>
        </tr>
    )
}


// The pillPicker function is used to reformat the incident status field in a way that can then be read as am scss class to style the ticket status with colors
const pillPicker = (stat) => {
    let pill = stat.toLowerCase()
    let pillPicked = pill.replaceAll(' ', '-')
    return pillPicked
}

// ********** Dispatch Event/ Modal Functions ***********
// These functions handle the two kinds of triggered events that are used within the support requests table: the ticket details modal and the fsr report download.

// The fireOpenModal event helps us capture the incident number that was selected
const fireOpenModalEvent = (modalDetails) => {
    const event = new CustomEvent('modalOpened', { detail: modalDetails });
    document.dispatchEvent(event);
}

// This funcion displays the Ticket Details & Comments modal. It has to jump through a few hoops to grab the incident number from the link clicked, but it passes that number along in the fireOpenModalEvent call.
const showModal = (incidentNum, productName, statusDetail, canViewReport, productGroup, informatics) => {
    document.getElementById('instrument-incident-modal').classList.remove('comment-message-modal')
    document.querySelector('#instrument-incident-modal').classList.add(`show-modal`)
    document.querySelector('.a-container').style.zIndex = "auto";
    document.querySelector("body").style.overflow = "auto";
    fireOpenModalEvent({
        incident: incidentNum,
        product: productName,
        statusDetail: statusDetail,
        canViewReport: canViewReport,
        productGroup: productGroup,
        informatics: informatics
    });
};

// the fireDownloadEvent ticket receives the ticket ID from the download link that was clicked by the user and triggers the document download event.
const fireDownloadEvent = (ticketInfo) => {
    const event = new CustomEvent('downloadRequested', { detail: ticketInfo });
    document.dispatchEvent(event);
}

// Per react-table, renderColumns lays out the columns for our table. The 'Header' attribute is the text that is displayed in the table. The 'accessor' is the name of the data the header is pulling from. 'sortType' determines if a specific algorithm is used to sort the column. 'disableSortBy', when set to false, means that the column is sortable. The 'Cell' attribute allows for spcific styling and data transformation for a specific column's cells.

const renderColumns =
    [
        {
            Header: 'incident-header-date-opened',
            accessor: 'dateOpened',
            disableGlobalFilter: true,
            disableSortBy: false,
            sortType: (a, b) => {
                return new Date(b.values.dateOpened) - new Date(a.values.dateOpened)
            },
            Cell: (props) => {
                return (
                    <span className='instrument-support-request-data-section'><p className='instrument-support-request-mobile-header'><b>{`${props.column.Header}: `}</b></p><DateCell value={props.value} dateFormat={'DD MMM yyyy'}/></span>
                )
            }
        },
        {
            Header: 'incident-header-incident-number',
            accessor: 'incidentNumber',
            sortType: 'alphanumeric',
            disableSortBy: false,
            Cell: (props) => {
                return <span className='instrument-support-request-data-section'><p className='instrument-support-request-mobile-header'><b>{`${props.column.Header}: `}</b></p><a href='#' onClick={() => showModal(props.row.original.incidentNumber, props.row.original.product, props.row.original.statusDetail, props.row.original.canViewIncidentReports, props.row.original.productGroup, props.row.original.informatics)}>{props.value}</a></span>
            }
        },
        {
            Header: 'incident-header-product',
            accessor: 'product',
            disableSortBy: false,
            sortType: 'alphanumeric',
            Cell: (props) => {
                return (
                    <span className='instrument-support-request-data-section'><p className='instrument-support-request-mobile-header'><b>{`${props.column.Header}: `}</b></p><p>{props.value}</p></span>
                )
            }
        },
        {
            Header: 'incident-header-serial-number',
            accessor: 'serialNumber',
            disableSortBy: false,
            sortType: 'alphanumeric',
            Cell: (props) => {
                return (
                    <span className='instrument-support-request-data-section'><p className='instrument-support-request-mobile-header'><b>{`${props.column.Header}: `}</b></p><p>{props.value}</p></span>
                )
            }
        },
        {
            Header: 'incident-header-description',
            accessor: 'shortDescription',
            disableSortBy: true,
            Cell: (props) => {
                return (
                    <span className='instrument-support-request-data-section'><p className='instrument-support-request-mobile-header'><b>{`${props.column.Header}: `}</b></p><p>{props.value}</p></span>
                )
            }
        },
        {
            Header: 'incident-header-status',
            accessor: 'status',
            sortType: 'alphanumeric',
            disableSortBy: false,
            Cell: (props) => {
                return <span className='instrument-support-request-data-section'><p className='instrument-support-request-mobile-header'><b>{`${props.column.Header}: `}</b></p><p className={`instrument-support-request-status-${pillPicker(props.row.original.statusDetail)}`}>{props.value}</p></span>
            }
        },
        {
            Header: 'incident-header-progress',
            accessor: 'progress',
            disableSortBy: true,
            Cell: (props) => {
                return (
                    <span className='instrument-support-request-data-section'><p className='instrument-support-request-mobile-header'><b>{`${props.column.Header}: `}</b></p><div className='support-request-progress'>{props.value.map(bubble => { return <img src={`/etc.clientlibs/add/customerportal/clientlibs/clientlib-customerportal/resources/images/progress-bubble-${bubble}.svg`} alt={bubble} /> })}</div></span>
                )
            }
        },
        {
            Header: 'incident-header-date-closed',
            accessor: 'closedDate',
            disableGlobalFilter: true,
            disableSortBy: false,
            sortType: (a, b) => {
                return new Date(b.values.closedDate ? b.values.closedDate : -1) - new Date(a.values.closedDate ? a.values.closedDate : -1)
            },
            Cell: (props) => {
                return (
                    <span className='instrument-support-request-data-section'><p className='instrument-support-request-mobile-header'><b>{`${props.column.Header}: `}</b></p>{props.row.original.statusDetail == "Closed" ? (<DateCell value={props.value} dateFormat={'DD MMM yyyy'}/>) : ("-")} </span>
                )
            }
        },
        {
            Header: 'incident-header-service-report',
            id: 'serviceReportDownload',
            disableSortBy: true,
            Cell: (props) => {
                if (props.row.original.statusDetail == 'Closed') {
                    return <span className='instrument-support-request-data-section'><p className='instrument-support-request-mobile-header'><b>{`${props.column.Header}: `}</b></p><span className="a-chips incidents-pdf-chip">PDF</span><a style={{textTransform: 'lowercase'}}href='#' onClick={() => { window.showLoading(); fireDownloadEvent({ ticketId: props.row.original.ticketId, incidentNumber: props.row.original.incidentNumber }) }}><Translate text={'service-report-lower'} /></a></span>
                } else {
                    return <span className='instrument-support-request-data-section'><p className='instrument-support-request-mobile-header'><b>{`${props.column.Header}: `}</b></p><span className='instrument-support-request-data-section'><p>-</p></span></span>
                }
            }
        }

    ]


export const LabIncidentsTable = () => {


    const { labIncidents } = useSharedLabIncidentsData()
    const { ticketDetails } = useSharedInstrumentData()
    const { gotLabIncidents, labIncidentsError, noLabIncidentsResults, labIncidentsIsLoading, labIncidentsErrorCode, downloadError, setDownloadError } = useSharedLabIncidentsFlags()
    const { gotTicketDetails, setGotTicketDetails, commentMessage, setCommentMessage, setIsCommentError, commentIsLoading, setCommentIsLoading, commentErrorCode, setCommentErrorCode, gotOpertingHours, gotOpertingLoading, gotIncidentBtnIsvisble, gotProductAvailable } = useSharedInstrumentFlags()
    const { doTicketDetailsSearch, downloadFsrReport, doSubmitionTimeData } = instrumentDetailsService()
    const { addComment } = commentService()
    const [editingComment, setEditingComment] = useState(false)
    const [comment, setComment] = useState('')
    const [ticketNumber, setTicketNumber] = useState('')
    const [productName, setProductName] = useState('')
    const [ticketIsClosed, setTicketIsClosed] = useState(false)
    const [statusDetaileClosed, setStatusDetaileClosed] = useState(false)
    const { t, i18n } = useTranslation();
    const [ isCanViewIncidentReports, setCanViewIncidentReports] = useState(true);
    const options = useMemo(() => countryList().getData(), []);

    // **************** Event Listeners/ Modal Functions *****************

    // The handlowDownloadRequested function  and its corresponding useEffect callopens the modal and actually calls the fsr download service.
    const handleDownloadRequested = (e) => {
        downloadFsrReport(e.detail.ticketId, e.detail.incidentNumber)
    }
    useEffect(() => {
        document.addEventListener('downloadRequested', handleDownloadRequested);
        return () => document.removeEventListener('downloadRequested', handleDownloadRequested);
    }, []);

    // The handleModalOpened function and its corresponding useEffect call receive the incident number from the modal click event and send it off to run a doTicketDetailsSearch call, which allows us to receive additional information about the ticket & associated comments
    const handleModalOpened = (e) => {
        doTicketDetailsSearch(e.detail.incident)
        setTicketNumber(e.detail.incident)
        setProductName(e.detail.product)
        setCanViewIncidentReports(e.detail.canViewReport)
        
        var countryName = JSON.parse(localStorage.getItem('custportalSelectedLabProfile'));
        var countryCode = options.filter(lang => lang.label === countryName.billingCountry);
        
        var data = {
            "action": "getOperatingHours",
            "productIds": [e.detail.productGroup],
            "countryCode": countryCode[0].value
        }
        if(e.detail.statusDetail == 'Closed') {
            setStatusDetaileClosed(true);
        }

        if(e.detail.statusDetail != 'Closed') {
            doSubmitionTimeData(data, e.detail.informatics);
        }

        
        e.detail.statusDetail == 'Closed' ? setTicketIsClosed(true) : setTicketIsClosed(false)
    }

    useEffect(() => {
        document.addEventListener('modalOpened', handleModalOpened);
        return () => document.removeEventListener('modalOpened', handleModalOpened);
    }, []);

    // closeModal closes out our ticket details modal
    const closeModal = (e) => {
        setEditingComment(false)
        document.getElementById('instrument-incident-modal').classList.remove("show-modal")
        document.querySelector("body").style.overflow = "auto";
        setComment('')
        setTicketNumber('')
        setProductName('')
        setCommentErrorCode(null)
        setGotTicketDetails(false)
        setIsCommentError(false)
        setCommentMessage(false)
        setEditingComment(false)
    }

    const showDownloadErrorModal = () => {
        document.getElementById('download-error-modal').classList.add(`show-modal`)
        document.querySelector('.a-container').style.zIndex = "auto";
        document.querySelector("body").style.overflow = "auto";
    }

    const closeDownloadErrorModal = () => {
        document.getElementById('download-error-modal').classList.remove("show-modal")
        setDownloadError(false)
    }

    useEffect(() => {
        if (downloadError) {
            showDownloadErrorModal()
        }
    }, [downloadError]);

    // ****************** Comment-handling Functions *************


    const writingComment = () => {
        setEditingComment(true)
    }

    const commentChange = (e) => {
        e.preventDefault()
        setComment(e.target.value)
    }


    const submitComment = (e) => {
        e.preventDefault()
        document.getElementById('instrument-incident-modal').classList.add('comment-message-modal')
        setCommentIsLoading(true)
        addComment(ticketNumber, comment)
        setEditingComment(false)
        setCommentMessage(true)
    }

    // ******************** Initializing React-Table *********************

    // Here we provide react-table with our ticket data and column configuration
    const data = labIncidents
    const columns = useMemo(() => renderColumns, [])

    // The below are modules to incorporate from react-table. We're using global search, sorting, and pagination
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        page,
        visibleColumns,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        pageSize,
        setPageSize,
        preGlobalFilteredRows,
        setGlobalFilter,
        pageIndex

    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 }
        },

        useGlobalFilter,
        useSortBy,
        usePagination)


    // We only display the react-table results if our tickets shared state has become populated with tickets 
    if (gotLabIncidents && !labIncidentsError) {
        if (labIncidents) {
            if (gotTicketDetails) {
                if (ticketDetails) {
                    return (
                        <div>
                            <Modal onModalDismissCallback={closeModal} id="instrument-incident-modal">
                                {!commentMessage ?
                                    !commentIsLoading ?
                                        <div>
                                            <div className='incident-modal-section'>
                                                <div id='incident-modal-header'>
                                                    <h4>{t('incident-modal-header')}{ticketNumber}</h4>
                                                </div>
                                                <div className='incident-modal-table-section'>
                                                    <div className='incident-modal-table'>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td className='incident-modal-table-header'><p><b>{t('product')}: </b></p></td>
                                                                    <td className='incident-modal-table-data'><p>{productName}</p></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className='incident-modal-table-header'><p><b>{t('subject-short-description')}: </b></p></td>
                                                                    <td className='incident-modal-table-data'>{gotTicketDetails && ticketDetails ? <p>{ticketDetails.incidentTicket.shortDescription}</p> : <LoadingIndicator />}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className='incident-modal-table-header'><p><b>{t('description')}: </b></p></td>
                                                                    <td className='incident-modal-table-data'>{gotTicketDetails && ticketDetails ? <p>{ticketDetails.incidentTicket.fullDescription}</p> : <div></div>}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='incident-modal-section'>
                                                <div className='incident-modal-header'>
                                                    <h4>{t('incident-history')}</h4>
                                                </div>
                                                <div id='incident-modal-table-section-comments' className='incident-modal-table-section'>
                                                    <div id='incident-modal-table-comments'>
                                                        {gotTicketDetails && ticketDetails.history ?
                                                            <table>
                                                                <tbody>
                                                                {ticketDetails.history.map((comment, index) => {
                                                                        var getBrowserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                                                                        var timeConvertion = comment.dateTime.replace(" ", "T")+'.000Z';
                                                                        var localBrowserTime = new Date(timeConvertion).toLocaleTimeString(
                                                                            [],
                                                                            { getBrowserTimeZone }
                                                                          );
                                                                        var browserTime = new Date(timeConvertion).toLocaleDateString("en-US", {timeZone: getBrowserTimeZone});
                                                                        return (
                                                                            <tr>
                                                                                <td className='incident-modal-comment-header'>
                                                                                    <p className='incident-modal-comment-timestamp'><b>{browserTime}</b></p>
                                                                                    <p className='incident-modal-comment-timestamp'><b>{localBrowserTime}</b></p>
                                                                                    <p className='incident-modal-comment-timestamp'><b>{comment.userName}</b></p>
                                                                                </td>
                                                                                <td className='incident-modal-comment-text incident-modal-table-data'>
                                                                                    <p>{comment.comment}</p></td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                            :
                                                            <div></div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='incident-modal-section'>

                                                {editingComment ?

                                                    <div className='incident-modal-editing-comment-section'>

                                                        <TicketModalInputField className='incident-modal-comment-input' maxLength={6000} onInput={commentChange} placeholder={t('comment-character-limit')} />

                                                        <div className='incident-modal-button-section'>
                                                            <div className='incident-modal-buttons'>
                                                                <Button
                                                                    onClick={submitComment}
                                                                    buttonClasses='instrument-details-card-primary-button'
                                                                    buttonSize='md'
                                                                    text={t('submit')}
                                                                />
                                                                <Button
                                                                    onClick={closeModal}
                                                                    buttonClasses='incident-modal-comment-secondary-button'
                                                                    buttonSize='md'
                                                                    text={t('cancel')}
                                                                    buttonStyle='secondary'
                                                                />

                                                            </div>

                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='incident-modal-add-comment-button'>
                                                        
                                                        {(() => {
                                                            if(!statusDetaileClosed){
                                                                if(!gotProductAvailable) {
                                                                    return (<></>);
                                                                } else if(gotIncidentBtnIsvisble) {
                                                                    return (
                                                                    <>
                                                                        {gotOpertingHours ? (
                                                                        <>
                                                                            <Button
                                                                                onClick={writingComment}
                                                                                buttonClasses='instrument-details-button instrument-details-button-section instrument-details-card-primary-button'
                                                                                buttonSize='md'
                                                                                text={t('add-comment')}
                                                                            />
                                                                        </>
                                                                        ) : (
                                                                        <>
                                                                            <p className='incident-comment-blod'>{t("incident-addcomment-report-message")}</p>
                                                                        </>
                                                                        )}
                                                                    </>
                                                                    );
                                                                } else {
                                                                    return (
                                                                    <>
                                                                    </>
                                                                    );
                                                                }
                                                            } else { 
                                                                return (<></>)
                                                            }
                                                        })()}
                                                    </div>
                                                }

                                            </div>
                                            {gotOpertingLoading ? (
                                                <div>
                                                    <LoadingIndicator />
                                                </div>
                                            ): ""}
                                            
                                        </div>
                                        :
                                        <div>
                                            <LoadingIndicator />
                                        </div>

                                    :
                                    <div>
                                        {
                                            commentErrorCode ?
                                                commentErrorCode == 200 ?
                                                    <h4>{t('incident-comment-success')}</h4>
                                                    :
                                                    <h4>{t('incident-comment-failure')}</h4>
                                                :
                                                <LoadingIndicator />
                                        }
                                        <Button
                                            onClick={closeModal}
                                            buttonSize='sm'
                                            text={t('close-modal')}
                                            buttonStyle='primary'
                                        />
                                    </div>
                                }
                            </Modal>

                            <Modal onModalDismissCallback={closeDownloadErrorModal} id='download-error-modal'>
                                <h4>{t(`generic-service-error`)}</h4>
                                <p>{t('fsr-download-error')}</p>
                                <Button
                                    onClick={closeDownloadErrorModal}
                                    buttonClasses='instrument-details-card-primary-button'
                                    buttonSize='md'
                                    text={t('modal-close')}
                                />
                            </Modal>

                            <table className='instrument-support-request-search results-table' {...getTableProps()}>
                                <thead>
                                    <GlobalFilter
                                        preGlobalFilteredRows={preGlobalFilteredRows}
                                        globalFilter={state.globalFilter}
                                        setGlobalFilter={setGlobalFilter}
                                        placeholderText={t('incident-search-bar')}
                                    />
                                    {// Loop over the header rows
                                        headerGroups.map(headerGroup => (
                                            // Apply the header row props
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {// Loop over the headers in each row
                                                    headerGroup.headers.map(column => (
                                                        // Apply the header cell props
                                                        <th className={column.disableSortBy ? 'support-request-header-static' : 'support-request-header-sortable'} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                            {// Render the header

                                                                t(column.render('Header'))}
                                                            <span>
                                                                {column.disableSortBy == false ? (column.isSorted ? (column.isSortedDesc ? '🡻' : '🡹') : '↕') : ''}
                                                            </span>
                                                        </th>
                                                    ))}
                                            </tr>
                                        ))}
                                </thead>
                                {/* Apply the table body props */}
                                <tbody {...getTableBodyProps()}>
                                    {// Loop over the table rows
                                        page.map((row, i) => {
                                            // Prepare the row for display
                                            prepareRow(row)
                                            return (
                                                // Apply the row props
                                                <tr {...row.getRowProps()}>
                                                    {// Loop over the rows cells
                                                        row.cells.map(cell => {
                                                            // Apply the cell props
                                                            return (
                                                                <td className='instrument-font-family instrument-support-request-result' {...cell.getCellProps()}>
                                                                    {cell.render('Cell')}
                                                                </td>
                                                            )
                                                        })}
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                            <RTPagination
                                pageCount={pageCount}
                                canPreviousPage={canPreviousPage}
                                previousPage={previousPage}
                                state={state}
                                canNextPage={canNextPage}
                                nextPage={nextPage}
                                gotoPage={gotoPage}
                            />
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <Modal onModalDismissCallback={closeModal} id="instrument-incident-modal">
                                {!commentMessage ?
                                    !commentIsLoading ?
                                        <div>
                                            <div className='incident-modal-section'>
                                                <div id='incident-modal-header'>
                                                    <h4>{t('incident-modal-header')}{ticketNumber}</h4>
                                                </div>
                                                <div className='incident-modal-table-section'>
                                                    <div className='incident-modal-table'>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td className='incident-modal-table-header'><p><b>{t('product')}: </b></p></td>
                                                                    <td className='incident-modal-table-data'><p>{productName}</p></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className='incident-modal-table-header'><p><b>{t('subject-short-description')}: </b></p></td>
                                                                    <td className='incident-modal-table-data'>{gotTicketDetails && ticketDetails ? <p>{ticketDetails.incidentTicket.shortDescription}</p> : <LoadingIndicator />}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className='incident-modal-table-header'><p><b>{t('description')}: </b></p></td>
                                                                    <td className='incident-modal-table-data'>{gotTicketDetails && ticketDetails ? <p>{ticketDetails.incidentTicket.fullDescription}</p> : <div></div>}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='incident-modal-section'>
                                                <div className='incident-modal-header'>
                                                    <h4>{t('incident-history')}</h4>
                                                </div>
                                                <div id='incident-modal-table-section-comments' className='incident-modal-table-section'>
                                                    <div id='incident-modal-table-comments'>
                                                        {gotTicketDetails && ticketDetails.history ?
                                                            <table>
                                                                <tbody>
                                                                {ticketDetails.history.map((comment, index) => {
                                                                        var getBrowserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                                                                        var timeConvertion = comment.dateTime.replace(" ", "T")+'.000Z';
                                                                        var localBrowserTime = new Date(timeConvertion).toLocaleTimeString(
                                                                            [],
                                                                            { getBrowserTimeZone }
                                                                          );
                                                                          var browserTime = new Date(timeConvertion).toLocaleDateString("en-US", {timeZone: getBrowserTimeZone});
                                                                        return (
                                                                            <tr>
                                                                                <td className='incident-modal-comment-header'>
                                                                                    <p className='incident-modal-comment-timestamp'><b>{browserTime}</b></p>
                                                                                    <p className='incident-modal-comment-timestamp'><b>{localBrowserTime}</b></p>
                                                                                    <p className='incident-modal-comment-timestamp'><b>{comment.userName}</b></p>
                                                                                </td>
                                                                                <td className='incident-modal-comment-text incident-modal-table-data'>
                                                                                    <p>{comment.comment}</p></td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                            :
                                                            <div></div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='incident-modal-section'>

                                                {editingComment ?

                                                    <div className='incident-modal-editing-comment-section'>

                                                        <TicketModalInputField className='incident-modal-comment-input' maxLength={6000} onInput={commentChange} placeholder={t('comment-character-limit')} />

                                                        <div className='incident-modal-button-section'>
                                                            <div className='incident-modal-buttons'>
                                                                <Button
                                                                    onClick={submitComment}
                                                                    buttonClasses='instrument-details-card-primary-button'
                                                                    buttonSize='md'
                                                                    text={t('submit')}
                                                                />
                                                                <Button
                                                                    onClick={closeModal}
                                                                    buttonClasses='incident-modal-comment-secondary-button'
                                                                    buttonSize='md'
                                                                    text={t('cancel')}
                                                                    buttonStyle='secondary'
                                                                />

                                                            </div>

                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='incident-modal-add-comment-button'>
                                                        {(() => {
                                                            if(!statusDetaileClosed){
                                                                if(!gotProductAvailable) {
                                                                    return (<></>);
                                                                } else if(gotIncidentBtnIsvisble) {
                                                                    return (
                                                                    <>
                                                                        {gotOpertingHours ? (
                                                                        <>
                                                                            <Button
                                                                                onClick={writingComment}
                                                                                buttonClasses='instrument-details-button instrument-details-button-section instrument-details-card-primary-button'
                                                                                buttonSize='md'
                                                                                text={t('add-comment')}
                                                                            />
                                                                        </>
                                                                        ) : (
                                                                        <>
                                                                            <p className='incident-comment-blod'>{t("incident-addcomment-report-message")}</p>
                                                                        </>
                                                                        )}
                                                                    </>
                                                                    );
                                                                } else {
                                                                    return (
                                                                    <>
                                                                    </>
                                                                    );
                                                                }
                                                            } else { 
                                                                return (<></>)
                                                            }
                                                        })()}
                                                    </div>
                                                }

                                            </div>
                                            {gotOpertingLoading ? (
                                                <div>
                                                    <LoadingIndicator />
                                                </div>
                                            ): ""}
                                        </div>
                                        :
                                        <div>
                                            <LoadingIndicator />
                                        </div>

                                    :
                                    <div>
                                        {
                                            commentErrorCode ?
                                                commentErrorCode == 200 ?
                                                    <h4>{t('incident-comment-success')}</h4>
                                                    :
                                                    <h4>{t('incident-comment-failure')}</h4>
                                                :
                                                <LoadingIndicator />
                                        }
                                        <Button
                                            onClick={closeModal}
                                            buttonSize='sm'
                                            text={t('close-modal')}
                                            buttonStyle='primary'
                                        />
                                    </div>
                                }
                            </Modal>
                            <Modal onModalDismissCallback={closeDownloadErrorModal} id='download-error-modal'>
                                <h4>{t(`generic-service-error`)}</h4>
                                <p>{t('fsr-download-error')}</p>
                                <Button
                                    onClick={closeDownloadErrorModal}
                                    buttonClasses='instrument-details-card-primary-button'
                                    buttonSize='md'
                                    text={t('modal-close')}
                                />
                            </Modal>
                            <table className='instrument-support-request-search custom-search-results' {...getTableProps()}>
                                <thead>
                                    <GlobalFilter
                                        preGlobalFilteredRows={preGlobalFilteredRows}
                                        globalFilter={state.globalFilter}
                                        setGlobalFilter={setGlobalFilter}
                                        placeholderText={t('incident-search-bar')}
                                    />
                                    {// Loop over the header rows
                                        headerGroups.map(headerGroup => (
                                            // Apply the header row props
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {// Loop over the headers in each row
                                                    headerGroup.headers.map(column => (
                                                        // Apply the header cell props
                                                        <th className={column.disableSortBy ? 'support-request-header-static' : 'support-request-header-sortable'} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                            {// Render the header
                                                                t(column.render('Header'))}
                                                            <span>
                                                                {column.disableSortBy == false ? (column.isSorted ? (column.isSortedDesc ? '🡻' : '🡹') : '↕') : ''}
                                                            </span>
                                                        </th>
                                                    ))}
                                            </tr>
                                        ))}
                                </thead>
                                {/* Apply the table body props */}
                                <tbody {...getTableBodyProps()}>
                                    {// Loop over the table rows
                                        page.map((row, i) => {
                                            // Prepare the row for display
                                            prepareRow(row)
                                            return (
                                                // Apply the row props
                                                <tr {...row.getRowProps()}>
                                                    {// Loop over the rows cells
                                                        row.cells.map(cell => {
                                                            // Apply the cell props
                                                            return (
                                                                <td className='instrument-font-family instrument-support-request-result' {...cell.getCellProps()}>
                                                                    {cell.render('Cell')}
                                                                </td>
                                                            )
                                                        })}
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                            <div className='support-request-pagination'>
                                <RTPagination
                                    pageCount={pageCount}
                                    canPreviousPage={canPreviousPage}
                                    previousPage={previousPage}
                                    state={state}
                                    canNextPage={canNextPage}
                                    nextPage={nextPage}
                                    gotoPage={gotoPage}
                                />
                            </div>
                        </div>
                    )
                }
            } else {
                return (
                    <div>
                        <Modal onModalDismissCallback={closeModal} id="instrument-incident-modal">
                            {!commentMessage ?
                                !commentIsLoading ?
                                    <div>
                                        <div className='incident-modal-section'>
                                            <div id='incident-modal-header'>
                                                <h4>{t('incident-modal-header')}{ticketNumber}</h4>
                                            </div>
                                            <div className='incident-modal-table-section'>
                                                <div className='incident-modal-table'>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td className='incident-modal-table-header'><p><b>{t('product')}: </b></p></td>
                                                                <td className='incident-modal-table-data'><p>{productName}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td className='incident-modal-table-header'><p><b>{t('subject-short-description')}: </b></p></td>
                                                                <td className='incident-modal-table-data'>{gotTicketDetails && ticketDetails ? <p>{ticketDetails.incidentTicket.shortDescription}</p> : <LoadingIndicator />}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='incident-modal-table-header'><p><b>{t('description')}: </b></p></td>
                                                                <td className='incident-modal-table-data'>{gotTicketDetails && ticketDetails ? <p>{ticketDetails.incidentTicket.fullDescription}</p> : <div></div>}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='incident-modal-section'>
                                            <div className='incident-modal-header'>
                                                <h4>{t('incident-history')}</h4>
                                            </div>
                                            <div id='incident-modal-table-section-comments' className='incident-modal-table-section'>
                                                <div id='incident-modal-table-comments'>
                                                    {gotTicketDetails && ticketDetails.history ?
                                                        <table>
                                                            <tbody>
                                                            {ticketDetails.history.map((comment, index) => {
                                                                        var getBrowserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                                                                        var timeConvertion = comment.dateTime.replace(" ", "T")+'.000Z';
                                                                        var localBrowserTime = new Date(timeConvertion).toLocaleTimeString(
                                                                            [],
                                                                            { getBrowserTimeZone }
                                                                          );
                                                                          var browserTime = new Date(timeConvertion).toLocaleDateString("en-US", {timeZone: getBrowserTimeZone});
                                                                        return (
                                                                            <tr>
                                                                                <td className='incident-modal-comment-header'>
                                                                                    <p className='incident-modal-comment-timestamp'><b>{browserTime}</b></p>
                                                                                    <p className='incident-modal-comment-timestamp'><b>{localBrowserTime}</b></p>
                                                                                    <p className='incident-modal-comment-timestamp'><b>{comment.userName}</b></p>
                                                                                </td>
                                                                                <td className='incident-modal-comment-text incident-modal-table-data'>
                                                                                    <p>{comment.comment}</p></td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                            </tbody>
                                                        </table>
                                                        :
                                                        <div></div>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    :
                                    <div>
                                        <LoadingIndicator />
                                    </div>

                                :
                                <div>
                                    {
                                        commentErrorCode ?
                                            commentErrorCode == 200 ?
                                                <h4>{t('incident-comment-success')}</h4>
                                                :
                                                <h4>{t('incident-comment-failure')}</h4>
                                            :
                                            <LoadingIndicator />
                                    }
                                    <Button
                                        onClick={closeModal}
                                        buttonSize='sm'
                                        text={t('close-modal')}
                                        buttonStyle='primary'
                                    />
                                </div>
                            }
                        </Modal>
                        <Modal onModalDismissCallback={closeDownloadErrorModal} id='download-error-modal'>
                            <h4>{t(`generic-service-error`)}</h4>
                            <p>{t('fsr-download-error')}</p>
                            <Button
                                onClick={closeDownloadErrorModal}
                                buttonClasses='instrument-details-card-primary-button'
                                buttonSize='md'
                                text={t('modal-close')}
                            />
                        </Modal>
                        <table className='instrument-support-request-search custom-search-results' {...getTableProps()}>
                            <thead>
                                <GlobalFilter
                                    preGlobalFilteredRows={preGlobalFilteredRows}
                                    globalFilter={state.globalFilter}
                                    setGlobalFilter={setGlobalFilter}
                                    placeholderText={t('incident-search-bar')}
                                />
                                {// Loop over the header rows
                                    headerGroups.map(headerGroup => (
                                        // Apply the header row props
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {// Loop over the headers in each row
                                                headerGroup.headers.map(column => (
                                                    // Apply the header cell props
                                                    <th className={column.disableSortBy ? 'support-request-header-static' : 'support-request-header-sortable'} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                        {// Render the header
                                                            t(column.render('Header'))}
                                                        <span>
                                                            {column.disableSortBy == false ? (column.isSorted ? (column.isSortedDesc ? '🡻' : '🡹') : '↕') : ''}
                                                        </span>
                                                    </th>
                                                ))}
                                        </tr>
                                    ))}
                            </thead>
                            {/* Apply the table body props */}
                            <tbody {...getTableBodyProps()}>
                                {// Loop over the table rows
                                    page.map((row, i) => {
                                        // Prepare the row for display
                                        prepareRow(row)
                                        return (
                                            // Apply the row props
                                            <tr {...row.getRowProps()}>
                                                {// Loop over the rows cells
                                                    row.cells.map(cell => {
                                                        // Apply the cell props
                                                        return (
                                                            <td className='instrument-font-family instrument-support-request-result' {...cell.getCellProps()}>
                                                                {cell.render('Cell')}
                                                            </td>
                                                        )
                                                    })}
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                        <div className='support-request-pagination'>
                            <RTPagination
                                pageCount={pageCount}
                                canPreviousPage={canPreviousPage}
                                previousPage={previousPage}
                                state={state}
                                canNextPage={canNextPage}
                                nextPage={nextPage}
                                gotoPage={gotoPage}
                            />
                        </div>
                    </div>
                )
            }
        }

    } else if (labIncidentsError && !noLabIncidentsResults) {
        if (labIncidentsErrorCode) {
            if (labIncidentsErrorCode == 400) {
                return (
                    <p style={{ padding: '0 2% 0 2%' }}>{t('no-incidents-time-period')}</p>
                )
            } else {
                return (
                    <p style={{ padding: '0 2% 0 2%' }}>{t('generic-service-error')}</p>
                )
            }
        } else {
            return (
                <p style={{ padding: '0 2% 0 2%' }}>{t('incident-error-refresh')}</p>
            )
        }
    } else if (noLabIncidentsResults) {
        return (
            <div>
                <p>{t('no-incidents-time-period')}</p>
            </div>
        )
    } else {
        return (
            <div className={`custom-search-results ${labIncidentsIsLoading ? 'loading' : ''}`}>
                {labIncidentsIsLoading && (
                    <div className="custom-search-results-instruments__loading-mask">
                        <LoadingIndicator />
                    </div>
                )}

            </div>
        )
    }
}