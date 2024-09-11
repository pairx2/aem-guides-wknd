const t = require('babel-types');

module.exports = class PathUtils {
	/**
	 * Return the string name of the given element.
	 * @param {Path<JSXElement>} path
	 * @return {string}
	 */
	static getJSXElementName(path) {
		t.assertJSXElement(path.node);
		const nameRoot = path.node.openingElement.name;
		if (nameRoot.namespace) {
			return nameRoot.namespace.name + ':' + nameRoot.name.name;
		}
		else {
			return nameRoot.name;
		}
	}

	static getJSXAttributeName(attr) {
		t.assertJSXAttribute(attr);
		if (attr.name.namespace) {
			return attr.name.namespace.name + ':' + attr.name.name.name;
		}
		return attr.name.name;
	}

	static getAttribute(path, attributeName) {
		t.assertJSXElement(path.node);
		const attributes = path.node.openingElement.attributes;
		for (let i = 0; i < attributes.length; i++) {
			const attr = attributes[i];
			if (t.isJSXAttribute(attr) && this.getJSXAttributeName(attr) === attributeName) {
				return attr;
			}
		}
	}

	static getAttributeValue(path, attributeName) {
		const attr = PathUtils.getAttribute(path, attributeName);
		return attr && attr.value;
	}

	/**
	 * Given an array of [children of a JSX component], return an expression that represents the same children.
	 * For instance, the contents of a <repeat> might include multiple elements; they must be serialized into a format
	 * suitable as a return value within `collection.map()`. This is typically an array, but in cases where only a single
	 * element or text node is contained, we can just return that one item. When no items exist, returns a null expression.
	 *
	 * @param {Array<Node>} children
	 * @return {Expression}
	 */
	static jsxChildrenToJS(children) {
		if (!children) {
			return t.nullLiteral();
		}

		children = children
			.map(child => t.isJSXExpressionContainer(child) ? child.expression : child)
			.filter(child => !(t.isJSXText(child) && /^\s+$/.test(child.value)))
			.map(child => t.isJSXText(child) ? t.stringLiteral(child.value.trim()) : child);

		return (
			children.length === 0 ? t.nullLiteral()
				: children.length === 1 ? children[0]
				: t.arrayExpression(children)
		);
	}

	/**
	 * If the parent element of the given `path` is a JSX Element, wrap `expression` in a JSXExpressionContainer (braces).
	 * @param {Path} path
	 * @param {Expression} expression
	 * @return {Expression}
	 */
	static maybeWrapJSXExpression(path, expression) {
		return t.isJSXElement(path.parent) ? t.jSXExpressionContainer(expression) : expression;
	}
};