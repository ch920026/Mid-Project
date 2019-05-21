import React from "react";
import { Input } from "antd";
const { TextArea } = Input;

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="chat">
        <div className="card">
          <div id="messages" className="card-block" />
        </div>

        <Input
          type="text"
          id="username"
          className="form-control"
          placeholder="Enter name..."
        />
        <TextArea
          rows={4}
          id="textarea"
          className="form-control"
          placeholder="Enter message..."
          onKeyPress={this.props.ask}
        />
        <button
          id="clear"
          className="btn btn-danger"
          onClick={this.props.Clear}
        >
          Clear
        </button>
      </div>
    );
  }
}
export default Chat;
