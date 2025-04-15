const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bgImage = new Image();
bgImage.src = "background.png";

let player = { x: 400, width: 64, height: 64 };
let coins = [];
let coinCount = 0;
let coinSpeed = 4;
let stage = 0;

let playerStages = [
  "character_ss1.png",
  "character_ss2.png",
  "character_ss3.png"
];
let playerImg = new Image();
playerImg.src = playerStages[0];

let coinImg = new Image();
coinImg.src = "coin_clean.png";

canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  player.x = e.clientX - rect.left - player.width / 2;
});

function spawnCoin() {
  coins.push({ x: Math.random() * (canvas.width - 32), y: -32, size: 32 });
}

function update() {
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  if (coinCount >= 20) stage = 2;
  else if (coinCount >= 10) stage = 1;
  playerImg.src = playerStages[stage];

  ctx.drawImage(playerImg, player.x, canvas.height - player.height - 10, player.width, player.height);

  for (let coin of coins) {
    coin.y += coinSpeed;
    ctx.drawImage(coinImg, coin.x, coin.y, coin.size, coin.size);
  }

  coins = coins.filter(coin => {
    if (
      coin.y + coin.size >= canvas.height - player.height - 10 &&
      coin.x > player.x &&
      coin.x < player.x + player.width
    ) {
      coinCount++;
      coinSpeed = 4 + coinCount * 0.2;
      return false;
    }
    return coin.y < canvas.height;
  });

  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("Coins: " + coinCount, 10, 30);

  requestAnimationFrame(update);
}

setInterval(spawnCoin, 1000);
bgImage.onload = () => {
  update();
};