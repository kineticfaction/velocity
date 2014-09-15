document.addEventListener('keydown', function(event) {
	switch (event.keyCode) {
		case 38:
		case 87:
			player.moveDirection.FORWARD = true;
			break;
		case 37:
		case 65:
			player.moveDirection.LEFT = true;
			break;
		case 40:
		case 83:
			player.moveDirection.BACKWARD = true;
			break;
		case 39:
		case 68:
			player.moveDirection.RIGHT = true;
			break;
	}
}, false);

document.addEventListener('keyup', function(event) {
	switch (event.keyCode) {
		case 38:
		case 87:
			player.moveDirection.FORWARD = false;
			break;
		case 37:
		case 65:
			player.moveDirection.LEFT = false;
			break;
		case 40:
		case 83:
			player.moveDirection.BACKWARD = false;
			break;
		case 39:
		case 68:
			player.moveDirection.RIGHT = false;
			break;
	}
}, false);

document.addEventListener('mousemove', function(e) {

	var movementX = e.movementX  || e.mozMovementX || e.webkitMovementX || 0;
	var movementY = e.movementY  || e.mozMovementY || e.webkitMovementY || 0;

	player.rotate(movementY, movementX, 0);

}, false);