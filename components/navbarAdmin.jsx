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
    <>
      <div className="main-wrapper ">
        <div className="width-80">
          <div className="user-navbar">
            <div className="flex flex-row">
              <div
                className="flex align-middle cursor-pointer p-2"
                onClick={() => {
                  Router.push("/admin");
                }}
              >
                <Image src={logo} alt="logo" height={20} width={140} />
              </div>
            </div>

            <div className="flex flex-row  items-center ">


              <div className="flex align-middle cursor-pointer flex-row pt-4 mb-4 mr-8">
                <h3 onClick={() => {
                   Router.push("/admin/orderTrack");
                  
                }} className="text-black pt-2  text-2xl"> Order Tracking</h3>
              </div>


              <div className="flex align-middle flex-row pt-4 mb-4 mr-8">
                <h3 className="text-black pt-2  text-2xl"> {userMail}</h3>
              </div>

              <div
                onClick={() => {
                  logout();
                }}
                className="bg-red-500 rounded-lg m-2 p-2 pl-8 pr-8 flex cursor-pointer "
              >
                <h3 className="text-white cursor-pointer text-2xl">Logout</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="line-solid"></div>
    </>
  );
};

export default NavbarAdmin;
