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

import { IoArrowForward } from "react-icons/io5";

import axios from "axios";
import Router from "next/router";
const Items = () => {
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

  useEffect(() => {
    axios
      .post(`http://localhost:8080/untitled1/listItems?userId=${userId}`)
      .then((res) => {
        setListItems(res.data);
        // console.log(listItems);
      });
  }, [userId, itemId]);

  console.log(listItems)
  const addNewItem = (id) => {
    console.log(id);
    console.log(userId);

    axios
      .post(
        `http://localhost:8080/untitled1/addItemsToCart?userId=${userId}&itemId=${id}&quantity=1`
      )
      .then((res) => {
        setItemId(id);
      });
  };

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

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {listItems.map((item) => (
          <div className="item-box shadow-2xl p-4 " key={item.id}>
            <div className="item-image-container flex p-4 ">
              {/* <Image src={phone} alt={item.name} height={300} width={300} /> */}
              <Image
                src={`https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${item.image_id}?alt=media`}
                width={300}
                height={300}
                alt={item.name}
              />
            </div>
            <div className="flex justify-center">
              <h3 className="text-2xl">{item.name}</h3>
            </div>
            <div className="flex justify-center mt-2">
              <p>{item.description}</p>
            </div>
            <div className="flex justify-center mt-2">
              <p>₹{item.price}</p>
            </div>
            {item.quantity === 0 ? (
              <div
                onClick={() => {
                  addNewItem(item.id);
                }}
                className="bg-blue-500 hover:bg-blue-700 rounded-xl  flex justify-center mt-2 item-center p-2 cursor-pointer"
              >
                <div className="flex flex-row ">
                  <h3 className="text-xl text-white">Add to Cart</h3>
                  <BsCartPlusFill color="white" size={25} />
                </div>
              </div>
            ) : (
              <div className="flex mt-2 justify-around align-middle flex-row">
                <div className="flex flex-row">
                  <div className="mr-3 pt-1">
                    <GrSubtractCircle
                      onClick={() => {
                        updateItem(item.id, item.quantity - 1);
                      }}
                      size="30"
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="pt-1">
                    <p className="text-lg">{item.quantity}</p>
                  </div>

                  <div className="ml-3 ">
                    <IoAddCircleOutline
                      onClick={() => {
                        updateItem(item.id, item.quantity + 1);
                      }}
                      size="38"
                      className="cursor-pointer"
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

                <div
                  className="bg-green-500 rounded-lg p-2 flex flex-row pr-4 pl-4 cursor-pointer"
                  onClick={() => {
                    Router.push("/user/cart");
                  }}
                >
                  <h4 className="text-lg text-white">Cart</h4>
                  <IoArrowForward color="white" size="25" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Items;
