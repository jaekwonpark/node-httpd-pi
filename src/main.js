(function() {
	myGpio = require('../lib/gpio');
	myGpio.gpio('bbb');
	console.log('called gpio');
}).call(this)
