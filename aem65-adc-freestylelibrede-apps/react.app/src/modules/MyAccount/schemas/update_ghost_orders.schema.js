export const buildUpdateGhostOrdersSchema = ({rxmc, status}) => `
mutation {
    adcUpdateGhostOrder(
      rxmc: "${rxmc}"
      donot_display_banner: true  
      status:${status}
    ) {
      success {
        code
        message
      }                
    }
  }
`;