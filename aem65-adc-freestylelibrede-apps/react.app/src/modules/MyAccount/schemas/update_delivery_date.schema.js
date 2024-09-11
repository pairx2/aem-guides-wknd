import {getMagentoFormattedDate} from '../../../utils/dateUtils';

export const buildUpdateDeliveryDateSchema = ({order_id, order_type, delivery_date, deliverable_id}) => {
	return `
        mutation {
            adcOrderDeliveryDateUpdate(
                order_id: "${order_id}",
                order_type: "${order_type}",
                delivery_date: ${JSON.stringify(deliverable_id)?.replace(/\"([^()"]+)\":/g,'$1:')},
                date: "${getMagentoFormattedDate(delivery_date)}"
                )
                {
                success {
                    code
                    message
                }
                order {
                    increment_id
                }
            }
        }
    `;
};