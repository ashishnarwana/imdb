import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Movie from '../models/movieModel.js';
import User from '../models/userModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const movieRouter = express.Router();

movieRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
 
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const genre = req.query.genre || '';
    const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};

    const categoryFilter = genre ? { genre } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { genre: 1 }
        : order === 'highest'
          ? { genre: -1 }
          : order === 'toprated'
            ? { rating: -1 }
            : { _id: -1 };

      
    const count = await Movie.count({
      ...nameFilter,
      ...categoryFilter,
      ...ratingFilter,
    });
 
    const movies = await Movie.find({
      ...nameFilter,
      ...categoryFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.send({ movies, page, pages: Math.ceil(count / pageSize) });
  })
);

movieRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Movie.find().distinct('genre');
    res.send(categories);
  })
);

movieRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Movie.remove({});
    const seller = await User.findOne({ isSeller: true });
    if (seller) {
      const movies = data.movies.map((movie) => ({
        ...movie,
        seller: seller._id,
      }));
      const createdmovies = await Movie.insertMany(movies);
      res.send({ createdmovies });
    } else {
      res
        .status(500)
        .send({ message: 'No seller found. first run /api/users/seed' });
    }
  })
);

movieRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    if (movie) {
      res.send(movie);
    } else {
      res.status(404).send({ message: 'Movie Not Found' });
    }
  })
);

movieRouter.post(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const movie = new Movie({
      name: 'sample name ' + Date.now(),
      image: '/images/p1.jpg',
      genre: 'sample genre',
      releaseDate: today,
      rating: 0,
      numReviews: 0,
      details: 'sample description',
    });
    const createdMovie = await movie.save();
    res.send({ message: 'Movie Created', movie: createdMovie });
  })
);
movieRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const movieId = req.params.id;
      const movie = await Movie.findById(movieId);
      if (movie) {
        movie.name = req.body.name;
        movie.image = req.body.image;
        movie.genre = req.body.genre;
        movie.releaseDate = req.body.releaseDate;
        movie.description = req.body.details;
        const updatedMovie = await movie.save();
        res.send({ message: 'Movie Updated', movie: updatedMovie });
      } else {
        res.status(404).send({ message: 'Movie Not Found' });
      }
      
    } catch (error) {
      
      console.log(error);
      console.log(error);
    }

  })
);

movieRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      const deleteMovie = await movie.remove();
      res.send({ message: 'Movie Deleted', movie: deleteMovie });
    } else {
      res.status(404).send({ message: 'Movie Not Found' });
    }
  })
);

movieRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (movie) {
      if (movie.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.reduce((a, c) => c.rating + a, 0) /
        movie.reviews.length;
      const updatedMovie = await movie.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedMovie.reviews[updatedMovie.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Movie Not Found' });
    }
  })
);

export default movieRouter;
