const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const connectToDatabase = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const userRoutes = require('./routers/userRoutes');
const authRoutes = require('./routers/authRoutes');

const app = express();
const PORT = env.PORT || 5000;


connectToDatabase();


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: env.FRONTED_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
