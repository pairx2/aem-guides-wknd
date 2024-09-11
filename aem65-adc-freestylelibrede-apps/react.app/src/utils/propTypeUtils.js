const propValidation = (props, propName, componentName, type)  => props[propName] && typeof props[propName] !== type ? new Error(`Prop '${propName}' should be of type ${type} in '${componentName}'. Validation failed.`) : null;

export const CustomPropTypes = {
	conflictsWith: (conflictingPropName, type) => {
		return (props, propName, componentName) => {
			return props[propName] && props[conflictingPropName] ?
				new Error(`Prop '${propName}' is not allowed in combination with prop '${conflictingPropName}' in '${componentName}'. Validation failed.`) : propValidation(props, propName, componentName, type);
		};
	}
};
