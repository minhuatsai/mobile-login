import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./account-type.scss";

export default function AccountType(props) {
  const { data, chooseAccount, style, ...prop } = props;

  const eachFirstAccountStyle = {
    ...style,
    marginLeft: 0
  };

  //判斷要適用四個column為一組 or 三個column為一組 or 二個column為一組，並為每個accountType做style設定
  const columnJudgeFunction = itemIndex => {
    if (window.innerWidth > 768) {
      if (data.length >= 4) {
        return !(itemIndex % 4);
      }
      if (data.length === 3) {
        return !(itemIndex % 3);
      }
      return !(itemIndex % 2);
    }
    return !(itemIndex % 2);
  };

  return (
    <>
      {data.map((dataItem, i) => {
        const { imgSrc, accountType, choose } = dataItem;
        return (
          <div
            key={`account-type-component_${i}`}
            {...prop}
            style={columnJudgeFunction(i) ? eachFirstAccountStyle : style}
            className={`account-type-component ${choose ? "active" : ""}`}
            onClick={() => chooseAccount(i)}
          >
            <AccountTypeContent
              imgSrc={imgSrc}
              accountType={accountType}
              choose={choose}
            />
          </div>
        );
      })}
    </>
  );
}

function AccountTypeContent(prop) {
  const { imgSrc, accountType, choose } = prop;
  return (
    <>
      <img src={imgSrc} alt={imgSrc} />
      <span className="account-type">{accountType}</span>
      <span className={`choose ${choose ? "show" : "choose"}`}>
        <FontAwesomeIcon icon={faCheckCircle} size="2x" />
      </span>
    </>
  );
}
