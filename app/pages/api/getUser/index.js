import pool from "@/utils/dbConnect";

const handler = async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM public.user_info");
      const users = result.rows;
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Internal server error." });
    }
  }else if (method ==="POST"){
    const {} = req.body
    try {
      
    } catch (err) {
      console.log(err)
    }
  }
};

export default handler;
