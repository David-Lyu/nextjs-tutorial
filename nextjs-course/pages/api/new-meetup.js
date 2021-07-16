//not react components. Just do function for server side code
import { newMeetup } from './mongodb';
// /api/new-meetup

function handler(req, res) {
  if (req.method !== 'POST') return;
  const data = req.body;
  const { title, image, address, description } = data;
  console.log(newMeetup);
}

export default handler;
