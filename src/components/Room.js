import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../images/room-1.jpeg";
import PropTypes from "prop-types";

export default function Room({ room }) {
  // Destructure the room object to retrieve relevant properties
  const { name, slug, images, price } = room;

  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImage} alt={name} />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${slug}`} className="btn-primary room-link">
          Features
        </Link>
      </div>
      <p className="room-info">{name}</p>
    </article>
  );
}

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number.isRequired,
  }),
};
