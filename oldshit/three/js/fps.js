// scene object variables
var renderer, scene, camera, pointLight, spotLight;

// field variables
var fieldWidth = 400, fieldHeight = 200;

// paddle variables
var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;

// ball variables
var ball, paddle1, paddle2;
var ballDirX = 1, ballDirY = 1, ballSpeed = 3;

// game-related variables
var score1 = 0, score2 = 0;
// you can change this to any positive whole number
var maxScore = 7;

// set opponent reflexes (0 - easiest, 1 - hardest)
var difficulty = 0.2;

function setup()
{
	// update the board to reflect the max score for match win
	document.getElementById("winnerBoard").innerHTML = "First to " + maxScore + " wins!";

	// now reset player and opponent scores
	score1 = 0;
	score2 = 0;

	// set up all the 3D objects in the scene	
	createScene();

	// and let's get cracking!
	draw();
}

function createScene() {

	var WIDTH = 800,
	  HEIGHT = 450;

	// set some camera attributes
	var VIEW_ANGLE = 50,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,
	  FAR = 10000;

	var c = document.getElementById("gameCanvas");

	// create a WebGL renderer, camera
	// and a scene
	renderer = new THREE.WebGLRenderer();
	camera = new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR
	);

	scene = new THREE.Scene();

	// add the camera to the scene
	scene.add(camera);

	// // set a default position for the camera
	// // not doing this somehow messes up shadow rendering
	camera.position.z = 320;

	camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

		// start the renderer
	renderer.setSize(
		WIDTH, 
		HEIGHT
	);

	// attach the render-supplied DOM element
	c.appendChild(renderer.domElement);

		// set up the playing surface plane 
	var planeWidth = fieldWidth,
		planeHeight = fieldHeight,
		planeQuality = 10;

			var planeMaterial =
	  new THREE.MeshPhongMaterial({
			ambient: 0x4BD121, 
			color: 0x4BD121, 
			specular: 0x555555, 
			shininess: 30
		});

	  	// create the playing surface plane
	var plane = new THREE.Mesh(
		new THREE.PlaneGeometry(
			planeWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
			planeHeight,
			planeQuality,
			planeQuality
		),
		planeMaterial
	);

	scene.add(plane);
	plane.receiveShadow = true;	

	// // create a point light
	pointLight = new THREE.PointLight(0xF8D898);

	// set its position
	pointLight.position.x = -1000;
	pointLight.position.y = 0;
	pointLight.position.z = 1000;
	pointLight.intensity = 2.9;
	pointLight.distance = 10000;
	// add to the scene
	scene.add(pointLight);


	// add a spot light
	// this is important for casting shadows
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
    scene.add(spotLight);

	// MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
	renderer.shadowMapEnabled = true;		

	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 5;

	camera.rotation.z = deg2rad(90);
	camera.rotation.y = deg2rad(90);

	//controls = new THREE.PointerLockControls(camera);

	scene.add(controls.getObject());

}

function draw() {

	// draw THREE.JS scene
	renderer.render(scene, camera);
	// loop draw function call
	requestAnimationFrame(draw);

}

function deg2rad(deg) {
	return deg * 0.017453278;
}