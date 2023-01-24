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
import { IoArrowForward } from "react-icons/io5";

import { FaGreaterThan } from "react-icons/fa";

const TrackOrder = () => {

  const [ordersList, setOrdersList] = useState()
  const [orderId,setOrderId]=useState()
  const getDetails = () => {

    axios.post(
      `http://localhost:8080/untitled1/orderDetail?id=${orderId}`
    ).then((res) => {
      setOrdersList(res.data);
      console.log(ordersList)
      
    })


  };

  if (!ordersList) {
    <Loading/>
  }
  return (
    <div className="">
      <div className="flex flex-row w-1/4 m-auto mt-8 items-center">
        <label className="block text-gray-700 text-sm font-bold mr-4 mb-2">
          Order Id:
        </label>

        <input
          className="shadow appearance-none border rounded w-full m-2 mr-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Order Id"
          autocomplete="off"
          onChange={(e) => {
            setOrderId(e.target.value);
          }}
        />

        <button
          className="p-2 bg-slate-600 rounded-lg text-white"
          onClick={() => {
            getDetails();
          }}
        >
          Get Details
        </button>


      </div>
      
      <div className="w-4/5 m-auto">




        {
          
          ordersList &&
          
          
          
            ordersList.map((order) => (
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
                    <p className="text-lg">₹{order.price}</p>
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
            ))
        
          }
          </div>
    </div>
  );
};

export default TrackOrder;
