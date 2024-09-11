const ControlFlowTransform = require('./transforms/ControlFlowTransform');

module.exports = () => ({
	visitor: {
		Program(path, state) {
			path.traverse(programVisitor(path, state), state);
		}
	}
});


const programVisitor = (path, state) => ({
	JSXElement(path, state) {
		ControlFlowTransform.apply(path, state);
	}
});
