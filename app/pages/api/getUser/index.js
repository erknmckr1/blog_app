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
      console.error("Error executing GET request:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  } else if (method === "POST") {
    try {
      const {
        user_name,
        user_surname,
        user_email,
        user_password,
        user_confirmpassword,
        user_phonenumber,
        user_dateofbirth,
        user_country,
        user_city,
        user_state,
        user_img,
      } = req.body;

      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO public.user_info (user_name, user_surname, user_email, user_password, user_confirm_password, user_phone_number, user_date_of_birth, user_country, user_city, user_state, user_img) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
        [
          user_name,
          user_surname,
          user_email,
          user_password,
          user_confirmpassword,
          user_phonenumber,
          user_dateofbirth,
          user_country,
          user_city,
          user_state,
          user_img,
        ]
      );

      const newUser = result.rows[0];
      res.status(201).json(newUser);
    } catch (err) {
      console.error("Error executing POST request:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  }
};

export default handler;
