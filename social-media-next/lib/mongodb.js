const { MongoClient } = require('mongodb');
const uri =
  'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

const client = new MongoClient(uri);

const run = async () => {
  await client.connect();

  const database = client.db('social-next');
};
