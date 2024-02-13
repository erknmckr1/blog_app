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
            "SELECT * from user_ınfo WHERE user_email = $1 user_password = $2  ",
            [email,password]
          );
          console.log(result.rows[0].user_email)
          if (result.rows.length > 0) {
            return { email: result.rows[0].user_email };
          } else {
            return {
              message: "Kullanıcı bulunamadı. Email yada Password hatalı.",
            };
          }
        } catch (err) {
          console.error("Error during auth", err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  database: "",
  secret: "secret",
};

export default NextAuth(authOptions);
