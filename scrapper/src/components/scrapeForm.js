import React from "react";
import { Form, Spinner } from "react-bootstrap";
import { Button,withStyles } from '@material-ui/core';
import Folow from "./followPrinter";
import AddedLinks from "./addedLinks";

import "./styles/scrapeForm.scss";

const apiUrl = 'https://youtube-scrapper-react.herokuapp.com/api';

const ColorButton = withStyles(() => ({
  root: {
    border: '1px solid #ff8800',
    transition: '.5s all',
    '&:hover': {
      backgroundColor: '#ff8800',
      border:'1px solid #ff8800',
      color:'#fff !important',
      transform: 'translateY(-5px)'
    },
    color:'#ff8800 !important',
    
  },
}))(Button);

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
      freeDl: "",
      buyLink: "",
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

    fetch(apiUrl, {
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
        res.freeDownloadLink = '';
        res.buyLink = '';

        this.setState({
          loading: false,
          follow: res,
          isLoaded: true,
          isSubmitDisabled: false,
        });

        if (this.state.freeDl.length > 0) {
          res.freeDownloadLink = `☑️  Free Download: ` + this.state.freeDl + `\n\n`;
        } 

        if (this.state.buyLink.length > 0) {
          res.buyLink = `☑️  Buy // Stream: ` + this.state.buyLink + `\n\n`;
        }

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
      <div className="w-50 scrape-form shadow">
        <Form className="" onSubmit={this.handleSubmit}>
          <Form.Group className="row justify-content-between">
            <Form.Control
              className="my-4 col-9 c-form"
              type="text"
              placeholder="Soundcloud Link"
              name="soundcloud"
              onChange={this.handleChange}
              value={this.state.soundcloud}
            ></Form.Control>
            <ColorButton variant="outlined" color="primary" className="col-2 my-4 shadow" onClick={this.addItem}>
              +
            </ColorButton>
            <Form.Control
              className="my-4 col-12 c-form"
              type="text"
              placeholder="Track Name"
              name="track"
              onChange={this.handleChange}
              value={this.state.track}
            ></Form.Control>
             <Form.Control
              className="my-4 col-12 c-form"
              type="text"
              placeholder="Free Download Link"
              name="freeDl"
              onChange={this.handleChange}
              value={this.state.freeDl}
            ></Form.Control>
            <Form.Control
              className="my-4 col-12 c-form"
              type="text"
              placeholder="Buy Link"
              name="buyLink"
              onChange={this.handleChange}
              value={this.state.buyLink}
            ></Form.Control>
            <Button variant="outlined" color="primary" type="submit" className="shadow" disabled={this.state.isSubmitDisabled}>
              Scrape
            </Button>
          </Form.Group>
        </Form>
        { this.state.isLoaded ? (
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
        ) : ""}
      </div>
    );
  }
}

export default ScrapeForm;
