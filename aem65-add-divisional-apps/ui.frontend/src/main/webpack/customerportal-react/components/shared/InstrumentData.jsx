import React, { useState, useCallback } from 'react';
import { useBetween } from 'use-between';
import { useSharedInstrumentFlags } from './InstrumentFlags'


const labInstruments = () => {

    const [myInstruments, setLabInstruments] = useState([{}])
    const [tickets, setTheTickets] = useState([{}])
    const [servicePlanReport, setServicePlanGSR] = useState([{}])
    const [instrumentMaintenanceReport, setScoreGSR] = useState([{}])
    const [uptimeReport, setMetricGSR] = useState([{}])
    const [ticketDetails, setTheTicketDetails] = useState([{}])
    const [pageCount, setThePageCount] = useState(null)
    const [currentPage, setTheCurrentPage] = useState(0)
    
    
    const { setGotInstruments } = useSharedInstrumentFlags()

    // Individual instruments viewable for a specified lab profile
    const setMyInstruments = useCallback((f) => {
        setLabInstruments(f)
        setGotInstruments(true)
    }, []);

    // Incident Tickets for a specific instrument
    const setTickets = useCallback((f) => {
        setTheTickets(f)
    }, [])

    // Service Plan Report/ Entitlements GSR for a specific instrument
    const setServicePlanReport = useCallback((f) => {
        setServicePlanGSR(f)
    }, [])

    // Instrument Maintenance Report/ Score GSR for a specific instrument
    const setInstrumentMaintenanceReport = useCallback((f) => {
        setScoreGSR(f)
    }, [])

    // Uptime Report/ Metrics GSR for a specific instrument
    const setUptimeReport = useCallback((f) => {
        setMetricGSR(f)
    }, [])

    // Ticket details and comments for a specific ticket
    const setTicketDetails = useCallback((f) => {
        setTheTicketDetails(f)
    }, [])

    // How many pages of instrument results there should be, assuming 12 instruments per page
    const setPageCount = useCallback((f) => {
        setThePageCount(f)
    }, [])

    // The current page of instruments the user is viewing
    const setCurrentPage = useCallback((f) => {
        setTheCurrentPage(f)
    }, [])
    

    return {
        myInstruments,
        setMyInstruments,
        tickets,
        setTickets,
        servicePlanReport,
        setServicePlanReport,
        instrumentMaintenanceReport,
        setInstrumentMaintenanceReport,
        uptimeReport,
        setUptimeReport,
        ticketDetails,
        setTicketDetails,
        pageCount,
        setPageCount,
        currentPage,
        setCurrentPage
    };
}

export const useSharedInstrumentData = () => useBetween(labInstruments);