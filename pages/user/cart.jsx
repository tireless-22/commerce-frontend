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
const Cart = () => {
  let userMail = "";
  let userId = "";

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
  }

  const [listItems, setListItems] = useState();
  const [itemId, setItemId] = useState();

  useEffect(() => {
    axios
      .post(`http://localhost:8080/untitled1/cartItems?userId=${userId}`)
      .then((res) => {
        setListItems(res.data);
      });
  }, [userId, itemId]);

  const updateItem = (id, quantity) => {
    if (quantity == 0) {
      return;
    }
    console.log(id);
    console.log(userId);

    axios
      .post(
        `http://localhost:8080/untitled1/modifyCartItem?userId=${userId}&itemId=${id}&quantity=${quantity}`
      )
      .then((res) => {
        setItemId(parseInt(id) + Math.random() * 5);
      });
  };

  const removeItem = (id) => {
    console.log(id);
    console.log(userId);

    axios
      .post(
        `http://localhost:8080/untitled1/cartRemoveItem?userId=${userId}&itemId=${id}`
      )
      .then((res) => {
        setItemId(parseInt(id) + Math.random() * 5);
      });
  };

  if (!listItems) {
    return <Loading />;
  }

  return (
    <div>
      <NavbarUser />

      <div className="cart-container">
        <div className="mt-5 cart-main">
          <div className="cart-left p-4">
            {listItems.map((item) => (
              <div className="item-box1  shadow-md mb-8 p-4 " key={item.id}>
                <div className="item-box1-left">
                  <div className="item-image-container flex p-2 ">
                    <Image
                      src={phone}
                      alt={item.name}
                      height={200}
                      width={200}
                    />
                  </div>
                </div>
                <div className="item-box1-right justify-around">
                  <div className="flex justify-self-start">
                    <h3 className="text-2xl">{item.name}</h3>
                  </div>

                  <div className="flex justify-self-start mt-2">
                    <p>{item.description}</p>
                  </div>

                  <div className="flex justify-self-start mt-2">
                    <p>₹{item.price}</p>
                  </div>

                  {item.quantity === 0 ? (
                    <div
                      onClick={() => {
                        addNewItem(item.id);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 rounded-xl  flex justify-center mt-2 item-center p-2"
                    >
                      <div className="flex flex-row">
                        <h3 className="text-xl text-white">Add to Cart</h3>
                        <BsCartPlusFill color="white" size={25} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-around align-middle flex-row">
                      <div className="flex flex-row">
                        <div
                          className="mr-3 pt-1"
                          onClick={() => {
                            updateItem(item.id, item.quantity - 1);
                          }}
                        >
                          <GrSubtractCircle size="30" />
                        </div>

                        <div className="pt-1">
                          <p className="text-lg">{item.quantity}</p>
                        </div>

                        <div
                          className="ml-3 "
                          onClick={() => {
                            updateItem(item.id, item.quantity + 1);
                          }}
                        >
                          <IoAddCircleOutline size="38" />
                        </div>
                      </div>
                      <div
                        className="bg-red-500 rounded-lg p-2 pr-4 pl-4"
                        onClick={() => {
                          removeItem(item.id);
                        }}
                      >
                        Remove
                        </div>
                     
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
