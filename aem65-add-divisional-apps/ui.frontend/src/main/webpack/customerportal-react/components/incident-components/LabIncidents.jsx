import React, { useEffect } from 'react'

import { LabIncidentsTable } from './LabIncidentsTable';
import { useSharedLabProfiles } from '../shared/LabProfiles'
import { LabIncidentsSearch } from './LabIncidentsSearch'
import {useTranslation} from "react-i18next";

export const LabIncidents = () => {
  const { selectedLabProfile } = useSharedLabProfiles()
  const { t, i18n } = useTranslation();

  return (
    <div>
      <p className='my-instruments-header'>{`${t('incidents')}: ${selectedLabProfile.labName}`}</p>
      <LabIncidentsSearch />
      <LabIncidentsTable />
    </div>
  )


}
