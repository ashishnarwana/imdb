import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
//import { Carousel } from 'react-responsive-carousel';
//import Movie from '../components/Movie';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listMovies } from '../actions/movieActions';
import Movie from '../components/Movie';
//import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList);
  const { loading, error, movies } = movieList;

  console.log('....movieList');
  console.log(movieList);
  


  useEffect(() => {
    dispatch(listMovies({}));
  //  dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      <h2>Featured Movies</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {movies.length === 0 && <MessageBox>No Movie Found</MessageBox>}
          <div className="row center">
            {movies.map((movie) => (
              <Movie key={movie._id} movie={movie}></Movie>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
