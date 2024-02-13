import pool from "@/utils/dbConnect";

const handler = async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM public.user_ınfo");
      const users = result.rows;
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Internal server error." });
    }
  }
};

export default handler;
