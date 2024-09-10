import { useState, useEffect } from "react";
import Style from "./ForgotYourPassword.module.css";
import axios from "axios";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

let userSchema = yup.object({
  email: yup.string().required().email(),
});

function ForgotYourPassword() {
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false)
  useEffect(() => {
    console.log("mounting ForgotYourPassword");
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgotPassword,
    validationSchema: userSchema,
  });

  async function forgotPassword(values) {
    setisLoading(true)
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          email: values.email, // Use formik values for the email input
        }
      );
      console.log(res.data);
      navigate("/verify-Code");
    } catch (error) {
      console.error("Error sending request:", error);
    }
    finally{
      setisLoading(false)
    }
  }

if(isLoading){
  return <Loading/>
}
  return (
    <div className="">
      
      <form onSubmit={formik.handleSubmit} action="" className="my-20 mx-12">
      <h2 className="mb-10 font-bold text-2xl">Enter email and check vertification code sent</h2>
        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="email"
          name="email" // Correct the name attribute
          id="email"
          placeholder="Email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        ) : null}
        
        <button
          type="submit"
          className="border-green-600 text-green-600 px-3 py-2 border-2 rounded-md mt-10 hover:bg-green-600 hover:text-white transition-all duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ForgotYourPassword;
