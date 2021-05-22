export class Ball {
  constructor (x, y, r, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.radius = r;

    this.speedX = speedX;
    this.speedY = speedY;
    this.directionX = -1;
    this.directionY = -1;
    
    this.color = color;

    this.collisions = 0;
    this.angle = 0;

  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getCollisionCount() {
    return this.collisions;
  }

  setCollisionCount(c) {
    this.collisions = c;
  }

  setAngle(angle) {
    this.angle = angle;
  }

  bounceHorizontal() {
    this.directionX = -this.directionX;
    console.log("X collision");
  }

  bounceVertical() {
    this.directionY = -this.directionY;
    console.log("Y collision");
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
    return ctx;
  }

  move() {
    this.x += this.speedX*this.directionX + Math.log(this.collisions+1)*this.directionX;
    this.y += this.speedY*this.directionY * this.angle;
  }
}