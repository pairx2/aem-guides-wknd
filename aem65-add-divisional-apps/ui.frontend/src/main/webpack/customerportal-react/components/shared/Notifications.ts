import React, {useState, useCallback } from 'react';
import {useBetween} from 'use-between';

const notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const setSharedNotifications = useCallback( (f) =>{
        setNotifications(f);
    },  []);

    const setSharedIsLoading = useCallback( (f) =>{
        setIsLoading(f);
    },  []);

    const setSharedIsLoaded = useCallback( (f) =>{
        setIsLoaded(f);
    },  []);

    return {
        notifications,
        setSharedNotifications,
        isLoading,
        setSharedIsLoading,
        isLoaded,
        setSharedIsLoaded
    };
}

export const useSharedNotifications = () => useBetween(notifications);