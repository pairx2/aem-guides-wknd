import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Field, change} from 'redux-form';
import CreatableSelect from 'react-select/creatable';
import {isRequired} from '../../utils/validationRules';
import {useTranslation} from '../../../../utils/translationUtils';
import I18n from '../../../Translation/components/I18n';
import {empty} from '../../../../utils/default';

const styles =  {
	placeholder: (base) => ({
		...base,
		color: '#d4d4d4',
	}),
	dropdownIndicator: () => ({
		display: 'none'
	}),
	indicatorSeparator: () => ({
		display: 'none'
	}),
	control: (base) => ({
		...base,
		padding: '4px'
	})
};

const ACTION_TYPES = {
	INPUT_CHANGE: 'input-change',
	INIT: 'init'
};

export const TypeaheadRenderField = ({input, label, options, placeholder, isRequired, onInputChange, inputValue, onValueChange, meta: {touched, error, form}}) => {
	const translatedPlaceholder = useTranslation(placeholder);

	const onChangeAction = value => onValueChange(value, input);
	const onInputChangeAction = (value, meta, action, name) => onInputChange(value, meta, form, input.name, action, name);
	if(!touched && input.value) onInputChangeAction(input.value, {action: ACTION_TYPES.INIT}, form, input.name);

	return (<>
		<label className="adc-form-group__label" htmlFor={input.name}>
			<I18n text={label} suffix={isRequired? '*' : undefined}/>
		</label>
		<CreatableSelect
			onChange={onChangeAction}
			onBlur={() => input.onBlur(input.value)}
			options={options}
			placeholder={translatedPlaceholder}
			styles={styles}
			onInputChange={onInputChangeAction}
			formatCreateLabel={(value) => value}
			value={input.value ? {data:input.value, label: input.value} : null}
			inputValue={inputValue || input.value}
			className="adc-form-group__typeahead mt-2"
			tabSelectsValue={false}
			noOptionsMessage={empty.nullFunction}
		/>
		{touched && error && <span className="adc-error adc-form-group--error">{error}</span>}
	</>);
};

TypeaheadRenderField.propTypes = {
	isRequired: PropTypes.bool,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	options: PropTypes.array,
	onInputChange: PropTypes.func,
	inputValue: PropTypes.string,
	onValueChange: PropTypes.func,
};

const mapDispatchToProps = {
	updateForm: change
};

export default connect(null, mapDispatchToProps)(class TypeaheadField extends Component{

	constructor(props) {
		super(props);
		this.getSuggestions = this.getSuggestions.bind(this);
	}

	state = {
		inputValue: ''
	};

	static propTypes = {
		validationRules: PropTypes.array,
		name: PropTypes.string,
		label: PropTypes.string,
		placeholder: PropTypes.string,
		options: PropTypes.array.isRequired,
		getSuggestions: PropTypes.func.isRequired,
		suggestionTreshold: PropTypes.number,
		updateForm: PropTypes.func
	};

	static defaultProps = {
		validationRules: null,
		suggestionTreshold: 3
	};

	onValueChange = (value, input) => {
		input.onChange(value, input.name);
		this.setState({
			inputValue: value.value
		});
	};

	createOption = (label) => ({
		label,
		value: label,
	});

	getSuggestions(value, {action}, form, inputName) {
		const {suggestionTreshold, getSuggestions, updateForm} = this.props;
		if(value.length >= suggestionTreshold) {
			getSuggestions(value);
		}
		if(action === ACTION_TYPES.INPUT_CHANGE || action === ACTION_TYPES.INIT){
			this.setState({
				inputValue: value
			});
			updateForm(form, inputName, value);
		}
	}

	getOptions = () => {
		return this.state.inputValue?.length >= this.props.suggestionTreshold ? this.props.options.map(option => this.createOption(option)) : [];
	};

	normalize = (value) => value ? value.value : value;

	render() {
	  const {name, label, placeholder, validationRules} = this.props;
	  const {inputValue} = this.state;
	  return (
			<div className="adc-form-group mb-2 mt-lg-2">
				<Field
					label={label}
					name={name}
					options={this.getOptions()}
					type="select"
					isRequired={isRequired(validationRules)}
					validate={validationRules}
					placeholder={placeholder}
					component={TypeaheadRenderField}
					onInputChange={this.getSuggestions}
					normalize={this.normalize}
					inputValue={inputValue}
					onValueChange={this.onValueChange}
				/>
			</div>
		);
	}
});
