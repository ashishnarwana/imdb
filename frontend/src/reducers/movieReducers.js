const {
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_DETAILS_FAIL,
  MOVIE_CREATE_REQUEST,
  MOVIE_CREATE_SUCCESS,
  MOVIE_CREATE_FAIL,
  MOVIE_CREATE_RESET,
  MOVIE_UPDATE_REQUEST,
  MOVIE_UPDATE_SUCCESS,
  MOVIE_UPDATE_FAIL,
  MOVIE_UPDATE_RESET,
  MOVIE_DELETE_REQUEST,
  MOVIE_DELETE_SUCCESS,
  MOVIE_DELETE_FAIL,
  MOVIE_DELETE_RESET,
  MOVIE_CATEGORY_LIST_REQUEST,
  MOVIE_CATEGORY_LIST_SUCCESS,
  MOVIE_CATEGORY_LIST_FAIL,
  MOVIE_REVIEW_CREATE_REQUEST,
  MOVIE_REVIEW_CREATE_SUCCESS,
  MOVIE_REVIEW_CREATE_FAIL,
  MOVIE_REVIEW_CREATE_RESET,
} = require('../constants/movieConstants');

export const movieListReducer = (
  state = { loading: true, movies: [] },
  action
) => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
      return { loading: true };
    case MOVIE_LIST_SUCCESS:
      return {
        loading: false,
        movies: action.payload.movies,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case MOVIE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const movieCategoryListReducer = (
  state = { loading: true, movies: [] },
  action
) => {
  switch (action.type) {
    case MOVIE_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case MOVIE_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case MOVIE_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const movieDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case MOVIE_DETAILS_REQUEST:
      return { loading: true };
    case MOVIE_DETAILS_SUCCESS:
      return { loading: false, movie: action.payload };
    case MOVIE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const movieCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_CREATE_REQUEST:
      return { loading: true };
    case MOVIE_CREATE_SUCCESS:
      return { loading: false, success: true, movie: action.payload };
    case MOVIE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case MOVIE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const movieUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_UPDATE_REQUEST:
      return { loading: true };
    case MOVIE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case MOVIE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case MOVIE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const movieDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_DELETE_REQUEST:
      return { loading: true };
    case MOVIE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MOVIE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case MOVIE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const movieReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case MOVIE_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case MOVIE_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case MOVIE_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
