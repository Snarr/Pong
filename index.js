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

let balls = [
  new Ball(400, 400, 10, 1, 1, "red"),
]

// let ball = new Ball(30, 200, 10, 1, 2, "red");

let player1 = new Paddle(50, 350, 10, 100, 3, keys.w, keys.s, "black");
let player2 = new Paddle(740, 350, 10, 100, 3, keys.up, keys.down, "black");

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

  ctx.fillStyle = 'grey';
  ctx.fillRect((canvas.width/2)-4, 0, 4, canvas.height);

  player1.draw(ctx);
  player2.draw(ctx);
  player1.move(canvas.height);
  player2.move(canvas.height);

  balls.forEach((ball) => {
    ball.draw(ctx);
    ball.move();

    if (ball.x + (ball.radius) >= canvas.width) {
      player1.setScore(player1.score + 1);
      console.log(player1.score)
      updateTitleScore();
      ball.setCollisionCount(0);
      ball.setPosition(canvas.width/2, canvas.height/2);
      ball.bounceHorizontal();
    } else if (ball.x - ball.radius <= 0) {
      player2.setScore(player2.score + 1);
      console.log(player2.score)
      updateTitleScore();
      ball.setCollisionCount(0);
      ball.setPosition(canvas.width/2, canvas.height/2);
      ball.bounceHorizontal();
    }

    if (ball.y + ball.radius >= canvas.height) {
      ball.bounceVertical()
    } else if (ball.y - ball.radius <= 0) {
      ball.bounceVertical()
    }

    detectCollision(player1, ball);
    detectCollision(player2, ball);
  });
}, 1)

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

function keyUp(e) {
  var code = e.keyCode;

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

function detectCollision(paddle, ball) {
  let paddleLeftEdge = paddle.x;
  let paddleRightEdge = paddle.x + paddle.width;
  let paddleTopEdge = paddle.y;
  let paddleBottomEdge = paddle.y + paddle.height;

  let ballLeftEdge = ball.x - ball.radius;
  let ballRightEdge = ball.x + ball.radius;
  let ballTopEdge = ball.y - ball.radius;
  let ballBottomEdge = ball.y + ball.radius;

  let paddleCenterY = paddle.y + (paddle.height/2)

  if (ballLeftEdge <= paddleRightEdge &&
      ballRightEdge >= paddleLeftEdge) {
    if ((ballTopEdge <= paddleBottomEdge && ball.y >= paddleBottomEdge) ||
        (ballBottomEdge >= paddleTopEdge && ball.y <= paddleTopEdge)) {
      ball.bounceHorizontal();
    }
        
  }

  if (ballBottomEdge >= paddleTopEdge &&
    ballTopEdge <= paddleBottomEdge) {
      if ((ballLeftEdge <= paddleRightEdge && ballRightEdge >= paddleRightEdge) ||
          (ballRightEdge >= paddleLeftEdge && ballLeftEdge <= paddleLeftEdge)) {
        ball.bounceHorizontal();
        ball.setCollisionCount(ball.getCollisionCount() + 1);
        ball.setAngle(Math.abs(paddleCenterY-ball.y)/50)
      }
  }

  return
}

function updateTitleScore() {
  document.title = `Pong | ${player1.score} : ${player2.score}`
}