import {customer} from './customer_structure_variables';

export const buildGetCustomerSchema = (fieldList) => `
{
    adcCustomerDetails {
        success {
            code
            message
        }
        ${fieldList ? fieldList : customer}
        
    }
}
`;

export const buildUpdateBluedoorCustomerSchema = (id) => `
mutation {
    adcCustomerUpdate(
        input: {
            ghac: "${id}"
        }
    ) {
        customer {
            id
        }
      
    }
}
`;