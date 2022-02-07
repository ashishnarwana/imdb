import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import movieRouter from './routers/movieRouter.js';
import userRouter from './routers/userRouter.js';
import uploadRouter from './routers/uploadRouter.js';

import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/imdb');



// use it before all route definitions
app.use(cors({origin: 'http://localhost:3000'}));


app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);

app.use('/api/movies', movieRouter);


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];


httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`Serve at http://localhost:${port}`);
// });
