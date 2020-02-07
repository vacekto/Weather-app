import React from "react"
import "./Form.css"



const Form = (props) => {
  return (
    <div className="wrapper">
      <form className="Form" onSubmit={props.handleSubmit}>
        <input 
          type="text"
          className="input"
          name="city"
          onChange={props.handleChange}
          value={props.location}
          placeholder="City.."
          autoComplete="off" />
        <input type="submit" className="submit" value="Search" />
      </form>
    </div>
  )
}

export default Form