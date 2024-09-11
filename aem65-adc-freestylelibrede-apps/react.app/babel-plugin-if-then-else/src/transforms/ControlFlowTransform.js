const t = require('babel-types');
const PathUtils = require('../PathUtils');

module.exports = class ControlFlowTransform {

	static apply(path) {
		switch (PathUtils.getJSXElementName(path)) {
			case 'if':
				this.transformIf(path);
				break;
			case 'elseif':
			case 'else':
				// We handle elseif/else cases within the if/unless blocks. Just remove them here.
				path.remove();
				break;
			default:
				return false;
		}
		return true;
	}

	static transformIf(path) {
		// Find the subsequent `elseif` and/or `if` blocks. If we encounter any other sibling JSXElement, stop searching.
		let elsePath;
		const conditionPaths = [path];
		for (let i = path.key + 1, siblingPath; (siblingPath = path.getSibling(i)) && siblingPath.node; i++) {
			if (siblingPath.node.type === 'JSXElement') {
				const name = PathUtils.getJSXElementName(siblingPath);
				if (name === 'elseif') {
					conditionPaths.push(siblingPath);
				} else if (name === 'else') {
					elsePath = siblingPath;
				} else {
					break;
				}
			}
		}

		// Get the condition expression, and the children contents, for each case.
		const cases = conditionPaths.map((path) => {
			const condition = PathUtils.getAttributeValue(path, 'condition').expression;
			return {
				condition,
				children: PathUtils.jsxChildrenToJS(path.node.children)
			};
		});

		// In reverse order, merge the cases into a JS expression using ternary operators.
		//TODO: Allow OptionalMemberExpressions this?.that (probably have to put this plugin later in the chain)
		const expr = cases.reduceRight((expr, {condition, children}) => {
			return t.conditionalExpression(condition, children, expr);
		}, PathUtils.jsxChildrenToJS(elsePath && elsePath.node.children));

		path.replaceWith(PathUtils.maybeWrapJSXExpression(path, expr));
	}
};
