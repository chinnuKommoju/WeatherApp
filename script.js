const inp = document.querySelector('input'); 
const api_key = '4cca31eae40ebc82d167a5e49498369e';
const search = document.querySelector('.search');
const display = document.querySelector('.display');
const img = document.querySelector('#condition-img');
search.addEventListener('click', async () => {
  const city = inp.value.trim();
  if (!city) {
    alert("Enter a City name");
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City Not Found");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City Not Found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

function displayWeather(data) {
  inp.value = ''; 
  display.classList.remove('hidden');

  const condition = data.weather[0].description;
  const humidity = data.main.humidity;
  const windspeed = data.wind.speed;
  const temp = data.main.temp;
  const city = data.name;

  document.getElementById('temp').innerText = `${temp}°C `;
  document.getElementById('city').innerText = city;
  document.getElementById('condition').innerText = condition;
  document.getElementById('humidity').innerText = `${humidity}%`;
  document.getElementById('windspeed').innerText = `${windspeed} m/s`;

  const c = condition.toLowerCase();
  
 
  const weatherImages = {
    clear: './images/clear.png',
    clouds: './images/cloud.png',
    rain: './images/rain.png',
    thunderstorm: './images/thunderstorm.png',
    snow: './images/snow.png',
    mist: './images/mist.png',
    fog: './images/fog.png',
    haze: './images/haze.png',
    dust: './images/dust.png',
    tornado: './images/tornado.png',
    squall: './images/squall.jpg',
    drizzle: './images/drizzle.png'
  };

  for (const key in weatherImages) {
    if (c.includes(key)) {
      img.src = weatherImages[key];
      return;
    }
  }
  img.src = './images/drizzle.png';
}
