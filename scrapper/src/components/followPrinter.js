import React from "react";

class Follow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h5>Tags:</h5>
        <p>{this.props.follow.tags}</p>
      </React.Fragment>
    );
  }
}

export default Follow;
