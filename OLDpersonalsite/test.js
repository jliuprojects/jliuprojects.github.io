// var mouse = {x: 0, y: 0};
// var distMouse = {x:0,y:0};
// var prevMouse = {x:0,y:0};
// var mouseDown = false;

// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
// document.addEventListener( 'mousedown', onMouseDown, false);
// document.addEventListener( 'mouseup', onMouseUp, false);
// document.addEventListener( 'keydown', onKeyDown, false);

// function onDocumentMouseMove(e){
// 	mouse.x = (e.clientX / window.innerWidth);
// 	mouse.y = (e.clientY / window.innerHeight);
// }

// function onKeyDown(e){
// 	switch (e.keyCode){
// 		case 37:
// 			camera.position.x += 0.5;
// 			break;
// 		case 38:
// 			camera.position.y -= 0.5;
// 			break;
// 		case 39:
// 			camera.position.x -= 0.5;
// 			break;
// 		case 40:
// 			camera.position.y += 0.5;
// 			break;
// 	}
// }

// function onMouseDown(e){
// 	console.log("down");
// 	mouseDown = true;
// 	prevMouse.x = mouse.x;
// 	prevMouse.y = mouse.y;
// }

// function onMouseUp( ){
// 	console.log("up");
// 	mouseDown = false;
// }

// function dragMove() {
// 	distMouse.x = prevMouse.x - mouse.x;
// 	distMouse.y = prevMouse.y - mouse.y;
// 	camera.rotation.y -= distMouse.x * 2;
// 	camera.rotation.x -= distMouse.y * 2;
// 	prevMouse.x = mouse.x;
// 	prevMouse.y = mouse.y;
// }
// if(mouseDown){
// 	dragMove();
// }