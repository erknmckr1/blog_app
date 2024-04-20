import pool from "@/utils/dbConnect";
const handler = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const client = await pool.connect();
    const { user_name, user_email, user_password, user_confirmPassword } =
      req.body;
    try {
      const newUser = await client.query(
        `INSERT INTO public."user_info"(
                 user_name, user_email, user_password, user_confirm_password)
                VALUES ($1, $2, $3, $4)`,
        [user_name, user_email, user_password, user_confirmPassword]
      );

      res.status(200).json({ message: "User Registered Successfully." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error regisreting user." });
    } finally {
      client.release(); // islem tamamlandıgında baglantıyı serbest bırak.
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
