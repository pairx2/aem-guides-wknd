if (typeof window !== 'undefined') {
window.setTimeout(function(){
    function addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
    let today = new Date();
    let checkDate,newDate;
    let timeSpan = parseInt(window.document.getElementById('timePeriod').value);
if(window.localStorage.getItem('startDate') === null){
        window.localStorage.setItem('startDate',today);
    }
    if(window.localStorage.getItem('endDate') === null){
        newDate = addDays(today,timeSpan);
        window.localStorage.setItem('endDate',newDate);
    } 
    checkDate = new Date(window.localStorage.getItem('endDate'));
    const userConsentVal = (window.localStorage.getItem('pwaUserConsent') !== null);
    
if(!(window.navigator.onLine)){
    if((today >= checkDate)&&(window.localStorage.getItem('startDate') !== null) && (window.localStorage.getItem('endDate') !== null)){
        if(userConsentVal){
            window.localStorage.removeItem("pwaUserConsent");
            window.localStorage.removeItem('startDate');
            window.localStorage.removeItem('endDate');
            window.location.reload();
        }
    }
}
} , 1000)}