import React from "react";
import './styles/addedLinks.scss';

class Follow extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    this.props.handleDelete(e.target.value);
  }


  render() {
    return (
      <React.Fragment>
        {this.props.links.map((link, index) => {
          return (
            <div key={index} className="addedItem">
              <p className="my-1 mx-2">{link}</p>
              <button
                className="my-1 addedItem__button"
                onClick={this.handleDelete}
                value={index}
              >
                X
              </button>
              <br></br>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Follow;
