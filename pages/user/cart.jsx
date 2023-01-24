import { list } from "postcss";
import React, { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { v4 as uuidv4 } from "uuid";
import { getFetcher } from "../../utils/swr";
import Loading from "../../components/loading";
import Image from "next/image";
import { BsCartPlusFill } from "react-icons/bs";
import phone from "../../images/phone.jpeg";
import NavbarUser from "@/components/navbarUser";
import noItems from "../../images/noOrder.svg";

import { IoAddCircleSharp } from "react-icons/io5";
import { GrSubtractCircle } from "react-icons/gr";
import { IoAddCircleOutline } from "react-icons/io5";

import axios from "axios";
import Router from "next/router";
import { IoArrowForward } from "react-icons/io5";
import { FaGreaterThan } from "react-icons/fa";
const Cart = () => {
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
    if (role === "admin") {
      Router.push("/admin/");
    }
  }

  const [listItems, setListItems] = useState();
  const [itemId, setItemId] = useState();

  const [cartPrice, setCartPrice] = useState(0);

  useEffect(() => {
    axios
      .post(`http://localhost:8080/untitled1/cartItems?userId=${userId}`)
      .then((res) => {
        setListItems(res.data);
        console.log(listItems)
      });

    axios
      .post(`http://localhost:8080/untitled1/cartPrice?userId=${userId}`)
      .then((res) => {
        setCartPrice(res.data);
      });
  }, [userId, itemId]);

  const placeOrder = () => {
    const id = uuidv4();
    console.log(id);

    axios
      .post(
        `http://localhost:8080/untitled1/order?id=${id}&userId=${userId}&price=${cartPrice}`
      )
      .then((res) => {
        console.log("hello");
        Router.push("/user/orders");
      });
  };

  const updateItem = (id, quantity,available) => {
    if (quantity == 0) {
      return;
    }
    if (quantity > available) {
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

      <div className="mt-8 navigation flex items-center flex-row">
        <p className="text-2xl">User</p>&nbsp;&nbsp;
        <FaGreaterThan />
        &nbsp;
        <p className="text-2xl"> Cart</p>
        <p
          onClick={() => {
            Router.push("/user/items");
          }}
          className="text-2xl ml-8 cursor-pointer text-blue-500"
        >
          
          Go to Shopping zone
        </p>
        <IoArrowForward
          onClick={() => {
            Router.push("/user/items");
          }}
          className="text-2xlcursor-pointer text-blue-500"
        />
      </div>

      {listItems.length === 0 ? (
        <div className="mt-12 flex flex-col justify-center align-middle items-center">
          <div>
            <Image src={noItems} alt="No Items here" />
          </div>
          <div className="mt-4">
            <p className="text-4xl">Your Cart is empty!</p>
          </div>
          <div>Add Items to it now.</div>

          <div className="mt-4">
            <button className="bg-blue-500  p-4 pl-12 pr-12 rounded-lg">
              <h2
                className="text-2xl text-white"
                onClick={() => {
                  Router.push("/user/items");
                }}
              >
                Shop now
              </h2>
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-container">
          <div className="mt-5 cart-main">
            <div className="cart-left p-4">
              {listItems.map((item) => (
                <div className="item-box1  shadow-md mb-8 p-4 " key={item.id}>
                  <div className="item-box1-left">
                    <div className="item-image-container flex p-2 ">
                      {/* <Image
                        src={phone}
                        alt={item.name}
                        height={200}
                        width={200}
                      /> */}
                      <Image
                        src={`https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${item.imageId}?alt=media`}
                        width={200}
                        height={200}
                        alt={item.name}
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
                          <BsCartPlusFill
                            color="white"
                            className="cursor-pointer"
                            size={25}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-around align-middle flex-row">
                        <div className="flex flex-row">
                          <div
                            className="mr-3 pt-1"
                            onClick={() => {
                              updateItem(item.id, item.quantity - 1,item.availabe);
                            }}
                          >
                            <GrSubtractCircle
                              className="cursor-pointer"
                              size="30"
                            />
                          </div>

                          <div className="pt-1">
                            <p className="text-lg">{item.quantity}</p>
                          </div>

                          <div
                            className="ml-3 "
                            onClick={() => {
                              updateItem(item.id, item.quantity + 1,item.availabe);
                            }}
                          >
                            <IoAddCircleOutline
                              className="cursor-pointer"
                              size="38"
                            />
                          </div>
                        </div>
                        <div
                          className="bg-red-500 rounded-lg p-2 pr-4 pl-4 cursor-pointer"
                          onClick={() => {
                            removeItem(item.id);
                          }}
                        >
                          <h4 className="text-lg text-white">Remove</h4>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-right p-4">
              <div className="cart-right-header bg-black">
                <h2 className="text-2xl text-white">Price Details</h2>
              </div>

              <div className="ml-4 mt-4 mr-4 flex flex-row justify-between">
                <div>
                  <h2 className="text-lg">Price ( {listItems.length} Items)</h2>
                </div>
                <div>
                  <h2 className="text-lg">₹ {cartPrice}</h2>
                </div>
              </div>

              <div className="ml-4 mb-4 mt-4 mr-4 flex flex-row justify-between">
                <div>
                  <h2 className="text-lg">Delivery Charges</h2>
                </div>
                <div>
                  <h2 className="text-lg">₹ 250</h2>
                </div>
              </div>

              <div className="line"></div>

              <div className="ml-4 mt-4 mb-4 mr-4 flex flex-row justify-between">
                <div>
                  <h2 className="text-2xl">Total Price</h2>
                </div>
                <div>
                  <h2 className="text-2xl">₹ {parseInt(cartPrice) + 250}</h2>
                </div>
              </div>

              <div className="line"></div>

              <div className="flex mt-4 justify-start">
                <button
                  className="bg-orange-500 p-3 pl-16 pr-16 rounded-lg"
                  onClick={() => {
                    placeOrder();
                  }}
                >
                  <h1 className="text-xl text-white">Place Order</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
