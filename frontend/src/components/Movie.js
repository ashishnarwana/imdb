import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Movie(props) {
  const { movie } = props;
  return (
    <div key={movie._id} className="card">
      <Link to={`/movie/${movie._id}`}>
        <img className="medium" src={movie.image} alt={movie.name} />
      </Link>
      <div className="card-body">
        <Link to={`/movie/${movie._id}`}>
          <h2>{movie.name}</h2>
        </Link>
        <Rating
          rating={movie.rating}
          numReviews={movie.numReviews}
        ></Rating>
        {/* <div className="row">
          <div className="price">${movie.price}</div>
          <div>
            <Link to={`/seller/${movie.seller._id}`}>
              {movie.seller.seller.name}
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}
