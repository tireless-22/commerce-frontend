import React, { useState, useEffect } from "react";

import axios from "axios";

import { Button, notification } from "antd";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
      setError("Please fill all the fields");
      return;
    }

    axios
      .post(
        `http://localhost:8080/untitled1/userlogin?mail=${email}&password=${password}`
      )
      .then((res) => {
        if (res.data.stat) {

          console.log("navigate to other page");
        } else {
          openNotification(res.data.msg);
        }
      });
  };


  return (
    <div className="flex flex-col justify-middle ">
      <div className="flex items-center justify-center h-screen ">
        <form className="bg-white shadow-md rounded px-8 w-2/6  pb-4 mb-2 mt-2 ml-4 mr-4">
          <h1 className="text-2xl items-center justify-center  font-sans font-semibold mt-4 mb-2">
            Login
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Gmail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              autocomplete="off"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="mb-4">
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
              LOGIN
            </button>
           
          </div>
          <div className="flex items-center justify-around auth_button_div">
            <div
              className="text-blue-500"
              onClick={() => (window.location.href = "/user/signup")}
            >
              Signup ?
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
