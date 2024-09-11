export const OtpResendRequestSchema = () => `
mutation {
    adcResendOtp {
        success {
            code
            message
        }
    }
}
`;