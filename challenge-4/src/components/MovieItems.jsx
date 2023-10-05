/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../assets/css/movieItem.css";

export const MovieItems = ({ id, title, overview, imageURL }) => {
  return (
    <Card style={{ width: "90%" }} as={Link} to={`/details/${id}`}>
      <Card.Img variant="top" src={imageURL} className="rounded-bottom" />
      <Card.Body className="text-white">
        <Card.Title className="text-truncate">{title}</Card.Title>
        <Card.Text className="pt-3">{overview}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieItems;
