export const customer_attributes = `
    id
    user_id
    firstname
    lastname
    email
    dob
    measurement
    mobile_phone
    landline_phone
    disable_mobile_popup
    payer_institution_name
    payer_number
    health_insurance_number
    account_type
    prefix
    cs_first_shipment_shipped
    has_active_reimbursement
    is_mobile_verified
    is_copay_permanent
    last_cec_upload_date
    prescription_reminder_sent
    is_social
    copay_exempted_this_year
    copay_exempted_next_year
    is_cec_upload_allowed
    temporary_mobile_number
    otp_invalid_attempts
    otp_lock_period
    technical_instructions {        
        product_version
        status
        tech_training_reminder_popup
    }
    data_processing
    rx_free
    is_lastorder_carrier_return
    `;
export const addresses = `
    addresses {
        id
        prefix
        firstname
        lastname
        postcode
        country_id
        country_name
        region_code
        region
        city
        street
        telephone
        rss_result_code
        address_label
        default_shipping
        default_billing
        is_blacklisted
        missing_verification
    }
`;
export const customer = `
    customer {
        ${customer_attributes}
        ${addresses}
    }
`;
export const customer_bluedoor = `
    customer {
        firstname
        lastname
        email
        dob
        rxmc
        ghac
        health_insurance_number
        payer_institution_name
        account_type
        prefix
    }
`;