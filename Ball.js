export class Ball {
  constructor (x, y, r, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  bounceHorizontal() {
    this.speedX = -this.speedX;
  }

  bounceVertical() {
    this.speedY = -this.speedY;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
    return ctx;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}