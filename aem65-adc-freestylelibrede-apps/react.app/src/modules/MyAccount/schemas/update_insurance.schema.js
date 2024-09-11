import {customer} from './customer_structure_variables';

export const buildUpdateInsuranceSchema = ({payer_institution_name, payer_number, health_insurance_number}) => `
 mutation {
     adcCustomerUpdate (
         input: {
             payer_institution_name: "${payer_institution_name}"
             payer_number: "${payer_number}"
             health_insurance_number: "${health_insurance_number}"
         }) {
         success {
             code
             message
         }
         ${customer}
     }
}`;