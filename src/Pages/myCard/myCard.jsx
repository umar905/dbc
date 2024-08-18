import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import "./myCard.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import toast, { Toaster } from 'react-hot-toast';

// Define styles for modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MyCard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [content, setContent] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [links, setLinks] = useState({
    telegram: "",
    facebook: "",
  });

  const handleClose = () => setOpen(false);

  const getCards = async () => {
    try {
      const res = await axios.get(`https://ntbackend.uz/api/cards/card/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("Access")}`,
        },
      });
      setData(res.data);
    } catch (err) {
      toast.error('Error fetching card data');
    }
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(`https://ntbackend.uz/api/cards/delete/${id}/card`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("Access")}`,
        },
      });
      toast.success('Card deleted successfully');
      navigate('/allcards');
    } catch (error) {
      toast.error('It is not your card');
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setModalData(data.data);
    setName(data.data?.name);
    setTitle(data.data?.title);
    setBusinessName(data.data?.businessName);
    setContent(data.data?.content);
    setPhoneNumber(data.data?.phoneNumber);
    setEmail(data.data?.email);
    setLinks({
      telegram: data.data?.links?.telegram,
      facebook: data.data?.links?.facebook,
    });
  };

  const updateCard = async (e) => {
    e.preventDefault();
    const updatedLinks = {
      telegram: links.telegram,
      facebook: links.facebook,
    };

    try {
      await axios.put(`https://ntbackend.uz/api/cards/update/${modalData._id}/my-card`, {
        name,
        title,
        businessName,
        content,
        phoneNumber,
        email,
        links: updatedLinks,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Access")}`,
        },
      });
      toast.success("Card updated successfully");
      handleClose();
      getCards();
    } catch (err) {
      toast.error('It is not your card');
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("Access")) {
      navigate('/');
    }
    getCards();
  }, []);

  return (
    <div className="sectionmcr">
      <div className="container">
        <h1> Card</h1>
        <b><Link to={'/allcards'}>All Cards</Link></b> || <b><Link to={'/createcard'}>Create Card</Link></b> ||  <b onClick={()=>{
          localStorage.removeItem("Access")
                window.location.reload()
        }}>Log out</b>
        <br />
        <br />
        <div className="card card2">
          <div className="cardsec" key={data.data?.user}>
            <img className="pfp" src={`https://ntbackend.uz/static/` + data.data?.image} alt="image" />
            <div className="cardinfo">
              <h1>
                {data.data?.name} {data.data?.title}
              </h1>
              <h3>
                {data.data?.businessName}
              </h3>
              <b>{data.data?.content}</b>
              <Link to={data.data?.links?.telegram} ><b>{data.data?.links?.telegram}</b></Link>
              <br />
              <b>
                <MDBIcon fas icon="message me-1" className="icons" />{" "}
                {data.data?.email}
              </b>
              <br />
              <img src={data.data?.qrcode} alt="" />
              <br />
              <b>{data.data?.phoneNumber}</b>
              <br />
              <br />
              <button className="btn btn2" onClick={() => deleteCard(data.data?._id)}>Delete My Card</button>
              <Toaster />
              <button className="btn btn2" onClick={handleOpen}>Edit My Card</button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button className="btndelete del" onClick={handleClose}>X</button>
          <h2 className="del">Edit</h2>
          <form className="AddTeacherForm" onSubmit={updateCard}>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Business Name"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              type="number"
              placeholder="Phone Number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Telegram"
              required
              value={links.telegram}
              onChange={(e) => setLinks({ ...links, telegram: e.target.value })}
            />
            <input
              type="text"
              placeholder="Facebook"
              value={links.facebook}
              onChange={(e) => setLinks({ ...links, facebook: e.target.value })}
            />
            <button type="submit">Update</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default MyCard;
