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
const Items = () => {
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

  // const { data: listItems, error: listItemsError } = useSWRImmutable(
  //   "http://localhost:8080/untitled1/listItems?userId=" + userId,
  //   getFetcher
  // );
  // console.log(listItems);

  const [listItems, setListItems] = useState()
  const [itemId,setItemId]=useState()

  useEffect(() => {
    axios.post(`http://localhost:8080/untitled1/listItems?userId=${userId}`)
      .then((res) => {
        setListItems(res.data);
      
    })
    },[userId,itemId])







  const addNewItem = (id) => {
    console.log(id)
    console.log(userId)

     axios
       .post(
         `http://localhost:8080/untitled1/addItemsToCart?userId=${userId}&itemId=${id}&quantity=1`
       )
       .then((res) => {
        //  Router.reload()
         setItemId(id);
         
       });
      


  }
  

  const removeItem = (id) => {
    console.log(id);
    console.log(userId)
    
    
  }



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
              <Image src={phone} alt={item.name} height={300} width={300} />
            </div>
            <div className="flex justify-center">
              <h3 className="text-2xl">{item.name}</h3>
            </div>
            <div className="flex justify-center mt-2">
              <p>{item.description}</p>
            </div>
            <div></div>
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
                  <div className="mr-3 pt-1">
                    <GrSubtractCircle size="30" />
                  </div>

                  <div className="pt-1"> 
                    <p className="text-lg">{item.quantity}</p>
                  </div>

                  <div className="ml-3 ">
                    <IoAddCircleOutline size="38" />
                  </div>
                </div>
                  <div className="bg-red-500 rounded-lg p-2 pr-4 pl-4"
                    onClick={() => {
                    removeItem(item.id)
                  }}
                  >
                  Remove
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
