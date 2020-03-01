import React, { useState, useEffect, createContext, useContext } from "react";
import { Segment, Button } from "./widget";
import AccountType from "./component/account-type/account-type";
import InputText from "./component/input/input-text";
import InputPassword from "./component/input/input-password";

import doctorImg from "./images/img_doctor_90@3x.svg";
import patient from "./images/img_patient_90@3x.svg";
import "./css/index.scss";

const formContext = createContext();

const formInitialData = { accountType: "Doctor", username: "", password: "" };

function App() {
  const [formData, setFormData] = useState(formInitialData);

  const updateAccountType = newAccountType => {
    setFormData({
      ...formData,
      accountType: newAccountType
    });
  };
  const updateInputUsername = value => {
    setFormData({
      ...formData,
      username: value
    });
  };
  const updateInputPassword = value => {
    setFormData({
      ...formData,
      password: value
    });
  };

  return (
    <div className="main-content">
      <formContext.Provider
        value={{
          formData,
          updateAccountType,
          updateInputUsername,
          updateInputPassword
        }}
      >
        <AccountTypeContainer />
        <FormContainer />
      </formContext.Provider>
    </div>
  );
}
function AccountTypeContainer() {
  const { updateAccountType, formData } = useContext(formContext);
  const accountTypeDatas = [
    { imgSrc: doctorImg, accountType: "Doctor", choose: true },
    {
      imgSrc: patient,
      accountType: "Patient",
      choose: false
    }
  ];
  const InitialStyle = {
    width: `calc(100%/${accountTypeDatas.length} - 20px`,
    marginLeft: `calc(20px*${
      accountTypeDatas.length
    }/${accountTypeDatas.length - 1}`
  };
  const [accountTypes, setAccountTypes] = useState(accountTypeDatas);
  // eslint-disable-next-line no-unused-vars
  const [currentAccountTypeData, setCurrentAccountTypeData] = useState(
    accountTypeDatas[0]
  );
  const [RWDStyle, setRWDStyle] = useState(InitialStyle);

  const chooseAccount = cooseIndex => {
    const _accountTypes = JSON.parse(JSON.stringify(accountTypes));
    _accountTypes.forEach((item, i) => {
      item.choose = i === cooseIndex ? true : false;
      if (i === cooseIndex) {
        item.choose = true;
        setCurrentAccountTypeData(item);
        updateAccountType(item.accountType);
      } else {
        item.choose = false;
      }
    });
    setAccountTypes(_accountTypes);
  };
  const onResiezeAccountTypeRWD = () => {
    const windowWidth = window.innerWidth;
    const accountTypeCount = accountTypeDatas.length;
    const accountTypeMinWidth = 250;
    if (windowWidth > 768) {
      const rowCount = accountTypeCount >= 4 ? 4 : accountTypeCount;
      if (rowCount <= 2) {
        setRWDStyle({
          ...RWDStyle,
          width: `calc(100%/${rowCount} - 20px)`,
          marginLeft: `calc(20px*${rowCount}/${rowCount - 1}`,
          maxWidth: `${accountTypeMinWidth}px`,
          left: accountTypeCount <= 2 ? `${accountTypeMinWidth}px` : 0,
          transform: "translateX(-50%)"
        });
      } else {
        setRWDStyle({
          ...RWDStyle,
          width: `calc(100%/${rowCount} - 20px)`,
          marginLeft: `calc(20px*${rowCount}/${rowCount - 1}`
        });
      }
    } else {
      setRWDStyle({
        ...RWDStyle,
        width: `calc(100%/${2} - 20px)`,
        marginLeft: `calc(20px*${2}/${2 - 1}`,
        left: 0
      });
    }
  };

  const { accountType } = formData;

  useEffect(() => {
    onResiezeAccountTypeRWD();
    let timer;
    window.onresize = () => {
      //解決頻繁觸發
      clearTimeout(timer);
      timer = setTimeout(() => {
        onResiezeAccountTypeRWD();
      }, 100);
    };
  }, []);
  return (
    <div className="account-type-container clearFix">
      <h3>Choose Account Type</h3>
      <AccountType
        data={accountTypes}
        chooseAccount={chooseAccount}
        style={RWDStyle}
      />
      <Segment color="#bdbdbd">
        <span className="welcome-header">
          Hello {accountType.toLowerCase()} !
        </span>
        <span>Please fill out the form below to get started</span>
      </Segment>
    </div>
  );
}
function FormContainer() {
  const { updateInputUsername, updateInputPassword, formData } = useContext(
    formContext
  );
  const { username, password, accountType } = formData;

  const validatePassword = (username, password, matchCount) => {
    let isPass = true;
    const loopCount = username.length - matchCount + 1;
    for (let i = 0; i < loopCount; i++) {
      const compareStr = username.substr(i, matchCount);
      if (password.includes(compareStr)) {
        isPass = false;
        break;
      }
    }
    return isPass;
  };

  const onSumbit = () => {
    const isSubmit = validatePassword(username, password, 6);
    if (isSubmit) {
      alert(
        `Submit Success !!!\nAccountType : ${accountType} \nUsername : ${username}\nPassword : ${password} \n`
      );
    } else {
      alert("password is similar to username");
    }
  };
  return (
    <div className="form-container">
      <InputText
        name="username"
        placeholder="Username"
        autoComplete="off"
        value={username}
        label="Username"
        onChange={updateInputUsername}
      />
      <InputPassword
        name="password"
        placeholder="Password"
        value={password}
        label="Password"
        onChange={updateInputPassword}
      />
      <div className="form-footer">
        <div className="signup-container">
          No account?
          <a href="#" onClick={event => event.preventDefault()}>
            {" "}
            Sign up
          </a>
        </div>
        <Button
          backgroundColor="#38b5ed"
          color="#fff"
          width="100px"
          onClick={onSumbit}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default App;
