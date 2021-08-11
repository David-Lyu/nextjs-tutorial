export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(403).json({ error: 'method not allowed' });
  }
}
