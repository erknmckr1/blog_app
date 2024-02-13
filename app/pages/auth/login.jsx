import { useFormik } from "formik";
import React from "react";
import Input from "@/components/uı/Input";
import Link from "next/link";
import { SiGmail } from "react-icons/si";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";

function login() {
  const { data: session } = useSession();
  const [users, getUsers] = useState([]);

  const onSubmit = async () => {
    try {
      //! signin metonu ile kullanıcının gırdıgı parametrelerı provider a yollarız.
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
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
    resetForm,
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

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/getUser");
        getUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <div className="min-h-[calc(100vh-75px)] mx-auto container border w-full flex justify-center  ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  items-center justify-center gap-y-4 w-[600px]"
      >
        <span className="mt-5 text-[30px] font-semibold">Login User</span>
        <div className=" flex flex-col gap-y-4">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
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
