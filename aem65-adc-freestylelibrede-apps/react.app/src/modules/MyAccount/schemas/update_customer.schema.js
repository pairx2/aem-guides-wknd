import {customer} from './customer_structure_variables';

export const buildUpdateCustomerSchema = ({dob, measurement, mobile_phone, temporary_mobile_number, mobile_reminder, landline_phone, firstname, lastname, prefix, data_processing}) => `
    mutation {
        adcCustomerUpdate (
            input: {
                dob: "${dob}"
                measurement: "${measurement}"
                mobile_phone: ${mobile_phone !== null ? JSON.stringify(mobile_phone): null}
                temporary_mobile_number: ${temporary_mobile_number !== null ? JSON.stringify(temporary_mobile_number): null}
                mobile_reminder: ${mobile_reminder ? `${mobile_reminder}` : false}
                landline_phone: ${landline_phone ? JSON.stringify(landline_phone): null}
                firstname: "${firstname}"
                lastname: "${lastname}"
                prefix: "${prefix}"
                data_processing: ${data_processing}
            }) {
            success {
                code
                message
            }
            ${customer}
        }
    }
`;
