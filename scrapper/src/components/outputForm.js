import React from "react";
import Folow from "./followPrinter";

class OutputForm extends React.Component {
  constructor(props) {
    super(props);

    this.appendUser = this.appendUser.bind(this);

    this.state = {
      text:
        "CDeepMusic - Deep / Nu Disco / Chill House \n\n" +
        "☑️  Subscribe: http://bit.ly/subcdeep \n\n" +
        "☑️  Free Download: https://hypeddit.com/track/90hwti \n\n" +
        "☑️  CDeep on Spotify: http://bit.ly/CDeepSpotify \n\n" +
        "☑️  CDeepMusic on Facebook: https://www.facebook.com/CDeepMusicOriginal \n\n" +
        "☑️ Visual Identity by Studio GRIS \n" +
        "http://studio-gris.com\n" +
        "https://www.behance.net/GrisStudio\n" +
        "https://www.facebook.com/studiogris\n" +
        "https://instagram.com/studiogris\n\n" +
        "More at:\n \n",
      isDisplayed: false,
    };
  }

  componentDidUpdate() {
    if (this.props.isLoaded && !this.state.isDisplayed) {
      let currentText = this.state.text;

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
      <div className="col-6">
        <textarea
          value={this.state.text}
          rows="30"
          className="w-100"
        ></textarea>
      </div>
    );
  }
}

export default OutputForm;
