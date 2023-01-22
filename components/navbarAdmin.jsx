import React from "react";
import logo from "../images/logo.png";
import { BsCartPlusFill } from "react-icons/bs";
import Router from "next/router";
import Image from "next/image";
// logo
// cart
// orders
// name
// logout

const NavbarAdmin = () => {
  let userMail = "";

  if (typeof window !== "undefined") {
    console.log(localStorage.getItem("email"));
    localStorage.getItem("email")
      ? (userMail = localStorage.getItem("email"))
      : (userMail = "null");

    userMail == "null"
      ? (window.location.href = "/user/login")
      : console.log("user logged in");

    userMail = localStorage.getItem("email");
  }

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="main-wrapper bg-blue-400">
      <div className="width-80">
        <div className="user-navbar">
          <div
            className="flex align-middle p-2"
            onClick={() => {
              Router.push("/user/items");
            }}
          >
            <Image src={logo} alt="logo" height={20} width={140} />
          </div>

          <div className="flex align-middle flex-row pt-4">
            <h3 className="text-black pt-2  text-2xl">Hi, {userMail}</h3>
          </div>

          <div
            onClick={() => {
              logout();
            }}
            className="bg-red-500 rounded-lg m-2 p-2 pl-8 pr-8 flex  "
          >
            <h3 className="text-white  text-2xl">Logout</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
