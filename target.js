/**
 * 
 */

var isMovingRight = false;
var isMovingLeft = false;
var isGoingRight = true;
var shouldRun = false;
var missed = 0;
 
	var position = {
		top: 0,
		left: 550
	};
	
	var positionTarget = {
			top: 0,
			left: 550
	};
	
	var counterFiredBullets = 0;
	
	var positionBullet = [];
	
	var score = {
			numberOfScores: 0
		};
		
	var speed = 5;
	
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
		
		targetMoving();
		bulletsMoving();
		checkHitTarget();
		isGameOver();
		
		document.getElementById("bullets").innerHTML = 100 - counterFiredBullets;
		document.getElementById("score").innerHTML = score.numberOfScores;
		
		if (shouldRun){
			requestAnimationFrame(gameLoop);
		}
	}
	
	document.addEventListener('keydown', function(e) {
		if (e.keyCode == 39) {
			isMovingRight = true;
		}else if (e.keyCode == 37){
			isMovingLeft = true;
		}else if (e.keyCode == 32) {
			fireBullet();			
		}
		console.log(e.keyCode);
	}, false);
	
	document.addEventListener('keyup', function(e) {
		if (e.keyCode == 39) {
			isMovingRight = false;
		}else if (e.keyCode == 37){
			isMovingLeft = false;
		}
	}, false);
	
	function targetMoving() {
		if (positionTarget.left == 0) {
			isGoingRight = true;				
		}else if (positionTarget.left == 550) {
			isGoingRight = false;
		}
		
		if (isGoingRight) {
			positionTarget.left ++;
		}else{
			positionTarget.left --;
		}
				
		document.querySelector('#target').style.left = positionTarget.left + 'px';
//		if (shouldRun){
//			requestAnimationFrame(targetMoving);
//		}		
	}
	
	function bulletsMoving() {
		for (var i = 0; i < counterFiredBullets ; i++){
			
			if (positionBullet[i].top > 0){
				positionBullet[i].top-=2;

				document.getElementsByClassName('bullet')[i].style.top = positionBullet[i].top + 'px';
			}
			else if (positionBullet[i].top == 0) {
				++missed;
				document.getElementsByClassName('bullet')[i].style.visibility = "hidden";
				positionBullet[i].top = -1;
			}
		}					
	}
	
	function checkHitTarget() {
		for (var i = 0; i < counterFiredBullets ; i++){

			if (positionBullet[i].top > 0 &&
				positionBullet[i].top < 50 &&
				positionBullet[i].left > positionTarget.left &&
				positionBullet[i].left < positionTarget.left + 50)
			{
					positionBullet[i].top = 0;
					++score.numberOfScores;
					document.getElementsByClassName('bullet')[i].style.visibility = "hidden";		
			}
		}		
	}
	
	function fireBullet() {
		
		if (counterFiredBullets <= 100) {
			var img = document.createElement("img");   
			img.src="assets/images/bullet.png";
			img.style.width = "3px";
			img.style.height = "12px";
			
			var bulletDiv = document.createElement("div");  
			bulletDiv.className = "bullet";
			
			bulletDiv.appendChild(img);
			
			document.getElementsByClassName('bulletsContainer')[0].appendChild(bulletDiv);
			positionBullet[counterFiredBullets] = { };
			
			positionBullet[counterFiredBullets].top = 300;
			positionBullet[counterFiredBullets].left = position.left + 25;
			document.getElementsByClassName('bullet')[counterFiredBullets].style.left = position.left + 25 + 'px';
			
			counterFiredBullets++;
		}
		
	}
	
	function isGameOver() {
		if (missed > 30) {
			stop();
			window.alert("You loose, try again!");
		} else if(score > 70) {
			stop();
			window.alert("You win!");
		}
	}
	
	document.getElementById("start").addEventListener('click', start);
	
	function start() {
		if (shouldRun) {
			return;
		}
		shouldRun = true;
		
		gameLoop();
	}
	
	document.getElementById("stop").addEventListener('click', stop);
	
	function stop() {
		shouldRun = false;
	}
	
	document.getElementById("restart").addEventListener('click', restart);
	
	function restart() {
		stop();		
		
		positionTarget.top = 0;
		positionTarget.left = 550;	
		
		position.top = 0;
		position.left = 550;
		
		counterFiredBullets = 0;	
		
		positionBullet.length = 0;		
		
		score.numberOfScores = 0;	
		
		setTimeout(start, 2000);
		
		var myNode = document.getElementsByClassName('bulletsContainer')[0];
		var fc = myNode.firstChild;

		while( fc ) {
		    myNode.removeChild( fc );
		    fc = myNode.firstChild;
		}
		
		console.log(positionBullet);
	}

	