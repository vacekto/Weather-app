import React from "react"
import "./Forecast.css"
import "../../node_modules/weather-icons/css/weather-icons.css"
import FutureDay from "./FutureDay.js"


class Forecast extends React.Component {

  state = {
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sut"]
  }

  getWeatherIcon = (id, dayCycle) => {
    switch (true) {
      case id >= 200 && id <= 232:
        return "wi-thunderstorm";
      case id >= 300 && id <= 321:
        return "wi-sleet";
      case id >= 500 && id <= 521:
        return "wi-storm-showers";
      case id >= 600 && id <= 622:
        return "wi-snow";
      case id >= 701 && id <= 781:
        return "wi-fog";
      case id === 800:
        return (dayCycle === "day time") ? ("wi-day-sunny") : ("wi-night-clear");
      case id >= 801 && id <= 804:
        return (dayCycle === "day time") ? ("wi-day-fog") : ("wi-night-fog");
    }
  }

  render() {

    const { city, list } = this.props.forecast;
    const dayCycle = (list[0].weather[0].icon.slice(2, 3) === "d") ? 
                     ("day time") : ("night time");
    const weather = "wi " + this.getWeatherIcon(list[0].weather[0].id, dayCycle);
    const location = "Location: " + city.name + ", " + city.country;
    const temp = list[0].main.temp;
    const description = list[0].weather[0].description;

    const clientUTC = new Date();
    const targetTime = new Date(city.timezone * 1000
                                + clientUTC.getTimezoneOffset()
                                * 60000 + clientUTC.getTime());
    const forecastDays = list.filter(entry => {
      return (entry.dt_txt.slice(8, 10) > targetTime.getDate())  &&
             (entry.dt_txt.slice(11, 13) === "12" ||
              entry.dt_txt.slice(11, 13) === "13" ||
              entry.dt_txt.slice(11, 13) === "14")
    })

    return (
      <div className="forecast">
        <div className="display_current">
          <span className="location"> {location} </span>
          <span className="temperature"> {temp}°</span>
          <div className="description">
            <i className={weather}></i>
            <div>
              <span>{description}</span>
              <span>{dayCycle}</span>
            </div>
          </div>
        </div>
        <div className="display_future">
          <FutureDay weatherIcon={"wi " + this.getWeatherIcon(forecastDays[0].weather[0].id, "day time")}
                      temp={forecastDays[0].main.temp}
                      day={this.state.days[(clientUTC.getDay() + 1) % 7]}
                      />
          <FutureDay weatherIcon={"wi " + this.getWeatherIcon(forecastDays[1].weather[0].id, "day time")}
                      temp={forecastDays[1].main.temp}
                      day={this.state.days[(clientUTC.getDay() + 2) % 7]}
                      />
          <FutureDay weatherIcon={"wi " + this.getWeatherIcon(forecastDays[2].weather[0].id, "day time")}
                      temp={forecastDays[2].main.temp}
                      day={this.state.days[(clientUTC.getDay() + 3) % 7]}
                      />
          <FutureDay weatherIcon={"wi " + this.getWeatherIcon(forecastDays[3].weather[0].id, "day time")}
                      temp={forecastDays[3].main.temp}
                      day={this.state.days[(clientUTC.getDay() + 4) % 7]}
                      />
        </div>
      </div>
    )
  }
}

export default Forecast