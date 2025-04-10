export default class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    this.image = boomImage;
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.sound = explodeSound;
    this.finished = false;
  }

  update() {
    if (this.frame === 0) this.sound.play();
    this.timer++;
    if (this.timer % 10 === 0) {
      this.frame++;
    }
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    context.restore();
  }
}
