const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const DocumentArray = mongoose.Schema.Types.Array

async function connect() {
  console.log('connect')
  let status = await mongoose.connect('mongodb://localhost:27017/test');
}

const Ganres = mongoose.model('Ganres', {
  name: String,
  parent: {
    type: ObjectId,
    ref: 'Ganres'
  }
});

const Films = mongoose.model('Films', {
  name: String,
  ganre: {
    type: ObjectId,
    ref: 'Ganres'
  }
});

const Halls = mongoose.model('Halls', {
  name: String,
  rows: Number,
  cols: Number
});

const Sessions = mongoose.model('Sessions', {
  film: {
    type: ObjectId,
    ref: 'Films'
  },
  hall: {
    type: ObjectId,
    ref: 'Halls'
  },
  date: String,
  time: String,
  price: Number
});

const Orders = mongoose.model('Orders', {
  session: {
    type: ObjectId,
    ref: 'Sessions'
  },
  datetime: Date,
  points: DocumentArray,
  count: Number,
  user: {
    type: ObjectId,
    ref: 'Users'
  },
  amount: Number
});

const Users = mongoose.model('Users', {
  name: String,
  password: String,
  email: String,
  admin: Boolean
});

module.exports = {
  Users, Orders, Sessions, Halls, Films, Ganres,
  connect
}