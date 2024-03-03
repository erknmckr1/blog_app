import pool from "@/utils/dbConnect";

const handler = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const client = await pool.connect();
    const {
      user_id,
      user_name,
      user_surname,
      post_content,
      user_img,
      post_tags,
      post_category,
    } = req.body;

    try {
      const newPost = await client.query(
        `INSERT INTO public.user_posts(
            user_id, user_name,user_surname,post_content,user_img,post_tags,post_category
        ) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          user_id,
          user_name,
          user_surname,
          post_content,
          user_img,
          post_tags,
          post_category,
        ]
      );

      res.status(200).json({ message: "Post created succesfully" });
    } catch (err) {
      res.status(500).json({ message: "Error created post." });
      console.log(err);
    } finally {
      client.release();
    }
  }
};


export default handler;
