import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Input from "@/components/uı/Input";
import { useFormik } from "formik";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import axios from "axios";
import { signOut } from "next-auth/react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Account from "@/components/profile/Account";
import CreatePost from "@/components/profile/CreatePost";
import Posts from "@/components/profile/Posts";
function Profile({ session_user,posts }) {
  const { data: session } = useSession();
  const [status, setStatus] = useState(1);
  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState();
  const [showMenu, setShowMenu] = useState(true);

  const { push } = useRouter();

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // random unıq karakter
  
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
      confirmPassword: session_user.user_confirmpassword || "",
      id: session_user.user_id,
      phoneNumber: session_user.user_phonenumber,
      dateOfBirth: session_user.user_dateofbirth || "",
      country: session_user.user_country || "",
      city: session_user.user_city || "",
      state: session_user.user_state || "",
      img: session_user.user_img || "/default.jpg",
    },
  });

  const onSubmit = async () => {
    try {

      // Dosya varsa ve değiştirilmediyse veya dosya yoksa yanı resım zorunlu da degıl
      if (!file || session_user.user_img === values.img) {
        const updatedAccount = { ...values, img: session_user.user_img };

        const confirmUpdate = window.confirm("Are you sure you want to update your account?");
        if (!confirmUpdate) return; // Kullanıcı onay vermezse işlemi sonlandır
  
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_url}getUser/updateUser/${session_user.user_id}`,
          updatedAccount
        );
  
        if (res.status === 200) {
          toast.success("Updated Successfully.");
        }
        return; // Dosya yoksa veya değiştirilmediyse işlemi sonlandır
      }
     
      // Dosya var ve değiştirildiyse Cloudinary'ye yükle
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ecblog");
  
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dh1medzkb/image/upload`,
        data
      );

      const confirmUpdate = window.confirm("Are you sure you want to update your account?");
      if (!confirmUpdate) return; // Kullanıcı onay vermezse işlemi sonlandır


      const uploadImg = response.data.url;
      const updatedAccount = { ...values, img: uploadImg };
  
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_url}getUser/updateUser/${session_user.user_id}`,
        updatedAccount
      );
  
      if (res.status === 200) {
        toast.success("Updated Successfully.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  //
  const handleSignOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      signOut({ redirect: false });
      toast.dark("Successful exit.");
      push("/auth/login");
    }
  };

  const ınputs = [
    {
      value: values.name,
      placeholder: "Name",
      type: "text",
      id: "1",
      name: "name",
    },
    {
      value: values.surname,
      placeholder: "Surname",
      type: "text",
      id: "2",
      name: "surname",
    },
    {
      value: values.email,
      placeholder: "Email",
      type: "text",
      id: "3",
      name: "email",
    },
    {
      value: values.phoneNumber,
      placeholder: "Phone Number",
      id: "4",
      name: "phoneNumber",
    },
    {
      value: values.password,
      placeholder: "Password",
      type: "password",
      id: "5",
      name: "password",
    },
    {
      value: values.confirmPassword,
      placeholder: "Confirm Password",
      type: "password",
      id: "6",
      name: "confirmPassword",
    },
    {
      value: values.dateOfBirth,
      placeholder: "Data Of Birth",
      id: "7",
      type: "date",
      name: "dateOfBirth",
    },
    {
      value: values.country,
      placeholder: "County",
      id: "8",
      type: "text",
      name: "country",
    },
    {
      value: values.city,
      placeholder: "City",
      id: "9",
      type: "text",
      name: "city",
    },
    {
      value: values.state,
      placeholder: "State",
      id: "10",
      type: "text",
      name: "state",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-75px)] w-screen relative sm:static">
      <div className="w-full h-full flex px-3 ">
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
              src={`${values.img && values.img}`}
            />
            <span className="text-xl font-semibold py-3 ">{values.name}</span>
            <span className="font-semibold py-1">{values.email}</span>
            <span className="font-semibold py-1">{values.id}</span>
          </div>
          <div className="w-full h-auto py-4 flex flex-col items-center gap-y-3 justify-center">
            <button
              onClick={() => {
                setStatus(1);
              }}
              className={`${
                status === 1
                  ? "hover:font-semibold p-2 btn !bg-yellow-500 hover:underline transition-all ease-in duration-300"
                  : "hover:font-semibold p-2 btn hover:underline transition-all ease-in duration-300"
              }`}
            >
              Gönderi Olustur
            </button>
            <button  onClick={() => {
                setStatus(2);
              }}
              className={`${
                status === 2
                  ? "hover:font-semibold p-2 btn !bg-yellow-500 hover:underline transition-all ease-in duration-300"
                  : "hover:font-semibold p-2 btn hover:underline transition-all ease-in duration-300"
              }`}>
              Gönderiler
            </button>
            <button className="hover:font-semibold p-2 btn hover:underline transition-all ease-in duration-300 ">
              Beğeniler
            </button>
            <button className="hover:font-semibold p-2 btn hover:underline transition-all ease-in duration-300 ">
              Yorumlar
            </button>
            <button
              onClick={() => {
                setStatus(0);
              }}
              className={`${
                status === 0
                  ? "hover:font-semibold p-2 btn !bg-yellow-500 hover:underline transition-all ease-in duration-300"
                  : "hover:font-semibold p-2 btn hover:underline transition-all ease-in duration-300"
              }`}
            >
              Hesap
            </button>
            <button className="hover:font-semibold p-2 btn hover:underline transition-all ease-in duration-300 ">
              Sifre
            </button>
            <button
              onClick={handleSignOut}
              className="hover:font-semibold p-2 btn !bg-red-600  hover:underline transition-all ease-in duration-300 "
            >
              Çıkıs Yap
            </button>
          </div>
        </div>
        {/* middle side */}
        {status === 0 && (
          <Account
            handleChange={handleChange}
            ınputs={ınputs}
            handleFileChange={handleFileChange}
            setImageSrc={setImageSrc}
            imageSrc={imageSrc}
            onSubmit={onSubmit}
          />
        )}
        {status === 1 && <CreatePost session_user={session_user} session={session} />}
        {status === 2 && <Posts posts={posts} session_user={session_user} session={session} />}
        {/* right side */}
      </div>
    </div>
  );
}

export default Profile;

export const getServerSideProps = async (context) => {
  const { req, params } = context;

  const session = await getSession({ req });
  // session yoksa login sayfasına yonlendır.
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const users = await axios.get(`${process.env.NEXT_PUBLIC_url}getUser`);
  const user = users.data.find(
    (item) => item.user_email === session?.user.email
  );

  
  const posts = await axios.get(`${process.env.NEXT_PUBLIC_url}content`);
  const user_posts = posts.data.filter(item => item.user_email === session?.user.email)
  return {
    props: {
      session: session.user,
      session_user: user ? user : null,
      posts : posts ? user_posts : null,
    },
  };
};
