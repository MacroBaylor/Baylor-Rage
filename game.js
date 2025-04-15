const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 400, width: 64, height: 64 };
let coins = [];
let coinCount = 0;
let coinSpeed = 4;
let superSaiyan = false;

let playerImg = new Image();
playerImg.src = "character.png";
let superSaiyanImg = new Image();
superSaiyanImg.src = "character.png"; // Replace with another image if you have a super saiyan version

let coinImg = new Image();
coinImg.src = "coin.png";

canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  player.x = e.clientX - rect.left - player.width / 2;
});

function spawnCoin() {
  coins.push({ x: Math.random() * (canvas.width - 20), y: -20, size: 32 });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw player
  const img = superSaiyan ? superSaiyanImg : playerImg;
  ctx.drawImage(img, player.x, canvas.height - player.height - 10, player.width, player.height);

  // Draw coins
  for (let coin of coins) {
    coin.y += coinSpeed;
    ctx.drawImage(coinImg, coin.x, coin.y, coin.size, coin.size);
  }

  // Coin collision detection
  coins = coins.filter(coin => {
    if (
      coin.y + coin.size >= canvas.height - player.height - 10 &&
      coin.x > player.x &&
      coin.x < player.x + player.width
    ) {
      coinCount++;
      coinSpeed = 4 + coinCount * 0.2;
      if (coinCount >= 10) superSaiyan = true;
      return false;
    }
    return coin.y < canvas.height;
  });

  // Draw coin counter
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("Coins: " + coinCount, 10, 30);

  requestAnimationFrame(update);
}

setInterval(spawnCoin, 1000);
update();
