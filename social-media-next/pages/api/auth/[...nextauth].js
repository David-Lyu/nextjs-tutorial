import NextAuth from 'next-auth';

export default NextAuth({
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_CONSUMER_SECRET
    })
  ]
});
