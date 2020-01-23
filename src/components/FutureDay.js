import React from "react"
import "../../node_modules/weather-icons/css/weather-icons.css"
import "./FutureDay.css"

const FutureDay = (props) => {
  return(
    <div className="FutureDay">
      <span className="day">{props.day}</span>
      <i className={props.weatherIcon}></i>
      <span className="temp">{props.temp}°</span>
    </div>
  )
}

export default FutureDay