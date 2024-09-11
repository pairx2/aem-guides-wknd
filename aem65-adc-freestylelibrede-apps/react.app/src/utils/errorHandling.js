const sagaErrorMessage = 'Saga Error';
const validationErrorMessage = 'Response Validation Error';
const noResultsErrorMessage = 'No Results Error';

export class SagaError extends Error {
	constructor() {
		super(sagaErrorMessage);
	}
}

export class ValidationError extends Error {
	constructor() {
		super(validationErrorMessage);
	}
}

export class NoResultsError extends Error {
	constructor() {
		super(noResultsErrorMessage);
	}
}