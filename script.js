const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const topInput = document.getElementById('topText');
const bottomInput = document.getElementById('bottomText');
const newMemeBtn = document.getElementById('newMeme');
const downloadBtn = document.getElementById('download');

let img = new Image();
img.crossOrigin = 'anonymous';

function drawMeme() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  ctx.font = "bold 40px Impact";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.textAlign = "center";

  if (topInput.value) {
    ctx.fillText(topInput.value.toUpperCase(), canvas.width / 2, 50);
    ctx.strokeText(topInput.value.toUpperCase(), canvas.width / 2, 50);
  }
  if (bottomInput.value) {
    ctx.fillText(bottomInput.value.toUpperCase(), canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomInput.value.toUpperCase(), canvas.width / 2, canvas.height - 20);
  }
}

async function loadMeme() {
  const res = await fetch('https://api.imgflip.com/get_memes');
  const data = await res.json();
  const memes = data.data.memes;
  const randomMeme = memes[Math.floor(Math.random() * memes.length)];
  img.src = randomMeme.url;
}

img.onload = drawMeme;
topInput.addEventListener('input', drawMeme);
bottomInput.addEventListener('input', drawMeme);
newMemeBtn.addEventListener('click', loadMeme);

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'meme.png';
  link.href = canvas.toDataURL();
  link.click();
});

loadMeme();
