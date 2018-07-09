var requestAnimeFrame = (function() {
	return window.requestAnimationFrame 	||
		window.webkitRequestAnimationFrame 	||
		window.mozRequestAnimationFrame		||
		window.oRequestAnimationFrame		||
		window.msRequestAnimationFrame		||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

// canvas element
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

// variable needed for the game
var lastTime;
var bgStage;
var gameTime = 0;

function main() {
	var now = Date.now();
	var dt = (now - lastTime) / 1000.0;

	update(dt);
	render();

	lastTime = now;
	requestAnimeFrame(main);
}

// game initialization
function init() {
	var loadBg = new Image(640, 480);
	loadBg.src = 'img/stage.png';
	bgStage = ctx.drawImage(loadBg, 0, 0);

	document.getElementById('play-again').addEventListener('click', function() {
        reset();
    });

	reset();
	lastTime = Date.now();
	main();
}

resources.load([
	'img/sprite.png',
	'img/stage.png'
]);
resources.onReady(init);

function reset() {
	document.getElementById('game-over').style.display = 'none';
	document.getElementById('game-over-overlay').style.display = 'none';
}

function update(dt) {
	gameTime += dt;
}

function render() {
	ctx.fillStyle = bgStage;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}
