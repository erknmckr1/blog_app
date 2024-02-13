import { useFormik } from "formik";
import React from "react";
import Input from "@/components/uı/Input";
import Link from "next/link";

function register() {
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
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Your Full Name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
      autoComplete: "email",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
      autoComplete: "new-password",
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Your Confirm Email",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
      autoComplete: "new-password",
    },
  ];
  return (
    <div className="min-h-[calc(100vh-75px)] mx-auto container border w-full flex justify-center  ">
      <form className="flex flex-col  items-center justify-center gap-y-4 w-[600px]">
        <span className="mt-5 text-[30px] font-semibold">   Register User</span>
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
            Register
          </button>
          <button
            type="button"
            className="btn rounden-lg  flex justify-center items-center "
          >
            {" "}
            GMAİL
          </button>
        </div>
        <Link href="/auth/login">
          <span className="text-start underline text-secondary py-2 text-sm">
            Do you have a subscription?
          </span>
        </Link>
      </form>
    </div>
  );
}

export default register;
