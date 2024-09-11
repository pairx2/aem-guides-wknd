import React, { useState, useCallback } from 'react';
import { useBetween } from 'use-between';
import { useSharedInstrumentFlags } from './InstrumentFlags'


const myTeam = () => {

    const [mySearchedUsers, setSearchedUsers] = useState([{}])
    const [isLoading, setIsLoading] = useState(false)
    

    const setMyteams = useCallback((f)=>{
        setSearchedUsers(f)
    },[])

    const setLoading = useCallback((f)=>{
        setIsLoading(f)
    },[])


    return {
        mySearchedUsers,
        isLoading,
        setIsLoading,
        setMyteams
    };
}

export const useSharedTeamData = () => useBetween(myTeam);