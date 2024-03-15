import pool from "@/utils/dbConnect";

const handler = async (req, res) => {
  const { method, query: { post_id } } = req;

  if (method === "DELETE") {
    try {
      const checkPost = await pool.query(
        `SELECT * FROM public.user_posts WHERE post_id = $1`, 
        [post_id]
      );
      if (checkPost.rows.length === 0) {
        return res.status(404).json({ message: "Post not found..." });
      }

      const deletePost = await pool.query(
        `DELETE FROM public.user_posts WHERE post_id = $1`, 
        [post_id]
      );
      res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error..." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
