const { MongoClient } = require('mongodb');
const uri =
  'mongodb://localhost:27017/social-next?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

const Client = new MongoClient(uri);

export default Client;
//want logic to do handler here. looked at https://codeconqueror.com/blog/using-a-database-with-next-js/
