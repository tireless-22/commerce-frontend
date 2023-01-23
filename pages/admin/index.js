import React, { useEffect, useRef, useState } from "react";
import Loading from "../../components/loading";
import NavbarAdmin from "@/components/navbarAdmin";
import { IoAddCircleSharp } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Router from "next/router";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import Modal from "react-modal";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "700px",
    height:"700px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Index = () => {
  let userMail = "";
  let userId = "";
  let role = "";
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [itemId, setItemId] = useState(0);
  const [listItems, setListItems] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
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

  const [error2, setError2] = useState("")
  const [passMessage2,setPassMessage2]=useState("")


  const fileRef = useRef(null);
  const modalFileRef = useRef(null);

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
    axios.post(`http://localhost:8080/untitled1/items`).then((res) => {
      setListItems(res.data);
    });
  }, [userId, update]);

  if (!listItems) {
    return <Loading />;
  }
  const editItem =async (id) => {
    console.log(id);
    await axios.post(`http://localhost:8080/untitled1/itemDetails?id=${id}`)
    .then((res) => {
      console.log(res.data);
      setModalId(res.data[0].id);
      setModalName(res.data[0].name);
      setModalDescription(res.data[0].description);
      setModalPrice(res.data[0].price);
      setModalQuantity(res.data[0].quantity);
      setModalImageUpload(res.data[0].image_id);
    })
    setIsOpen(true);
  };


  const updateItem = () => {


    setPassMessage2("");
    setError2("")


    if (modalId == "" || modalName == "" || modalPrice == "" || modalQuantity == "" || modalDescription == "") {
      setError2("Please fill all the details")
    }

    if (modalImageTemp === "") {
      console.log("no image")
      console.log(modalImageUpload)
        axios
          .post(
            `http://localhost:8080/untitled1/updateItem?id=${modalId}&name=${modalName}&description=${modalDescription}&price=${modalPrice}&image_id=${modalImageUpload}&quantity=${modalQuantity}`
          )
          .then((res) => {
            console.log(res.data);
            setUpdate(Math.random() * 5);
            setPassMessage2("Updated Successfully");
          });
    }
    else {
      const imageRef = ref(storage, `images/${v4()}`);
      uploadBytes(imageRef, modalImageTemp).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          let fileUrl = imageRef._location.path_;
          fileUrl = fileUrl.slice(7);
          console.log(fileUrl);
          axios.post(
            `http://localhost:8080/untitled1/updateItem?id=${modalId}&name=${modalName}&description=${modalDescription}&price=${modalPrice}&image_id=${fileUrl}&quantity=${modalQuantity}`
          ).then((res) => {
            setUpdate(Math.random() * 5);
            setPassMessage2("Updated Successfully")
            console.log(res.data)
          })
        });
      });
    }

  }


  // const deleteItem = (id) => {
  //   console.log(id);

  //   axios.post(`http://localhost:8080/untitled1/deleteItem?id=${id}`).then((res) => {
  //     console.log(res.data)
  //   })
  // };

  function closeModal() {
    setIsOpen(false);
  }

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
    <div className="admin-container">
      <NavbarAdmin />
      <div className="mt-5 admin-main">
        <div className="admin-item-header">
          <div className="admin-item-sub">NAME</div>
          <div className="admin-item-sub">DESCRIPTION</div>

          <div className="admin-item-sub">PRICE</div>
          <div className="admin-item-sub2">IMAGE ID</div>
          <div className="admin-item-sub">QUANTITY</div>
          <div className="admin-item-sub"></div>
        </div>

        <div className="flex flex-col">
          <div className="admin-item-add">
            <div className="admin-item-sub">
              <input
                className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="name"
                value={name}
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
                value={description}
                autocomplete="off"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="admin-item-sub">
              <input
                className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="text"
                value={price}
                placeholder="price"
                autocomplete="off"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="admin-item-sub2">
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="file_input"
                ref={fileRef}
                // value={imageUpload}
                type="file"
                onChange={(e) => setImageUpload(e.target.files[0])}
              />
            </div>
            <div className="admin-item-sub">
              <input
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                value={quantity}
                placeholder="quantity"
                autocomplete="off"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="admin-item-sub  ">
              <div className="bg-green-600 rounded-xl p-2 pl-8 pr-8">
                <div
                  className="flex flex-row"
                  onClick={() => {
                    createAItem();
                  }}
                >
                  <div className="flex justify-center align-middle">
                    <p className="text-xl mt-1 text-white">ADD</p>
                  </div>
                  <div>
                    <IoAddCircleSharp
                      className=" rounded-lg "
                      color="white"
                      size="35"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

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

        {listItems.map((item) => (
          <div className="admin-item" key={item.id}>
            <div className="admin-item-sub">{item.name}</div>
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
                  onClick={() => {
                    editItem(item.id);
                  }}
                  size="30"
                />
              </div>

              {/* <div>
                <AiFillDelete
                  size="30"
                  onClick={() => {
                    deleteItem(item.id);
                  }}
                />
              </div> */}
            </div>
          </div>
        ))}
      </div>

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

          <div className="admin-item-sub-modify">
            <p>Previous Image:</p>
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

          <div className="admin-item-sub-modify  ">
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
        <div className="flex justify-center mt-2 mb-2">
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

export default Index;
