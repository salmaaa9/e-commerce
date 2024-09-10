import { useState, useEffect } from "react";
import Style from "./VerifyCode.module.css";
import axios from "axios";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

let userSchema = yup.object({
  code: yup.string().required(),
});

function VerifyCode() {
  const [isLoading, setisLoading] = useState(false)
  const [expired, setExpired] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    console.log("mounting VerifyCode");
  }, []);

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: verifyCode,
    validationSchema: userSchema,
  });

  async function verifyCode(values) {
    console.log(values.code);
    
    setisLoading(true)
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          resetCode: values.code, // Use formik values for the code input
        }
      );
      console.log(res.data);
      navigate('/reset-password')
    } catch (error) {
      setExpired(true)
      if (error.response) {
        console.error("Server Error:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
    }
  }
    finally {
      setisLoading(false)
    }
  }

if(isLoading){
  return <Loading />
}
  return (
    <div className="">
      
      <form onSubmit={formik.handleSubmit} action="" className="my-20 mx-12">
      <h2 className="mb-10 font-bold text-2xl">Enter veriftication code sent to you email</h2>
        <input
          value={formik.values.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="code" // Correct the name attribute
          id="code"
          placeholder="code"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
        />
        {formik.touched.code && formik.errors.code ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.code}</div>
        ) : null}
        
        <button
          type="submit"
          className="border-green-600 text-green-600 px-3 py-2 border-2 rounded-md mt-10 hover:bg-green-600 hover:text-white transition-all duration-300"
        >
          Verify
        </button>
        {expired && <div className="text-red-500">the code is invalid or expired</div>}
      </form>
    </div>
  );
}

export default VerifyCode;
