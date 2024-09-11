/** Adding  date to unsubcribe payload -- starts**/
function updateRequestUnsubscribe(unsubcribedata) {
  let options = {
    timeZone: $('[name="time_zone"]').val(),
    hourCycle: 'h23',//handles daylight saving
    day:'2-digit',
    month:'2-digit',
    year:'numeric',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
    hour12:false
  }
  let currentDate = new Date().toLocaleString('en-US',options).replace(',','');
  unsubcribedata.body['UnSubDate'] = currentDate;
  unsubcribedata.body['CreatedDate'] = currentDate;
  unsubcribedata.body['ModifiedDate'] = currentDate;
  delete unsubcribedata.body['requestType'];
  delete unsubcribedata.body['node'];
  if('enterpriseRecaptcha' in unsubcribedata.body){
    delete unsubcribedata.body['enterpriseRecaptcha'];
  }
  return unsubcribedata;
}
function updateSignupRequest(signupdata) {
  let date_options = {
    timeZone: $('[name="time_zone"]').val(),
    hourCycle: 'h23',//handles daylight saving
    day:'2-digit',
    month:'2-digit',
    year:'numeric',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
    hour12:false
  }
  let currentDate = new Date().toLocaleString('en-US',date_options).replace(',','');
  signupdata.body['Acquisition_Date'] = currentDate;
  signupdata.body['Created_Date'] = currentDate;
  signupdata.body['Updated_Date'] = currentDate;
  delete signupdata.body['requestType'];
  delete signupdata.body['node'];
  if('enterpriseRecaptcha' in signupdata.body){
    delete signupdata.body['enterpriseRecaptcha'];
  }

  return signupdata;

}