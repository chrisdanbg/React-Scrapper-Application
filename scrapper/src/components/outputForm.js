import React from "react";

import './styles/outputForm.scss';

class OutputForm extends React.Component {
  constructor(props) {
    super(props);

    this.appendUser = this.appendUser.bind(this);

    this.state = {
      isDisplayed: false,
    };
  }

  componentDidUpdate() {
    if (this.props.isLoaded && !this.state.isDisplayed) {

      let { freeDownloadLink, buyLink } = this.props.follow;

      let text =
        `CDeepMusic - Deep / Nu Disco / Chill House \n\n` +
        `☑️  Subscribe: http://bit.ly/subcdeep \n\n` +
        `${freeDownloadLink}` +
        `${buyLink}` +
        `☑️  CDeep on Spotify: http://bit.ly/CDeepSpotify \n\n` +
        `☑️  CDeepMusic on Facebook: https://www.facebook.com/CDeepMusicOriginal \n\n` +
        `☑️ Visual Identity by Studio GRIS \n` +
        `http://studio-gris.com\n` +
        `https://www.behance.net/GrisStudio\n` +
        `https://www.facebook.com/studiogris\n` +
        `https://instagram.com/studiogris\n\n` +
        `More at:\n \n`;

      let currentText = text;

      this.props.follow.users.map((user, i) => {
        let createdLinks = this.appendUser(user);
        currentText += createdLinks + "\n";
      });

      this.setState({ text: currentText, isDisplayed: true });
    }
  }

  appendUser(user) {
    var stringToAppend = `✔️ Follow @ ${user.userName} \n`;
    stringToAppend += `${user.scLink} \n`;

    user.links.map((link) => {
      stringToAppend += `${link} \n`;
    });

    return stringToAppend;
  }

  render() {
    return (
      <div className="w-100 p-5">
        <textarea
          value={this.state.text}
          rows="30"
          className="w-100 shadow"
        ></textarea>
      </div>
    );
  }
}

export default OutputForm;
