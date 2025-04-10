export default class Coin {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 96;
    this.height = 96;
    this.image = coinImage;
    this.x = this.gameWidth - this.width;
    this.y = Math.random() * this.gameHeight * 0.4;
    this.shineAlpha = 1;
    this.shineDirection = -0.03;
    this.speed = 8;
    this.markedforDeletion = false;
  }

  update(deltaTime) {
    this.x -= this.speed;

    this.#coinShine();

    if (this.x < 0 - this.width) {
      this.markedforDeletion = true;
    }
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);

    context.save();
    context.globalAlpha = this.shineAlpha;
    context.filter = "brightness(1.2)";
    context.drawImage(
      this.image,
      this.x - 5,
      this.y - 5,
      this.width + 10,
      this.height + 10
    );
    context.restore();
  }

  #coinShine() {
    this.shineAlpha += this.shineDirection;
    if (this.shineAlpha <= 0.5 || this.shineAlpha >= 1) {
      this.shineDirection *= -1;
    }
  }
}
