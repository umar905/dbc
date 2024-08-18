import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { MDBIcon } from 'mdb-react-ui-kit'; 
import './AllCrads.css'; 
import { Link } from 'react-router-dom';

const AllCrads = () => {
  const [data, setData] = useState([]); // Initialize as empty array
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Function to fetch card data
  const getCards = async () => {
    try {
      const res = await axios.get('https://ntbackend.uz/api/cards/all', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Access")}`,
        },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert('An error occurred while fetching data.');
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    getCards();
  }, []);

  // Filter cards based on search query
  const filteredCards = data.filter(card =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>All Cards</h1>
      
      <b><Link to={'/createcard'}>Create Card</Link></b> ||  <b onClick={()=>{
          localStorage.removeItem("Access")
                window.location.reload()
        }}>Log out</b>
      <br />
      <br />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      
      {filteredCards.length > 0 ? (
        filteredCards.map((card) => (
          <Link to={`/mycard/${card._id}`} className="card card2" key={card._id}>
            <div className="cardsec">
              <img
                className="pfp"
                src={`https://ntbackend.uz/static/${card.image}`}
                alt="Card"
              />
              <div className="cardinfo">
                <h1>
                  {card.name} {card.title}
                </h1>
                <h3>{card.businessName}</h3>
                <b>{card.content}</b>
                <br />
                <b>{card.links?.telegram}</b>
                <br />
                <b>
                  <MDBIcon fas icon="message me-1" className="icons" />{' '}
                  {card.email}
                </b>
                <br />
                <b>{card.phoneNumber}</b>
              </div>
            </div>
            <br />  
          </Link>
        ))
      ) : (
        <p>No cards found.</p>
      )}
    </div>
  );
};

export default AllCrads;
