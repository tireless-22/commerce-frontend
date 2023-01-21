import React, { useState, useEffect } from "react";

import axios from "axios";

import { Button, notification } from "antd";
import Router from "next/router";

import background from "../../images/lgBack.jpg";

import loginPng from "../../images/lg.png";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const openNotification = (message) => {
    notification.open({
      message: message,
    });
  };

  const login = () => {
    console.log("from login");
    console.log(email);
    console.log(password);

    if (email === "" || password === "") {
      setErrorMessage("Please fill all the fields");
      return;
    }

    axios
      .post(
        `http://localhost:8080/untitled1/userlogin?mail=${email}&password=${password}`
      )
      .then((res) => {
        if (res.data.stat) {
          localStorage.setItem("email", email);
          localStorage.setItem("role", "user");
          localStorage.setItem("firstName", res.data.firstName);
          localStorage.setItem("id", res.data.id);

          Router.push("/admin");

          console.log("navigate to other page");
        } else {
          setErrorMessage(res.data.msg);
          // openNotification(res.data.msg);
        }
      });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",

          backgroundImage: `url(${background.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",

          height: "100%",
          width: "100%",
        }}
      >
        {/* box */}
        <div className="sign-box rounded-lg">
          <div
            className="sign-box-left"
            style={{
              display: "flex",

              backgroundImage: `url(${loginPng.src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: "30px",

              height: "100%",
              width: "100%",
            }}
          ></div>

          <div className="sign-box-left justify-center align-middle">
            <form className="bg-white mt-40 justify-center align-middle rounded w-5/6">
              <h1 className="text-4xl mb-4 items-center justify-center  font-sans font-semibold mt-4 mb-2">
                Login For Admin
              </h1>

              <div className="mb-8">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="gmail"
                >
                  Gmail
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="gmail"
                  type="text"
                  placeholder="gmail"
                  autocomplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <div className="mb-8">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="Password"
                  type="password"
                  placeholder="Password"
                  autocomplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={login}
                >
                  Login
                </button>

                <div
                  className="text-blue-500"
                  type="submit"
                  onClick={() => (window.location.href = "/admin/signup")}
                >
                  SignUp ?
                </div>
              </div>

              {errorMessage != "" && (
                <div className="flex items-center bg-red-700 p-2 pl-4 pr-4 mt-2  justify-around auth_button_div">
                  <p className="text-white">{errorMessage}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
