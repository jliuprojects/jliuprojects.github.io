var MAX_ACCL = 30;
		var MIN_ACCL = 0;
		var curr_accl = 1;
		var curr_pos = 0;
		var curr_speed = 0;
		var accl = {x : 0, y : 0, z : 0};

		window.ondevicemotion = function(e){
			accl.x = event.accelerationIncludingGravity.x;
			accl.y = event.accelerationIncludingGravity.y;
		}

		function render() {
		  curr_speed = Math.min(MAX_ACCL, accl.x);
		  curr_pos += curr_speed;
		  
		  $('#logo').css('transform', 'rotate(' + curr_pos + 'deg)');
		  requestAnimationFrame(render);
		}
		requestAnimationFrame(render);