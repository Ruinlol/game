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
var bullets = 9;
var player = document.querySelector('#player');
var target = document.querySelector('#target');
var rocket = document.querySelector('#rocket');
var counter = 0;
var score = 0;
var targetSpeed = 5;
var rocketSpeed = 10;
var gameStatus = true;
var shotDone = false;
var cnt = 0;

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
				cnt++;
				if (cnt == 1) {	
					setTimeout(endGame, 5000);
				}
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
		shotDone = false;
	}
	function explodeOnImpact (left) {
		var explosion = document.createElement('div');
		explosion.className = 'rocketBlowing';
		explosion.style.top = '150px';
		explosion.style.left = left;
		document.querySelector('.container').appendChild (explosion);
		setTimeout(function () {
			explosion.style.display = 'none';
		},400)
		
	}
	function moveUp (rocket) {
		rocket.style.top = parseInt(rocket.style.top) - rocketSpeed + 'px';
		
		if (rocket.style.top == '205px' && (parseInt(rocket.style.left) >= positionTarget.left && parseInt(rocket.style.left) <= positionTarget.left + 150)) {
			shotDone = true;
			rocket.style.display = 'none';	
			explodeOnImpact(rocket.style.left);
			score++;
			document.querySelector('#score').innerHTML = score;
		}
		if (parseInt(rocket.style.top) <= 110) {
			rocket.style.display = 'none';
			shotDone = true;
		} 
	}
	function endGame() {
		var over = document.createElement('div');
		over.className = 'endScore';
		document.querySelector('.container').appendChild(over);
			if (score > 5) {
				over.innerHTML = "YOU WON!!!";			
			}
			else {
				over.innerHTML = "BETTER LUCK NEXT TIME";
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
	