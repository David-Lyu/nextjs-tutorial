import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    res.send({
      content: 'Welcome to hte secret page'
    });
  } else {
    res.send({
      error: 'You need to be signed in'
    });
  }
}
