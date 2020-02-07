import React from "react"
import "./Right.css"
import Form from "./Form.js"
import Forecast from "./Forecast.js"

class Right extends React.Component {
  state = {
    location: "",
    forecast: null,
  }

  handleChange = (e) => {
    this.setState({
      location: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const API_KEY = "2a165d4ce548417e8a3175e7beabe510";
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.location}&units=metric&appid=${API_KEY}`)
    .then(res => res.json())
    .then(res => {
      if (res.list){
        this.setState({
          location: "",
          forecast: res,
        })
      } else {
        this.setState({
          forecast: "invalidInput"
        })
      }
    })
  }

  render() {
    const renderForecast = () => {
      switch(this.state.forecast) {
        case("invalidInput"):
          return <div className="invalidInput">Invalid input, please try again.</div>
        case(null):
          return null
        default:
          return <Forecast forecast={this.state.forecast} />
      }
    }
    return (
      <div className="Right">
        <Form 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit} 
          location={this.state.location}
        />
        {renderForecast()}
      </div>
    )
  }
}

export default Right