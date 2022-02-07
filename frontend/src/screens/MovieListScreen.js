import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  createMovie,
  deleteMovie,
  listMovies,
} from '../actions/movieActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  MOVIE_CREATE_RESET,
  MOVIE_DELETE_RESET,
} from '../constants/movieConstants';

export default function MovieListScreen(props) {
  const navigate = useNavigate();
  const { pageNumber = 1 } = useParams();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf('/seller') >= 0;
  const movieList = useSelector((state) => state.movieList);
  const { loading, error, movies, page, pages } = movieList;

  const movieCreate = useSelector((state) => state.movieCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    movie: createdMovie,
  } = movieCreate;

  console.log('movieCreate');
  console.log(movieCreate);

  const movieDelete = useSelector((state) => state.movieDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = movieDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: MOVIE_CREATE_RESET });
      navigate(`/movie/${createdMovie._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: MOVIE_DELETE_RESET });
    }
    dispatch(
      listMovies({ seller: sellerMode ? userInfo._id : '', pageNumber })
    );
  }, [
    createdMovie,
    dispatch,
    navigate,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (movie) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteMovie(movie._id));
    }
  };
  const createHandler = () => {
    dispatch(createMovie());
  };
  return (
    <div>
      <div className="row">
        <h1>Movies</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Movie
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie._id}</td>
                  <td>{movie.name}</td>
                  <td>{movie.price}</td>
                  <td>{movie.category}</td>
                  <td>{movie.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => navigate(`/movie/${movie._id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? 'active' : ''}
                key={x + 1}
                to={`/movielist/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
