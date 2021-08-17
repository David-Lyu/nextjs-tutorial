import Client from '/utils/lib/mongodb';
import { ObjectID } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(403).json({ error: 'method not allowed' });
  }
  const id = req.query.userId;

  const clientConnect = await Client.connect();
  const db = await clientConnect.db('next-social');
  const userCollection = await db.collection('users');
  const postCollection = await db.collection('posts');

  const user = await userCollection.findOne({ _id: ObjectID(id) });
  const friends = user.friends;
  let posts = [];

  //not sure if i want their regular userId or to be ObjectID
  if (friends) posts = await postCollection.find({ userId: { $in: friends } });
  const myPosts = await postCollection.find({ userId: id });

  const results = [];

  await posts.forEach((post) => {
    results.push(post);
  });

  await myPosts.forEach((post) => {
    results.push(post);
  });

  console.log(results);
  //need to filter posts

  res.status(200).json({ posts: results });
}
