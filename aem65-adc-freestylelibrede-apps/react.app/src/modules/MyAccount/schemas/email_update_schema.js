export const buildConfirmEmailChangeSchema = (id, key, confirmDob, setNewPassword) => `
mutation {
    adcConfirmEmailChange (
        customer_id: "${id}"
        confirmation_code: "${key}"
        dob: "${confirmDob}"
        password: "${setNewPassword || ''}"
    ) {
        success {
            code
            message
        }
    }
}
`;