import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';

import User from '../../../utils/model/User/User.js';

//auth0 makes all these providers in one with one client secret etc. It is paid though for 700+ members
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
  adapter: Adapters.TypeORM.Adapter('mongodb://localhost:27017/next-social', {
    models: {
      User: User.User
    }
  }),
  callbacks: {
    async session(session, user) {
      session.user = user;
      return session;
    }
  }
  // database: 'mongodb://localhost:27017/next-social'
};

export default async function handler(req, res) {
  await NextAuth(req, res, options);
}
