module.exports = {
	presets: [
		'@babel/preset-react'
	],
	plugins: [
		"@babel/plugin-proposal-optional-chaining",
		"@babel/plugin-proposal-nullish-coalescing-operator",
		"./babel-plugin-if-then-else"
	]
};