const path = require('path')
module.exports = function () {
	this.nuxt.hook('build:before', () => {
		this.addPlugin({
			src: path.resolve(__dirname, 'plugin.js'),
			mode: 'client',
			fileName: 'CodeEditor',
		});
	});
}