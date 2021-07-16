//not react components. Just do function for server side code

// /api/new-meetup

function handler(req, res) {
  if (req.method !== 'POST') return;
  const data = req.body;
  const { title, image, address, description } = data;
}

export default handler;
