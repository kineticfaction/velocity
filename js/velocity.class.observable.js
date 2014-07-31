
velocity.class.Observable = function (config) {}
velocity.class.Observable.prototype.observers = [];
velocity.class.Observable.prototype.subscribe = function(observer) {
	this.observers.push(observer);
};
velocity.class.Observable.prototype.unsubscribe = function(observer) {
	var index = this.observers.indexOf(observer);
	if (~index) {
		this.observers.splice(index, 1);
	}
};
velocity.class.Observable.prototype.notify = function(message) {
	for (var i = this.observers.length - 1; i >= 0; i--) {
		this.observers[i](message);
	}
};