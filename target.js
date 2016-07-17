/**
 * 
 */

var isMovingRight = false;
var isMovingLeft = false;
var point = true;

	var position = {
		top: 0,
		left: 550
	};
	
	var positionTarget = {
			top: 0,
			left: 550
	};
	
	var bullets = {
		numberOfBullets: 100
	};
	
	var score = {
			numberOfScores: 0
		};
		
	var speed = 5;
	
	document.getElementById("bullets").innerHTML = bullets.numberOfBullets;
	document.getElementById("score").innerHTML = score.numberOfScores;
	
	function gameLoop() {
		if (isMovingRight) {
			if (position.left < 550){
				position.left += speed;
			}else {
				position.left = 550;
			}			
		}
		
		if (isMovingLeft) {
			if (position.left > 0){
				position.left -= speed;
			}else {
				position.left = 0;
			}
			
		}
		
		document.querySelector('#tank').style.left = position.left + 'px';
		
		requestAnimationFrame(gameLoop);
	}
	
	requestAnimationFrame(gameLoop);
	
	document.addEventListener('keydown', function(e) {
		if (e.keyCode == 39) {
			isMovingRight = true;
		}
		console.log(e.keyCode);
	}, false);
	
	document.addEventListener('keyup', function(e) {
		if (e.keyCode == 39) {
			isMovingRight = false;
		}
	}, false);
	
	document.addEventListener('keydown', function(e) {
		if (e.keyCode == 37) {
			isMovingLeft = true;
		}
		console.log(e.keyCode);
	}, false);
	
	document.addEventListener('keyup', function(e) {
		if (e.keyCode == 37) {
			isMovingLeft = false;
		}
	}, false);
	
	document.addEventListener('DOMContentLoaded', function targetMove() {
		
		if (positionTarget.left == 0) {
			point = true;
			positionTarget.left ++;				
		}else if (positionTarget.left == 550) {
			point = false;
			positionTarget.left --;
		}else if (point) {
			positionTarget.left ++;
		}else if(!point){
			positionTarget.left --;
		}
				
		document.querySelector('#target').style.left = positionTarget.left + 'px';
		requestAnimationFrame(targetMove);
		
	}, false);
	
	function stop() {
		
	}
	
	function start() {
		
	}

	function restart() {
	
	}
	
document.getElementById("stop").addEventListener('click', stop);
document.getElementById("start").addEventListener('click', start);
document.getElementById("restart").addEventListener('click', restart);
	