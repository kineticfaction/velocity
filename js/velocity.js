
// shim layer with setTimeout fallback
velocity.requestFrame = function(callback){

	if(typeof window.requestAnimationFrame === 'function') {
		window.requestAnimationFrame(callback);
	} else if(typeof window.webkitRequestAnimationFrame === 'function') {
		window.webkitRequestAnimationFrame(callback);
	} else if(typeof window.mozRequestAnimationFrame === 'function') {
		window.mozRequestAnimationFrame(callback);
	} else {
		window.setTimeout(callback, 1000 / 60);
	}

};

velocity.eventloop = function() {
	velocity.requestFrame(
		velocity.eventloop
	);
	velocity.update.notify(0);
	velocity.render();
}

velocity.render = function() {
	velocity.renderer.render(velocity.scene, velocity.camera);
}

velocity.update = new velocity.class.Observable();

velocity.renderer = new THREE.WebGLRenderer();

velocity.camera = new THREE.PerspectiveCamera(
	45,
	800 / 450,
	0.1,
	1000
);

velocity.scene = new THREE.Scene();