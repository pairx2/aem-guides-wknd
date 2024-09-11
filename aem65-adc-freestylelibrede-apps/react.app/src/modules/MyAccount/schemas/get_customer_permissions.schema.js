const communicationChannels = `
  communication_channels {
    subscriber_status
    communication_channel
  }
`;

export const buildGetCustomerPermissionsSchema = () => `
{
  adcCustomerPermissionsList {
    success {
      code
      message
    }
    permissions {
      communication_type
      ${communicationChannels}
    }
  }
}
`;