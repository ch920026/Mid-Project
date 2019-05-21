import React, { Component } from "react";
import { string } from "prop-types";

export default class PostRender extends Component {
  render() {
    let list = this.props.fileArray.slice(0);
    var id = this.props.match.params;
    let v;
    let a = list.find(function(item, index, array) {
      if (item._id == id.id) {
        //console.log("found");
        console.log(item);
        v = item.url;
        return item;
      }
    });

    return <iframe src={v} id="showPdf" frameBorder="0" />;
  }
}
