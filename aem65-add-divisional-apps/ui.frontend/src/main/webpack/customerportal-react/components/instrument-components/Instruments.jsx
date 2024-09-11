import React, { useEffect } from 'react'

import { instrumentService } from '../services/InstrumentService'
import { InstrumentSearch } from './InstrumentSearch'
import { useSharedLabProfiles } from '../shared/LabProfiles'
import { InstrumentResultsFilter } from './InstrumentResultsFilter'
import { useSharedInstrumentFlags } from '../shared/InstrumentFlags'
import { useSharedInstrumentData } from '../shared/InstrumentData'

// This component serves as our overall instrument wrapper. It's here that we listen for the current lab profile and perform the full instrument search query with that information. Note that at the moment the service does not allow for filtering or sorting parameters. Since all instruments are returned at once, this allows for efficient page changes, filters, and sorts, but if the typical number of instruments per lab profile is large or gets larger it may be worth updating the service to allow for additional parameters.

export const Instruments = () => {
  const { doFullInstrumentSearch } = instrumentService()
  const { selectedLabProfile } = useSharedLabProfiles()
  const { setGotInstruments, setInstType, setInstName, setHasSearchedProdType, setHasSearchedProdName, setPinnedFirst } = useSharedInstrumentFlags();
  const { setCurrentPage } = useSharedInstrumentData()

  const resetTypeEvent = () => {
    const event = new CustomEvent('resetType');
    document.dispatchEvent(event);
  }
  const fireTypeChangeEvent = (type) => {
    const event = new CustomEvent('typeChanged', { detail: type });
    document.dispatchEvent(event);
  }

  useEffect(() => {
    if (selectedLabProfile.labName) {
      resetTypeEvent()
      fireTypeChangeEvent('All')
      setHasSearchedProdType(false)
      setHasSearchedProdName(false)
      setPinnedFirst('default')
      setGotInstruments(false)
      setInstType('All')
      setInstName('All')
      setCurrentPage(0)
      doFullInstrumentSearch()
    }
  }, [selectedLabProfile])
  // **********************

  return (
    <div>
      <InstrumentSearch />
      <InstrumentResultsFilter />
    </div>
  )


}
