
function Observable(config) {}
Observable.prototype.observers = [];
Observable.prototype.subscribe = function(observer) {
	this.observers.push(observer);
};
Observable.prototype.unsubscribe = function(observer) {
	var index = this.observers.indexOf(observer);
	if (~index) {
		this.observers.splice(index, 1);
	}
};
Observable.prototype.notify = function(message) {
	for (var i = this.observers.length - 1; i >= 0; i--) {
		this.observers[i](message);
	}
};