import {customer_bluedoor} from '../../../../modules/MyAccount/schemas/customer_structure_variables';
export const buildBluedoorCustomerSchema = (rxmc, health_insurance_number) => `
mutation {
    adcBluedoorAuthenticate(rxmc: "${rxmc}", health_insurance_number: "${health_insurance_number}") {
        ${customer_bluedoor}
        success {
            code
            message
        }
    }
}
`;