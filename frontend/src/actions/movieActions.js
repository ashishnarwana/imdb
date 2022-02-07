import Axios from 'axios';
import { API_URL } from '../config/index';

import {
  MOVIE_CREATE_FAIL,
  MOVIE_CREATE_REQUEST,
  MOVIE_CREATE_SUCCESS,
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_UPDATE_REQUEST,
  MOVIE_UPDATE_SUCCESS,
  MOVIE_UPDATE_FAIL,
  MOVIE_DELETE_REQUEST,
  MOVIE_DELETE_FAIL,
  MOVIE_DELETE_SUCCESS,
  MOVIE_CATEGORY_LIST_SUCCESS,
  MOVIE_CATEGORY_LIST_REQUEST,
  MOVIE_CATEGORY_LIST_FAIL,
  MOVIE_REVIEW_CREATE_REQUEST,
  MOVIE_REVIEW_CREATE_SUCCESS,
  MOVIE_REVIEW_CREATE_FAIL,
} from '../constants/movieConstants';

export const listMovies =
  ({
    pageNumber = '',
    name = '',
    genre = '',
    order = '',
    min = 0,
    max = 0,
    rating = 0,
  }) =>
  async (dispatch) => {
    dispatch({
      type: MOVIE_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `${API_URL}/api/movies?pageNumber=${pageNumber}&name=${name}&category=${genre}&min=${min}&max=${max}&rating=${rating}&order=${order}`
      );
      dispatch({ type: MOVIE_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: MOVIE_LIST_FAIL, payload: error.message });
    }
  };

export const listMovieCategories = () => async (dispatch) => {
  dispatch({
    type: MOVIE_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`${API_URL}/api/movies/categories`);
    dispatch({ type: MOVIE_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MOVIE_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsMovie = (movieId) => async (dispatch) => {
  dispatch({ type: MOVIE_DETAILS_REQUEST, payload: movieId });
  try {
    const { data } = await Axios.get(`${API_URL}/api/movies/${movieId}`);
    dispatch({ type: MOVIE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MOVIE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createMovie = () => async (dispatch, getState) => {
  dispatch({ type: MOVIE_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `${API_URL}/api/movies`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );

    console.log('Movies data');
    console.log(data);

    dispatch({
      type: MOVIE_CREATE_SUCCESS,
      payload: data.movie,
    });

    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: MOVIE_CREATE_FAIL, payload: message });
  }
};
export const updateMovie = (movie) => async (dispatch, getState) => {
  dispatch({ type: MOVIE_UPDATE_REQUEST, payload: movie });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`${API_URL}/api/movies/${movie._id}`, movie, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: MOVIE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: MOVIE_UPDATE_FAIL, error: message });
  }
};
export const deleteMovie = (movieId) => async (dispatch, getState) => {
  dispatch({ type: MOVIE_DELETE_REQUEST, payload: movieId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    await Axios.delete(`${API_URL}/api/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: MOVIE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: MOVIE_DELETE_FAIL, payload: message });
  }
};
export const createReview =
  (movieId, review) => async (dispatch, getState) => {
    dispatch({ type: MOVIE_REVIEW_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `${API_URL}/api/movies/${movieId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: MOVIE_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: MOVIE_REVIEW_CREATE_FAIL, payload: message });
    }
  };
