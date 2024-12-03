const messages = [
  "👋 Hi...",
  "🌍 Welcome to my GitHub page",
  "💻 Me is Junior Java Developer",
];

async function printMessages() {
  await findGeo();

  let index = 0;
  const textElement = document.getElementById("msg");

  function updateMessage() {
    if (index < messages.length) {
      textElement.textContent = messages[index];
      index++;
      setTimeout(updateMessage, 3000);
    }
  }

  updateMessage();
}

printMessages();

async function findGeo() {
  try {
    const response = await fetch("http://ip-api.com/json/?fields=61439");
    const result = await response.json();
    //console.log(result);

    findWeather(result.lat, result.lon, result.city, result.country);
  } catch (error) {
    console.log("Error");
  }
}

async function findWeather(latitude, longitude, city, country) {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const result = await response.json();

    //console.log(result);
    const temperature = result.current_weather.temperature;
    let tempIcon = "";

    if (temperature < 10) {
      tempIcon = "🥶";
    } else if (temperature >= 10 && temperature <= 25) {
      tempIcon = "🌤️";
    } else {
      tempIcon = "🔥";
    }
    
    messages[3] = `${tempIcon} Weather in ${city}, ${country}: ${temperature}°C`;
  } catch (error) {
    messages[3] = "🌦️ Nice weather u have there...";
  }
}


const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const current = new Date();
const today = weekDays[current.getDay()];

messages[4] = `📅 Today is ${today}. Have a good day ya.`;
