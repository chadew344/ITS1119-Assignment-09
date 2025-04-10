class Obstacle {
  constructor() {
    this.markForDeletion = false;
    this.frameX = 0;
    this.maxFrame = 5;
    this.frameInterval = 100;
    this.frameTimer = 0;
  }
  update(deltaTime) {
    this.x -= this.vx * deltaTime;
    if (this.x < 0 - this.width) this.markForDeletion = true;
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.frameTimer = 0;
    } else {
      this.frameTimer + -deltaTime;
    }
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Rock {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 180;
    this.height = 180;
    this.image = rockImage;
    this.x = this.gameWidth;
    this.y = this.gameHeight - this.height;
    this.speed = 8;
    this.markedforDeletion = false;
    this.score = 0;
  }

  update(deltaTime) {
    this.x -= this.speed;

    if (this.x < 0 - this.width) {
      this.markedforDeletion = true;
      this.score++;
    }
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
