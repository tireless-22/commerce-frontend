import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";
import NavbarUser from "@/components/navbarUser";
import axios from "axios";
import Router from "next/router";
import Image from "next/image";
import phone from "../../images/phone.jpeg";
import moment from "moment/moment";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import {IoArrowForward} from "react-icons/io5"

import {FaGreaterThan} from "react-icons/fa"

const Orders = () => {
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

  const [ordersList, setOrdersList] = useState();

  useEffect(() => {
    console.log("hello");
    axios
      .post(`http://localhost:8080/untitled1/ordered?userId=${userId}`)
      .then((res) => {
        console.log("orderList", res.data);
        setOrdersList(res.data);
        console.log(ordersList);
      });
  }, [userId, userMail]);

  console.log("ordersList", ordersList);

  const createAItem = () => {
    setError("");

    if (imageUpload == null || clubName === "" || clubType === "") {
      setError("Please fill all the fields");
      return;
    }

    const imageRef = ref(storage, `images/${v4()}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const name = clubName;
        const description = clubDescription;
        console.log(url);

        let fileUrl = imageRef._location.path_;
        fileUrl = fileUrl.slice(7);

        Axios.post("/api/club/create", {
          name: name.trim(),
          clubType: clubType.trim(),
          fileUrl: fileUrl,
        })
          .then((response) => {
            console.log(response.data);
            setPassMessage("Club created successfully");
            Router.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  if (!ordersList) {
    return <Loading />;
  }
  return (
    <div>
      <NavbarUser />

      <div className="order-items">
        <div className="mt-4 flex items-center flex-row">
          <p className="text-2xl">User</p>&nbsp;&nbsp;
          <FaGreaterThan />
          &nbsp;
          <p className="text-2xl"> Orders</p>
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
            className="text-2xl ursor-pointer text-blue-500"
          />
        </div>
        {ordersList.map((order) => (
          <div key={ordersList.orderId} className="p-8 mt-4 mb-4 shadow-lg">
            <div className="mb-2">
              <div>
                <p className="text-lg">Order Id : &nbsp; {order.orderId}</p>
              </div>
            </div>

            <div className="order-item ">
              <div className="order-item-item">
                <Image
                  src={`https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${order.image_id}?alt=media`}
                  width={120}
                  height={120}
                  alt={order.name}
                />
              </div>

              <div className="order-item-item text-2xl mt-2">{order.name}</div>

              <div className="order-item-item aligin-middle items-center">
                <p className="text-2xl">Price</p>

                <p className="order-item-item text-lg">₹{order.price}</p>
              </div>

              <div className="order-item-item">
                <p className="text-2xl">Quantity</p>
                <p className="text-lg">&nbsp; {order.quantity}</p>
              </div>

              <div className="order-item-item">
                <p className="text-2xl">Delivered On &nbsp;</p>
                <p className="text-lg">
                  {moment(order.created_at).format("DD/MMM  ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Orders;
