
import {subDays, format} from 'date-fns';
import {PRESCRIPTION_REMINDER_DATE_TYPE} from '../utils/enums'

export const dateBeforeRequesteddays = (reqDate, noofdays, type, isPrescriptionNotice) => {
    if(type === PRESCRIPTION_REMINDER_DATE_TYPE.DOT){
    const dateToInt = parseInt(reqDate);
    const dateBeforeTwoMonths = subDays(dateToInt, noofdays)
     return format(dateBeforeTwoMonths, 'dd.MM.yyyy')
    }
   if(type === PRESCRIPTION_REMINDER_DATE_TYPE.UNIX){
        const daysToMilliseconds = noofdays * 24 * 60 * 60 * 1000;
        if(isPrescriptionNotice) {
          return (reqDate - daysToMilliseconds + 24 * 60 * 60 * 1000 - 1000);
        }
        return (reqDate - daysToMilliseconds);
    }
 };

 export const checkGhostOrderStatus = (ghostOrder) => {
  return ghostOrder.status_code == 50 || ghostOrder.frontend_status == 50;
}

 export const checkForPrescriptionDisplayCondition = (prescriptionEndDate, reminderWindowStartDays, reminderWindowStopDays, isPrescriptionNotice, prescriptionNoticeStartDate) => {
    if(!prescriptionEndDate) return false;
    const currentDate = new Date().getTime(); //unix date
    const prescriptionReminderStartDate = dateBeforeRequesteddays(prescriptionEndDate, reminderWindowStartDays, PRESCRIPTION_REMINDER_DATE_TYPE.UNIX)
    const prescriptionReminderStopDate = dateBeforeRequesteddays(prescriptionEndDate, reminderWindowStopDays, PRESCRIPTION_REMINDER_DATE_TYPE.UNIX)
    const prescriptionNoticeEndDate = dateBeforeRequesteddays(prescriptionEndDate, reminderWindowStartDays, PRESCRIPTION_REMINDER_DATE_TYPE.UNIX, true)
    if(isPrescriptionNotice && prescriptionNoticeStartDate < currentDate && currentDate <= prescriptionNoticeEndDate){
      return true;
    }
    else if (!isPrescriptionNotice && prescriptionReminderStartDate < currentDate  && currentDate < prescriptionReminderStopDate){
      return true;
    }else{
      return false;
    }
  };

  export const checkOrderActiveStatus = (serviceData) => {
    if(serviceData?.serviceStatus === "Active" && serviceData.serviceToDate) {
      return serviceData;
    }
  }

  export const checkPrescriptionNoticeDisplayCondition = (prescriptionNoticeStartDate, prescriptionNoticeEndDate) =>{
    const currentDate = new Date().getTime();
    return (prescriptionNoticeStartDate <= currentDate && currentDate <= prescriptionNoticeEndDate) ? true : false;
  }