const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.weppimj.mongodb.net/secDiplom1?retryWrites=true&w=majority&appName=Cluster0');
    console.log('DB connected');
  } catch (err) {
    console.log('DB connection error', err);
  }
};

module.exports = connectDB;