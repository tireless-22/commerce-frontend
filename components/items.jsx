import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

  import Router from "next/router";
  import { v4 } from "uuid";
  import { ref, uploadBytes, getDownloadURL, list } from "firebase/storage";
  import { storage } from "../utils/firebase"
import { AiFillEdit } from "react-icons/ai";
import Modal from "react-modal"
import { IoAlertCircle } from "react-icons/io5";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "700px",
    height: "680px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};


const Items = ({ currentItems }) => {
  console.log("current Items", currentItems);
    const modalFileRef = useRef(null);

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
 const [modalIsOpen, setIsOpen] = React.useState(false);
  
  
  
  function closeModal() {
    setIsOpen(false);
  }



  const editItem = async (id) => {
    console.log(id);
    await axios
      .post(`http://localhost:8080/untitled1/itemDetails?id=${id}`)
      .then((res) => {
        console.log(res.data);
        setModalId(res.data[0].id);
        setModalName(res.data[0].name);
        setModalDescription(res.data[0].description);
        setModalPrice(res.data[0].price);
        setModalQuantity(res.data[0].quantity);
        setModalImageUpload(res.data[0].image_id);
      });
    setIsOpen(true);
  };

  const updateItem = () => {
    setPassMessage2("");
    setError2("");

    if (
      modalId == "" ||
      modalName == "" ||
      modalPrice == "" ||
      modalQuantity == "" ||
      modalDescription == ""
    ) {
      setError2("Please fill all the details");
    }

    if (modalImageTemp === "") {
      console.log("no image");
      console.log(modalImageUpload);
      axios
        .post(
          `http://localhost:8080/untitled1/updateItem?id=${modalId}&name=${modalName}&description=${modalDescription}&price=${modalPrice}&image_id=${modalImageUpload}&quantity=${modalQuantity}`
        )
        .then((res) => {
          console.log(res.data);
          setUpdate(Math.random() * 5);
          setPassMessage2("Updated Successfully");
        });
    } else {
      const imageRef = ref(storage, `images/${v4()}`);
      uploadBytes(imageRef, modalImageTemp).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          let fileUrl = imageRef._location.path_;
          fileUrl = fileUrl.slice(7);
          console.log(fileUrl);
          axios
            .post(
              `http://localhost:8080/untitled1/updateItem?id=${modalId}&name=${modalName}&description=${modalDescription}&price=${modalPrice}&image_id=${fileUrl}&quantity=${modalQuantity}`
            )
            .then((res) => {
              setUpdate(Math.random() * 5);
              setPassMessage2("Updated Successfully");
              console.log(res.data);
            });
        });
      });
    }
  };
  return (
    <div>
      {currentItems.map((item) => (
        <div className="admin-item" key={item.id}>
          <div className="admin-item-sub">
            {item.quantity <= 10 && <IoAlertCircle color="red" size="25" />}
            {item.name}
          </div>
          <div className="admin-item-sub">{item.description}</div>
          <div className="admin-item-sub">{item.price}</div>

          <div className="admin-item-sub2">
            <p
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                window.open(
                  `https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${item.image_id}?alt=media`,
                  "_blank"
                );
              }}
            >
              Link
            </p>
          </div>
          <div className="admin-item-sub">{item.quantity}</div>
          <div className="admin-item-sub">
            <div className="mr-4">
              <AiFillEdit
                className="cursor-pointer"
                onClick={() => {
                  editItem(item.id);
                }}
                size="30"
              />
            </div>
          </div>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="admin-item-modify ">
          <div className="admin-item-sub-modify mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="name"
              value={modalName}
              autocomplete="off"
              onChange={(e) => setModalName(e.target.value)}
            />
          </div>

          <div className="admin-item-sub-modify mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              description
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              placeholder="Description"
              value={modalDescription}
              autocomplete="off"
              onChange={(e) => setModalDescription(e.target.value)}
            />
          </div>

          <div className="admin-item-sub-modify">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="text"
              value={modalPrice}
              placeholder="price"
              autocomplete="off"
              onChange={(e) => setModalPrice(e.target.value)}
            />
          </div>

          <div className="admin-item-sub-modify">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="file_input"
              ref={modalFileRef}
              // value={imageUpload}
              type="file"
              onChange={(e) => setModalImageTemp(e.target.files[0])}
            />
          </div>

          <div className="flex flex-row">
            <p>Previous Image:</p>
            <p
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                window.open(
                  `https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${modalImageUpload}?alt=media`,
                  "_blank"
                );
              }}
            >
              Link
            </p>
          </div>

          <div className="admin-item-sub-modify">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Quantity
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={modalQuantity}
              placeholder="quantity"
              autocomplete="off"
              onChange={(e) => setModalQuantity(e.target.value)}
            />
          </div>

          <div className="admin-item-sub mt-8  ">
            <div className="bg-green-600 rounded-xl p-2 pl-8 pr-8">
              <div
                className="flex flex-row"
                onClick={() => {
                  updateItem(modalId);
                }}
              >
                <div className="flex justify-center align-middle">
                  <p className="text-xl mt-1 text-white">UPDATE</p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center  mb-2">
          {error2 != "" ? (
            <div className="p-2  pl-8 pr-8 rounded-lg">
              <p className="text-lg text-red-500">{error2}</p>
            </div>
          ) : passMessage2 != "" ? (
            <div className="p-2 pl-8 pr-8 rounded-lg">
              <p className="text-lg text-green-500">{passMessage2}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Items;
