export const buildSubscribeToNewsletter = (email) => `
  mutation {
    adcPermissionUpsert(input: {
    	subscriber_email: "${email}",
    	communication_type: "NEWS",
      communication_channel: "EMAIL",
      is_newsletter_subscription: true
    }) {
        success {
          code
          message
        }
    }
  }
`;