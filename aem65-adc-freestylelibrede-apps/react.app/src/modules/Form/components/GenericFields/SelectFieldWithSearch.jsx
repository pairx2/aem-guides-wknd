import React, {Component} from 'react';
import {Field} from 'redux-form';

import I18n from '../../../Translation/components/I18n';
import PropTypes from 'prop-types';
import Select, {components} from 'react-select';

import {i18nLabels, useTranslation} from '../../../../utils/translationUtils';
import {isRequired} from '../../utils/validationRules';
import createFilterOptions from 'react-select-fast-filter-options';
import Icon from '../../../Generic/components/Icon/Icon';

class SelectFieldWithSearchRenderField extends Component {
	static propTypes = {
		options: PropTypes.array,
		placeholder: PropTypes.string,
		showBorder: PropTypes.bool,
		searchIcon: PropTypes.string,
		isDisabled: PropTypes.bool,
		defaultValue: PropTypes.object,
		canAllowChange: PropTypes.bool,
		noOptionsMessage: PropTypes.string
	};

	componentDidUpdate(prevProps) {
		const {input, options,defaultValue,canAllowChange} = this.props;
		if(defaultValue && !canAllowChange) {
			input.onChange(defaultValue, input.name);
		}
		if (JSON.stringify(prevProps.options) !== JSON.stringify(options)) {
			input.onChange('');
		}
	}
	componentDidMount = () => {
		const {input, defaultValue, canAllowChange} = this.props;
		if(defaultValue && !canAllowChange) {
			input.onChange(defaultValue, input.name);
		}
	}

	getStyles = () => {
		const styles = {
			placeholder: (base) => ({
				...base,
				color: '#d4d4d4',
			})
		};
		if(!this.props.showBorder) styles.control = (base) => ({
			...base,
			border: 'none',
			boxShadow: 'none',
		});
		return styles;
	};

	render() {
		const {input, options, meta: {touched, error} ,placeholder, defaultValue, canAllowChange, noOptionsMessage, searchIcon, isDisabled} = this.props;
		const filterOptions = createFilterOptions(options);
		return (
			<div className="adc-form-group mb-3">
				<Select
					components={searchIcon ? {DropdownIndicator} : null}
					onChange={value => input.onChange(value, input.name)}
					filterOptions={filterOptions}
					placeholder={placeholder}
					options={options}
					value={defaultValue || input.value}
					styles={this.getStyles()}
					searchIcon={searchIcon}
					isDisabled={isDisabled}
					canAllowChange={canAllowChange}
					noOptionsMessage={() => noOptionsMessage}
				/>
				{touched && (error && <span className="adc-error adc-form-group--error">{error}</span>)}
			</div>
		);
	}
}

const DropdownIndicator = props => {
	return (
		components.DropdownIndicator && (
			<components.DropdownIndicator {...props}>
				<Icon image={props.selectProps.searchIcon}/>
			</components.DropdownIndicator>
		)
	);
};

const SelectFieldWithSearch = ({options, name, label,defaultValue, canAllowChange, placeholder, showBorder, validationRules, className, onChange, searchIcon, isDisabled}) => {
	const translatedPlaceholder = useTranslation(placeholder);
	const translatedMessage = useTranslation(i18nLabels.NO_OPTIONS);
	return (<>
		{label && <label htmlFor={name} className={className || 'adc-product-details__label-title ml-3'}>
			<I18n text={label} suffix={isRequired(validationRules)? '*' : undefined}/></label>}
		<Field
			name={name}
			props={{options}}
			type="select"
			validate={validationRules}
			placeholder={translatedPlaceholder}
			noOptionsMessage = {translatedMessage}
			showBorder={showBorder}
			component={SelectFieldWithSearchRenderField}
			onChange={onChange}
			defaultValue={defaultValue}
			searchIcon={searchIcon}
			canAllowChange={canAllowChange}
			isDisabled={isDisabled}/>
	</>);
};

SelectFieldWithSearch.propTypes = {
	validationRules: PropTypes.array,
	name: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	showBorder: PropTypes.bool,
	onChange: PropTypes.func,
	options: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.any
	})),
	searchIcon: PropTypes.string,
	isDisabled: PropTypes.bool,
	defaultValue: PropTypes.object,
	canAllowChange:PropTypes.bool
};

SelectFieldWithSearch.defaultProps = {
	showBorder: true,
	isDisabled: false,
	canAllowChange:false
};

export default SelectFieldWithSearch;
