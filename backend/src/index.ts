import mongoose from 'mongoose';
import app from './app';
import config from './config/config';

app.listen(config.port, () => {
  mongoose.connect(config.mongodbUri).then(() => {
    console.log(`Successfully connected to MongoDB`);
  });
  console.log(`Server running on port ${config.port}`);
});