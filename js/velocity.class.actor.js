
velocity.class.Actor = function(config) {
	THREE.Mesh.apply(this, arguments);

	this.velocity = new THREE.Vector3();
	this.acceleration = new THREE.Vector3(0, 0, 0);
	//this.acceleration = new THREE.Vector3(0, -150, 0); // gravity

	this.friction = {
		ground: new THREE.Vector3(-10, 0, -10),
		air: new THREE.Vector3(-0.5, 0, -0.5)
	}

	this.canJump = true;

	this.moveDirection = {
		FORWARD: false,
		BACKWARD: false,
		LEFT: false,
		RIGHT: false
	}

};

velocity.class.Actor.prototype = Object.create(THREE.Mesh.prototype);
velocity.class.Actor.prototype.constuctor = velocity.class.Actor;
