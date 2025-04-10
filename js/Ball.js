export default class Ball {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 100;
    this.height = 100;
    this.x = 0;
    this.y = this.gameHeight - this.width;
    this.speed = 0;
    this.vy = 0;
    this.weight = 1;
    this.gameOver = false;
    this.score = 0;
    this.explosionX = 0;
    this.explosionY = 0;
  }

  update(input, deltaTime, coins, obstacles) {
    coins.forEach((coin) => {
      const dx = coin.x + coin.width / 2 - (this.x + this.width / 2);
      const dy = coin.y + coin.height / 2 - (this.y + this.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < coin.width / 2 + this.width / 2) {
        coin.markedforDeletion = true;
        this.score += 5;
      }
    });

    obstacles.forEach((obstacle) => {
      const dx = obstacle.x + obstacle.width / 3 - (this.x + this.width / 3);
      const dy = obstacle.y + obstacle.height / 3 - (this.y + this.height / 3);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < obstacle.width / 3 + this.width / 3) {
        obstacle.markedforDeletion = true;
        this.gameOver = true;

        const explosionX = (this.x + obstacle.x) / 2;
        const explosionY = (this.y + obstacle.y) / 2;

        if (window.createExplosion) {
          window.createExplosion({
            x: explosionX,
            y: explosionY,
          });
        }
      }
    });

    if (input.keys.indexOf("ArrowRight") > -1) {
      this.speed = 5;
    } else if (input.keys.indexOf("ArrowLeft") > -1) {
      this.speed = -5;
    } else if (input.keys.indexOf("ArrowUp") > -1 && this.onGround()) {
      this.vy -= 32;
    } else {
      this.speed = 0;
    }

    this.x += this.speed;
    if (this.x < 0) this.x = 0;
    else if (this.x > this.gameWidth - this.width)
      this.x = this.gameWidth - this.width;

    this.y += this.vy;
    if (!this.onGround()) {
      this.vy += this.weight;
      this.frameY = 1;
      this.maxFrame = 5;
    } else {
      this.vy = 0;
      this.frameY = 0;
      this.maxFrame = 8;
    }
  }

  draw(context) {
    const x = this.x + this.width / 2;
    const y = this.y + this.height / 2;
    const radius = this.width / 2;

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = "gray";
    context.fill();
    context.strokeStyle = "white";
    context.stroke();

    context.fillStyle = "white";
    context.beginPath();
    context.arc(x - radius / 3, y - radius / 4, radius / 6, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(x + radius / 3, y - radius / 4, radius / 6, 0, Math.PI * 2);
    context.fill();
  }

  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}
