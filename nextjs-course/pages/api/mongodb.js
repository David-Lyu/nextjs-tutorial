const { MongoClient } = require('mongodb');
require('dotenv').config('local');
const uri = `mongodb+srv:// ${process.env.MONGODB_UN}:${process.env.MONGODB_PASS}@cluster0.uauhv.mongodb.net/nextjs_course?retryWrites=true&w=majority`;
const MeetupClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export { MeetupClient };
