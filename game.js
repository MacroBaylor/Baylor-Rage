const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 400, width: 80, height: 20 };
let coins = [];
let hiddenImage = new Image();
hiddenImage.src = "hidden-image.jpg";
let revealedTiles = [];
const tileSize = 40;

canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  player.x = e.clientX - rect.left - player.width / 2;
});

function spawnCoin() {
  coins.push({ x: Math.random() * (canvas.width - 20), y: -20, size: 20 });
}

function revealTile() {
  let unrevealed = [];
  for (let y = 0; y < canvas.height; y += tileSize) {
    for (let x = 0; x < canvas.width; x += tileSize) {
      if (!revealedTiles.some(t => t.x === x && t.y === y)) {
        unrevealed.push({ x, y });
      }
    }
  }
  if (unrevealed.length > 0) {
    revealedTiles.push(unrevealed[Math.floor(Math.random() * unrevealed.length)]);
  }
}

function drawRevealedImage() {
  revealedTiles.forEach(tile => {
    ctx.drawImage(hiddenImage, tile.x, tile.y, tileSize, tileSize, tile.x, tile.y, tileSize, tileSize);
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawRevealedImage();

  ctx.fillStyle = "white";
  ctx.fillRect(player.x, canvas.height - player.height - 10, player.width, player.height);

  for (let coin of coins) {
    coin.y += 4;
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
    ctx.fillStyle = "gold";
    ctx.fill();
  }

  coins = coins.filter(coin => {
    if (
      coin.y + coin.size >= canvas.height - player.height - 10 &&
      coin.x > player.x &&
      coin.x < player.x + player.width
    ) {
      revealTile();
      return false;
    }
    return coin.y < canvas.height;
  });

  requestAnimationFrame(update);
}

setInterval(spawnCoin, 1000);
hiddenImage.onload = () => {
  update();
};