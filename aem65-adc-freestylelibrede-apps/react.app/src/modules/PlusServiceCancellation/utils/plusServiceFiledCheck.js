
import { formateDateWithDotSeprator } from "../../../utils/dateUtils";
export const structureValue= (keyValue ,fields , fieldsPlusValues ) =>{
   let resultFinal = ""
   if (keyValue === "terminationTime") {
    const valueFormateDate = fieldsPlusValues['terminationTime'] ? formateDateWithDotSeprator(fieldsPlusValues['terminationTime']) : "";
    return valueFormateDate;
}
  fields?.some((item) => {
        if (item.fieldId === keyValue) {
            if (fieldsPlusValues[item.fieldName.split('(')[0].trim()] !== undefined
                && fieldsPlusValues[item.fieldName.split('(')[0].trim()] !== "") {
                if (typeof fieldsPlusValues[item.fieldName.split('(')[0].trim()] === "string") {
                    resultFinal =fieldsPlusValues[item.fieldName.split('(')[0].trim()]
                    return true
                }else{
                    resultFinal =fieldsPlusValues[item.fieldName.split('(')[0].trim()].value
                    return true
                }
            }else{
                resultFinal = "";
                return true
            }
        }
    });
    return resultFinal?.trim();

  
}