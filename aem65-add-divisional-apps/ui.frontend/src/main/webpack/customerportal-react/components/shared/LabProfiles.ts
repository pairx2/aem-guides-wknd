import React, {useState, useCallback, useMemo} from 'react';
import {useBetween} from 'use-between';

const labProfiles = () => {
    const [labProfiles, setLabProfiles] = useState({
        labProfiles: []
    });
    const [userProfile, setUserProfileState] = useState({});
    const [selectedLabProfile, setSelectedLabProfile] = useState({});
    const [labProfileUsers, setLabProfileUsers] = useState([]);
    const [labProfileError, setLabProfileErrorState] = useState(false);
    const [labProfileErrorMsg, setLabProfileErrorMsgState] = useState(null);
    const [userManagementError, setUserManagementErrorState] = useState(false);
    const [userManagementErrorMsg, setUserManagementErrorMsgState] = useState(null);
    const [profileCountry, setProfileCountryState] = useState(null);

    const setSharedSelectedLabProfile = useCallback((f)=> {
        setSelectedLabProfile(f);
    }, []);

    const setSharedLabProfiles = useCallback( (f) =>{
        setLabProfiles(f);
    },  []);

    const setSharedLabProfileUsers = useCallback((f) => {
        setLabProfileUsers(f);
    }, []);

    const setLabProfileError = useCallback((f) => {
        setLabProfileErrorState(f);
    }, []);

    const setLabProfileErrorMsg = useCallback((f) => {
        setLabProfileErrorMsgState(f);
    }, []);

    const setUserManagementError = useCallback((f) => {
        setUserManagementErrorState(f);
    }, []);

    const setUserManagementErrorMsg = useCallback((f) => {
        setUserManagementErrorMsgState(f);
    }, []);

    const setUserProfile = useCallback((f) => {
        setUserProfileState(f);
    }, []);

    const setProfileCountry = useCallback((f) => {
        setProfileCountryState(f);
    }, []);

    const userRole = useMemo(() => {return localStorage.getItem("role")}, []);

    return {
        labProfiles,
        setSharedLabProfiles,
        setSharedSelectedLabProfile,
        selectedLabProfile,
        labProfileUsers,
        setSharedLabProfileUsers,
        labProfileError,
        setLabProfileError,
        labProfileErrorMsg,
        setLabProfileErrorMsg,
        userManagementError,
        setUserManagementError,
        userManagementErrorMsg,
        setUserManagementErrorMsg,
        userProfile,
        setUserProfile,
        userRole,
        profileCountry,
        setProfileCountry,
    };
}

export const useSharedLabProfiles = () => useBetween(labProfiles);