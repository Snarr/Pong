import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";

let keys = {
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  w: 87,
  a: 65,
  s: 83,
  d: 68
}

let pause = false;


let ball = new Ball(30, 200, 10, 1, 2, "red");

let player1 = new Paddle(50, 350, 10, 100, 2, keys.w, keys.s, "black");
let player2 = new Paddle(740, 350, 10, 100, 2, keys.up, keys.down, "black");

let canvas;

setInterval(() => {
  if (pause) {
    return;
  }

  canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 800;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player1.draw(ctx);
  player2.draw(ctx);
  player1.move(canvas.height);
  player2.move(canvas.height);

  ball.draw(ctx);
  ball.move();
  ball.bounce(canvas.width, canvas.height);
}, 1)

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

function keyUp(e) {
  var code = e.keyCode;

  console.log(code);

  switch (code) {
    case player1.upKey:
    case player1.downKey:
      player1.setDirection(0)
    case player2.upKey:
    case player2.downKey:
      player2.setDirection(0)
  }
}

function keyDown(e) {
  var code = e.keyCode;

  console.log(code);

  switch (code) {
    case keys.space:
      pause = !pause;
      break;
    case player1.upKey:
    case player1.downKey:
      player1.setDirection(code)
    case player2.upKey:
    case player2.downKey:
      player2.setDirection(code)
  }
}
