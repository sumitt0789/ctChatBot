import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import { DirectLine } from "botframework-directlinejs";
import React, { Component } from "react";

class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.directline = new DirectLine({
      token: "Rrs5Qyvy2Fw.J8yDIESjDRYq3x7ENIASX4cXOVqxA9H17Lra7-LTW0E",
    });
    this.directline.activity$.subscribe((activity) =>
      this.handeResponse(activity)
    );

    this.state = {
      messages: [],
    };
  }

  handeResponse = (activity) => {
    console.log(activity);
    if (activity.from.id === "RegForTesting") {
      const activityObj = {
        attachments: activity.attachments ? activity.attachments : null,
        inputHint: activity.inputHint,
        type: activity.type,
        speak: activity.speak ? activity.speak : null,
        suggestedActions: activity.suggestedActions
          ? activity.suggestedActions
          : null,
        text: activity.text ? activity.text : "",
      };

      this.setState((prevState) => {
        return {
          messages: [...prevState.messages, { activityObj, isBot: true }],
        };
      });
    }
  };

  sendActivity = (msg, type, title) => {
    this.directline
      .postActivity({
        from: { id: "myUserId", name: "myUserName" },
        type: "message",
        text: msg,
      })
      .subscribe(
        (id) => console.log("Posted activity, assigned ID ", id),
        (error) => console.log("Error posting activity", error)
      );
    let activityObj = {
      text: msg,
    };

    this.setState((prevState) => {
      return {
        messages: [...prevState.messages, { activityObj, isUser: true }],
      };
    });
    console.log(this.state.messages);
  };
  render() {
    return (
      <>
        <div className="chatbot">
          <div className="header-container">
            <div className="icon-circle"></div>
          </div>
          <div className="body-container">
            <Body
              messages={this.state.messages}
              sendActivity={this.sendActivity}
            />
          </div>

          <div className="footer-container">
            <Footer sendActivity={this.sendActivity} />
          </div>
        </div>
      </>
    );
  }
}

export default ChatBot;
