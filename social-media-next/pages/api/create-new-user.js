export default function handler(req, res) {
  console.log(req);
  const data = req.body;
  if (!req.method === 'POST') {
    return res.status(400).json({ error: 'invalid method' });
  }
  if (!data || !Object.keys(data).length) {
    return res.status(400).json({ error: 'invalid body' });
  }
  for (key in data) {
    if (!data[key]) return res.status(400).json({ error: 'invalid body' });
  }

  const email = data.email;
}
