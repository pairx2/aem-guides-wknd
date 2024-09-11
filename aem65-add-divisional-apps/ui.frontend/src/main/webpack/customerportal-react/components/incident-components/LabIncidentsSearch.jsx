import React, { useEffect, useState } from 'react'

import { useSharedLabProfiles } from '../shared/LabProfiles'
import { labIncidentsService } from '../services/LabIncidentsService'
import { Button } from '@abbott/add-platform'
import { useSharedLabIncidentsFlags } from '../shared/LabIncidentsFlags'
import { Litepicker } from 'litepicker'
import {useTranslation} from "react-i18next";

export const LabIncidentsSearch = () => {
  const { selectedLabProfile } = useSharedLabProfiles()
  const { setLabIncidentsIsLoading, setGotLabIncidents } = useSharedLabIncidentsFlags()
  const { getLabIncidents } = labIncidentsService()
  const [startError, setStartError] = useState(false)
  const [endError, setEndError] = useState(false)
  const [rangeError, setRangeError] = useState(false)
  const [startPicker, setStartPicker] = useState()
  const [endPicker, setEndPicker] = useState()
  const { t, i18n } = useTranslation();

  // The yearsAgo variable represents the date two years prior to today. It is the oldest date for which the user is allowed to view incidents
  let yearsAgo = new Date();
  let pastDate = yearsAgo.getDate() - 736;
  yearsAgo.setDate(pastDate);

  // The getTwoYears grabs the year-only version of two years ago today. It's used to populate the litepicker's year dropdown. getThisYear does the same for the current year.

  let getTwoYears = new Date()
  let twoYears = getTwoYears.getFullYear() - 2

  let getThisYear = new Date()
  let thisYear = getThisYear.getFullYear()

  // The variable daysAgo represents the date 90 days prior to today. It's used for the default date range.
  let daysAgo = new Date()
  let priorDate = daysAgo.getDate() - 90
  daysAgo.setDate(priorDate)

  // The variable today grab's today's date
  let today = new Date();

  // This useEffect initializes the lite pickers by clearing out the old dates and regenerating with the default 90 day range. And it kicks off the initial lab incident search.
  useEffect(() => {
    if (selectedLabProfile.labName) {
      if (startPicker && endPicker) {
        initLitePicker()
      }
      getLabIncidents(selectedLabProfile.labProfileId, daysAgo, today)
      setGotLabIncidents(false)
    }
  }, [selectedLabProfile])

  // The searchLabIncidents function performs some front-end validation (in addiiton to that performed by the litepickers themselves) before calling the actual ticket service.
  const searchLabIncidents = () => {
    setGotLabIncidents(false)
    let startDate = document.getElementById('lab-incident-start-date').value
    let endDate = document.getElementById('lab-incident-end-date').value
    let startCompare = new Date(startDate)
    let endCompare = new Date(endDate)

    if (startCompare - endCompare > 0 || yearsAgo - startCompare > 0) {
      setRangeError(true)
      setGotLabIncidents(false)
    } else if (startCompare - today > 0) {
      setStartError(true)
    } else if (endCompare - today > 0) {
      setEndError(true)
    } else if (startDate == '' || endDate == '') {
      setRangeError(true)
      setGotLabIncidents(false)
    } else {
      setRangeError(false)
      setStartError(false)
      setEndError(false)
      setLabIncidentsIsLoading(true)
      getLabIncidents(selectedLabProfile.labProfileId, startDate, endDate)
    }
  }

  const initLitePicker = () => {
    if (startPicker) {
      startPicker.destroy()
    }

    if (endPicker) {
      endPicker.destroy()
    }

    const newStartPicker = new Litepicker({
      autoRefresh: true,
      autoApply: true,
      dropdowns: {
        minYear: twoYears,
        maxYear: thisYear,
        months: true,
        years: true
      },
      element: document.getElementById('lab-incident-start-date'),
      firstDay: 0,
      lockDays: [['1900-01-01', yearsAgo], [today, '4000-12-31']],
      mobileFriendly: true,
      startDate: daysAgo
    })
    setStartPicker(newStartPicker)

    const newEndPicker = new Litepicker({
      autoRefresh: true,
      autoApply: true,
      dropdowns: {
        minYear: twoYears,
        maxYear: thisYear,
        months: true,
        years: true
      },
      element: document.getElementById('lab-incident-end-date'),
      firstDay: 0,
      lockDays: [['1900-01-01', yearsAgo], [today, '4000-12-31']],
      mobileFriendly: true,
      startDate: today
    })
    setEndPicker(newEndPicker)
  }

  useEffect(() => {
    initLitePicker();
  }, [])

  // **********************

  return (
    <div>
      <div>
        <p>{t('incident-date-picker')}</p>
      </div>

      <div className='lab-incidents-search'>
        <div className="lab-incidents-datepicker datepicker {{knobkey.datepicker-width}}">
          <div className="a-date-picker a-date-picker--single" data-type="single"
            data-date-format="YYYY-MM-DD" data-disable-date="{{knobkey.datepicker-hide-dates}}">
            <div className="a-date-picker__input-start">
              <div className="a-input-field" data-required="true">
                <div className="form-group a-form-grp">
                  <label htmlFor="select date" className="form-label a-input-label">{t('select-date')}<span className="a-input-field--required">*</span>
                  </label>
                  <div className="input-group a-input-grp right-icon">
                    <input id='lab-incident-start-date' className="form-control a-input-control" aria-label="Start Date" type="text"
                      placeholder="YYYY-MM-DD" name="input name" autoComplete="off"></input>
                    <div className="icon icon-right default-icon">
                      <i className="abt-icon-calendar lab-incident-calendar-icon" aria-hidden="true">
                      </i>
                    </div>
                    <div className="icon icon-right focused-icon">
                      <i className="abt-icon-calendar-focus lab-incident-calendar-icon" aria-hidden="true">
                      </i>
                    </div>
                  </div>
                  <div className="a-date-picker__input-hidden" aria-hidden="true">
                    <input type="text" className="hidden-start-date" autoComplete="off"></input>
                  </div>

                  <div className="a-date-picker--error">
                    <div className="a-date-picker--error-format">{t('format-error')}</div>
                    <div className="a-date-picker--error-date">{t('date-error')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p id='lab-incidents-dash'> - </p>
        </div>
        <div className="lab-incidents-datepicker datepicker {{knobkey.datepicker-width}}">
          <div className="a-date-picker a-date-picker--single" data-type="single"
            data-date-format="YYYY-MM-DD" data-disable-date="{{knobkey.datepicker-hide-dates}}">
            <div className="a-date-picker__input-start">
              <div className="a-input-field" data-required="true">
                <div className="form-group a-form-grp">
                  <label htmlFor="select date" className="form-label a-input-label">{t('select-date')}<span className="a-input-field--required">*</span>
                  </label>
                  <div className="input-group a-input-grp right-icon">
                    <input id='lab-incident-end-date' className="form-control a-input-control" aria-label="End Date" type="text"
                      placeholder="YYYY-MM-DD" name="input name" autoComplete="off"></input>
                    <div className="icon icon-right default-icon">
                      <i className="abt-icon-calendar lab-incident-calendar-icon" aria-hidden="true">
                      </i>
                    </div>
                    <div className="icon icon-right focused-icon">
                      <i className="abt-icon-calendar-focus lab-incident-calendar-icon" aria-hidden="true">
                      </i>
                    </div>
                  </div>
                  <div className="a-date-picker__input-hidden" aria-hidden="true">
                    <input type="text" className="hidden-start-date" autoComplete="off"></input>
                  </div>

                  <div className="a-date-picker--error">
                    <div className="a-date-picker--error-format">{t('format-error')}</div>
                    <div className="a-date-picker--error-date">{t('date-error')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button buttonClasses='instrument-details-button' id='lab-incidents-submit-button' text={t('view-incidents')} buttonStyle='primary' onClick={searchLabIncidents} />
      </div>
      <div>
        {startError || endError ? <p className='lab-incidents-error-display'>{t('invalid-date')}</p> : <p></p>}
      </div>
      <div>
        {rangeError ? <p className='lab-incidents-error-display'>{t('invalid-date-range')}</p> : <p></p>}
      </div>

    </div>
  )


}