export const buildReactivatePlusServiceSchema = ({order_id, order_type, delivery_date, deliverable_id, activate}) => `
mutation {
    adcOrderDeliveryDateUpdate(
        order_id: "${order_id}",
        order_type: "${order_type}",
        delivery_date: ${JSON.stringify(deliverable_id)?.replace(/\"([^()"]+)\":/g,'$1:')},
        date: "${delivery_date}"
        activate: ${activate}) {
        success {
            code
            message
        }
        order {
            increment_id
        }
    } 
}`;