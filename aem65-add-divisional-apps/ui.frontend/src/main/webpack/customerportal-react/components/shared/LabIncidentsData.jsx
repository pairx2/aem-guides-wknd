import React, { useState, useCallback } from 'react';
import { useBetween } from 'use-between';

const labIncidents = () => {

    const [labIncidents, setTheLabIncidents] = useState([{}])
    
    // Incidents for a specified lab profile
    const setLabIncidents = useCallback((f) => {
        setTheLabIncidents(f)
    }, []);


    return {
        labIncidents,
        setLabIncidents
    };
}

export const useSharedLabIncidentsData = () => useBetween(labIncidents);