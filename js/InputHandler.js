export default class InputHandler {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      console.log(e.key);
      if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      } else if (e.key === "Enter" && gameOver) {
        restartGame();
      }
      console.log(e.key, this.keys);
    });

    window.addEventListener("keyup", (e) => {
      console.log(e.key);
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
      console.log(e.key, this.keys);
    });
  }
}
