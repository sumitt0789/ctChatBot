import React, { useState } from "react";
import "./HeroCard.css";

const HeroCard = ({ message, handleCardAction }) => {
  const handleBtnClick = (type, value, title, i) => {
    console.log("clicked");
    handleCardAction(type, value, title, i);
  };

  return message?.map((msg, index) => (
    <div className={"hero-card-container"} key={index}>
      <div className="message-icon"></div>
      <div className="hero-card">
        {msg.content.title ? (
          <h1 className="hero-card-title">{msg.content.title}</h1>
        ) : null}
        {msg.content.images?.map((m, i) => (
          <img src={m.url} key={i} alt="" />
        ))}
        {msg.content.subtitle ? (
          <h1 className="hero-card-subtitle">{msg.content.subtitle}</h1>
        ) : null}
        {msg.content.text ? (
          <p className=" hero-card-text">{msg.content.text}</p>
        ) : null}
        {msg.content.buttons?.map((btn, i) => {
          return (
            <div className="action-buttons" key={i}>
              <button
                onClick={() =>
                  handleBtnClick(btn.type, btn.value, btn.title, i)
                }
              >
                {btn.title}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  ));
};

export default HeroCard;
