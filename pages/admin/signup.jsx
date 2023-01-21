import React, { useState } from "react";
import background from "../../images/lgBack.jpg";

import loginPng from "../../images/lg.png";
import axios from "axios";
import Router from "next/router";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [passMessage, setPassMessage] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const register = () => {
    console.log(firstName);
    console.log(lastName);
    console.log(mail);
    console.log(password1);
    console.log(password2);
    setErrorMessage("");

    if (
      firstName == "" ||
      lastName == "" ||
      mail == "" ||
      password1 == "" ||
      password2 == ""
    ) {
      setErrorMessage("Please Fill All The Details");
      return;
    }

    if (password1 != password2) {
      setErrorMessage("Passwords are not matching");
      return;
    }

    axios
      .post(
        `http://localhost:8080/untitled1/signup?mail=${mail}&password=${password1}&firstName=${firstName}&lastName=${lastName}&role=admin`
      )
      .then((res) => {
        if (res.data.stat == 0) {
          setErrorMessage(res.data.msg);
        } else {
          Router.push("/admin/login");
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
            <form className="bg-white mt-24 justify-center align-middle rounded w-5/6">
              <h1 className="text-4xl mb-4 items-center justify-center  font-sans font-semibold mt-4 mb-2">
                Registration For Admin
              </h1>

              <div className="flex flex-row">
                <div className="mb-8 mr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="firstname"
                  >
                    First Name
                  </label>

                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstnae"
                    type="text"
                    placeholder="First Name"
                    autocomplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                </div>

                <div className="mb-8">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    for="Last Name"
                  >
                    Last Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    placeholder="Last Name"
                    autocomplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>
              </div>

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
                  onChange={(e) => setMail(e.target.value)}
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
                  onChange={(e) => setPassword1(e.target.value)}
                ></input>
              </div>

              <div className="mb-8">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Re-Enter the Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="Password"
                  type="password"
                  placeholder="Re-enter the Password"
                  autocomplete="off"
                  onChange={(e) => setPassword2(e.target.value)}
                ></input>
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={register}
                >
                  Register
                </button>

                <div
                  className="text-blue-500"
                  type="submit"
                  onClick={() => (window.location.href = "/admin/login")}
                >
                  Login ?
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

export default Signup;
