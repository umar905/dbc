import React, { useEffect, useState } from "react";
import "./CreateCard.css";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreateCard = () => {
  const [file, setFile] = useState(null);
  const API = "https://ntbackend.uz/api/cards/create-card/";
  const navigate = useNavigate()
  const createCard = (e) => {
    e.preventDefault();

    let data = { telegram: e.target[7].value };
    let myjson = JSON.stringify(data);

    // Create a FormData object
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", e.target[1].value);
    formData.append("title", e.target[2].value);
    formData.append("email", e.target[3].value);
    formData.append("businessName", e.target[4].value);
    formData.append("content", e.target[5].value);
    formData.append("phoneNumber", e.target[6].value);
    formData.append("links", myjson);

    // Post the form data
    axios
      .post(API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("Access")}`,
        },
      })
      .then((res) => window.location.replace(`/mycard/${res.data._id}`))
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  useEffect(() => {
    if(!localStorage.getItem("Access")){
      navigate('/')
    }
  },[])

  return (
    <section className="sec1">
      <div className="container">
        <h1>
          Create Your <br /> Business Card
        </h1>
        <b><Link to={'/allcards'}>All Cards</Link></b> ||   <b onClick={()=>{
          localStorage.removeItem("Access")
                window.location.reload()
        }}>Log out</b>
        <br />
        <br />
        <form className="form" onSubmit={createCard}>
          <input type="file" id="uploadBtn" onChange={handleFileChange} />
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Your Email" />
          <input type="text" placeholder="Your Business" />
          <input type="text" placeholder="Your Content" />
          <input type="text" placeholder="Your Phone Number" />
          <input type="text" placeholder="Your Telegram" />

          <label htmlFor="uploadBtn" className="labelBtn">
            <FaCamera /> <br />
            Add Your Photo
          </label>
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateCard;
