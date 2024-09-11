import React, { useEffect } from 'react';

export const onMiniCartOpen = (callback) => {
    useDocumentEvent("abtCartOpen", callback);
}

export const onShowIncompatibleProductMessage = (callback) => {
  useDocumentEvent('showIncompatibleProductMessage', callback);
};

export const useDocumentEvent = (event, callback) => {
    useEffect(() => {
        document.addEventListener(event, callback);
        return () => document.removeEventListener(event, callback);
    }, [event, callback]);
};