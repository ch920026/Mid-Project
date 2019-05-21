import React from "react";
import { Button, Input } from "antd";

class File extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="AddPage">
        <div className="AddTitle">Add Your Slide</div>
        <Input
          type="text"
          id="filename"
          className="form-control"
          placeholder="Enter file name..."
        />
        <Input
          type="text"
          id="url"
          className="form-control"
          placeholder="Paste file url..."
        />
        <Button type="primary" onClick={this.props.add}>
          Add
        </Button>
        <div id="status" />
      </div>
    );
  }
}
export default File;
