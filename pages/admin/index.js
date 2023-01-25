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

const Index = () => {
  let userMail = "";
  let userId = "";
  let role = "";
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [itemId, setItemId] = useState(0);
  const [listItems, setListItems] = useState();

  const [modalId, setModalId] = useState();
  const [modalName, setModalName] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalPrice, setModalPrice] = useState("");
  const [modalQuantity, setModalQuantity] = useState("");
  const [modalImageUpload, setModalImageUpload] = useState(null);
  const [modalImageTemp, setModalImageTemp] = useState("");
  const [itemDetails, setItemDetails] = useState([]);
  const imagesListRef = ref(storage, "images/");
  const [error, setError] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [update, setUpdate] = useState("");
  const [fewQuantity, setFewQuantity] = useState(false);
  const [error2, setError2] = useState("");
  const [passMessage2, setPassMessage2] = useState("");

  const [itemOffset, setItemOffset] = useState(0);

  const [sort, setSort] = useState("");
  const [sortQuantity, setSortQuantity] = useState(false);
  const [sortPrice, setSortPrice] = useState(false);

  const [dropdown, setDropdown] = useState("");

  const endOffset = itemOffset + 5;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % listItems.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const fileRef = useRef(null);

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

  useEffect(() => {
    console.log(fewQuantity, "fewer Quantity");

    console.log(sort);

    axios
      .post(
        `http://localhost:8080/untitled1/items?filter=${fewQuantity}&sort=${sort}`
      )
      .then((res) => {
        setListItems(res.data);
        console.log(
          "triggered******************************************************8"
        );
        console.log("res.data", res.data);
      });
  }, [userId, update, fewQuantity, sort]);

  if (!listItems) {
    return <Loading />;
  }

  const currentItems = listItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(listItems.length / 5);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSort(e.target.value);
  };



  return (
    <div className="flex flex-col">
      <div className="admin-container">
        <NavbarAdmin />
        <div className="mt-5 admin-main">
          <div className="w-4/5 h-4 mt-4 mb-8 m-auto justify-end flex flex-row">
            <div className="flex flex-1 justify-end mr-16 items-center">
              <input
                className="h-4 mr-1"
                type="checkbox"
                value={fewQuantity}
                onChange={() => {
                  setFewQuantity(!fewQuantity);
                }}
              />
              <div>
                <p className="text-xl">Few Quantity Items</p>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <select
                className="p-2 pr-4 border-black bg-slate-200 rounded-md pl-4"
                onChange={handleChange}
              >
                <option value="quantityAsc" className="rounded-md">
                  <p className="text-xl">Quantity Ascending</p>
                </option>

                <option value="quantityDesc" className="rounded-md">
                  <p className="text-xl">Quantity Descending</p>
                </option>
                <option value="priceAsc" className="rounded-md">
                  <p className="text-xl">Price Ascending</p>
                </option>

                <option value="priceDesc" className="rounded-md">
                  <p className="text-xl">Price Descending</p>
                </option>
              </select>
            </div>
          </div>

          <div className="admin-item-header">
            <div className="admin-item-sub">NAME</div>
            <div className="admin-item-sub">DESCRIPTION</div>

            <div className="admin-item-sub">PRICE</div>
            <div className="admin-item-sub">IMAGE ID</div>
            <div className="admin-item-sub">QUANTITY</div>
            <div className="admin-item-sub"></div>
          </div>

          <>
            <Items currentItems={currentItems} />
            <div className="table ">
              <ReactPaginate
                // id="horizontal-list"
                className="horizontal-list"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
              />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Index;
