import pool from "@/utils/dbConnect";

const handler = async (req, res) => {
  const {
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

  const userData = {
    user_name: name,
    user_surname: surname,
    user_email: email,
    user_password: password,
    user_confirmPassword: confirmPassword,
    user_id: id,
    user_phoneNumber: phoneNumber,
    user_dateOfBirth: dateOfBirth,
    user_country: country,
    user_city: city,
    user_state: state,
    user_img: img,
  };
 
  let client;
  try {
    client = await pool.connect();
    const queryText = `
    UPDATE public.user_info
    SET 
      user_name = $1,
      user_surname = $2,
      user_email = $3,
      user_password = $4,
      user_confirmpassword = $5,
      user_phonenumber = $6,
      user_dateofbirth = $7,
      user_country = $8,
      user_city = $9,
      user_state = $10,
      user_img = $11
    WHERE
      user_id = $12;
  `;
  const result = await client.query(queryText, [
    userData.user_name,
    userData.user_surname,
    userData.user_email,
    userData.user_password,
    userData.user_confirmPassword,
    userData.user_phoneNumber,
    userData.user_dateOfBirth,
    userData.user_country,
    userData.user_city,
    userData.user_state,
    userData.user_img,
    userData.user_id 
  ]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Update Successfully." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error." });
  }
};

export default handler;
