import React, { useEffect, useRef, useState } from "react";
import Loading from "../../components/loading";
import NavbarAdmin from "@/components/navbarAdmin";
import { IoAddCircleSharp } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Router from "next/router";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL, list } from "firebase/storage";
import { storage } from "../../utils/firebase";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
import { IoAlertCircle } from "react-icons/io5";
import Items from "@/components/items";
import { GrRadialSelected } from "react-icons/gr";
import Image from "next/image";
import background from "../../images/lgBack.jpg";
import form from "../../images/for.svg";
import {FaGreaterThan} from "react-icons/fa"
import {IoArrowForward} from "react-icons/io5"
const AddItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const fileRef = useRef(null);
  const [error, setError] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [update, setUpdate] = useState("");

  const createAItem = () => {
    setPassMessage("");
    setError("");
    console.log(name);
    console.log(description);
    console.log(price);
    console.log(quantity);
    console.log(imageUpload);
    setError("");

    if (
      name === "" ||
      description === "" ||
      price === "" ||
      quantity === "" ||
      imageUpload === ""
    ) {
      console.log("Please fill all the fields");
      setError("Please fill all the fields");
      return;
    }
    const imageRef = ref(storage, `images/${v4()}`);
    console.log(imageRef);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        let fileUrl = imageRef._location.path_;
        fileUrl = fileUrl.slice(7);
        console.log(fileUrl);
        axios
          .post(
            `http://localhost:8080/untitled1/addItem?name=${name}&description=${description}&price=${price}&quantity=${quantity}&image_id=${fileUrl}`
          )
          .then((res) => {
            setPassMessage("uploaded successfully");
            setUpdate(fileUrl);
            setName("");
            setDescription("");
            setPrice("");
            setQuantity("");
            fileRef.current.value = null;
            console.log("fileRef", fileRef.current.value);
          });
      });
    });
  };

  return (
    <>
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
            flexDirection: "column",

            // backgroundImage: `url(${background.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",

            height: "100%",
            width: "100%",
          }}
        >
          <NavbarAdmin />
          <div className="mt-4 navigation flex items-center flex-row">
            <p className="text-2xl">Admin</p>&nbsp;&nbsp;
            <FaGreaterThan />
            &nbsp;
            <p className="text-2xl"> Add</p>
            <p
              onClick={() => {
                Router.push("/admin");
              }}
              className="text-2xl ml-8 cursor-pointer text-blue-700"
            >
              Go to Admin Main Panel
            </p>
            <IoArrowForward
              onClick={() => {
                Router.push("/admin");
              }}
              className="text-2xlcursor-pointer text-blue-700"
            />
          </div>

      
          <div className="sign-box shadow-md rounded-lg">
            <div className="sign-box-left p-8">
              <Image src={form} alt="Add Item" />
            </div>

            <div className="sign-box-left justify-center align-middle">
              <div className="flex flex-col w-full">
                <form className="bg-white mt-8 justify-center align-middle rounded w-5/6">
                  <h1 className="text-4xl mb-4 items-center justify-center  font-sans font-semibold mt-4 mb-2">
                    Add New Item
                  </h1>

                  <div className="mb-8">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      for="gmail"
                    >
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="name"
                      value={name}
                      autocomplete="off"
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>

                  <div className="mb-8">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      for="username"
                    >
                      Description
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="description"
                      type="text"
                      placeholder="Description"
                      value={description}
                      autocomplete="off"
                      onChange={(e) => setDescription(e.target.value)}
                    ></input>
                  </div>

                  <div className="mb-8">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      for="username"
                    >
                      Price
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="price"
                      type="text"
                      value={price}
                      placeholder="price"
                      autocomplete="off"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      for="username"
                    >
                      Quantity
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      value={quantity}
                      placeholder="quantity"
                      autocomplete="off"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="mb-8">
                    <input
                      className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="file_input"
                      ref={fileRef}
                      // value={imageUpload}
                      type="file"
                      onChange={(e) => setImageUpload(e.target.files[0])}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => {
                        createAItem();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </form>

                <div className="justify-center align-middle">
                  <div className="flex justify-center mt-2 mb-2">
                    {error != "" ? (
                      <div className="p-2  pl-8 pr-8 rounded-lg">
                        <p className="text-lg text-red-500">{error}</p>
                      </div>
                    ) : passMessage != "" ? (
                      <div className="p-2 pl-8 pr-8 rounded-lg">
                        <p className="text-lg text-green-500">{passMessage}</p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddItem;
