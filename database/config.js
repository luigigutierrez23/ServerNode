const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_CNN,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, resp) => {
        if (err) throw err;
        console.log('Database Connection OK');
      }
    );
  } catch (error) {
    throw new Error('Database error', error);
  }
};

module.exports = {
  dbConnection,
};
