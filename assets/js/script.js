var KEY_LEFT= 37;
var KEY_RIGHT = 39;
var SPACE_KEY = 32;
var position = {
		top: 853,
		left: 960
	};
var positionTarget = {
		top: 100,
		left: 205
};
var moveLeft = false;
var moveRight = false;
var speed = 20;
var bullets = 99;
var player = document.querySelector('#player');
var target = document.querySelector('#target');
var rocket = document.querySelector('#rocket');
var counter = 0;
var score = 0;
var targetSpeed = 1;
var rocketSpeed = 15;

	document.addEventListener('keydown', function(e) {
		if (e.keyCode == KEY_LEFT) {
			moveLeft = true;
		}

		if (e.keyCode == KEY_RIGHT) {
			moveRight = true;
		}
		
	}, false);

	document.addEventListener('keyup', function(e) {
                if (e.keyCode == KEY_LEFT) {
                      moveLeft = false;
                }
             

                if (e.keyCode == KEY_RIGHT) {
                      moveRight = false;
                }
        }, false);
	
	document.addEventListener('keydown',function(e){
		
		
		if (e.keyCode == SPACE_KEY) {
			if (bullets < 0) {
				return;
			}
			counter ++;
			createRocket(counter);
		
			
			document.querySelector('#ammo').innerHTML = bullets;
			bullets --;		
		}
		
	},false);
	function selectRocket (num) {
		return document.querySelector('#shell'+num);
	}
	function createRocket (counter) {
		var bullet = document.createElement('div');
		var curLeft = position.left + 40.5;
		
		bullet.className = 'rocket';
		bullet.id = 'shell' + counter;
		bullet.style.left = curLeft + 'px';
		bullet.style.top = 835 +'px';
		document.querySelector('.container').appendChild (bullet);
	}
	function moveUp (rocket) {
		rocket.style.top = parseInt(rocket.style.top) - rocketSpeed + 'px';
		
		if (rocket.style.top == '195px' && (parseInt(rocket.style.left) >= positionTarget.left && parseInt(rocket.style.left) <= positionTarget.left + 150)) {
			rocket.style.display = 'none';
			score++;
			document.querySelector('#score').innerHTML = score;
			
		}
		
	
	}
	function onFrame() {
		if (position.left <= 205) {
   			moveLeft = false;
   		}
		if (position.left >= 1616) {
   			moveRight = false;
   		}
		if (moveLeft) {
			position.left -= speed;
		}		
		if (moveRight) {
			position.left += speed;
		}
		if (positionTarget.left >= 1562) {
			moveRightTwo = -1;
		}
		if (positionTarget.left <= 205) {
			moveRightTwo = 1;
		}
		positionTarget.left += targetSpeed * moveRightTwo;
		
		player.style.left = position.left + 'px';
		player.style.top = position.top + 'px';
		target.style.left = positionTarget.left + 'px';
		target.style.top = positionTarget.top + 'px';
		
		for (var int = 1; int <= counter; int++) {
			moveUp(selectRocket(int));
			
		}
		
		requestAnimationFrame(onFrame);
		
	}
	
	requestAnimationFrame(onFrame);