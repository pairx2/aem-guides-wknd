import { fetchVerifyEmailExists } from "../common/api";

const parseDateDDMMYYYY = (value = "") => {
    const m = value.match(/^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(\d{4})$/);
    return m ? new Date(m[3], m[1] - 1, m[2]) : null;
}

const validations = {
    required: (value, type = "text") => {
        if(type === "calender"){
            return !String(value).replace(/[_/]/g,"")
        }
        else if (type === "string") {
            return !String(value).trim();
        }
        else if(type==="tel"){

           const _val= String(value).replace(/\D/g, '');
           return !/\S+/.test(_val);
        }
        else if (typeof value === "object") {
           
            if (value.length) {
                return false;
            } else {
                if (value.type === "change" && value.detail) {
                    return !Object.keys(value.detail).length > 0
                }
                return !Object.keys(value).length > 0
            }
        }
        return !value;
    },
    preventHtmlTags: (value) =>{
        return /<(.|\n)*?>/g.test(value);
    },
    stringAlphaNumeric: (value) => {
        return !/^[a-zA-Z0-9]+$/.test(value);
    },
    stringPLASH: (value) => {
        return !/^([a-zA-Z]|[']|[-]|[.]|[\s])+$/.test(value);
    },
    address: (value) => {
        return !/^([a-z0-9]|[-]|[.]|[,\/]|[#]|[\s])+$/i.test(String(value).trim());
    },
    checkMonth: (value="") => {
        const dateString = value.split("/");
        if(dateString.length && dateString[0].includes("_") ){
            return true;
        }
        return false;
    },
    checkDay: (value="") => {
        const dateString = value.split("/");
        if(dateString.length && dateString[1].includes("_") ){
            return true;
        }
        return false;
    },
    checkYear: (value="") => {
        const dateString = value.split("/");
        if(dateString.length && dateString[2].includes("_") ){
            return true;
        }
        return false;
    },
    addressOptional: (value) => {
        if(value){
        return !/^([a-z0-9]|[-]|[.]|[,]|[#]|[\s])+$/i.test(String(value));
        }
        else{
            return false;
        }

     },
    usZipCode: (value) => {
        return !/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/.test(value);
    },
    onlyUpperLower: (value) => {
        return !/^[A-Za-z]+$/.test(value);
    },
    mustContainUpperLower: (value) => {
        return !/((?=.*[A-Z])|(?=.*[a-z])).+$/.test(value);
    },
    passWithMin8: (value) => {
        return !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value);
    },
    lengthCheck: (value, _type, { minAllowedLength = -1, maxAllowedLength = -1 }) => {
        const valLength = String(value).trim().length;
        if (minAllowedLength > -1 && (minAllowedLength > valLength)) return true;
        if (maxAllowedLength > -1 && (maxAllowedLength < valLength)) return true;
        return false;
    },
    noSpace: (value) => {
        return /[ ]/i.test(value);
    },
    min4Chars: (value) => {
        return !/^.{4,}$/.test(value);
    },
    min5Chars: (value) => {
        return !/^.{5,}$/.test(value);
    },
    min6Chars: (value) => {
        return !/^.{6,}$/.test(value);
    },
    min7Chars: (value) => {
        return !/^.{7,}$/.test(value);
    },
    min8Chars: (value) => {
        return !/^.{8,}$/.test(value);
    },
    phoneNumberUS: (value) => {
        const trimmed = String(value).trim();
        const _val= String(value).replace(/\D/g, '');
        if (trimmed.length < 15 && _val!=="") {
            return !/^(\([0-9]{3}\)[ ]+|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(trimmed)
          
        }
        return true;
    },

    email: (value) => {
        return !/^\w+([!#$%&'*+-/=?^_`{|}~;]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
    },
    emailAsync: async (value, type, { url },_values,_disabled) => {
      return !_disabled && await fetchVerifyEmailExists(url, value, type, _values.captchaValue && _values.captchaValue);
     
    },
    memberIDAsync: (value, type, { url }) => {
      
        return fetchVerifyMemberIDExists(url, value, type)
    },
    addressZipCode: (value, type, _other, values) => {
        if(values && !values["zipCode"]){
            return true;
        }
    },
    addressState: (value, type, _other, values) => {
        if(values && !values["state"]){
            return true;
        }
    },
    addressLineOne: (value, type, _other, values) => {
        if(values && !values["lineOne"]){
            return true;
        }
    },

    reconfirmPassword: (value, type, _other, values) => {

        if (values["password"]!== value && values["PASSWORD"]!== value) {

            return true;
              }
    },
    verifyEmail: (value, type, _other, values) => {
    
       if (values["emailAddress"]!== value) {

      return true;
        }
        
    },

    passwordLengthMatch: (value) => {

        if (value.length < 8)
            return true;

    },
    passwordValidate: (value) => {
        return /\s/g.test(value);
    },
    checkDateFormatMMDDYYYY: (value = "") => {
        return parseDateDDMMYYYY(value) === null
    },
    checkBabyBirthday: (value = "") => {

        const date = parseDateDDMMYYYY(value);
        if (date) {

            const curYear = new Date().getFullYear();
            const targYear = date.getFullYear();
            const startYear = curYear - 5;
            const endYear = curYear + 1;
            return !(targYear >= startYear && targYear <= endYear)
        }
        return !parseDateDDMMYYYY(value)
    },
   

        checkFutureDate: (value = "") => {
            const date = parseDateDDMMYYYY(value);
            if (date && window.jsonData.formType && window.jsonData.formType ==='Neosure') {
            let currentDate = new Date();
            if(date.getTime() > currentDate.getTime()){
            return true;
            } 
        }
        return !parseDateDDMMYYYY(value)
    },
    
    checkIsNumeric: (value ="") => {
        return !/^\d*[.]?\d*$/.test(value)
    },
    checkGreater1: (value = "") => {
        if (value < 2){
            return true
        }
    },

    checkNamecount: (value, type, _other, values) =>{
        const nameBabies = values["BabiesName"];
        let numBabies = value;
        var nameArr = nameBabies.split(',');
        let count = nameArr.length;   
       
        if(parseInt(numBabies) !== parseInt(count)){
            return true;
        }
        
    },
    matchNameAndCount: (value, type, _other, values) => {
    
        let numBabies = values["NumberOfBabies"];
        const nameBabies = value;
        var nameArr = nameBabies.split(',');
        let count = nameArr.length;
       
        if(parseInt(numBabies) !== parseInt(count)){
            return true;
        }        
        
    }
    
    

}
export {parseDateDDMMYYYY};
export default validations;
