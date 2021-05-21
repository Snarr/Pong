export class Paddle {
  constructor (x, y, w, h, speedY, upKey, downKey, color) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.speedY = speedY;
    this.direction = 0;
    this.upKey = upKey;
    this.downKey = downKey;
    this.color = color;
  }

  setDirection(d) {
    this.direction = d;
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, 10, 100);
    return ctx;
  }

  move(height) {
    if (this.direction == this.upKey && this.y >= 0) {
      this.y += -this.speedY
    } else if (this.direction == this.downKey && this.y <= height-this.height) {
      this.y += this.speedY
    }
  }
}