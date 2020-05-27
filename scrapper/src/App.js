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
      <div className="h-100vh">
        <div className="row h-100vh justify-content-center align-items-center sc-background">
          <ScrapeForm handleWriteFollows={this.handleWriteFollows}></ScrapeForm>
        </div>
        <div className="op-background">
        <Container className="container">
          <OutputForm
            follow={this.state.follow}
            freeDownloadLink={this.state.freeDownloadLink}
            buyLink={this.state.buyLink}
            isLoaded={this.state.isLoaded}
          ></OutputForm>
        </Container>
        </div>
      </div>
    );
  }
}

export default App;
