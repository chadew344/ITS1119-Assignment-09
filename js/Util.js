export function displayStatusText(context, score, gameOver) {
  context.font = "40px Helvetica";

  context.textAlign = "left";
  context.fillStyle = "Black";
  context.fillText("Score: " + score, 20, 50);

  context.fillStyle = "white";
  context.fillText("Score: " + score, 22, 52);

  if (gameOver) {
    context.textAlign = "center";
    context.fillStyle = "Black";
    context.fillText("GAME OVER, try again!", canvas.width / 2, 200);
    context.fillStyle = "white";
    context.fillText("GAME OVER, try again!", canvas.width / 2 + 2, 202);
  }

  if (score >= 100) {
    context.textAlign = "center";
    context.fillStyle = "Black";
    context.fillText("LEVEL TWO UNLOCKED!", canvas.width / 2, 200);
    context.fillStyle = "white";
    context.fillText("LEVEL TWO UNLOCKED!!", canvas.width / 2 + 2, 202);
  }
}
