import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import pool from "@/utils/dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      //! req ıle sıgnIn metodu ıle gonderılen verıler tutulur
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const client = await pool.connect();

        try {
          const result = await client.query(
            "SELECT * FROM user_info WHERE user_email = $1",
            [email]
          );

          if (result.rows.length > 0) {
            const user = result.rows[0];
            if (user.user_password === password) {
              return {
                email: user.user_email,
                name: user.user_name,
              };
            } else {
              throw new Error("Password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err) {
          console.error("Error during authentication:", err.message);
          throw new Error("Authentication failed");
        } finally {
          client.release();
        }
      },
    }),
  ],
  session: {
    maxAge: 60 * 60,
    jwt: true,
  },
  pages: {
    signIn: "/auth/login",
  },
  database: "",
  secret: "secret",
};

export default NextAuth(authOptions);
