export const buildUpdateCustomerPermissionsSchema = ({subscriber_email, communication_type, communication_channel}) => `
mutation {
    adcPermissionUpsert(
        input: {
            subscriber_email: "${subscriber_email}",
            communication_type: "${communication_type}",
            communication_channel: ${JSON.stringify(communication_channel)}
        }) {
        success {
            code
            message
        }
        permissions {
            id
            subscriber_email
            subscriber_status
            communication_type
            communication_channel
        }
    }
}`;