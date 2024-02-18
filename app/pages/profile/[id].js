import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Input from "@/components/uı/Input";
import { useFormik } from "formik";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

function Profile({ session_user }) {
  const { data: session } = useSession();
  const [status, setStatus] = useState(0);
  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState();
  const [showMenu, setShowMenu] = useState(true);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // dosya secme ıslemlerı
  const handleFileChange = (changeEvent) => {
    const reader = new FileReader(); // fileReader nesnesı dosyanın ıcerıgını okumak ıcın kullanılır.

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result); // yuklenen dosyanın ıcerıgını temsıl eder base64 formatında bır verıdır.
      setFile(changeEvent.target.files[0]);
    };

    //!Yüklenen dosyanın ıcerıgını base64 formatında vır verı olarak dondurduk.
    reader.readAsDataURL(changeEvent.target.files[0]);
  };
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: session_user.user_name,
      surname: session_user.user_surname,
      email: session_user.user_email,
      password: session_user.user_password,
      confirmPassword: session_user.user_confirmPassword || "",
      id: session_user.user_id ,
      phoneNumber: session_user.user_phoneNumber,
      dateOfBirth: session_user.user_dateOfBirth ||"",
      country: session_user.user_country || "",
      city: session_user.user_city || "" ,
      state: session_user.user_state ||"" ,
    },
  });

  console.log(values.name);

  const ınputs = [
    { value: values.name, placeholder: "Name", type: "text", id: "1",name:"name" },
    {
      value: values.surname,
      placeholder: "Surname",
      type: "text",
      id: "2",
      name:"surname"
    },
    { value: values.email, placeholder: "Email", type: "text", id: "3",name:"email" },
    {
      value: values.phoneNumber,
      placeholder: "Phone Number",
      id: "4",
      name:"phoneNumber"
    },
    {
      value: values.password,
      placeholder: "Password",
      type: "password",
      id: "5",
      name:"password"
    },
    {
      value: values.confirmPassword,
      placeholder: "Confirm Password",
      type: "password",
      id: "6",
      name:"confirmPassword"
    },
    {
      value: values.dateOfBirth,
      placeholder: "Data Of Birth",
      id: "7",
      type: "date",
      name:"dateOfBirth"
    },
    { value: values.country, placeholder: "County", id: "8", type: "text",name:"country" },
    { value: values.city, placeholder: "City", id: "9", type: "text",name:"city" },
    { value: values.state, placeholder: "State", id: "10", type: "text",name:"state" },
  ];

  return (
    <div className="min-h-[calc(100vh-75px)] w-screen relative sm:static">
      <div className="w-full h-full flex ">
        <button
          onClick={handleShowMenu}
          className={`absolute z-50 top-10 xl:hidden left-2 text-[30px] ${
            showMenu === true ? " hidden " : ""
          }`}
        >
          <FaArrowCircleRight />
        </button>
        {/* left side */}
        <div
          className={`xl:w-1/4 h-full border-r p-4 absolute xl:static  z-50 bg-white transition-all duration-300 ease-in ${
            showMenu ? "left-0" : "left-[-340px]"
          }  `}
        >
          <button
            onClick={handleShowMenu}
            className="absolute right-0  text-[30px] xl:hidden"
          >
            <FaArrowCircleLeft />
          </button>
          {/* profil photo */}
          <div className=" w-full h-auto flex flex-col items-center py-2 justify-center  ">
            <Image
              width={100}
              height={100}
              className="w-[140px] h-[140px] rounded-full "
              src="/OIP.jpeg"
            />
            <span className="text-xl font-semibold py-3 ">{values.name}</span>
            <span className="font-semibold py-1">{values.email}</span>
            <span className="font-semibold py-1">{values.id}</span>
          </div>
          <div className="w-full h-auto py-4 flex flex-col items-center gap-y-3 justify-center">
            <button className="hover:font-semibold p-2 btn hover:underline transition-all ease-in duration-300 ">
              Gönderi Olustur
            </button>
            <button className="hover:font-semibold p-2 btn hover:underline transition-all ease-in duration-300 ">
              Gönderiler
            </button>
            <button className="hover:font-semibold p-2 btn hover:underline transition-all ease-in duration-300 ">
              Beğeniler
            </button>
            <button className="hover:font-semibold p-2 btn hover:underline transition-all ease-in duration-300 ">
              Yorumlar
            </button>
            <button className="hover:font-semibold p-2 btn hover:underline transition-all ease-in duration-300 ">
              Hesap
            </button>
            <button className="hover:font-semibold p-2 btn hover:underline transition-all ease-in duration-300 ">
              Sifre
            </button>
            <button className="hover:font-semibold p-2 btn hover:underline transition-all ease-in duration-300 ">
              Yorumlar
            </button>
          </div>
        </div>
        {/* middle side */}
        <div className="xl:w-3/4 w-full h-full p-4  ">
          <span className="font-semibold text-[30px] ">Account Setting</span>
          <div className="sm:flex justify-between ">
            <div className="sm:w-3/4 h-full py-3">
              <form className="w-full flex flex-wrap justify-center gap-5">
                {ınputs.map((item) => (
                  <div key={item.id} className="">
                    <Input
                      prop=" w-[350px] xl:w-[500px]"
                      value={item.value}
                      {...item}
                     onChange={handleChange}
                    />
                  </div>
                ))}
              </form>
            </div>
            {/* upload ımg */}
            <div className="xl:w-1/4 w-full">
              <label className="flex  gap-2 items-center justify-center">
                <input
                  onChange={(e) => handleFileChange(e)}
                  type="file"
                  className="hidden"
                />
                <button className="btn pointer-events-none mt-3">
                  Select Image
                </button>
                {imageSrc && (
                  <div>
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
                    <img
                      src={imageSrc}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="w-full flex xl:justify-start   ">
            <button className="btn mt-5">Onayla</button>
          </div>
        </div>
        {/* right side */}
      </div>
    </div>
  );
}

export default Profile;

export const getServerSideProps = async (context) => {
  const { req, params } = context;

  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const users = await axios.get(`http://localhost:3000/api/getUser`);
  const user = users.data.find(
    (item) => item.user_email === session?.user.email
  );

  return {
    props: {
      session: session.user,
      session_user: user ? user : null,
    },
  };
};
