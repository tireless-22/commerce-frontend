import { list } from "postcss";
import React, { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";

import { getFetcher } from "../../utils/swr";
import Loading from "../../components/loading";
import Image from "next/image";
import { BsCartPlusFill } from "react-icons/bs";
import phone from "../../images/phone.jpeg";
import NavbarUser from "@/components/navbarUser";
import NavbarAdmin from "@/components/navbarAdmin";
import { IoAddCircleSharp } from "react-icons/io5";
import { GrSubtractCircle } from "react-icons/gr";
import { IoAddCircleOutline } from "react-icons/io5";

import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

import axios from "axios";
import Router from "next/router";

const Index = () => {
  let userMail = "";
  let userId = "";
  let role = "";

  const [itemId, setItemId] = useState(0);
  const [listItems, setListItems] = useState();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageId, setImageId] = useState("");
  const [quantity, setQuantity] = useState("");

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
  console.log("listItems", listItems);

  useEffect(() => {
    axios.post(`http://localhost:8080/untitled1/items`).then((res) => {
      setListItems(res.data);
    });
  }, [userId]);

  if (!listItems) {
    return <Loading />;
  }

  return (
    <div className="admin-container">
      <NavbarAdmin />
      <div className="mt-5 admin-main">
        <div className="admin-item-header">
          <div className="admin-item-sub">NAME</div>
          <div className="admin-item-sub">DESCRIPTION</div>

          <div className="admin-item-sub">PRICE</div>
          <div className="admin-item-sub">IMAGE ID</div>
          <div className="admin-item-sub">QUANTITY</div>
          <div className="admin-item-sub"></div>
        </div>

        <div className="admin-item-add">
          <div className="admin-item-sub">
            <input
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="name"
              autocomplete="off"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="admin-item-sub">
            <input
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              placeholder="Description"
              autocomplete="off"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="admin-item-sub">
            <input
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="text"
              placeholder="price"
              autocomplete="off"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="admin-item-sub"></div>
          <div className="admin-item-sub">
            <input
              className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="quantity"
              autocomplete="off"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="admin-item-sub  ">
            <div className="bg-green-600 rounded-xl p-2 pl-8 pr-8">
              <div className="flex flex-row">
                <div className="flex justify-center align-middle">
                  <p className="text-xl mt-1 text-white">ADD</p>
                </div>
                <div>
                  <IoAddCircleSharp className=" rounded-lg " color="white" size="35" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {listItems.map((item) => (
          <div className="admin-item" key={item.id}>
            <div className="admin-item-sub">{item.name}</div>
            <div className="admin-item-sub">{item.description}</div>
            <div className="admin-item-sub">{item.price}</div>
            <div className="admin-item-sub">{item.image_id}</div>
            <div className="admin-item-sub">{item.quantity}</div>
            <div className="admin-item-sub">
              <div className="mr-4">
                <AiFillEdit onClick={() => {}} size="30" />
              </div>

              <div>
                <AiFillDelete size="30" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
