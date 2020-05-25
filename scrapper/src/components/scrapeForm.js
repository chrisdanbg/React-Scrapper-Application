import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import Folow from "./followPrinter";
import AddedLinks from "./addedLinks";

import "./styles/scrapeForm.scss";

class ScrapeForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      soundcloud: "",
      track: "",
      isLoaded: false,
      loading: false,
      follow: {},
      addedLinks: [],
      isSubmitDisabled: true,
    };
  }

  addItem() {
    const item = this.state.soundcloud;
    let currentlyAddedLinks = this.state.addedLinks;

    currentlyAddedLinks.push(item);
    this.setState({
      addedLinks: currentlyAddedLinks,
      soundcloud: "",
      isSubmitDisabled: false,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDelete(index) {
    let linksArray = this.state.addedLinks;

    linksArray.splice(index, 1);

    this.setState({
      addedLinks: linksArray,
      isSubmitDisabled: this.state.addedLinks.length > 0 ? false : true,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const soundcloudLinks = this.state.addedLinks;
    const track = this.state.track;

    const data = { soundcloudLinks, track };

    this.setState({
      soundcloud: "",
      loading: true,
      isSubmitDisabled: true,
    });

    fetch("http://localhost:9000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          loading: false,
          follow: res,
          isLoaded: true,
          isSubmitDisabled: false,
        });
        this.props.handleWriteFollows(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const stickyStyle = {
      bottom: 0,
      top: "unset",
    };

    return (
      <div className="col-6">
        <Form className="" onSubmit={this.handleSubmit}>
          <Form.Group className="row justify-content-between">
            <Form.Control
              className="my-4 col-9"
              type="text"
              placeholder="Soundcloud Link"
              name="soundcloud"
              onChange={this.handleChange}
              value={this.state.soundcloud}
            ></Form.Control>
            <Button className="col-2 my-4" onClick={this.addItem}>
              +
            </Button>
            <Form.Control
              className="my-4 col-12"
              type="text"
              placeholder="Track Name"
              name="track"
              onChange={this.handleChange}
              value={this.state.track}
            ></Form.Control>
            <Button type="submit" disabled={this.state.isSubmitDisabled}>
              Submit
            </Button>
          </Form.Group>
        </Form>
        {this.state.loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner
              animation="border"
              role="status"
              animation="grow"
              size="xl"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : this.state.isLoaded ? (
          <Folow className="col-12 w-50 mx-auto" follow={this.state.follow}></Folow>
        ) : (
          ""
        )}
        <div className="addedLinks row">
          <AddedLinks
            links={this.state.addedLinks}
            handleDelete={this.handleDelete}
          ></AddedLinks>
        </div>
      </div>
    );
  }
}

export default ScrapeForm;
