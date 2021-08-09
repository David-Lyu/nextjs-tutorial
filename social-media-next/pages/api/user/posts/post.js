export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'invalid method' });
  }
  const data = req.body;
}
