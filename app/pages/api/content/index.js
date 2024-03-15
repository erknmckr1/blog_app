import pool from "@/utils/dbConnect";


const handler = async (req, res) => {
  const { method } = req;
  const {
    user_id,
    user_name,
    user_surname,
    user_email,
    post_content,
    user_img,
    post_tags,
    post_category,
    post_id,
    post_status,
  } = req.body;

  console.log(post_id)

  if (method === "POST") {
    const client = await pool.connect();

    try {
      const newPost = await client.query(
        `INSERT INTO public.user_posts(
            user_id, user_name,user_surname,user_email,post_content,user_img,post_tags,post_category,post_id,post_status
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          user_id,
          user_name,
          user_surname,
          user_email,
          post_content,
          user_img,
          post_tags,
          post_category,
          post_id,
          post_status,
        ]
      );
      res.status(200).json({ message: "Post created succesfully" });
    } catch (err) {
      res.status(500).json({ message: "Error created post." });
      console.log(err);
    } finally {
      client.release();
    }
  } else if (method === "GET") {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        `SELECT user_id, user_name, user_surname,user_email, post_content, user_img, post_category, post_tags,post_id
        FROM public.user_posts`
      );
      res.status(200).json(rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error..." });
    } finally {
      client.release();
    }
  } else if (method === "DELETE") {
    const client = await pool.connect();
    try {
 
        const checkPost = await client.query(
            `SELECT * FROM public.user_posts WHERE post_id = $1`, [post_id]
        );
        if (checkPost.rows.length === 0) {
            return res.status(404).json({ message: "Post not found..." });
        }

        const deletePost = await client.query(
            `UPDATE public.user_posts SET post_status = false WHERE post_id = $1`, [post_id]
        );
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error..." });
    } finally {
        client.release();
    }
}
};

export default handler;
