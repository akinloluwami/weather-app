import React, { useState } from "react";
import "./App.css";

const api = {
  key: "60143b0f6b743491bfc4ae2161177145",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
        });
    }
  };

  const getDate = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date}th ${month} ${year} `;
  };
  return (
    <div className={weather.main?.temp > 16 ? 'App warm' : 'App'}>
      <div className="container">
        <div className="search_box">
          <input
            type="text"
            className="search_bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {weather.main ? (
          <div>
            <div className="location_box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{getDate(new Date())}</div>
            </div>

            <div className="weather_box">
              <div className="temp">{Math.round(weather.main.temp)}&deg;C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
