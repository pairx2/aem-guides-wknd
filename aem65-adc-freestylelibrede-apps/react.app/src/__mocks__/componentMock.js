import React from 'react';
import {useTranslation} from '../utils/translationUtils';

export const ComponentMock = () => {
	const result = useTranslation('test_key');
	return <div>{result}</div>;
};