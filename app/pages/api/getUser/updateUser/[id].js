import pool from "@/utils/dbConnect";

const handler = async (req, res) => {
  const { method } = req;
  console.log(req.body);
  let {
    name,
    surname,
    email,
    password,
    confirmPassword,
    id,
    phoneNumber,
    dateOfBirth,
    country,
    city,
    state,
    img,
  } = req.body;

  try {
    const client = await pool.connect();

    if (method === "PUT") {
      const updateUser = await client.query(
        `UPDATE public.user_info SET
        user_name = $1,
        user_surname=$2,
        user_email=$3,
        user_password=$4,
        user_confirmPassword=$5,
        user_phonenumber=$6,
        user_dateOfBirth=$7,
        user_country=$8,
        user_city=$9,
        user_state=$10,
        user_img=$11 WHERE user_id=$12`,
        [
          name,
          surname,
          email,
          password,
          confirmPassword,
          phoneNumber,
          dateOfBirth,
          country,
          city,
          state,
          img,
          id,
        ]
      );

      // Güncelleme başarılı olduysa
      if (updateUser.rowCount > 0) {
        res.status(200).json({ message: "Update Successfully." });
      } else {
        res.status(404).json({ message: "User not found." });
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export default handler;
