import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="menu">
        <NavLink to="/home">Add</NavLink>
        <NavLink to="/class">Class</NavLink>
      </div>
    );
  }
}
export default Menu;
