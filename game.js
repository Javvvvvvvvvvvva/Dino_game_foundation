const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 200;

const dino = {
  x: 50,
  y: 150,
  width: 50,
  height: 50,
  speed: 5,
  velY: 0,
  jumping: false
};


const obstacle = {
    x: canvas.width - 100,
    y: 175,
    width: 30, // smaller width
    height: 25, // smaller height
    speed: 5
  };
  
  let score = 0;
  const initialObstacleX = obstacle.x;

  function update() {
    dino.y += dino.velY;
    dino.velY += 1;
  
    if (dino.y > 150) {
      dino.jumping = false;
      dino.y = 150;
      dino.velY = 0;
    }
    
    obstacle.x -= obstacle.speed;

    if (obstacle.x < 0) {
        obstacle.x = canvas.width;
        score += 10; // increase score when obstacle passes left edge of canvas
        document.getElementById("score").textContent = "Score: " + score; // update score display
      }
  
      if (isColliding(dino, obstacle)) {
        alert("Game Over! Your score is " + score);
        obstacle.x = initialObstacleX; // reset obstacle position
        location.reload();
      }
  
    if (score % 100 == 0 && score != 0) {
      obstacle.speed += 0.02;
    }
  }
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = "green";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
  
    ctx.fillStyle = "red";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }

function isColliding(a, b) {
  return !(
    a.x + a.width < b.x ||
    a.x > b.x + b.width ||
    a.y + a.height < b.y ||
    a.y > b.y + b.height
  );
}

document.addEventListener("keydown", event => {
    if (event.code === "Space" && !dino.jumping) {
      dino.jumping = true;
      dino.velY = -dino.speed * 3; // increase velY for higher jump
    }
  });


setInterval(() => {
  update();
  draw();
}, 1000 / 60);
