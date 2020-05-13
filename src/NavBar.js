import React, { Component } from "react";
import { Link } from 'react-router-dom'
export default class NavBar extends Component {
  render() {
    return (
      <div className="navig">
          <Link to="/">Events</Link>
          <Link to="/setTimer">Set Timer</Link>
      </div>
    );
  }
}