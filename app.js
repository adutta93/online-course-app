const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');

const app = express();

// middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

// ROUTS
app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', courseRouter);

// server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
