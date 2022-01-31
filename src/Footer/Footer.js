import { useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { BsFillMicFill } from "react-icons/bs";

function Footer({ sendActivity }) {
  var msgs = "";
  const [currentMessage, setCurrentMessage] = useState("");

  const handleChange = (e) => {
    msgs = e.target.value;
    setCurrentMessage(msgs);
  };

  const handleReset = (e) => {
    if (e.key === "Enter") {
      sendActivity(currentMessage);
      setCurrentMessage("");
    }
  };

  return (
    <div className="footer">
      <div className="input-container">
        <div class="switch">
          <input
            id="language-toggle"
            class="check-toggle check-toggle-round-flat"
            type="checkbox"
          />
          <label for="language-toggle"></label>
          <span class="on">EN</span>
          <span class="off">HI</span>
        </div>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Type Somthing"
          value={currentMessage}
          onKeyDown={(e) => handleReset(e)}
        />

        <BsFillMicFill className="mic" />
        <div className="submit-button-container">
          <button className="submit-button" onClick={(e) => handleReset(e)}>
            <RiSendPlane2Fill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
