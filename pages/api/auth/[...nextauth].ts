import { Db } from 'mongodb';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from 'util/auth';
import { connectToDatabase } from 'util/mongodb';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials: { email: string; password: string }) {
        const { db }: { db: Db } = await connectToDatabase();

        const user = await db
          .collection('users')
          .findOne({ email: credentials.email });

        if (!user) {
          throw new Error('Email not found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Incorrect Password!');
        }

        return { email: user.email };
      },
    }),
  ],
});
