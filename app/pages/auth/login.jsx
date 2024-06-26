import { useFormik } from "formik";
import React from "react";
import Input from "@/components/uı/Input";
import Link from "next/link";
import { SiGmail } from "react-icons/si";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function login() {
  const { data: session } = useSession();
  const [users, getUsers] = useState([]);
  const { push } = useRouter();

  const onSubmit = async () => {
    try {
      //! signin metonu ile kullanıcının gırdıgı parametrelerı provider a yollarız.
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res.status === 200) {
        toast.success("Signed in");
      } else {
        toast.warning("Username or password is wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];


  // Kullanıcı gırısı oldugunda yada varsa biz sayfa yonlendırmesını asagıdakı gıbı yapıyoruz fakat bu işlemde
  // diyelim ki Home sayfasından profıle sayfasına tıkladık eger kullanıcı gırısı var ıse dırekt profile sayfasına
  // gıtmesını ısterız. Fakat useEffect ıle yaptıgımız taktırde once logın sayfasına daha sonra profile sayfasına
  // gittigi için bu ıslemı sayfa yuklenmeden sunucu kısmında yapmamız gerekıyor bunun ıcınde getServerSideProps
  // kullancagız bu sayfa henuz yuklenmeden calısacak.

  useEffect(() => {
    const getUser = async () => {
      const users = await axios.get(`${process.env.NEXT_PUBLIC_url}getUser`);
      const user = users.data.find((item) => item.user_email === session?.user.email);

      if (user && session) {
        push(`/profile/${user.user_id}`);
      }
    };

    getUser();
  }, [session]);



  return (
    <div className="min-h-[calc(100vh-75px)] mx-auto container border w-full flex justify-center  relative ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  items-center justify-center gap-y-4 w-[600px]"
      >
        <span className="mt-5 text-[30px] font-semibold">Login User</span>
        <div className=" flex justify-center  ">
          <div className="w-[350px] xl:w-[500px]">
            {inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                onChange={handleChange}
                onBlur={handleBlur}
                prop=" w-[350px] xl:w-[500px] mt-2"
              />
            ))}
          </div>

        </div>
        <div className="flex flex-col items-center justify-center w-full mt-6 gap-y-3 text-black">
          <button type="submit" className="btn">
            LOGIN
          </button>
          <button
            type="button"
            className="btn rounden-lg !w-3 flex justify-center items-center "
          >
            {" "}
            <SiGmail />
          </button>
        </div>
        <Link href="/auth/register">
          <span className="text-start underline text-secondary py-2 text-sm">
            Do you no have a account?
          </span>
        </Link>
      </form>
    </div>
  );
}

export default login;

export const getServerSideProps = async (context) => {
  const { req } = context;

  const session = await getSession({ req });

  const users = await axios.get(`${process.env.NEXT_PUBLIC_url}getUser`);
  const user = users.data.find((item) => item.user_email === session?.user.email);

  if (user && session) {
    return {
      redirect: {
        destination: "/profile/" + user.user_id,
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: users ? users.data : null,
    },
  };
};

