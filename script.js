const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");
const gif = new GIF({ workers: 2, quality: 10, width: 400, height: 300 });

document.getElementById("gifForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const showName = document.getElementById("showName").value;
  const guestName = document.getElementById("guestName").value;
  const date = document.getElementById("date").value;

  gif.frames = [];

  for (let i = 0; i < 8; i++) {
    drawFrame(showName, guestName, date, i);
    gif.addFrame(ctx, { copy: true, delay: 200 });
  }

  gif.on("finished", (blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.getElementById("downloadLink");
    link.href = url;
    link.style.display = "inline";
  });

  gif.render();
});

function drawFrame(showName, guestName, date, frameIndex) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText(`🎤 ${showName}`, 20, 50);
  ctx.fillText(`🎟️ ${guestName}`, 20, 90);
  ctx.fillText(`📅 ${date}`, 20, 130);

  // 애니메이션용 도형
  ctx.fillStyle = `hsl(${frameIndex * 45}, 100%, 50%)`;
  ctx.beginPath();
  ctx.arc(300, 200, 20 + (frameIndex % 3) * 3, 0, Math.PI * 2);
  ctx.fill();

  // QR코드 (게스트 정보 기반)
  const qrText = `${guestName}-${date}-${showName}`;
  const qrCanvas = document.createElement("canvas");
  new QRCode(qrCanvas, { text: qrText, width: 80, height: 80 });
  ctx.drawImage(qrCanvas, 300, 20);
}
