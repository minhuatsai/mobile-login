import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "./input-password.scss";

export default function InputPassword(props) {
  const { onChange, label, ...prop } = props;
  const [isLabelShow, setLabelShow] = useState(false);

  const changeValue = (updateInputField, { target: { value } }) => {
    updateInputField(value);
  };
  return (
    <div className="input-password-component">
      <span className="input-icon">
        <FontAwesomeIcon icon={faLock} color="#e4e4e4" size="lg" />
      </span>
      <label className={`input-label ${isLabelShow ? "show" : ""}`}>
        {label}
      </label>
      <input
        {...prop}
        type="password"
        className="custom-input-password"
        onChange={event => changeValue(onChange, event)}
        onFocus={() => setLabelShow(true)}
        onBlur={() => setLabelShow(false)}
      />
      <span className="forgot-password">
        <a href="#" onClick={event => event.preventDefault()}>
          Forgot?
        </a>
      </span>
    </div>
  );
}
