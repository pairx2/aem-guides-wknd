export const buildPlusServiceCancellationSchema = (firstname,lastname,email,dob,termination,terminationTime,terminationType,terminationReason) => `
mutation {
    adcPlusServiceCancellation (input:{
        firstname: "${firstname}"
        lastname: "${lastname}"
        email: "${email}"
        dob: "${dob}"
        termination: "${termination}"
        terminationTime: "${terminationTime}"
        terminationType: "${terminationType}"
        terminationReason: "${terminationReason}"
    }) {
        success {
            code
            message
        }
    }
}
`;
