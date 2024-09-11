export const OtpConfirmationRequestSchema = otpText => `
mutation {
    adcVerifyOtp (mobile_otp: "${otpText}") {
        success {
            code
            message
        }
    }
}
`;