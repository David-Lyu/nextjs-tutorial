import { ObjectID } from 'mongodb';
import Client from '../../../../utils/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'PUT' && req.method !== 'DELETE') {
    console.log('inside method check');
    return res.status(400).json({ error: 'Method not allowed' });
  }
  const { friendId, userId } = req.body;

  if (!friendId || !userId) {
    return res.status(404).json({ error: 'Id not found' });
  }

  const clientConnect = await Client.connect();
  const db = await clientConnect.db('next-social');
  const userCollection = await db.collection('users');
  const user = await userCollection.findOne({ _id: ObjectID(userId) });
  console.log(user);

  if (!user) return res.status(404).json({ error: 'user not found' });

  if (req.method === 'PUT') addFriend(user, friendId, userCollection);
  if (req.method === 'DELETE') deleteFriend(user, friendId, userCollection);
}

function addFriend(user, friendId, userCollection) {
  console.log('insideFriend');
  let friendsArr = user.friends ? user.friends : [];
  friendsArr.push(friendId);
  userCollection.updateOne(
    { _id: ObjectID(user._id) },
    { $set: { friends: friendsArr } }
  );
}

function deleteFriend(user, friendId, userCollection) {
  console.log('inside delete');
  const friendsArr = user.friends;
  friendsArr.pop(friendId);
  userCollection.updateOne(
    { _id: ObjectID(user._id) },
    { $set: { friends: friendsArr } }
  );
}
