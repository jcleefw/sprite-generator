function defaultTask(cb) {
	// place code for your default task here
	console.log('hello', cb)
	cb()
}

exports.default = defaultTask