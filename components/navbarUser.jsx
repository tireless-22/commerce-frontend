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

const NavbarUser = () => {
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
            <div
              className="flex align-middle p-2 nav-user-left"
              onClick={() => {
                Router.push("/user/items");
              }}
            >
              <Image
                src={logo}
                className="cursor-pointer"
                alt="logo"
                height={20}
                width={140}
              />
            </div>

            <div className="flex flex-row nav-user-right">
              <div
                onClick={() => {
                  Router.push("/user/cart");
                }}
                className="flex align-middle flex-row pt-4"
              >
                <BsCartPlusFill size={40} color="black" />
                <h3 className="text-black pt-2  text-2xl cursor-pointer">
                  Cart
                </h3>
              </div>

              <div className="flex align-middle flex-row pt-4">
                <h3
                  className="text-black pt-2  text-2xl cursor-pointer"
                  onClick={() => {
                    Router.push("/user/orders");
                  }}
                >
                  Orders
                </h3>
              </div>

              <div className="flex align-middle flex-row pt-4">
                <h3 className="text-black pt-2  text-2xl">Hi, {userMail}</h3>
              </div>

              <div
                onClick={() => {
                  logout();
                }}
                className="bg-red-500 items-center rounded-lg m-2 p-2 pl-8 pr-8 flex cursor-pointer  "
              >
                <h3 className="text-white m-0 text-2xl">Logout</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="line-solid"></div>
    </>
  );
};

export default NavbarUser;
