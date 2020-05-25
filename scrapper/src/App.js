import React from "react";
import ScrapeForm from "./components/scrapeForm";
import OutputForm from "./components/outputForm";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";

class App extends React.Component {
  constructor() {
    super();
    this.handleWriteFollows = this.handleWriteFollows.bind(this);

    this.state = {
      follow: {},
      isLoaded: false,
    };
  }

  handleWriteFollows(e) {
    this.setState({ follow: e, isLoaded: true });
  }

  render() {
    return (
      <Container>
        <div className="row mx-auto d-flex">
          <ScrapeForm handleWriteFollows={this.handleWriteFollows}></ScrapeForm>
          <OutputForm
            follow={this.state.follow}
            isLoaded={this.state.isLoaded}
          ></OutputForm>
        </div>
      </Container>
    );
  }
}

export default App;
