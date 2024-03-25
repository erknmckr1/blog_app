import pool from "@/utils/dbConnect";

const handler = async (req, res) => {
  const {
    method,
    query: { post_id },
  } = req;

  try {
    let checkPost;

    if (method === "DELETE" || method === "GET") {
      checkPost = await pool.query(
        `SELECT * FROM public.user_posts WHERE post_id = $1`,
        [post_id]
      );

      if (checkPost.rowCount === 0) {
        return res.status(404).json({ message: "Post not found..." });
      }
    }

    if (method === "DELETE") {
      const deletePost = await pool.query(
        `DELETE FROM public.user_posts WHERE post_id = $1`,
        [post_id]
      );

      if (deletePost.rowCount === 0) {
        return res.status(404).json({ message: "Post not found..." });
      }
      res.status(200).json({ message: "Deleted successfully" });
    } else if (method === "GET") {
      res.status(200).json(checkPost.rows[0]);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error..." });
  }
};

export default handler;
