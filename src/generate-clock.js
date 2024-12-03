const fs = require("fs");
const path = require("path");

function generateClockSVG(outputPath) {
  const now = new Date();
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();
  const seconds = now.getUTCSeconds();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
      <rect width="200" height="50" fill="black" />
      <text x="50%" y="50%" fill="white" font-family="Arial" font-size="20" text-anchor="middle" dominant-baseline="middle">
        🕒 ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} UTC
      </text>
    </svg>
  `;

  fs.writeFileSync(path.resolve(outputPath), svg);
}

// Take output path from command-line argument
const outputPath = process.argv[2] || "clock.svg";
generateClockSVG(outputPath);
