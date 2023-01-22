import { list } from "postcss";
import React, { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";

import { getFetcher } from "../../utils/swr";
import Loading from "../../components/loading";
import Image from "next/image";
import { BsCartPlusFill } from "react-icons/bs";
import phone from "../../images/phone.jpeg";
import NavbarUser from "@/components/navbarUser";

import { IoAddCircleSharp } from "react-icons/io5";
import { GrSubtractCircle } from "react-icons/gr";
import { IoAddCircleOutline } from "react-icons/io5";

import axios from "axios";
import Router from "next/router";

const Index = () => {

  let userMail = "";
  let userId = "";
  let role = "";

  if (typeof window !== "undefined") {
    console.log(localStorage.getItem("email"));
    localStorage.getItem("email")
      ? (userMail = localStorage.getItem("email"))
      : (userMail = "null");

    userMail == "null"
      ? (window.location.href = "/user/login")
      : console.log("user logged in");

    userMail = localStorage.getItem("email");
    userId = localStorage.getItem("id");

    role = localStorage.getItem("role");
    if (role === "user") {
      Router.push("/user/items/");
    }
  }



  return <div>Index</div>;
};

export default Index;
