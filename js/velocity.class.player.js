
velocity.class.Player = function(config) {

	// call parent
	velocity.class.Actor.call(this);

	var playerObject = this;
	
	this.rotation.order = 'YXZ';

	this._aggregateRotation = new THREE.Vector3();

	this.constrainVerticalLook = true;

	this.inverseLook = new THREE.Vector3(-1, -1, -1);

	this.mouseSensitivity = new THREE.Vector3(0.25,0.25,0.25);

	this.SPEED = 200;

	this.add(
		velocity.camera
	);

	this.update = function(delta) {

		var halfAccel = new THREE.Vector3();
		var scaledVelocity = new THREE.Vector3();


		// rotation
		var rotation = playerObject._aggregateRotation
			.multiply(playerObject.inverseLook)
			.multiply(playerObject.mouseSensitivity)
			.multiplyScalar(delta)
			.add(playerObject.rotation);

		if (playerObject.constrainVerticalLook) {
			rotation.x = Math.max(Math.PI * -0.5, Math.min(Math.PI * 0.5, rotation.x));
		}

		playerObject.rotation.set(rotation.x, rotation.y, rotation.z);
		playerObject._aggregateRotation.set(0, 0, 0);


		// movement
		if(playerObject.moveDirection.FORWARD) 	playerObject.velocity.z -= playerObject.SPEED;
		if(playerObject.moveDirection.LEFT) 	playerObject.velocity.x -= playerObject.SPEED;
		if(playerObject.moveDirection.BACKWARD) playerObject.velocity.z += playerObject.SPEED;
		if(playerObject.moveDirection.RIGHT) 	playerObject.velocity.x += playerObject.SPEED;

		halfAccel.copy(playerObject.acceleration).multiplyScalar(delta * 0.5);
		playerObject.velocity.add(halfAccel);

		var squaredManhattanVelocity = playerObject.velocity.x*playerObject.velocity.x + playerObject.velocity.z*playerObject.velocity.z;
		if (squaredManhattanVelocity > playerObject.SPEED*playerObject.SPEED) {
			var scalar = playerObject.SPEED / Math.sqrt(squaredManhattanVelocity);
			playerObject.velocity.x *= scalar;
			playerObject.velocity.z *= scalar;
		}

		scaledVelocity.copy(playerObject.velocity).multiplyScalar(delta);
		playerObject.translateX(scaledVelocity.x);
		playerObject.translateZ(scaledVelocity.z);
		playerObject.position.y += scaledVelocity.y;
		playerObject.velocity.add(halfAccel);


		// Ambient forces
		playerObject.velocity.add(scaledVelocity.multiply(
			playerObject.friction.ground
		));

	}

	this.rotate = function(x,y,z) {
		playerObject._aggregateRotation.x += x;
		playerObject._aggregateRotation.y += y;
		playerObject._aggregateRotation.z += 0;
	}

}

velocity.class.Player.prototype = new velocity.class.Actor();
velocity.class.Player.constructor = velocity.class.Player;
