const fs = require("fs");
const path = require("path");

function generateClockSVG(outputPath) {
  const now = new Date();
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();
  const seconds = now.getUTCSeconds();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
      <!-- Background -->
      <rect width="200" height="50" fill="black" rx="10" />
      
      <!-- Hour and Minute Text -->
      <text x="50%" y="35%" fill="white" font-family="Fira Code, Arial" font-size="20" text-anchor="middle" dominant-baseline="middle">
        🕒 ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}
      </text>

      <!-- Animated Seconds Circle -->
      <circle cx="175" cy="25" r="10" fill="white">
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          from="0 175 25" 
          to="360 175 25" 
          dur="60s" 
          repeatCount="indefinite"
        />
      </circle>

      <!-- Seconds Number -->
      <text x="175" y="30" fill="black" font-family="Fira Code, Arial" font-size="12" text-anchor="middle">
        ${seconds.toString().padStart(2, "0")}
      </text>
    </svg>
  `;

  fs.writeFileSync(path.resolve(outputPath), svg);
}

const outputPath = process.argv[2] || "clock.svg";
generateClockSVG(outputPath);
