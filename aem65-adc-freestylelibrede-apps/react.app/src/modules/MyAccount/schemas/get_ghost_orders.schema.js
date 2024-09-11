export const buildGetGhostOrdersSchema = () => `
{
  adcGetGhostOrders {
    success {
      code
      message
    }
    ghost_orders {
      id
      hmm_order_id
      rxmc
      status_code
      frontend_status
      donot_display_banner
      status_label
      prescription_start_date
      approval_data
      customer_id
      payer_institution_name
      claim_receipt
      is_completed
      rx_free_order
    }
  }
}
`;