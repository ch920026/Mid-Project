import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class ClassList extends Component {
  render() {
    let lists = this.props.fileArray.map((f, index) => (
      <li key={index}>
        <NavLink to={"/class/" + f._id}>Slide {f.filename}</NavLink>
        <button className="Bt" onClick={this.props.d} id={f._id}>
          delete
        </button>
      </li>
    ));
    return (
      <div className="cList">
        <h3 />
        <div id="classMenu">{lists}</div>
        <div id="refresh">
          If the list do not show properly, ckick
          <NavLink to={"/classes"}> here</NavLink>
        </div>
      </div>
    );
  }
}
//{lists}
