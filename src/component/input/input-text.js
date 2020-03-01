import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import "./input-text.scss";

export default function InputText(props) {
  const { onChange, label, ...prop } = props;
  const [isLabelShow, setLabelShow] = useState(false);

  const changeValue = (updateInputField, { target: { value } }) => {
    updateInputField(value);
  };
  return (
    <div className="input-text-component">
      <span className="input-icon">
        <FontAwesomeIcon icon={faUser} color="#e4e4e4" size="lg" />
      </span>

      <label className={`input-label ${isLabelShow ? "show" : ""}`}>
        {label}
      </label>
      <input
        {...prop}
        className="custom-input-text"
        onChange={event => changeValue(onChange, event)}
        onFocus={() => setLabelShow(true)}
        onBlur={() => setLabelShow(false)}
      />
    </div>
  );
}
