export const buildCustomerAddressDeleteSchema = ({id}) => `
mutation {
    adcCustomerAddressDelete (id: ${id}) {
        success {
            code
            message
        }
    }
}
`;

