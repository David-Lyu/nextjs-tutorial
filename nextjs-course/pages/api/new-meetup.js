//not react components. Just do function for server side code
import { MeetupClient } from './mongodb';
// require('dotenv').config('local');
// /api/new-meetup

async function handler(req, res) {
  if (req.method !== 'POST') return;
  const data = req.body;
  const { title, image, address, description } = data;

  const connectedMeetupClient = await MeetupClient.connect();
  const db = await MeetupClient.db();
  const meetupsCollection = await db.collection('Meetup');
  const result = await meetupsCollection.insertOne(data);

  MeetupClient.close();
  res.status(201).json({ message: 'success' });
}
1;

export default handler;
