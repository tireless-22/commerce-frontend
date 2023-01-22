import React from "react";
import Image from "next/image";
import bg from "../images/landingBg.png";

import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const Index = () => {
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

          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",

          height: "100%",
          width: "100%",
        }}
        text-xl
      >
        <div className="landing-containers-parent">
          <div className="landing-containter">
            <h2 className="m-4 mt-8 ml-8 flex center font-sans text-3xl flex justify-centerx">
              Admin ?
            </h2>
            <div>
              <p className="m-4 ml-8">
                You can add new items to site and you can modify the items
              </p>

              <p className="m-4 ml-8">You need secret key to do that</p>
            </div>

            <Link href="/admin/login">
              <div className="bg-blue-500 p-4 m-8 rounded-2xl flex justify-center">
                <div className="text-2xl text-white">Admin</div>
                <div className="flex justify-center align-middle pt-2 ml-2">
                  <FaArrowRight color="white" />
                </div>
              </div>
            </Link>
          </div>

          <div className="landing-containter ">
            <h2 className="m-4 mt-8 ml-8 flex center font-sans text-3xl flex justify-centerx">
              Customer ?
            </h2>
            <div>
              <p className="m-4 ml-8">
                You can purchase the items by adding them to cart and then you
                can order them
              </p>

              <p className="m-4 ml-8">
                You can directly signup and then signin
              </p>
            </div>

            <Link href="/user/login">
              <div className="bg-blue-500 p-4 m-8 rounded-2xl flex justify-center">
                <div className="text-2xl text-white">Customer</div>
                <div className="flex justify-center align-middle pt-2 ml-2">
                  <FaArrowRight color="white"/>
                </div>
              </div>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
