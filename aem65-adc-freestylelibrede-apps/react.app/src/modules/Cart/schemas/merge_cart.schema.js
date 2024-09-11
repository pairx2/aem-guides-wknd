export const buildMergeCartSchema = (anonymousCartId) => `
	mutation { 
		adcGetOrCreateCartId(
			merge_cart_id: "${anonymousCartId}"
		) 
	}
`;