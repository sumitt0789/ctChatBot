import React, { useRef, useEffect } from "react";
import HeroCard from "../HeroCard/HeroCard";

const Body = ({ messages, sendActivity }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleCardAction = (type, value, title, i) => {
    if (type === "openUrl") {
      window.open(value, "_blank");
    } else if (type === "imBack") {
      sendActivity(value, type, title);
    } else if (type === "postBack") {
      sendActivity(value, type, "");
    }
  };
  const renderBotMessage = (activityObj) => {
    console.log(activityObj);
    switch (activityObj.inputHint) {
      case "acceptingInput":
      case "card":
        if (
          activityObj.attachments &&
          activityObj.attachments.length > 0 &&
          activityObj.attachments[0].contentType ===
            "application/vnd.microsoft.card.hero"
        ) {
          return (
            <HeroCard
              message={activityObj.attachments}
              handleCardAction={handleCardAction}
            />
          );
        } else {
          return activityObj.text;
        }
      default:
        return activityObj.text;
    }
  };

  return (
    <div className="body text-content">
      {messages?.map((message, i) => {
        return (
          <div className="message-container" key={i}>
            {message.isUser && (
              <div className="user-message">{message.activityObj.text}</div>
            )}

            {message.isBot && (
              <div className="bot-message">
                {renderBotMessage(message.activityObj)}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        );
      })}
    </div>
  );
};

export default Body;
