import Ball from "../js/Ball.js";
import InputHandler from "../js/InputHandler.js";
import { displayStatusText } from "../js/Util.js";
import Background from "../js/Background.js";
import Coin from "../js/Coin.js";
import { Rock } from "../js/Obstacle.js";
import Explosion from "../js/Explosion.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 720;

  const canvasPosition = canvas.getBoundingClientRect();

  const input = new InputHandler();
  const ball = new Ball(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);
  let coins = [];
  const explosion = [];
  let score = 0;
  let gameOver = false;

  let lastTime = 0;
  let coinTimer = 0;
  let coinInterval = 2000;
  let randomInterval = Math.random() * 1000 + 500;

  function handleCoins(deltaTime) {
    if (coinTimer > coinInterval + randomInterval) {
      randomInterval = Math.random() * 1000 + 800;
      let coinStack = 3;
      for (let i = 0; i < coinStack; i++) {
        coins.push(new Coin(canvas.width, canvas.height));
      }
      coinTimer = 0;
    } else {
      coinTimer += deltaTime;
    }

    coins.forEach((coin) => {
      coin.draw(ctx);
      coin.update(deltaTime);
    });

    coins = coins.filter((coin) => !coin.markedforDeletion);
  }

  let obstacles = [];
  let obstacleInterval = 2500;
  let obstacleTimer = 0;

  function handleObstacle(ctx, deltaTime) {
    obstacles = obstacles.filter((object) => !object.markedforDeletion);

    if (obstacleTimer > obstacleInterval + randomInterval) {
      randomInterval = Math.random() * 1000 + 800;
      addNewObstacle();
      obstacleTimer = 0;
    } else {
      obstacleTimer += deltaTime;
    }

    obstacles.forEach((object) => {
      object.draw(ctx);
      object.update(deltaTime);
    });
  }

  function addNewObstacle() {
    obstacles.push(new Rock(canvas.width, canvas.height));
    obstacles.sort(function (a, b) {
      return a.y - b.y;
    });
  }

  window.createExplosion = function (e) {
    explosion.push(new Explosion(e.x, e.y));
  };

  function explode() {
    for (let i = 0; i < explosion.length; i++) {
      explosion[i].update();
      explosion[i].draw(ctx);
      if (explosion[i].frame > 5) {
        explosion.splice(i, 1);
        --i;
      }
    }
  }

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();

    handleCoins(deltaTime);
    handleObstacle(ctx, deltaTime);

    ball.draw(ctx);
    ball.update(input, deltaTime, coins, obstacles);

    explode();

    if (gameStatus()) requestAnimationFrame(animate);
  }

  function gameStatus() {
    let gameStatus = true;

    if (ball.gameOver) {
      gameStatus = false;
      createExplosion();
    } else if (ball.score >= 100) {
      gameStatus = false;
    }

    displayStatusText(ctx, ball.score, ball.gameOver);

    return gameStatus;
  }

  function createExplosion() {
    let positionX = ball.explosionX - canvasPosition.left;
    let positionY = ball.explosionY - canvasPosition.top;
    explosion.push(new Explosion(positionX, positionY));
  }

  animate(0);
});

// function animate(timeStamp) {
//   const deltaTime = timeStamp - lastTime;
//   lastTime = timeStamp;
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   background.draw(ctx);
//   // background.update();
//   player.draw(ctx);
//   player.update(input, deltaTime);
//   handleEnemies(deltaTime);
//   displayStatusText(ctx);
//   if (!gameOver) requestAnimationFrame(animate);
// }

// animate(0);
