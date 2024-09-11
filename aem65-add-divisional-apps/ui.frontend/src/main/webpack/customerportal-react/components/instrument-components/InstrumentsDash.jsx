import React, { useEffect } from 'react';

import { instrumentService } from '../services/InstrumentService';

import { InstrumentDashResults } from './InstrumentDashResults';
import { useSharedLabProfiles } from '../shared/LabProfiles'

export const InstrumentsDash = () => {
    const { doFullInstrumentSearch } = instrumentService()
    const { selectedLabProfile} = useSharedLabProfiles()
    
 
    React.useEffect(() => {
        if (selectedLabProfile.labName) {
          doFullInstrumentSearch()
        }  
      }, [selectedLabProfile])
  // **********************
    return (
        <div>
            <InstrumentDashResults />
        </div>
    )
}