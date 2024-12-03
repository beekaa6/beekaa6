const messages = [
  "Hi...",
  "Welcome to my GitHub page",
  "I am a Junior Java Web Developer",
  "Today's weather...",
];

const message = document.getElementById("message");

let messageIndex = 0;

function updateMessage() {
  if (messageIndex < messages.length) {
    message.textContent = messages[messageIndex];
    messageIndex++;
  } //else if (messageIndex === messages.length) {
   // messageIndex = 0;
  //} 
  else {
    clearInterval(messageInterval);
  }
}

const messageInterval = setInterval(updateMessage, 2000);

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
    
    messages[3] = `Weather in ${city}, ${country}: ${temperature}°C`;
  } catch (error) {
    messages[3] = "Nice weather u have there...";
  }
}

updateMessage();
findGeo();

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const current = new Date();
const today = weekDays[current.getDay()];

messages[4] = `Today is ${today}. Have a good day ya.`;
