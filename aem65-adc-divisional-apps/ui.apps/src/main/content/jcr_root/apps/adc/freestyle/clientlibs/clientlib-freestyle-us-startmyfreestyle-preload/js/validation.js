function formatDateofBirth(dateString, dateFormat) {
    let dateOfBirth = "";
    let dateArray;
    let inputDate = dateString;
    if (!(inputDate == "" || inputDate == undefined)) {
        if (inputDate.indexOf('/') !== -1) {
            dateArray = inputDate.split('/');
            dateOfBirth = getDateOfBirth(dateArray, dateFormat, dateOfBirth, inputDate);
        } else {
            dateOfBirth = inputDate;
            return dateOfBirth;
        }
    }
    return dateOfBirth;
}

function getDateOfBirth(dateArray, dateFormat, dateOfBirth, inputDate) {
    let day, month, year, rxDatePattern;
    if (dateArray.length > 0) {
        switch (dateFormat) {
            case 'MM/DD/YYYY':
            case 'mm/dd/aaaa':
            case 'MM/DD/AAAA':
                day = dateArray[1];
                month = dateArray[0];
                year = dateArray[2];
                rxDatePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
                break;

            case 'DD/MM/YYYY':
                day = dateArray[0];
                month = dateArray[1];
                year = dateArray[2];
                rxDatePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
                break;

            case 'YYYY/MM/DD':
                day = dateArray[2];
                month = dateArray[1];
                year = dateArray[0];
                rxDatePattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
                break;

            case 'YYYY/DD/MM':
                day = dateArray[1];
                month = dateArray[2];
                year = dateArray[0];
                rxDatePattern = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
        }
        if (inputDate.match(rxDatePattern) != null)
            dateOfBirth = year + "-" + month + "-" + day;
        else
            dateOfBirth = "invalid-pattern";
        return dateOfBirth;
    }

}