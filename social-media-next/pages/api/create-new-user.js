export default function handler(req, res) {
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
  res.status(201).json({ message: 'user inputted' });
}
