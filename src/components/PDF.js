import React from "react";

class PDF extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <iframe
        src="https://www.tutorialspoint.com/mongodb/mongodb_tutorial.pdf"
        id="showPdf"
        frameBorder="0"
      />
    );
  }
}
export default PDF;
