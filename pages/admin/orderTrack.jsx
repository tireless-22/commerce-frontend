import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import Loading from "@/components/loading";
import useSWRImmutable from "swr/immutable";
import moment from "moment/moment";
import { getFetcher } from "../../utils/swr";
import NavbarAdmin from "@/components/navbarAdmin";
import Image from "next/image";
import {FaGreaterThan} from "react-icons/fa"
import {IoArrowForward} from "react-icons/io5"
import Router from "next/router";


const OrderTrack = () => {
  // const [orderId, setOrderId] = useState("");

   const [ordersList, setOrdersList] = useState();
   const [orderId, setOrderId] = useState();
 
  
  useEffect(() => {
      const getDetails = () => {
        axios
          .post(`http://localhost:8080/untitled1/orderDetail?id=${orderId}`)
          .then((res) => {
            setOrdersList(res.data);
            console.log(ordersList);
          });
      };
    
    getDetails()
    
    
    
  },[orderId, ordersList])


  const getDetails = () => {
    axios
      .post(`http://localhost:8080/untitled1/orderDetail?id=${orderId}`)
      .then((res) => {
        setOrdersList(res.data);
        console.log(ordersList);
      });
  };

  const { data: allOrders, error: allOrdersError } = useSWRImmutable(
    "http://localhost:8080/untitled1/allOrders",
    getFetcher
  );

  console.log(allOrders);

  var dict = {};

  if (!allOrders) {
    return <Loading />;
  }

  return (
    <>
      <NavbarAdmin />
      <div className="mt-8 navigation flex items-center flex-row">
        <p className="text-2xl">Admin</p>&nbsp;&nbsp;
        <FaGreaterThan />
        &nbsp;
        <p className="text-2xl"> Order Tracking</p>
        <p
          onClick={() => {
            Router.push("/admin");
          }}
          className="text-2xl ml-8 cursor-pointer text-blue-500"
        >
          Go to Admin Main Panel
        </p>
        <IoArrowForward
          onClick={() => {
            Router.push("/admin");
          }}
          className="text-2xlcursor-pointer text-blue-500"
        />
      </div>


      <div className="track-main flex">
        <div className="flex flex-1 overflow-scroll  flex-col p-8 pt-2 track-left">
          {allOrders.map((order) => (
            <div
              className="flex flex-row p-4 pl-8 pr-8 shadow-md mb-8 justify-between"
              key={order.id}
            >
              <div>
                <div className="flex justify-left">
                  <p className="text-xl">Order Id</p>
                </div>

                <div>
                  <p
                    className="text-md text-blue-500 cursor-pointer"
                    onClick={() => {
                      setOrderId(order.id);
                    }}
                  >
                    <u>{order.id}</u>
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-left">
                  <p className="text-xl">User Id</p>
                </div>

                <div>
                  <p className="text-md">{order.userId}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-left">
                  <p className="text-xl">Total Amount</p>
                </div>

                <div>
                  <p className="text-md">₹ &nbsp; {order.total_amount}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-left">
                  <p className="text-xl">Date</p>
                </div>

                <div>
                  <p className="text-md">
                    {moment(order.created_at).format("DD/MMM  ")}
                  </p>
                </div>
              </div>
              
            </div>
          ))}
        </div>
        <div className="flex flex-1  flex-col track-right">
          <div className="">
            <div className="flex flex-col w-full m-auto pl-4 mt-8 mr-8 items-start">
              <label className="block text-gray-700 text-sm font-bold mr-4 mb-1">
                Order Id:
              </label>

              <input
                className="shadow appearance-none border rounded w-full m-1 ml-0 mr-4 mb-4 py-2 px-3 w-3/5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Order Id"
                autocomplete="off"
                value={orderId}
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

            <div className="w-full pl-2 pr-2 m-auto">
              {ordersList &&
                ordersList.map((order) => (
                  <div
                    key={ordersList.orderId}
                    className="p-4 pl-8 pr-8 mt-2 mb-4 shadow-lg"
                  >
                    <div className="mb-2">
                      <div>
                        <p className="text-lg">
                          Order Id : &nbsp; {order.orderId}
                        </p>
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
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTrack;
