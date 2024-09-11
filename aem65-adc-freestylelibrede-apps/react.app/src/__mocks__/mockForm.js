import {reduxForm} from 'redux-form';
import React from 'react';
import {empty} from '../utils/default';

const MockForm = ({handleSubmit, children}) => {
	const onSubmit = empty.function;
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{children}
			<button type={'submit'}>{'submit'}</button>
		</form>);
};

export default reduxForm({
	form: 'mockForm'
})(MockForm);