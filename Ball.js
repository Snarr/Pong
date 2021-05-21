export class Ball {
  constructor (x, y, r, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
    return ctx;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  bounce(width, height) {
    if (this.x + (this.radius) >= width) {
      this.speedX = -this.speedX;
    } else if (this.x - this.radius <= 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.radius >= height) {
      this.speedY = -this.speedY;
    } else if (this.y - this.radius <= 0) {
      this.speedY = -this.speedY;
    }
  }
}