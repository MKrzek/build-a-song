const mongoose = require('mongoose');
const app = require('./server/server');

mongoose
  .connect(
    'mongodb+srv://mkrzek:mkrzek@cluster0-vgofl.mongodb.net/test?retryWrites=true&w=m' +
      'ajority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('connected to Mongo');
    app.listen(4000, () => {
      console.log('Listening');
    });
  });
