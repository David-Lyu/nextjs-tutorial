import Client from '../../../utils/lib/mongodb';

async function handler(req, res) {
  // console.log(req);
  const data = req.body;
  if (!req.method === 'POST') {
    return res.status(400).json({ error: 'invalid method' });
  }
  if (!data || !Object.keys(data).length) {
    return res.status(400).json({ error: 'invalid body' });
  }
  for (const key in data) {
    if (!data[key]) return res.status(400).json({ error: 'invalid body' });
  }

  //need validation to prevent injection

  const email = data.email;
  //enter user in db and have email verify
  const connectedClient = await Client.connect();
  const db = await Client.db('social-next');
  const userCollection = await db.collection('users');
  const results = await userCollection.findOne({ email: email });

  Client.close();
  console.log(results, data);
  if (results.password !== data.password) {
    return res.status(400).json({ message: 'username/password incorrect' });
  }

  res.status(201).json({ message: 'login successful' });
}

export default handler;
