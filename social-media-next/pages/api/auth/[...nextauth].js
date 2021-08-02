import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  database: 'mongodb://localhost:27017/next-social'
};

export default function handler(req, res) {
  NextAuth(req, res, options);
}

// export default NextAuth({
//   providers: [
//     Providers.Email({
//       server: process.env.EMAIL_SERVER,
//       from: process.env.EMAIL_CONSUMER_SECRET
//     })
//   ]
// });
