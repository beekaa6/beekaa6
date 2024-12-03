const fs = require("fs");
const fetch = require("node-fetch");

// Fetch repositories
async function fetchRepositories() {
  const response = await fetch("https://api.github.com/users/beekaa6/repos");
  const repos = await response.json();

  return repos.map((repo, index) => ({
    name: repo.name,
    x: Math.random() * 800,
    y: Math.random() * 400,
  }));
}

async function generateSVG() {
  const stars = await fetchRepositories();

  let svgContent = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="800" height="400">
    <rect width="800" height="400" fill="#0d1117" />
    <text x="50%" y="10%" text-anchor="middle" font-family="Arial" font-size="24" fill="#ffffff">
      Stargazer Constellation
    </text>
  `;

  stars.forEach((star) => {
    svgContent += `
      <circle cx="${star.x}" cy="${star.y}" r="5" fill="yellow">
        <animate attributeName="r" from="4" to="6" dur="1.5s" repeatCount="indefinite" />
      </circle>
    `;
  });

  svgContent += `</svg>`;

  fs.writeFileSync("stargazer.svg", svgContent);
}

generateSVG();
