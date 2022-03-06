const API_KEY = `a515a1942b304b8ebd4231129222302`;

// empty error
const emptyErr = () => {
  document.getElementById("empty-error").style.display = "block";
  document.getElementById("current-data").style.display = "none";
  document.getElementById("location-error").style.display = "none";
};
// location error
const locationError = () => {
  document.getElementById("location-error").style.display = "block";
  document.getElementById("empty-error").style.display = "none";
  document.getElementById("current-data").style.display = "none";
};
// hide error
const hideErr = () => {
  document.getElementById("current-data").style.display = "block";
  document.getElementById("empty-error").style.display = "none";
  document.getElementById("location-error").style.display = "none";
};

// search temperature by city
const searchTemparature = () => {
  const cityName = document.getElementById("city-name").value;
  if (cityName.length === 0) {
    emptyErr();
  } else {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=5&aqi=yes&alerts=yes`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayData(data));
    hideErr();
  }
};

//

// city name
const setInnerText = (id, text) => {
  document.getElementById(id).innerText = text;
};

// display data

const displayData = (temparature) => {
  // console.log(temparature);

  try {
    setInnerText("city", temparature.location.name);
    setInnerText("country", temparature.location.country);
    setInnerText("timezone", temparature.location.tz_id);
    setInnerText("localtime", temparature.location.localtime);
    setInnerText("current-temp", temparature.current.temp_c);
    setInnerText("feels-like", temparature.current.feelslike_c);
    setInnerText("last-update", temparature.current.last_updated);
    setInnerText("wind-speed", temparature.current.wind_kph);
    setInnerText("wind-speedmiles", temparature.current.wind_mph);
    setInnerText("wind-dir", temparature.current.wind_dir);
    setInnerText("condition", temparature.current.condition.text);

    //   set weather icon
    const getWeatherIcon = temparature.current.condition.icon;
    const http = "http:";
    const setWeatherIconUrl = http.concat(getWeatherIcon);
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.setAttribute("src", setWeatherIconUrl);
    hideErr();
  } catch (error) {
    setInnerText(
      "city",
      temparature?.location?.name ? temparature.location.name : locationError()
    );
    // console.log(error);
  }
};
