import React, { useState, useEffect } from "react";

import axios from "axios";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [passwrord, setPassword] = React.useState("");

  const [error, setError] = React.useState("");
  const [passMessage, setPassMessage] = useState("");
  const login = () => {
    setError("");
    setPassMessage("");
    console.log("from login");
    console.log(email);
    console.log(passwrord);

    if (email === "" || passwrord === "") {
      setError("Please fill all the fields");
      return;
    }
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
            <p className="text-red-500">{error}</p>
            <p className="text-green-500">{passMessage}</p>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
