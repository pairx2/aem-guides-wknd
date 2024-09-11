import React, {useState, useCallback } from 'react';
import {useBetween} from 'use-between';

const contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const setSharedContacts = useCallback( (f) =>{
        setContacts(f);
    },  []);

    const setSharedIsLoading = useCallback( (f) =>{
        setIsLoading(f);
    },  []);

    const setSharedIsLoaded = useCallback( (f) =>{
        setIsLoaded(f);
    },  []);

    return {
        contacts,
        setSharedContacts,
        isLoading,
        setSharedIsLoading,
        isLoaded,
        setSharedIsLoaded
    };
}

export const useSharedContacts = () => useBetween(contacts);