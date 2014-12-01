
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

velocity.frameData = 0;
velocity.clock = new THREE.Clock();
velocity.tickrate = 1 / 60;

velocity.eventloop = function() {

	velocity.requestFrame(
		velocity.eventloop
	);

	// update
	velocity.frameData += velocity.clock.getDelta();
	while(velocity.frameData >= velocity.tickrate) {
		velocity.update.notify(velocity.tickrate);
		velocity.frameData -= velocity.tickrate;
	}

	// draw
	velocity.render();
	velocity.scene.simulate();
}

velocity.render = function() {
	velocity.renderer.render(velocity.scene, velocity.camera);
}

velocity.update = new velocity.class.Observable();

velocity.renderer = new THREE.WebGLRenderer({ antialias: true });

velocity.camera = new THREE.PerspectiveCamera(
	45,
	1200 / 600,
	0.1,
	1000
);

velocity.scene = new Physijs.Scene();